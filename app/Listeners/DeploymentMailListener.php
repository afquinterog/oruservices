<?php

namespace App\Listeners;

use App\Events\DeployFinished;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

use Illuminate\Support\Facades\Log;

use App\Notifications\ApplicationDeployed;

class DeploymentMailListener implements ShouldQueue
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
        Log::info('Deploy successful event mail ' . $event->deployment->repo );

        //Notify the interested users of the deployment by mail 
        $users = $event->deployment->application->notifications;

        $applicationDeployedNotification = new ApplicationDeployed($event->deployment);

        \Notification::send($users, $applicationDeployedNotification );
    }

    /**
     * Handle a job failure.
     *
     * @param  \App\Events\DeploySuccessful  $event
     * @param  \Exception  $exception
     * @return void
     */
    public function failed(DeployFinished $event, $exception)
    {
        Log::error('Deploy successful event mail error ' . 
                    $event->deployment->repo . " " . 
                    $exception );
    }
}











