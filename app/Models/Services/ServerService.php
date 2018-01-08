<?php

namespace App\Models\Services;

use Illuminate\Database\Eloquent\Model;
use App\Models\Interfaces\ServerRepository;

use App\Models\Servers\Server;
use App\Models\Servers\Application;
use App\Models\Servers\ApplicationNotification;
use App\Models\Servers\Threshold;
use App\Models\Servers\Metric;
use App\Models\Servers\Deployment;
use App\Models\Servers\Category;

use App\Jobs\DeployApp;
use App\Models\Helpers\Time;
use App\Notifications\ApplicationDeployed;


class ServerService implements ServerRepository
{

	protected $server;

	/**
   * Create a new ServerService instance.
   *
   * @return void
   */
  public function __construct()
  {
      $this->server = new Server;
  } 


  /**
	 * Get the servers
	 */
	public function getServers($filter="" ){
		return  $this->server->getServers($filter);
	}

  /**
   * Get the server 
   */
  public function getServer($serverId){
    return  $this->server->getServer($serverId);
  }

  /**
   * Get the servers
   */
  public function getServerCategories($filter="" ){
    return  $this->server->getServerCategories($filter);
  }

  /**
   * Get the applications
   */
  public function getApplications($server){
      $server = Server::find($server);
      $apps = $server->applications()->with('deployments')->get();
      $apps = Application::getComputedProperties($apps);
      return $apps;
  }

  /**
   * Get the applications
   */
  public function getApplicationsForDeployment($branch, $repo){
    return Application::getApplicationsForDeployment($branch, $repo);
  }

  /**
   * Get the notifications
   */
  public function getNotifications($application){
      $application = Application::find($application);
      return $application->notifications;
  }

  /**
   * Get the thresholds
   */
  public function getThresholds($server){
      $server = Server::find($server);
      return $server != null ? $server->thresholds : new Threshold;
  }

  /**
   * Get the metrics
   */
  public function getMetrics($server, $quantity){
      $server = Server::find($server);
      return $server != null ? $server->getMetrics($quantity) : new Metric;
  }

  /**
   * Get the deployment
   */
  public function getDeployments($application, $initial, $quantity){
      $application = Application::find($application);
      $deployments = [];
      if($application != null){
      	$deployments = $application->getDeployments($initial, $quantity);
      }
      foreach($deployments as $deployment){
      	$deployment->updated_at_format = Time::timeAgo($deployment->updated_at);
      }
      return $deployments;
  }

  /**
   * Save a server
   */
  public function saveServer( array $request ){

    $server = new Server;
    return $server->saveServer($request);

    /*$server = ( isset($request['id']) ) ? Server::find($request['id']) : new Server;
    $server->fill( $request );
    $server->save();
    return $server;*/
  }

  /**
   * Save an application
   */
  public function saveApplication( array $request ){
    $application = ( isset($request['id']) ) ? Application::find($request['id']) : new Application;
    $application->fill( $request );
    $application->save();
    return $application;
  }

  /**
   * Save an application notification
   */
  public function saveApplicationNotification(array $request)
  {
    $applicationNotification = new ApplicationNotification;
    return $applicationNotification->saveInstance( $request );
  }

  /**
   * Save a server category
   */
  public function saveServerCategory(array $request)
  {
    $category = new Category;
    return $category->saveInstance( $request );
  }

  /**
   * Delete an application notification
   */
  public function deleteApplicationNotification(array $request)
  {
    $applicationNotification = new ApplicationNotification;
    return $applicationNotification->deleteInstance( $request );
  }

  /**
   * Delete a server category
   */
  public function deleteServerCategory(array $request)
  {
    $instance = new Category;
    return $instance->deleteInstance( $request );
  }

  /**
   * Save an threshold
   */
  public function saveThreshold(array $request)
  {
    $threshold = ( isset($request['id']) ) ? Threshold::find($request['id']) : new Threshold;
    $threshold->fill( $request );
    $threshold->save();
    return $threshold;
  }

  /**
   * Save a metric
   */
  public function saveMetric(array $request)
  {
    $metric = ( isset($request['id']) ) ? Metric::find($request['id']) : new Metric;
    $metric->fill( $request );
    $metric->save();
    return $metric;
  }

  
  /**
   * Launch an application deployment
   */
  public function launchDeployment(array $request)
  {
    $user = \Auth::user();
    $app = Application::find( $request['app'] );
    $appDeployJob = (new DeployApp($app, $user->email ))->onQueue('deployments');
    dispatch( $appDeployJob );
  }  

  /**
   * Save a deployment
   */
  public function saveDeployment(array $request)
  {
    $deployment = ( isset($request['id']) ) ? Deployment::find($request['id']) : new Deployment;
    $deployment->fill( $request );
    $deployment->save();
    return $deployment;
  }

  /**
   * Execute the cron to check all the monitored servers
   */
  public function cron(array $request)
  {
    $server = new Server;
    $server->cron();
  }

  public function hookServer(array $request){
    $server = new Server;
    return $server->hookServer( $request );
  }

  public function cronDeleteMetrics(array $request){
    $server = new Server;
    return $server->cronDeleteMetrics();
  }




  
}