<?php

namespace App\Contracts;

/**
 * Represent a generic deploy
 */ 
interface Snapshot
{
	
	/**
  * Execute the deploy
  *
  * @return boolean true if the snapshot was created
  */
  public function run();


  /**
  * Set debug mode
  *
  * @param boolean $debugMode true to enable debug mode
  * @return void
  */
  public function setDebugMode();



  /**
  * Callback to call when the deployment is success
  *
  * @return void
  */
  //public function onSuccess($callback);

  /**
  * Callback to call when the deployment couldn't finish 
  *
  * @return void
  */
  //public function onError($callback);

}