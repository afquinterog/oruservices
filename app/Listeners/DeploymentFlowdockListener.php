<?php

namespace App\Listeners;

use App\Events\DeployFinished;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use Illuminate\Support\Facades\Log;
use App\Models\Servers\Deployment;

class DeploymentFlowdockListener implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  DeploySuccessful  $event
     * @return void
     */
    public function handle(DeployFinished $event)
    {
        Log::info('Deploy successful event flowdock message ' . $event->deployment->repo );

        $notificationsEnabled = env('FLOWDOCK_NOTIFICATIONS', 0);

        if( ! $notificationsEnabled ){
            return ;
        }

        //Get data for the message
        $app = $event->deployment->repo;
        $branch = $event->deployment->branch;
        $committer = $event->deployment->committer;

        //Create the message
        if( $event->deployment->status == Deployment::SUCCESS_DEPLOY){
            $message = "**New deployment**
                    It seems $committer deployed some new cool features here `$app:$branch` Awesome :+1:";
        }
        else{
            $message = "**Error on deployment**
                    Oops, Houston .... we had a problem when deploying `$app:$branch` ";
        }
        
       

        //Sent the message to flowdock
        \Flim\PHPFlow\PHPFlow::pushToChat( env('FLOWDOCK_TOKEN') , $message, "ServerBot");
    }
}
