<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\Log;
use App\Models\Services\ServerService;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use App\Models\Servers\Application;
use App\Models\Servers\Deployment;
use Carbon\Carbon;

use App\Contracts\Deploy;
use App\Events\DeployFinished;

class DeployApp extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deploy:app {deploymentId} ';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deploy the application on a remote server';

    /**
     * The deploy service
     *
     * @var string
     */
    protected $deploy;



    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //Get arguments
        $deploymentId = $this->argument('deploymentId');

        //Get the deployment
        $deployment = Deployment::find($deploymentId);
        $application = $deployment->application;

        //Set options to the deployment process
        $options = [
            'application' => $application,
            'deployment' => $deployment,
        ];

        $this->deploy = new $application->deployment_type();

        $this->deploy($options);
       
    }

    public function deploy($options){

        $this->deploy->setOptions($options);
        
        $this->deploy->onSuccess( function ($deployment, $result){
            
            //Save the deployment result
            $deployment->result = $result;
            $deployment->status = Deployment::SUCCESS_DEPLOY;
            //Save the application information
            $deployment->application->last_time_deployed = Carbon::now();
            //Save the deployment
            $deployment->application->save();
            $deployment->save();

            //Emit the event
            event( new DeployFinished( $deployment ) );
            
        });

        $this->deploy->onError( function($deployment, $result){
            
            //Save results on error
            $deployment->result = $result;
            $deployment->status = Deployment::ERROR_DEPLOY; 
            $deployment->save();

            //Emit Error event 
            event( new DeployFinished( $deployment ) );
            
        });

        //Run the deployment
        $this->deploy->run();
    }

}

