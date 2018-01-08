<template>



    <panel :title="msg.app_list_title">

        <!-- Table actions -->
        <div class="fixed-table-toolbar">
            <!-- Toolbar actions -->
            <div class="columns columns-right btn-group pull-right">
                <button class="btn btn-default btn-outline" type="button" 
                        data-toggle="tooltip" :data-original-title="msg.toolbar_new"
                        @click="getServers()">
                    <i class="glyphicon wb-pencil"></i>
                </button>
                <button class="btn btn-default btn-outline" type="button" 
                        data-toggle="tooltip" :data-original-title="msg.toolbar_refresh" 
                        @click="getServers()">
                    <i class="glyphicon wb-refresh"></i>
                </button>
            </div>
            <!-- End toolbar actions -->

            <!-- Filter the data -->
            <div class="pull-right search">
                <input  class="form-control input-outline" type="text" 
                        :placeholder="msg.server_list_search_placeholder" 
                        v-model="filter">
            </div>
            <!-- End filter the data -->
        </div>
        <!-- End table actions -->

        <table class="table ">
            <thead>
                <tr>
                    <th>{{msg.app_list_table_name}}</th>
                    <th>{{msg.app_list_table_branch}}</th>
                    <th>{{msg.app_list_table_last_deployment}}</th>
                    <th class="text-nowrap">{{msg.app_list_table_actions}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="app in appData">
                    <td>{{ app.name  }} 
                    <span class="tag tag-pill tag-primary" :title="msg.app_list_changes_to_deploy">{{app.new_versions}}</span>
                      
                    </td>
                    <td>
                        {{ app.branch }}
                    </td>
                    <td>
                        {{ app.last_time_deployed_format }}
                    </td>
                    
                
                    <td class="text-nowrap">

                        <button type="button" 
                                class="btn btn-sm btn-icon btn-flat btn-default" 
                                data-toggle="tooltip" 
                                :data-original-title="msg.server_list_table_edit_application"
                                @click="viewEditApplication(app)">
                            <i class="icon wb-pencil" aria-hidden="true"></i>
                        </button>

                        <button type="button" 
                                class="btn btn-sm btn-icon btn-flat btn-default" 
                                data-toggle="tooltip" 
                                :data-original-title="msg.server_list_table_view_notifications"
                                @click="viewNotifications(app)">
                            <i class="icon wb-envelope" aria-hidden="true"></i>
                        </button>

                        <button type="button" 
                                class="btn btn-sm btn-icon btn-flat btn-default" 
                                data-toggle="tooltip" 
                                :data-original-title="msg.server_list_table_view_deployments"
                                @click="viewDeployments(app)">
                            <i class="icon wb-list" aria-hidden="true"></i>
                        </button>

                        <button type="button" 
                                class="btn btn-sm btn-icon btn-flat btn-default" 
                                data-toggle="tooltip" 
                                :data-original-title="msg.server_list_table_deploy_application"
                                @click="launchDeployment(app)">
                            <i class="icon wb-play" aria-hidden="true"></i>
                        </button>

                    </td>
                  </tr>
                  
                </tbody>
        </table>  
    
    </panel>    
      
</template>

<script>
    export default {

        data () {
            return {
                //Labels
                msg : AppMessages,

                //Data
                server : {},
                vm : {},
                apps : [],
                filter : '',
                app : {},
                deployments: [],


                shared : Window.store,
            };
        },

        mounted() {
            VEvent.$on('application-view-init', this.initComponent );
            VEvent.$on('evt-application-list-init', this.initComponent );
        },

        computed : {

            appData : function(){
                return this.apps.filter( e => e.name.toLowerCase().includes( this.filter.toLowerCase() ) );
            }

        },


        methods : {

            initComponent : function(){
                this.server = this.shared.server;
                this.getApps();
            },

            getApps : function() {
                ServerServices.getApplications( {'server' : this.server.id }, (response) => {
                    this.apps = response.data;
                    this.loadGuiComponents();
                },(error) => {
                    Notifications.show({'message': AppMessages.site_get_err, 'status' : 'danger' });
                });
                
            },

          
            launchDeployment  : function(app){
                ServerServices.launchDeployment( { 'app' : app.id }, (response) => {
                    Notifications.show({'message': AppMessages.app_deploy_started, 'status' : 'info' });
                },(error) => {
                    Notifications.show({'message': AppMessages.site_get_err, 'status' : 'danger' });
                });
            },


            viewDeployments : function(app){
                this.shared.app = app;
                this.$emit('deploymentListEvt');
            },

            viewNotifications : function(app){
                this.shared.app = app;
                this.$emit('notificationListEvt');
            },

            viewEditApplication : function(app){
                this.shared.app = app;
                this.$emit('applicationEditEvt');
            },

            loadGuiComponents : function (){
                //Load after vue is loaded
                Vue.nextTick(function () {
                    window.jQuery('[data-toggle="tooltip"]').tooltip();
                });
            }
        }
    }

</script>