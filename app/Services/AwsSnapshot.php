<?php

namespace App\Services;

use App\Contracts\Snapshot;

/**
* Create a snapshot on Aws S3 
*/
class AwsSnapshot
{

	/**
	 * Snapshot information
	 */
	private $data;

	/**
	 * If true the commands will be printed out and not executed
	 */
	private $debug = false;



	public function __construct($data)
	{
		$this->data = $data;
		$this->getAwsProfile();
	}


  /**
   * Run the Aws snapshot
   */
	public function run()
	{
		
		$created = false;

		if( $this->containsValidOptions() ){

			$filters = $this->getSnapshotsFilter();
			$snapshots = $this->getSnapshots( $filters );

			//Aws cli should return empty object even when there is not any snapshot
			if( $snapshots ){

				if( $this->shouldCreate( $snapshots ) ){
					$this->create( );
					$created = true;
				}
				// delete extra snapshots base on number of 'snapshots' option
				$this->deleteExtraSnapshots();
			}
		}
		else{
			echo 'Volume '.$this->data->code.':'.$this->data->description.' not ran due to invalid config options';
		}		

		return $created;

	}
	
	/**
	 * Check if a snapshot should be created based on the options (number of snapshots & interval)
	 * 
	 * @param  object $snapshots list of snapshots return from AWS CLI
	 * @return boolean
	 */
	private function shouldCreate($snapshots)
	{
		// create snapshot if none exist and the option is set for 1 or more
		if(count($snapshots->Snapshots) < 1 && $this->data->snapshots > 0) return true;
		
		$interval = (new \DateTime())->modify( '-' . $this->data->interval );
		$lastSnapshot = new \DateTime(end($snapshots->Snapshots)->StartTime);

		// use same timezones for comparison below
		$interval->setTimezone(new \DateTimeZone('EDT'));
		$lastSnapshot->setTimezone(new \DateTimeZone('EDT'));


		// check if last snapshot is before the interval time-frame
		if($lastSnapshot < $interval) return true;
		
		return false;
	}

	/**
	 * Create new EBS snapshot
	 * @param  string $volume_id
	 * @param  string $description
	 * @return string
	 */
	public function create()
	{
		$cmd = sprintf("/usr/local/bin/aws %s ec2 create-snapshot --volume-id %s --description '%s' ", 
			$this->data->profile, 
			escapeshellarg($this->data->code),
			$this->data->description
		);

		return $this->executeCommand($cmd);
	}

	/**
	* Delete snapshot
	* @param  string $snapshot_id
	* @return string
	*/
	public function delete($snapshot_id)
	{
		$cmd = sprintf('/usr/local/bin/aws %s ec2 delete-snapshot --snapshot-id %s',
			$this->data->profile, 
			escapeshellarg($snapshot_id)
		);
		return $this->executeCommand($cmd);
	}
	
	/**
	 * Delete extra snapshots if $snapshot limit is met
	 * @param  string $volume_id
	 * @return string
	 */
	private function deleteExtraSnapshots()
	{
		$filters = $this->getSnapshotsFilter();
		$snapshots = self::getSnapshots( $filters );
		$snapshotCount = count($snapshots->Snapshots);
		
		if($snapshotCount <= $this->data->snapshots ) {
			return false;
		}
		
		for( $x=0 ; $x < $snapshotCount - $this->data->snapshots ; ++$x)
		{
			self::delete( $snapshots->Snapshots[$x]->SnapshotId);
		}		
	}
	
	/**
	 * Get list of snapshots based on filters
	 * @param  array $filters
	 * @return mixed  json object on true
	 */
	public function getSnapshots( $filters=array() )
	{
		$cmd_filters = false;

		foreach($filters as $name => $value) $cmd_filters .= 'Name='.escapeshellarg($name).',Values='.escapeshellarg($value).' ';

		$cmd = '/usr/local/bin/aws ' . $this->data->profile . ' ec2 describe-snapshots '.($cmd_filters ? '--filters '.trim($cmd_filters) : '');
		$response = $this->executeCommand($cmd);

		$snapshots = json_decode($response);
		if(!$snapshots) return false;

		// sort asc by date
		usort($snapshots->Snapshots, function($a,$b){
			return strtotime($a->StartTime) - strtotime($b->StartTime);
		});

		return $snapshots;
	}

	/**
	 * Get snapshots filter
	 * 
	 * @return array filters 
	 */
	private function getSnapshotsFilter()
	{
		return array('volume-id' => $this->data->code, 'description' => $this->data->description );
	}

	/**
	 * Check the volumen options
	 * 
	 * @return boolean the snapshot contain valid options
	 */
	private function containsValidOptions()
	{
		if( !isset($this->data->code) || !isset($this->data->snapshots) || !isset($this->data->interval) ){
			return false;
		}
		return true;
	}

	/**
	* Get the aws profile option
	* 
	* @param  string $profile
	* @return string Aws profile
	*/
	private function getAwsProfile()
	{
		return ( $this->data->profile != "") ? "--profile $this->data->profile "  : "";
	}

	/**
	 * Wrapper for the command execution that include debug mode checking
	 * 
	 * @param string $cmd the command to execute 
	 */
	public function executeCommand( $cmd ){

		//Redirect the command result to the standar output
		$cmd = $cmd . " 2>&1 ";

		if($this->debug){
			echo sprintf( "Executing fake : %s", $cmd );
		}
		else{
			return shell_exec($cmd);
		}
	}

	/**
	 * Enable/disable debug mode
	 * 
	 * @param boolean $mode
	 */
	public function setDebugMode($mode){
		$this->debug = $mode;
	}


}