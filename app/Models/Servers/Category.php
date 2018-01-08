<?php

namespace App\Models\Servers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Validation\ValidatesRequests;

class Category extends Model
{

	use ValidatesRequests;

	/**
  * The attributes that aren't mass assignable.
  *
  * @var array
  */
  protected $guarded = [];


  public function get(){
  	return $this->all();
  }

  public function saveInstance(array $request)
  {

    $this->validate( request(), [
        'description' => 'required'
    ]);


  	$instance = ( isset($request['id']) ) ? Category::find($request['id']) : new Category;
    $instance->fill( $request );
    $instance->save();
    return $instance;
  }

  public function deleteInstance(array $request){
    $instance = ( isset($request['id']) ) ? Category::find($request['id']) : new Category;
    $instance->delete();
    return $instance;
  }
}
