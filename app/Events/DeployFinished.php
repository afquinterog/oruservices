<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

use Illuminate\Support\Facades\Log;

use App\Models\Servers\Deployment;

class DeployFinished
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $deployment;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct( Deployment $deployment )
    { 
        $this->deployment = $deployment;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-deployments');
    }
}
