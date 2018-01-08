<?php

namespace App\Contracts;

/**
 * Represent a generic deploy
 */ 
interface Deploy
{
	
	/**
  * Execute the deploy
  *
  * @return void
  */
  public function run();

  /**
  * Callback to call when the deployment is success
  *
  * @return void
  */
  public function onSuccess($callback);

  /**
  * Callback to call when the deployment couldn't finish 
  *
  * @return void
  */
  public function onError($callback);

}