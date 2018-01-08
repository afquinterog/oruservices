<?php

namespace App\Models\Servers;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Log;
use App\Models\Helpers\Time;
use App\Models\Servers\Notification;
use App\Models\Servers\Category;
use App\Notifications\ServerThresholdReached;
use Carbon\Carbon;
use Illuminate\Foundation\Validation\ValidatesRequests;


class Server extends Model
{

  use ValidatesRequests;
    
  CONST LOW = 50;
	CONST WARNING = 75;
	
  /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
  protected $fillable = ['name','description','host','category_id'];

  /**
	* The attributes that aren't mass assignable.
	*
	* @var array
  */
  protected $guarded = [];

  /**
   * Get the applications
   */
  public function applications()
  {
      return $this->hasMany('App\Models\Servers\Application');
  }

  public function category(){
    return $this->belongsTo('App\Models\Servers\Category');
  }

  /**
   * Get the messages
   */
  public function messages()
  {
      return $this->hasMany('App\Models\Servers\Message');
  }

  /**
   * Get the Thresholds
   */
  public function thresholds()
  {
      return $this->hasMany('App\Models\Servers\Threshold');
  }

  /**
   * Get the Metrics
   */
  public function metrics()
  {
      return $this->hasMany('App\Models\Servers\Metric');
  }


  public function saveServer(array $request)
  {

    $this->validate( request(), [
        'name' => 'required',
        'description' => 'required',
        'host' => 'required',
        'category_id' => 'required'
    ]);

    $server = ( isset($request['id']) ) ? Server::find($request['id']) : new Server;
    $server->fill( $request );
    $server->save();
    return $server;
  }

  /**
  * Get the server information
  * @param int $serverId 
  */
  public function getServer($serverId){
    return Server::find($serverId);
  }

  /**
  * Get the application servers
  */
  public function getServers($filter=""){
		$servers = DB::table('servers')
							->where('name', 'LIKE', '%' . $filter . '%' )
							->orWhere('servers.description', 'LIKE', '%' . $filter . '%' )
              ->orWhere('categories.description', 'LIKE', '%' . $filter . '%' )
              ->join('categories', 'servers.category_id', '=', 'categories.id')
              ->select('servers.*', 
                       'categories.description as category_description', 
                       'categories.color as category_color')
              ->orderBy('name')
							->get();

		foreach($servers as $server){
			$this->getServerLastMetrics( $server );
			$this->getServerThresholdValue($server, 'ip');
			$this->getServerThresholdValue($server, 'connections');
		}
    return $servers;
  }

  /**
  * Get the server categories
  */
  public function getServerCategories($filter=""){
    $category = new Category;
    return $category->get();
  }

  /**
   * Get the Server Metrics
   */
  public function getMetrics($quantity)
  {
    $metrics = $this->metrics()->latest()->take($quantity)->get();
    foreach( $metrics as $metric){
      $metric->created = $metric->created_at->diffForHumans();
    }
    return $metrics;
  }





  public function getServerLastMetrics($server){
		$server->metrics = DB::table('metrics')
               ->select( DB::raw('id, server_id, cpu, memory, memory_cache, disk , connections, ips , DATE_SUB(created_at, INTERVAL 4 HOUR) date'))
               ->where('server_id', '=', $server->id)
               ->orderBy('id', 'DESC')
               ->first();

    if( isset($server->metrics) && isset($server->metrics->date) ) {
        $server->metrics->date2 = Time::timeAgo($server->metrics->date);
    }
    
    if($server->metrics){
    	//Set the server status variables 
      $server->metrics->cpuColor = $this->getVariableColor( $server->metrics->cpu ?: 0 );
      $server->metrics->memoryColor = $this->getVariableColor($server->metrics->memory ?: 0);
      $server->metrics->memoryRealColor = $this->getVariableColor($server->metrics->memory_cache ?: 0);
      $server->metrics->diskColor = $this->getVariableColor($server->metrics->disk ?: 0);	
    }
  }

  /**
   * Get the variable color status
   * @param  int $value the value of the variable
   * @return string  variable color
   */
  public function getVariableColor($value) {
  	$color = "primary";
  	if($value >= Server::LOW && $value <= Server::WARNING ){
  		$color = "warning";
  	}
  	else if($value >= Server::WARNING  ){
  		$color = "danger";
  	}
  	return $color;
  }

  /**
  * Get server thresholds connections to update the gui
  */
  public function getServerThresholdValue( $server, $metric  ){
		$threshold = DB::table('thresholds as s')
             ->select( DB::raw('id, metric, s.limit , message'))
             ->where( [ ['server_id', '=', $server->id], ['metric', '=' , $metric ]  ])
             ->first();

    $server->$metric = "info";
    if( isset($threshold->limit) && isset($server->metrics->$metric)){
        if( $server->metrics->$metric > $threshold->limit ){
          $server->$metric = "danger";
        }   
        else if( $server->metrics->$metric + 50 > $threshold->limit ){
          $server->$metric = "warning";
        }
    }
  }

