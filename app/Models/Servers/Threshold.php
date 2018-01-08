<?php

namespace App\Models\Servers;

use Illuminate\Database\Eloquent\Model;

class Threshold extends Model
{
 /**
  * The attributes that aren't mass assignable.
  *
  * @var array
  */
  protected $guarded = [];

  public static function saveThreshold(array $request)
  {
    $threshold = ( isset($request['id']) ) ? Threshold::find($request['id']) : new Threshold;
    $threshold->fill( $request );
    $threshold->save();
    return $threshold;
  }
    
}
