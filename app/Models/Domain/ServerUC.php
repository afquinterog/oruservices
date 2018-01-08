<?php

namespace App\Models\Domain;

use App\Models\Interfaces\ServerRepository;

class ServerUC{

	 /**
   * The server repository implementation.
   *
   * @var ServerRepository
   */
  protected $serverRepository;
  

  /**
   * Create a new ServerUC instance.
   *
   * @param  ServerRepository $serverRepository
   * @return void
   */
  public function __construct(ServerRepository $serverRepository)
  {
      $this->serverRepository = $serverRepository;
  } 

  /**
   * Get the servers
   * 
   * @param string $filter 
   * 
   * @return array 
   */ 
  public function getServers( $filter="" )
  {
    return $this->serverRepository->getServers($filter);
  }

  /**
   * Get the server
   * 
   * @param int $id 
   * 
   * @return array 
   */ 
  public function getServer($serverId)
  {
    return $this->serverRepository->getServer($serverId);
  }

  /**
   * Get the server categories
   * 
   * @param string $filter 
   * 
   * @return array 
   */ 
  public function getServerCategories( $filter="" )
  {
    return $this->serverRepository->getServerCategories($filter);
  }

  /**
   * Get the applications
   * 
   * @param int $server 
   * 
   * @return array 
   */ 
  public function getApplications($server)
  {
    return $this->serverRepository->getApplications($server);
  }

  /**
   * Get applications for deployment
   * 
   * @param string $branch
   * @param string $repo  
   * 
   * @return array 
   */ 
  public function getApplicationsForDeployment($branch, $repo)
  {
    return $this->serverRepository->getApplicationsForDeployment($branch, $repo);
  }

  
  /**
   * Get the notifications
   * 
   * @param  $application 
   * 
   * @return array 
   */ 
  public function getNotifications($application)
  {
    return $this->serverRepository->getNotifications($application);
  }

  /**
   * Get the thresholds
   * 
   * @param  $server 
   * 
   * @return array 
   */ 
  public function getThresholds($server)
  {
    return $this->serverRepository->getThresholds($server);
  }

  /**
   * Get the metrics
   * 
   * @param  $server 
   * @param  $quantity 
   * 
   * @return array 
   */ 
  public function getMetrics($server, $quantity){
    return $this->serverRepository->getMetrics($server, $quantity);
  }

  /**
   * Get the deployments
   * 
   * @param $application 
   * @param initial
   * @param $quantity 
   * 
   * @return array 
   */ 
  public function getDeployments($application, $initial, $quantity){
    return $this->serverRepository->getDeployments($application, $initial, $quantity);
  }


  /**
   * Save a server
   * 
   * @param array request 
   * 
   * @return array 
   */ 
  public function saveServer(array $request){
    return $this->serverRepository->saveServer($request);    
  }

  /**
   * Save an application
   * 
   * @param array request 
   * 
   * @return array 
   */ 
  public function saveApplication(array $request){
    return $this->serverRepository->saveApplication($request);    
  }

  /**
   * Save an application notification
   * 
   * @param array request 
   * 
   * @return array 
   */ 
  public function saveApplicationNotification(array $request){
    return $this->serverRepository->saveApplicationNotification($request);    
  }

  /**
   * Save a server category
   * 
   * @param array request 
   * 
   * @return array 
   */ 
  public function saveServerCategory(array $request){
    return $this->serverRepository->saveServerCategory($request);    
  }

  /**
   * Delete an application notification
   * 
   * @param array request 
   * 
   * @return array 
   */ 
  public function deleteApplicationNotification(array $request){
    return $this->serverRepository->deleteApplicationNotification($request);    
  }

  /**
   * Delete a server category
   * 
   * @param array request 
   * 
   * @return array 
   */ 
  public function deleteServerCategory(array $request){
    return $this->serverRepository->deleteServerCategory($request);    
  }

  /**
   * Save a threshold
   * 
   * @param array request 
   * 
   * @return array 
   */ 
  public function saveThreshold(array $request){
    return $this->serverRepository->saveThreshold($request);    
  }

  /**
   * Save a metric
   * 
   * @param array request 
   * 
   * @return array 
   */ 
  public function saveMetric(array $request){
    return $this->serverRepository->saveMetric($request);    
  }

  /**
   * Save a deployment
   * 
   * @param array request 
   * 
   * @return array 
   */ 
  public function saveDeployment(array $request){
    return $this->serverRepository->saveDeployment($request);    
  }

  /**
   * Launch a manual deployment
   * 
   * @param array request 
   * 
   * @return array 
   */ 
  public function launchDeployment(array $request){
    return $this->serverRepository->launchDeployment($request);    
  }

  /**
   * Call the server cron
   * 
   * @param array request 
   * 
   * @return array 
   */ 
  public function cron(array $request){
    return $this->serverRepository->cron($request);    
  }

   /**
   * Hook to enable server's to send metrics
   * 
   * @param array request 
   * 
   * @return array 
   */ 
  public function hookServer(array $request){
    return $this->serverRepository->hookServer($request);    
  }

  /**
   * Call the action to delete old metrics on the server
   * 
   * @param array request 
   * 
   * @return array 
   */ 
  public function cronDeleteMetrics(array $request){
    return $this->serverRepository->cronDeleteMetrics($request);    
  }

}