  /**
  * Review the server thresholds crons 
  * and send notifications.
  */
  public function cron(){

    $servers = $this->getServers();
    $emails = Notification::all();
    
    foreach ($servers as $server){
      //Get the server metrics and thresholds
      $this->getServerThresholds( $server ); 

      $msg = "";

      if( isset($server->warnings) && count($server->warnings) > 0 ){
        // Got the message
        foreach( $server->warnings as $warning){
            $msg[] = $warning ;
        }
        //Store the notification
        //Save notification on messages table
        $this->storeServerNotifications($msg, $server->id);
  
        //Get the users for notification
        foreach( $emails as $item){
          $user = User::where('email', $item->email )->first();
          $user->notify( new ServerThresholdReached( $msg ) );    
        }
        
      }

      //echo $server->name . " / " . implode(",",$msg) . "<br/>"; 
      //Notify users of the issue  
    }
  }


  /**
  * Get server thresholds
  */
  public function getServerThresholds( $server ){
    $server->thresholds = DB::table('thresholds as s')
               ->select( DB::raw('id, metric, s.limit, message'))
               ->where('server_id', '=', $server->id )->get();
    $warnings = [];

    foreach ($server->thresholds as $threshold){  
      $metric = $threshold->metric; 
      if( isset($server->metrics->$metric) ) {
        $value = $server->metrics->$metric;
        if( $value > $threshold->limit ) {
          echo "threshold on " . $server->name . "<br/>";
          $msg = str_replace("SERVER_VALUE", $server->name, $threshold->message);
          $msg = str_replace("ACTUAL_VALUE", $value, $msg);
          $warnings[] = $msg;
        }    
      }
    }
    $server->warnings = $warnings;
  }

  /**
   * Store each server notification on the server history
   * 
   * @param  array $messages The messages to store
   * @return void
   */
  public function storeServerNotifications($messages, $server)
  {
    foreach ($messages as $item) {
      $message = new Message;
      $message->description = $item;
      $message->server_id = $server;
      $message->action = "THRESHOLD";
      return $message->save();
    }
  }

   /**
   * Store each server notification on the server history
   * 
   * @param  array $messages The messages to store
   * @return void
   */
  public function hookServer($request)
  {
    //SAmple call
    //http://localhost:8000/hookServer?server=1&disk=25&mem=822/992|82.86|&cpu=90&con=1&ip=1&memc=50&token=pTX7s2h9FlmVB7lWDmAucUaN2A85NHO9JyZcvL2T
    //    
    $token = isset($request['token']) ?: "";
    if($token == "pTX7s2h9FlmVB7lWDmAucUaN2A85NHO9JyZcvL2T"){
       //Get disk information
      $disk = $this->parseServerDisk($request['disk']);

      //869/992|87.60|
      $mem = $this->parseServerMemory($request['mem']);
      $memTotal = $this->parseServerMemoryTotal($request['mem']);
      $memc = isset($request['memc']) ?: 0 ;
      $memCache = $this->parseServerMemoryCache( $memc, $memTotal);

      $cpu = isset($request['cpu']) ? $request['cpu']: 0;
      $server = isset($request['server']) ? $request['server']: 0 ; 
      $connections = isset($request['con']) ? $request['con']: 0;
      $ip = isset($request['ip']) ? $request['ip']: 0;

      //Save data on metrics
      $actualServer = $this->find($server);
      $metric = new Metric;
      $metric->cpu = $cpu;
      $metric->memory = $mem;
      $metric->memory_cache = $memCache;
      $metric->disk = $disk;
      $metric->connections = $connections; 
      $metric->ips = $ip;

      return $actualServer->metrics()->save($metric);
    }

    return "error";

  }

  /**
   * Parse disk information
   */ 
  public function parseServerDisk($disk){
    $disk = explode("|", $disk);
    $disk[0] = preg_replace('/[^A-Za-z0-9\-]/', '', $disk[0]); 
    return $disk[0];
  }

  /**
   * Parse server memory
   */ 
  public function parseServerMemory($mem){
    $memData = explode("|", $mem);
    return $memData[1];
  }

  /**
   * Parse total server memory
   */ 
  public function parseServerMemoryTotal($mem){
    $memData = explode("|", $mem);
    $memTmp = $memData[0];
    $memTmp = explode("/", $memTmp);
    return  $memTmp[1];
  }

  /**
   * Parse total server memory
   */ 
  public function parseServerMemoryCache($memc, $memTotal){
     //Get memory without cache and buffers
    $memCache = 0;
    if( $memc > 0 && $memTotal >0 ){
      $memCache = $memc * 100 / $memTotal;  
    }
    return $memCache;
  }

  /**
  * Delete old metrics
  */
  public function cronDeleteMetrics(){
    $day = Carbon::now()->subDays(15);
    DB::table('metrics')->where('created_at', '<', $day)->delete();
  }

}


