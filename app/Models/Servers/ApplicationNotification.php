<?php

namespace App\Models\Servers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

use Illuminate\Foundation\Validation\ValidatesRequests;

class ApplicationNotification extends Model
{

  use Notifiable, ValidatesRequests;

  /**
  * The attributes that aren't mass assignable.
  *
  * @var array
  */
  protected $guarded = [];


  /**
  * Get the applicationsNotifications
  */
  public function applications()
  {
      return $this->belongsTo('App\Models\Servers\Application');
  }

  

  public function saveInstance(array $request)
  {

    $this->validate( request(), [
        'email' => 'required|email'
    ]);


  	$applicationNotification = ( isset($request['id']) ) ? ApplicationNotification::find($request['id']) : new ApplicationNotification;
    $applicationNotification->fill( $request );
    $applicationNotification->save();
    return $applicationNotification;
  }

  public function deleteInstance(array $request){
    $applicationNotification = ( isset($request['id']) ) ? ApplicationNotification::find($request['id']) : new ApplicationNotification;
    $applicationNotification->delete();
    return $applicationNotification;
  }
}
