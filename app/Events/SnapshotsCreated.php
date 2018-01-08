<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class SnapshotsCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Array containing the volumes that were backed up
     */
    public $volumes;

    /**
     * Create a new event instance.
     * @param $volumes The volumes backed up
     *
     * @return void
     */
    public function __construct( array $volumes )
    {
        $this->volumes = $volumes;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
