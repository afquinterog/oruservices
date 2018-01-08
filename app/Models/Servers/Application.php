<?php

namespace App\Models\Servers;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class Application extends Model
{

  /**
  * The attributes that aren't mass assignable.
  *
  * @var array
  */
  protected $guarded = [];
   
  /**
   * Get the deployments for the application
   */
  public function deployments()
  {
    return $this->hasMany('App\Models\Servers\Deployment');
  }

  /**
   * Get the application server
   */
  public function server()
  {
    return $this->belongsTo('App\Models\Servers\Server');
  }



  public function getLastDeployedTime(){
    if( $this->last_time_deployed != "" ){
      return Carbon::createFromTimeStamp( strtotime($this->last_time_deployed))->diffForHumans();  
    }
    return "";
  }


   /**
   * Get the notifications for the application
   */
  public function notifications()
  {
      return $this->hasMany('App\Models\Servers\ApplicationNotification');
  }

  /**
   * Get the deployments for the application
   */
  public function getDeployments($initial, $quantity)
  {
      return $this->deployments()->latest()->skip($initial)->take($quantity)->get();
  }

  /**
   * Get the computed properties for the model
   */
  public static function getComputedProperties($apps){
    foreach($apps as $app){
      $app->last_time_deployed_format = $app->getLastDeployedTime();
    }
    return $apps;
  }
  

  public static function getApplicationsForDeployment($branch, $repo)
  {
    $applications = Application::where('branch' , $branch )
                               ->where( function ($query) use ($repo){
                                  $query->where('repo', '=',  $repo  )
                                        ->orWhere('repo_secure', '=',   $repo );
                                  })
                                ->get();
    Log::info( $applications );
    return $applications;
  }

  public static function saveApplication(array $request)
  {
    $application = ( isset($request['id']) ) ? Application::find($request['id']) : new Application;
    $application->fill( $request );
    $application->save();
    return $application;
  }


  /**
   * Update application with deployment results
   */
  public static function updateDeploymentResult($deployment){
    
    $application = $deployment->application;
    $application->last_time_deployed = Carbon::now();
    $application->new_versions = 0;
    $application->save();

  }

}
