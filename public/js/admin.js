/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 112);
/******/ })
/************************************************************************/
/******/ ({

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(20);
__webpack_require__(22);
__webpack_require__(21);
module.exports = __webpack_require__(23);


/***/ }),

/***/ 20:
/***/ (function(module, exports) {

/**
 * Lang component
 * @param  Env window 
 * @return object
 */
(function (window) {

    'use strict';

    function define_lang() {

        var AppMessages = {

            //Generic buttons
            'save': 'Save',
            'cancel': 'Cancel',
            'no_data': 'No data Found',

            //Toolbar generic actions
            'toolbar_new': 'New',
            'toolbar_refresh': 'Refresh',
            'toolbar_delete': 'Delete',
            'toolbar_edit': 'Edit',

            //Generic messages
            'site_get_err': 'Opps, there is a problem with this request. Please try again!',
            'data_saved': 'The data has been saved!',
            'data_deleted': 'The data has been deleted!',

            //Sites list
            'message': 'This is a sample message',

            //Server list
            'server_list_title': 'Server List',
            'server_list_search_placeholder': 'Search ...',
            'server_list_table_title': 'Server',
            'server_list_table_last_update': 'Last update',
            'server_list_table_disk': 'Disk',
            'server_list_table_memory': 'Memory',
            'server_list_table_cpu': 'Cpu',
            'server_list_table_actions': 'Actions',
            'server_list_table_view_deployments': 'View deployments',
            'server_list_table_deploy_application': 'Deploy application',
            'server_list_table_edit_application': 'Edit',
            'server_list_table_view_notifications': 'Notifications',

            //Server view
            'server_view_title': 'Server Details',

            //Application list

            'app_list_title': 'Applications',
            //Application toolbar actions

            'app_list_table_name': 'Name',
            'app_list_table_branch': 'Branch',
            'app_list_table_last_deployment': 'Last Deploy',
            'app_list_table_actions': 'Actions',
            'app_list_changes_to_deploy': 'Changes to deploy',

            'app_deploy_started': 'Application deployment started.',

            //Deployment list
            'app_list_deployments_title': 'Deployments',
            'deployment_list_table_branch': 'Branch',
            'deployment_list_table_status': 'Status',
            'deployment_list_table_updated': 'Date',

            'deployment_list_table_actions': 'Actions',
            'deployment_list_view_results_title': 'Deployment results',

            //Metrics            
            'app_list_metrics_title': 'Server metrics',
            'metrics_list_table_cpu': 'Cpu',
            'metrics_list_table_disk': 'Disk',
            'metrics_list_table_memory': 'Memory',
            'metrics_list_table_date': 'Date',

            // Thresholds
            'app_list_thresholds_title': 'Server Thresholds',
            'thresholds_list_table_metric': 'Metric',
            'thresholds_list_table_limit': 'Limit',

            //Edit application
            'app_edit_title': 'Edit Application',

            //Application Notifications
            'notification_list_title': 'Application Deployment Notifications',

            //Server Categories
            'categories_list_title': 'Server Categories',
            'categories_list_delete_tooltip': 'Delete the category'

        };

        return AppMessages;
    }
    //define globally if it doesn't already exist
    if (typeof AppMessages === 'undefined') {
        window.AppMessages = define_lang();
    } else {
        console.log("Library already defined.");
    }
})(window);

//Usage
// AppMessages.site_saved

/***/ }),

