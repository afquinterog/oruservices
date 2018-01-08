<?php

namespace App\Http\Controllers;


use App\Models\Servers\Application;
use App\Models\Servers\ApplicationNotification;
use App\Models\Servers\Threshold;
use App\Models\Servers\Metric;
use App\Models\Servers\Deployment;


use Illuminate\Http\Request;
use App\Models\Domain\ServerUC;
use Illuminate\Support\Facades\Log;
use App\Jobs\ProcessGithubDeploy;


class ServerController extends Controller
{

    /**
    * The server use cases implementation.
    *
    * @var ServerUC Page use cases handler
    */
    protected $serverUC;
  
    /**
    * Create a new controller instance.
    *
    * @param  ServerUC $serverUC
    * @return void
    */
    public function __construct(ServerUC $serverUC)
    {
      $this->serverUC = $serverUC;
    }


    /**
    * Display the dasboard
    */
    public function dashboard()
    {
        return view('admin');
    }


    /**
    * Display the server list
    */
    public function getServers( $filter="" )
    {
        return $this->serverUC->getServers($filter);
    }

    /**
    * Display the server list
    */
    public function getServer($serverId)
    {
        return $this->serverUC->getServer($serverId);
    }

    /**
    * Get the server categories 
    */
    public function getServerCategories( $filter="" )
    {
        return $this->serverUC->getServerCategories($filter);
    }

    /**
    * Display the applications
    */
    public function getApplications($server)
    {
        return $this->serverUC->getApplications($server);
    }

    /**
    * Get the deploy applications
    */
    public function getApplicationsForDeployment($branch, $repo)
    {
        return $this->serverUC->getApplicationsForDeployment($branch, $repo);
    }

    /**
    * Display the notifications
    */
    public function getNotifications($application){
        return $this->serverUC->getNotifications($application);
    }

    /**
    * Display the thresholds
    */
    public function getThresholds($server){
        return $this->serverUC->getThresholds($server);
    }

    /**
    * Display the metrics
    */
    public function getMetrics($server, $quantity=10){
        return $this->serverUC->getMetrics($server, $quantity);
    }

    /**
    * Display the application's deployments 
    */
    public function getDeployments($application, $initial, $quantity){
        return $this->serverUC->getDeployments($application, $initial, $quantity);
    }

    /**
     * Create/Update a server
     */ 
    public function saveServer(Request $request)
    {
        return $this->serverUC->saveServer($request->all());
    }

    /**
     * Create/Update an application
     */ 
    public function saveApplication(Request $request)
    {
        return $this->serverUC->saveApplication($request->all());
    }

    /**
     * Create/Update a notification
     */
    public function saveServerCategory(Request $request){
        return $this->serverUC->saveServerCategory($request->all());
    }

    /**
    * Create/Update a notification
    */
    public function saveApplicationNotification(Request $request){
        return $this->serverUC->saveApplicationNotification($request->all());
    }

    /**
     * Create/Update a threshold
     */
    public function saveThreshold(Request $request){
        return $this->serverUC->saveThreshold($request->all());
    }

    /**
     * Create/Update a metric
     */
    public function saveMetric(Request $request){
        return $this->serverUC->saveMetric($request->all());
    }

    /**
     * Create/Update a deployment
     */
    public function saveDeployment(Request $request){
        return $this->serverUC->saveDeployment($request->all());
    }

    /**
     * Launch an application deployment
     */
    public function launchDeployment(Request $request){
        return $this->serverUC->launchDeployment($request->all());
    }

    /**
    * Delete an application notification
    */
    public function deleteApplicationNotification(Request $request){
        return $this->serverUC->deleteApplicationNotification($request->all());
    }

    /**
    * Delete a server category
    */
    public function deleteServerCategory(Request $request){
        return $this->serverUC->deleteServerCategory($request->all());
    }

    /**
     * Github weehook
     */
    public function webhook(Request $request){
        $repoData = $request->all();

        $token = $request->input('token', '' );
        if($token == env('DEPLOY_TOKEN') ){
            //Get the repo name
            $repo = $repoData['repository']['html_url'];
            // $sshRepo = $repoData['repository']['ssh_url'];
            //$repo = explode("/", $repo );
            //$repo = end( $repo ) ;
            //Get the branch name
            $branch = explode("/", $repoData['ref']);
            $branch = end( $branch );
            //Get the committer
            $committer = $repoData['head_commit']['committer']['name'] ;


            Log::info( 'Real Branch:' . $branch );
            Log::info( 'Comitter:' . $repoData['head_commit']['committer']['name'] );
            Log::info( 'Repo:' . $repo );
            Log::info('new task dispatched:' . $branch . "/" . $committer . "/" . $repo );

            dispatch( new ProcessGithubDeploy($branch, $committer, $repo) );
        }
    }

    /**
     * Circleci weehook
     */
    public function webhookCircleCi(Request $request){
        
        $token = $request->input('token', '' );
        if($token == env('DEPLOY_TOKEN') ){
            //Get the repo name
            $repo = $request->input('repo', '');
            $branch = $request->input('branch', '');
            $committer = $request->input('committer');

            Log::info( 'Real Branch:' . $branch);
            Log::info( 'Committer:' . $committer );
            Log::info( 'Repo:' . $repo );
            Log::info('new task dispatched circleci:' . $branch . "/" . $committer . "/" . $repo );

            dispatch( new ProcessGithubDeploy($branch, $committer, $repo) );
        }
    }

    /**
     * Cron to check the actual servers
     */
    public function cron(Request $request){
        return $this->serverUC->cron( $request->all() );
    }

    /**
     * Hook to enable server's to send his metrics
     */
    public function hookServer(Request $request){
        return $this->serverUC->hookServer( $request->all() );
    }

    /**
     * Cron to delete old metric information 
     */
    public function cronDeleteMetrics(Request $request){
        return $this->serverUC->cronDeleteMetrics( $request->all() );
    }




}
