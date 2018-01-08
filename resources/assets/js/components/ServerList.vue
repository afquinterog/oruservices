<template>
   
    <div>
        

        <loading v-show="componentLoading"></loading>

        <div v-show=" ! componentLoading">

            <page-title title="Servers">

                <button type="button" class="btn btn-sm btn-icon btn-inverse btn-round" data-toggle="tooltip" data-original-title="New">
                  <i class="icon wb-pencil" aria-hidden="true"></i>
                </button>

                <button type="button" class="btn btn-sm btn-icon btn-inverse btn-round" data-toggle="tooltip" data-original-title="Refresh">
                  <i class="icon wb-refresh" aria-hidden="true"></i>
                </button>  

            </page-title>

            

            <div class="page-content" >

                <div class="panel">

                <!-- Page Title -->
                <!-- <div class="panel-heading">
                    <h3 class="panel-title">{{msg.server_list_title}}</h3>
                </div> -->
                <!-- End page title -->

                
                <div class="panel-body">
                    <!-- Table actions -->
                    <div class="fixed-table-toolbar">
                        <!-- Toolbar actions -->
                        <div class="columns columns-right btn-group pull-right">
                            <button class="btn btn-default btn-outline" type="button" name="refresh" 
                                title="Refresh" @click="getServers()">
                                <i class="glyphicon wb-refresh"></i>
                            </button>
                        </div>
                        <!-- End toolbar actions -->

                        <!-- Filter the data -->
                        <div class="pull-right search">
                            <input  class="form-control input-outline" type="text" 
                                    @keyup.enter="getServers()"
                                    :placeholder="msg.server_list_search_placeholder" 
                                    v-model="filter">
                        </div>
                        <!-- End filter the data -->
                    </div>
                    <!-- End table actions -->

                    <table class="table">
                        <thead>
                            <tr>
                                <th>{{msg.server_list_table_title}}</th>
                                <th>{{msg.server_list_table_last_update}}</th>
                                <th>{{msg.server_list_table_disk}}</th>
                                <th>{{msg.server_list_table_memory}}</th>
                                <th>{{msg.server_list_table_cpu}}</th>
                                <th class="text-nowrap">{{msg.server_list_table_actions}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="server in serverData">
                                <td>{{ server.name  }} / {{ server.host }}
                                    <span class="tag tag-round tag-primary" :style="'background-color:#' + server.category_color" >
                                        {{server.category_description}}
                                    </span>

                                    <span class="tag tag-round tag-primary" data-toggle="tooltip" 
                                          data-original-title="Connections">
                                          {{server.metrics.connections || "" }}
                                    </span>

                                    <span class="tag tag-round tag-primary" data-toggle="tooltip" 
                                          data-original-title="IPs">{{server.metrics.ips || ""}}</span>
                                </td>
                                <td>
                                    {{ server.metrics.date2 || msg.no_info }}
                                </td>
                                <td>
                                    <!-- Server disk metric -->
                                    <div class="progress progress-xs m-y-10 " v-if="server.metrics">
                                        <div class="progress-bar progress-bar-primary" :style="'width:'+ server.metrics.disk+'%' " data-toggle="tooltip" data-trigger="hover" data-class="tooltip-primary" :data-original-title="server.metrics.disk + '%'">
                                        </div>
                                    </div>
                                    <div v-else>
                                       {{ msg.no_data }}
                                    </div>
                                    <!-- End Server disk metric -->
                                </td>

                                <td>
                                    <!-- Server memory metric -->
                                    <div class="progress progress-xs m-y-10 " v-if="server.metrics">
                                        <div class="progress-bar progress-bar-primary" :style="'width:'+ server.metrics.memory+'%' " data-toggle="tooltip" data-trigger="hover" data-class="tooltip-primary" :data-original-title="server.metrics.memory + '%'">
                                        </div>
                                    </div>
                                    <div v-else>
                                       {{ msg.no_data }}
                                    </div>
                                    <!-- End Server memory metric -->
                                </td>
                                <td>
                                    <!-- Server cpu metric -->
                                    <div class="progress progress-xs m-y-10 " v-if="server.metrics">
                                        <div class="progress-bar progress-bar-primary" :style="'width:'+ server.metrics.cpu+'%' " data-toggle="tooltip" data-trigger="hover" data-class="tooltip-primary" :data-original-title="server.metrics.cpu + '%'">
                                        </div>
                                    </div>
                                    <div v-else>
                                        {{ msg.no_data }}
                                    </div>
                                    <!-- End Server cpu metric -->
                                </td>

                                <td class="text-nowrap">


                                    <button type="button" class="btn btn-sm btn-icon btn-flat btn-default" data-toggle="tooltip" data-original-title="Edit" title="Edit" @click="viewServer(server)">
                                        <i class="icon wb-pencil" aria-hidden="true"></i>
                                    </button>
                                    <button type="button" class="btn btn-sm btn-icon btn-flat btn-default" 
                                            data-toggle="tooltip" data-original-title="Delete">
                                        <i class="icon wb-close" aria-hidden="true"></i>
                                    </button>
                                </td>
                              </tr>
                              
                            </tbody>
                          </table>
                      </tr>

                    </tbody>
                  </table>
                </div>

                <!-- Panel footer -->
                <div class="panel-footer">
                  <!-- <nav>
                    <ul data-plugin="paginator" data-total="50" data-skin="pagination-gap" class="pagination pagination-gap">
                      <li class="pagination-prev page-item">
                        <a class="page-link" href="javascript:void(0)">
                          <span>Previous</span>
                        </a>
                      </li>
                      <li class="pagination-items page-item" data-value="1"><a class="page-link" href="javascript:void(0)">1</a></li>
                      <li class="pagination-items page-item" data-value="2"><a class="page-link" href="javascript:void(0)">2</a></li>
                      <li class="pagination-items page-item" data-value="3"><a class="page-link" href="javascript:void(0)">3</a></li>
                      <li class="pagination-items page-item" data-value="4"><a class="page-link" href="javascript:void(0)">4</a></li>
                      <li class="pagination-items page-item active" data-value="5"><a class="page-link" href="javascript:void(0)">5</a></li>
                      <li class="pagination-items page-item disabled">
                        <a class="page-link" href="javascript:void(0)">
                          <span>Next</span>
                        </a>
                      </li>
                    </ul>
                  </nav> -->
                </div>
                <!-- End Panel footer -->
              </div>
            </div>
        </div>
        
    </div>

   <!--  </div> -->
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
                servers : [],
                filter : '',
                componentLoading : false,

                shared : Window.store,
            };
        },

        mounted() {
            this.getServers();
        },

        computed : {
            serverData : function(){
                this.initializeMetrics();
                return this.servers;
            }
        },


        methods : {

            getServers : function() {

                this.componentLoading = true;
                ServerServices.getServers({ 'filter' : this.filter }, (response) => {
                    this.servers = response.data;
                    this.loadGuiComponents();
                    this.componentLoading = false;
                },(error) => {
                        Notifications.show({'message': AppMessages.site_get_err, 'status' : 'danger' });
                        this.componentLoading = false;    
                });
                
            },

            viewServer : function(server){
                this.shared.server = server;
                VEvent.$emit('server-view-evt', server );
            },

            initializeMetrics : function(){

                this.servers.map(function(server){
                    if( server.metrics === undefined){
                        server.metrics = {};
                    }
                    return server;
                })

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