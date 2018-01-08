/**
 * Site Services
 *	
 * @param  Object window 
 * @return Object Site services
 */
(function(window){
	'use strict;'

	  function define_services(){

        var ServerServices = {};

        //Get the servers
        ServerServices.getServers = function(options, callBack, errorCallBack ){
        	axios.get('/servers/' + options.filter ).then( (response) => {
   					callBack(response);
   				}, (error) => {
            ServerServices.checkIfUserAuthenticated(error.response);
   			 		errorCallBack(error);
   				});
        };

        //Get the server information
        ServerServices.getServer = function(options, callBack, errorCallBack ){
          axios.get('/server/' + options.id ).then( (response) => {
            callBack(response);
          }, (error) => {
            ServerServices.checkIfUserAuthenticated(error.response);
            errorCallBack(error);
          });
        };

        //Get the server metrics
        ServerServices.getServerMetrics = function(options, callBack, errorCallBack ){
          axios.get('/metrics/' + options.server ).then( (response) => {
            callBack(response);
          }, (error) => {
            errorCallBack(error);
          });
        };

        //Get the server thresholds
        ServerServices.getServerThresholds = function(options, callBack, errorCallBack ){
          axios.get('/thresholds/' + options.server ).then( (response) => {
            callBack(response);
          }, (error) => {
            errorCallBack(error);
          });
        };


        //Get the server categories
        ServerServices.getServerCategories = function(options, callBack, errorCallBack ){
          axios.get('/server/categories' ).then( (response) => {
            callBack(response);
          }, (error) => {
            errorCallBack(error);
          });
        };

        //Get the applications
        ServerServices.getApplications = function(options, callBack, errorCallBack ){
          axios.get('/applications/' + options.server).then( (response) => {
            callBack(response);
          }, (error) => {
            errorCallBack(error);
          });
        };

        //Get the application notifications
        ServerServices.getApplicationNotifications = function(options, callBack, errorCallBack ){
          axios.get('/notifications/' + options.app).then( (response) => {
            callBack(response);
          }, (error) => {
            errorCallBack(error);
          });
        };

        //Get the application deployments
        ServerServices.getDeployments = function(options, callBack, errorCallBack ){
          axios.get('/deployments/' + options.app + '/0/10' ).then( (response) => {
            callBack(response);
          }, (error) => {
            errorCallBack(error);
          });
        };

        //Launch new deployment
        ServerServices.launchDeployment = function(options, callBack, errorCallBack ){
          axios.post(`/launchDeployment/`, { app: options.app, _method:'POST' } ).then( (response) => {
            callBack(response);
          }, (error) => {
            ServerServices.checkIfUserAuthenticated(error.response);
            errorCallBack(error);
          });
        };


        //Update Server
        ServerServices.saveServer = function(options, callBack, errorCallBack ){
          axios.post('/server', options ).then( (response) => {
            callBack(response);
          }, (error) => {
            errorCallBack(error);
          });
        };

        //Update Application
        ServerServices.saveApplication = function(options, callBack, errorCallBack ){
          axios.post('/application', options ).then( (response) => {
            callBack(response);
          }, (error) => {
            errorCallBack(error);
          });
        };

        //Update a server
        ServerServices.updateServer = function(options, callBack, errorCallBack ){
        	var serverId = options.serverId;
        	axios.post(`/server/${siteId}`, { server: options.server, _method:'PUT' } ).then( (response) => {
   					callBack(response);
   				}, (error) => {
   			 		errorCallBack(error);
   				});
        };

        //Update Application Notification
        ServerServices.saveApplicationNotification = function(options, callBack, errorCallBack ){
          axios.post('/applicationNotification', options ).then( (response) => {
            callBack(response);
          }, (error) => {
            errorCallBack(error);
          });
        };

        //Delete Application Notification
        ServerServices.deleteApplicationNotification = function(options, callBack, errorCallBack ){
          axios.post('/applicationNotification', { id: options.id ,  _method:'DELETE' } ).then( (response) => {
            callBack(response);
          }, (error) => {
            errorCallBack(error);
          });
        };

        //Update server category
        ServerServices.saveServerCategory = function(options, callBack, errorCallBack ){
          axios.post('/server/category', options ).then( (response) => {
            callBack(response);
          }, (error) => {
            ServerServices.checkIfUserAuthenticated(error.response);
            errorCallBack(error);
          });
        };

        //Delete Application Notification
        ServerServices.deleteServerCategory = function(options, callBack, errorCallBack ){
          axios.post('/server/category', { id: options.id ,  _method:'DELETE' } ).then( (response) => {
            callBack(response);
          }, (error) => {
            errorCallBack(error);
          });
        };

        ServerServices.checkIfUserAuthenticated = function(response){
          if( response.status == 401){
            window.location.href = '/login';
            return ;
          }
        };

        return ServerServices;
    }
    //define globally if it doesn't already exist
    if( typeof(ServerServices) === 'undefined'){
        window.ServerServices = define_services();
    }
    else{
        console.log("Library already defined.");
    }

})(window);

//Usage
	// ServerServices.getServers({},function(response){
	// 	console.log('response from service');
	// 	console.log( response );
	// }, function(error){
	// 	console.log('error in service');
	// 	console.log( error );
	// });