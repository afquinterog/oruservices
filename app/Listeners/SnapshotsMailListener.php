<?php

namespace App\Listeners;

use App\Events\SnapshotsCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\SnapshotsCreatedNotification;

class SnapshotsMailListener
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
     * @param  SnapshotsCreated  $event
     * @return void
     */
    public function handle(SnapshotsCreated $event)
    {

        // TODO create profile table and notify users by profile
        //$users = getUsersToNotifySnapshots();
        $users = \App\User::where('email', 'andres@mkitdigital.com')
                            ->get();

        $snapshotsCreatedNotification = new SnapshotsCreatedNotification($event->volumes);

        \Notification::send($users, $snapshotsCreatedNotification );
    }
}
