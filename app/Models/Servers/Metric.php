<?php

namespace App\Models\Servers;

use Illuminate\Database\Eloquent\Model;

class Metric extends Model
{
 /**
  * The attributes that aren't mass assignable.
  *
  * @var array
  */
  protected $guarded = [];

  public static function saveMetric(array $request)
  {
    $metric = ( isset($request['id']) ) ? Metric::find($request['id']) : new Metric;
    $metric->fill( $request );
    $metric->save();
    return $metric;
  }
}
