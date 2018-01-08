<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Artisan;

use App\Models\Servers\Application;
use App\Models\Servers\Deployment;
use Symfony\Component\Console\Output\BufferedOutput;
use Illuminate\Queue\MaxAttemptsExceededException;

class DeployApp implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 1;

    /**
     * The number of seconds the job can run before timing out.
     *
     * @var int
     */
    public $timeout = 300;


    /**
     * The deployment information
     *
     * @var Deployment 
     */
    protected $deployment;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Application $application, $committer)
    {
        //Create the deployment
        $this->createDeployment( $application, $committer );
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        //Get the application being deployed
        $application = $this->deployment->application;

        $exitCode = Artisan::call( $application->deploy_command, [ 
            'deploymentId' => $this->deployment->id,
        ] );

    }

    private function createDeployment(Application $application, $committer){
        $options = [
            'application_id' => $application->id,
            'repo' => $application->repo,
            'branch' => $application->branch,
            'committer' => $committer,
        ];

        $this->deployment = new Deployment();
        $this->deployment->fill($options);
        $this->deployment->save();
    }

    /**
     * The job failed to process.
     *
     * @param  Exception  $exception
     * @return void
     */
    public function failed($exception)
    {
        // Send user notification of failure, etc...
        Log::info( $exception );
    }
}