/***/ 21:
/***/ (function(module, exports) {

/**
 * Site Services
 *	
 * @param  Object window 
 * @return Object Site services
 */
(function (window) {
  'use strict;';

  function define_services() {

    var ServerServices = {};

    //Get the servers
    ServerServices.getServers = function (options, callBack, errorCallBack) {
      axios.get('/servers/' + options.filter).then(function (response) {
        callBack(response);
      }, function (error) {
        ServerServices.checkIfUserAuthenticated(error.response);
        errorCallBack(error);
      });
    };

    //Get the server information
    ServerServices.getServer = function (options, callBack, errorCallBack) {
      axios.get('/server/' + options.id).then(function (response) {
        callBack(response);
      }, function (error) {
        ServerServices.checkIfUserAuthenticated(error.response);
        errorCallBack(error);
      });
    };

    //Get the server metrics
    ServerServices.getServerMetrics = function (options, callBack, errorCallBack) {
      axios.get('/metrics/' + options.server).then(function (response) {
        callBack(response);
      }, function (error) {
        errorCallBack(error);
      });
    };

    //Get the server thresholds
    ServerServices.getServerThresholds = function (options, callBack, errorCallBack) {
      axios.get('/thresholds/' + options.server).then(function (response) {
        callBack(response);
      }, function (error) {
        errorCallBack(error);
      });
    };

    //Get the server categories
    ServerServices.getServerCategories = function (options, callBack, errorCallBack) {
      axios.get('/server/categories').then(function (response) {
        callBack(response);
      }, function (error) {
        errorCallBack(error);
      });
    };

    //Get the applications
    ServerServices.getApplications = function (options, callBack, errorCallBack) {
      axios.get('/applications/' + options.server).then(function (response) {
        callBack(response);
      }, function (error) {
        errorCallBack(error);
      });
    };

    //Get the application notifications
    ServerServices.getApplicationNotifications = function (options, callBack, errorCallBack) {
      axios.get('/notifications/' + options.app).then(function (response) {
        callBack(response);
      }, function (error) {
        errorCallBack(error);
      });
    };

    //Get the application deployments
    ServerServices.getDeployments = function (options, callBack, errorCallBack) {
      axios.get('/deployments/' + options.app + '/0/10').then(function (response) {
        callBack(response);
      }, function (error) {
        errorCallBack(error);
      });
    };

    //Launch new deployment
    ServerServices.launchDeployment = function (options, callBack, errorCallBack) {
      axios.post('/launchDeployment/', { app: options.app, _method: 'POST' }).then(function (response) {
        callBack(response);
      }, function (error) {
        ServerServices.checkIfUserAuthenticated(error.response);
        errorCallBack(error);
      });
    };

    //Update Server
    ServerServices.saveServer = function (options, callBack, errorCallBack) {
      axios.post('/server', options).then(function (response) {
        callBack(response);
      }, function (error) {
        errorCallBack(error);
      });
    };

    //Update Application
    ServerServices.saveApplication = function (options, callBack, errorCallBack) {
      axios.post('/application', options).then(function (response) {
        callBack(response);
      }, function (error) {
        errorCallBack(error);
      });
    };

    //Update a server
    ServerServices.updateServer = function (options, callBack, errorCallBack) {
      var serverId = options.serverId;
      axios.post('/server/' + siteId, { server: options.server, _method: 'PUT' }).then(function (response) {
        callBack(response);
      }, function (error) {
        errorCallBack(error);
      });
    };

    //Update Application Notification
    ServerServices.saveApplicationNotification = function (options, callBack, errorCallBack) {
      axios.post('/applicationNotification', options).then(function (response) {
        callBack(response);
      }, function (error) {
        errorCallBack(error);
      });
    };

    //Delete Application Notification
    ServerServices.deleteApplicationNotification = function (options, callBack, errorCallBack) {
      axios.post('/applicationNotification', { id: options.id, _method: 'DELETE' }).then(function (response) {
        callBack(response);
      }, function (error) {
        errorCallBack(error);
      });
    };

    //Update server category
    ServerServices.saveServerCategory = function (options, callBack, errorCallBack) {
      axios.post('/server/category', options).then(function (response) {
        callBack(response);
      }, function (error) {
        ServerServices.checkIfUserAuthenticated(error.response);
        errorCallBack(error);
      });
    };

    //Delete Application Notification
    ServerServices.deleteServerCategory = function (options, callBack, errorCallBack) {
      axios.post('/server/category', { id: options.id, _method: 'DELETE' }).then(function (response) {
        callBack(response);
      }, function (error) {
        errorCallBack(error);
      });
    };

    ServerServices.checkIfUserAuthenticated = function (response) {
      if (response.status == 401) {
        window.location.href = '/login';
        return;
      }
    };

    return ServerServices;
  }
  //define globally if it doesn't already exist
  if (typeof ServerServices === 'undefined') {
    window.ServerServices = define_services();
  } else {
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

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

/**
 * Notifications Library
 * @param  Env window 
 * @return object
 */
(function (window) {

    'use strict';

    function define_library() {
        var Notifications = {};
        var name = "notifications";

        Notifications.show = function (options) {

            //status: info, success, error, warning
            toastr[options.status](options.message || '', options.title || '', { timeout: options.timeout || 5000 });
            //toastr.info( options.message || '' , );

            //toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!')
            // Display a success toast, with a title
            //toastr.success('Have fun storming the castle!', 'Miracle Max Says');
            // Display an error toast, with a title
            //toastr.error('I do not think that word means what you think it means.', 'Inconceivable!');
            // Immediately remove current toasts without using animation
            //toastr.remove();
            // Remove current toasts using animation
            //toastr.clear();
            // Override global options
            //toastr.success('We do have the Kapua suite available.', 'Turtle Bay Resort', {timeOut: 5000});

            //    UIkit.notify({
            //   	message: options.message ? options.message : '',
            //   	status: options.status ? options.status : 'info', //info, success, warning, danger
            //   	timeout: options.timeout ? options.timeout : 5000,
            //   	group:  null,
            //   	pos:  options.pos ? options.pos : 'top-right',

            //   	onClose: function(){
            //   		if( options.callback ){
            //   			options.callback();
            //   		}
            //   		clearTimeout(thisNotify.timeout);
            //   	}
            // });
        };

        return Notifications;
    }
    //define globally if it doesn't already exist
    if (typeof Notifications === 'undefined') {
        window.Notifications = define_library();
    } else {
        console.log("Library already defined.");
    }
})(window);

//Usage
// Notifications.show({
//   'message': 'Sample Message 2',
//   'callback' : function(){ alert('this is a function callback');}
// });

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });