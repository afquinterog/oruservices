<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => 'auth'], function () {


    Route::get('/', 'ServerController@dashboard');



    /*************************
    Get models
    /************************/
    Route::get('/server/categories', 'ServerController@getServerCategories') ;
    Route::get('/server/{serverId}', 'ServerController@getServer');
    Route::get('/servers/{filter?}', 'ServerController@getServers');

    Route::get('/applications/{server}', 'ServerController@getApplications');
    Route::get('/notifications/{app}/', 'ServerController@getNotifications'); 
    Route::get('/thresholds/{server}/', 'ServerController@getThresholds'); 
    Route::get('/metrics/{server}/{quantity?}', 'ServerController@getMetrics'); 
    Route::get('/deployments/{app}/{initial}/{quantity}', 'ServerController@getDeployments'); 
    Route::get('/applications/{branch}/{repo}', 'ServerController@getApplicationsForDeployment');

    /*************************
    Save models
    /************************/
    Route::post('/server', 'ServerController@saveServer');
    Route::post('/application', 'ServerController@saveApplication');
    Route::post('/applicationNotification', 'ServerController@saveApplicationNotification');
    Route::post('/threshold', 'ServerController@saveThreshold');
    Route::post('/metric', 'ServerController@saveMetric');
    Route::post('/deployment', 'ServerController@saveDeployment');
    Route::post('/launchDeployment', 'ServerController@launchDeployment');
    Route::post('/server/category', 'ServerController@saveServerCategory');

    //Delete models
    Route::delete('/applicationNotification', 'ServerController@deleteApplicationNotification');
    Route::delete('/server/category', 'ServerController@deleteServerCategory');


});




// Github webhook for autodeployment
Route::post('/webhook', 'ServerController@webhook');
// Github webhook for autodeployment using CircleCI
Route::get('/webhookCircleCi', 'ServerController@webhookCircleCi');
// Check servers thresholds and send notifications
Route::get('/cron', 'ServerController@cron');
//Get metrics from server
Route::get('/hookServer', 'ServerController@hookServer');
//Delete old metrics 
Route::get('/cronDeleteMetrics', 'ServerController@cronDeleteMetrics');

//



Auth::routes();


use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
Route::get('/testSsh', function(){

    // Change the actual path to be the main path and get the envoy file
    chdir( base_path() );

    $task = 'list-files';
    $route ='sample';
    $server = 'MkitNginxStaticServer';

    $process = new Process(  " envoy run ". $task . " --route=$route --server=$server --pretend");
    $process->run();


    if (!$process->isSuccessful()) {
        //Log::info( $process->getErrorOutput() );
        print_r( $process->getErrorOutput() );
    }

    Log::info( $process->getOutput() );
    print_r( $process->getOutput() );
    echo "..";
    //return $process->getOutput();
    return "hi";
});


use Illuminate\Support\Facades\DB;
Route::get('/performance', function(){

    $data = DB::table('metrics')
               ->select( DB::raw('id, server_id, cpu, memory, memory_cache, disk , connections, ips , DATE_SUB(created_at, INTERVAL 4 HOUR) date'))
               ->where('server_id', '=', 20)
               ->orderBy('id', 'desc')
               ->limit(2)->get();
               //->take(1)->get();
    print_R($data);


    // $fields = "'id, server_id, cpu, memory, memory_cache, disk , connections, ips , DATE_SUB(created_at, INTERVAL 4 HOUR)'";
    // $data2 = DB::select('select ? from metrics where server_id = ? order by id DESC LIMIT 1', [ $fields, 5]);

    // print_R($data2);
    // 
    // $data2 = DB::select('select count(*) from metrics ', [ ]);
    // print_r($data2);

    //return $data;
});

Route::get('/flowdock', function(){
    $client = new GuzzleHttp\Client();
    // https://api.flowdock.com/sources?flow_token=deadc0de
    // /flows/:organization/:flow/messages
    // $res = $client->get('https://api.github.com/user', ['auth' =>  ['user', 'pass']]);
    // echo $res->getStatusCode(); // 200
    // echo $res- >getBody();
    // 
    // \Flim\PHPFlow\PHPFlow::streamFlow('47da57dd4e51fdfe9392cc284eb9bbb1', 'zeroplatform', 'main', function($ch,$data){
    //         Log:info('data'=$data);
    //      });

    $message = "The application APP:master has been deployed by COMMITER";

    \Flim\PHPFlow\PHPFlow::pushToChat( env('FLOWDOCK_TOKEN') , $message, "ServerBot");


    ///flows/:organization/:flow/messages
    // $response = $client->request('POST', 'https://api.flowdock.com/v1/flows/zeroplatform/main/This is a sample messae', [
    // 'form_params' => [
    //     'flow_token' => '47da57dd4e51fdfe9392cc284eb9bbb1'
    // ]
    //]);

});


