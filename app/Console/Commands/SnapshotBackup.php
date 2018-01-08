<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Servers\Volume;

use App\Contracts\Snapshot;
use App\Events\SnapshotsCreated;

class SnapshotBackup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:snapshots';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate snapshots backups according to the defined rules';

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
        //Get the volumes information
        $volumes = Volume::whereNotNull('code')
                           ->orderBy('profile', 'asc')
                           ->get();

        $createdSnapshots = [];
        
        foreach($volumes as $volume){

            //Create the snapshot associated to the provider
            $snapshot = new $volume->snapshotType($volume);

            //Set the debug mode status
            //$snapshot->setDebugMode(true);

            //Create the snapshot with the specific provider
            $snapshotCreated = $snapshot->run();

            if( $snapshotCreated ){
                $createdSnapshots[] = $volume;
            }
        }


        //Launch Event with generated Snapshots
        event( new SnapshotsCreated( $createdSnapshots ) );
        
    }
}





