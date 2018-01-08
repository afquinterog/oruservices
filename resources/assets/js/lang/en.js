/**
 * Lang component
 * @param  Env window 
 * @return object
 */
(function(window){

    'use strict';

    function define_lang(){

        var AppMessages = {

            //Generic buttons
            'save' : 'Save',
            'cancel': 'Cancel',
            'no_data': 'No data Found',

            //Toolbar generic actions
            'toolbar_new' : 'New',  
            'toolbar_refresh' : 'Refresh',  
            'toolbar_delete' : 'Delete',  
            'toolbar_edit' : 'Edit',  

            //Generic messages
            'site_get_err' : 'Opps, there is a problem with this request. Please try again!',
            'data_saved' : 'The data has been saved!',
            'data_deleted' : 'The data has been deleted!',


            //Sites list
            'message' : 'This is a sample message',

            //Server list
            'server_list_title' : 'Server List',
            'server_list_search_placeholder': 'Search ...',
            'server_list_table_title' : 'Server',
            'server_list_table_last_update' : 'Last update',
            'server_list_table_disk' : 'Disk',
            'server_list_table_memory' : 'Memory',
            'server_list_table_cpu' : 'Cpu',
            'server_list_table_actions' : 'Actions',
            'server_list_table_view_deployments' : 'View deployments',
            'server_list_table_deploy_application' : 'Deploy application',
            'server_list_table_edit_application' : 'Edit',
            'server_list_table_view_notifications' : 'Notifications',
            



            //Server view
            'server_view_title': 'Server Details',


            //Application list
            
            'app_list_title' : 'Applications',
            //Application toolbar actions
            
            'app_list_table_name' : 'Name',
            'app_list_table_branch' : 'Branch',
            'app_list_table_last_deployment': 'Last Deploy',
            'app_list_table_actions' : 'Actions',
            'app_list_changes_to_deploy' : 'Changes to deploy',

            'app_deploy_started' : 'Application deployment started.',


            //Deployment list
            'app_list_deployments_title' : 'Deployments',
            'deployment_list_table_branch' : 'Branch',
            'deployment_list_table_status' : 'Status',
            'deployment_list_table_updated' : 'Date',
            
            'deployment_list_table_actions' : 'Actions',
            'deployment_list_view_results_title' : 'Deployment results',


            //Metrics            
            'app_list_metrics_title' : 'Server metrics',
            'metrics_list_table_cpu' : 'Cpu',
            'metrics_list_table_disk' : 'Disk',
            'metrics_list_table_memory' : 'Memory',
            'metrics_list_table_date' : 'Date',


            // Thresholds
            'app_list_thresholds_title' : 'Server Thresholds',
            'thresholds_list_table_metric' : 'Metric',
            'thresholds_list_table_limit' : 'Limit',

            //Edit application
            'app_edit_title' : 'Edit Application',

            //Application Notifications
            'notification_list_title' : 'Application Deployment Notifications',

            //Server Categories
            'categories_list_title' : 'Server Categories',
            'categories_list_delete_tooltip' : 'Delete the category',



            
        
        };

        return AppMessages;
    }
    //define globally if it doesn't already exist
    if( typeof(AppMessages) === 'undefined'){
        window.AppMessages = define_lang();
    }
    else{
        console.log("Library already defined.");
    }
})(window);


//Usage
// AppMessages.site_saved