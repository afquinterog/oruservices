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
class DummyDeploy implements Deploy
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

		Log::info('Deploying to dummy server ...');


		$application = $this->options['application'];
    $deployment  = $this->options['deployment'];

    $this->deployment = $deployment;

     //Get the parameters to run the process
    $serverCode = $application->server->code;
    $repo = $application->repo;
    $branch = $application->branch;
    $name = $application->name;

    //Create the command to run
    $processParameters = $application->before_script . 
                        " envoy run " .  
                        $application->deploy_task . 
                        " --repo=$repo " . 
                        " --branch=$branch " .
                        " --dockerName=$name " . 
                        " --server=$serverCode " ;

    Log::info( 'on Dummy Deploy = ' . $processParameters);
    
    $result = "Sample result from deployment process";

    $this->isSuccessful() ? $this->success($result) : $this->error($result) ;  
	}

	public function isSuccessful(){
		return true;
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

