<?php

namespace App\Services;

use App\Contracts\Snapshot;

/**
* Create a dummy snapshot for testing purposes
*/
class DummySnapshot
{

	private $data;

	private $debug;

	/**
  * Constructor
  */
	public function __construct($data)
	{

		$this->data = $data;
		$this->data->profile = isset($this->data->profile) ? 
													 "--profile " . $this->data->profile  : 
													 ""; 

		echo "Snapshot to = " . $this->data->code;
	}


  /**
  * Simulate the snapshot creation 
  */
	public function run()
	{
		echo "Creating a simple dummy snapshot for " . $this->data->code . " : " . $this->data->description;
		return true;
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

