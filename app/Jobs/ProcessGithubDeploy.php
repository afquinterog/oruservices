<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Log;

use App\Models\Services\ServerService;

class ProcessGithubDeploy implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 7;

    /**
     * The number of seconds the job can run before timing out.
     *
     * @var int
     */
    public $timeout = 200;


    protected $branch;
    protected $committer;
    protected $repo;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($branch, $committer, $repo)
    {
        $this->branch = $branch;
        $this->committer = $committer;
        $this->repo = $repo;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(ServerService $serverService)
    {
        Log::info( 'Starting github deploy process ...' );

        Log::info( 'Repo : ' . $this->repo );
        Log::info( 'Branch : ' . $this->branch );
        Log::info( 'Committer : ' . $this->committer );

        Log::info( 'Applications' );
        //Search applications with branch and repo
        $applications = $serverService->getApplicationsForDeployment( $this->branch, $this->repo);
        foreach ($applications as $app){
            if( $app->automatic_deploy ){
                $appDeployJob = (new DeployApp($app, $this->committer))->onQueue('deployments');
                dispatch( $appDeployJob );
            }
            else{
                $app->new_versions = $app->new_versions + 1;
                $app->save();
            }
            
        }  

        Log::info( 'Finish github deploy process ...' );
    }


    /**
     * The job failed to process.
     *
     * @param  Exception  $exception
     * @return void
     */
    public function failed(Exception $exception)
    {
        // Send user notification of failure, etc...
        Log::error( 'Error github deploy process ...'  . $exception);
    }
}
