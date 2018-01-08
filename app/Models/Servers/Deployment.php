<?php

namespace App\Models\Servers;

use Illuminate\Database\Eloquent\Model;

class Deployment extends Model
{

  const SUCCESS_DEPLOY = 1;
  const ERROR_DEPLOY = 0;

 /**
  * The attributes that aren't mass assignable.
  *
  * @var array
  */
  protected $guarded = [];


  public function application(){
    return $this->belongsTo('App\Models\Servers\Application');
  }




}






