<?php

namespace App\Services;

use App\Contracts\Deploy;
use App\Models\Services\ServerService;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Illuminate\Support\Facades\Log;

/**
* Deploy to aws
*/
class AwsDeploy implements Deploy
{

	protected $serverService; 

	protected $options;

	protected $process;

	protected $successCallback;

	protected $errorCallback;

	protected $deployment;


	function __construct()
	{
		
	}

	public function setOptions($options){
		$this->options = $options; 
	}


	public function run(){

		Log::info('Deploying to aws');

		$application = $this->options['application'];
    $deployment  = $this->options['deployment'];
    $this->deployment = $deployment;

    //Get the parameters to run the process
    $serverCode = $application->server->code;
    $route = $application->route;
    $branch = $application->branch;


    //Create the command to run
    $processParameters = $application->before_script . 
                        " envoy run " .  
                        $application->deploy_task . 
                        " --route=$route " . 
                        " --branch=$branch " . 
                        " --server=$serverCode " ;


    Log::info( 'on AwsDeploy = ' . $processParameters);

    //Change the actual path to be the main path and get the envoy file
    chdir( base_path() );

    $this->process = new Process( $processParameters );
    $this->process->run();


    $result = $this->process->getOutput();

    $this->process->isSuccessful() ? $this->success($result) : $this->error($result) ;    
	}

	public function onSuccess($callback){
		$this->successCallback = $callback;
	}

	public function onError($callback){
		$this->errorCallback = $callback;
	}

	public function success($result){
		($this->successCallback)($this->deployment, $result);
	}

	public function error($result){
		($this->errorCallback)($this->deployment, $result);
	}

}

