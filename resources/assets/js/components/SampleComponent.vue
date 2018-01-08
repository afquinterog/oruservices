<template>
    

     <div>    
        <div class="panel-body">

            <div class="row">
                <div class="col-lg-12 col-xs-12">

                    <!-- Server metrics list -->
                    <div class="panel panel-bordered" >
                        <div class="panel-heading">
                          <h3 class="panel-title">{{msg.app_list_metrics_title}}</h3>

                              <div class="panel-actions">
                                 <div class="dropdown">
                                  <a class="panel-action" data-toggle="dropdown" href="#" aria-expanded="false"><i class="icon wb-settings" aria-hidden="true"></i></a>
                                  <div class="dropdown-menu dropdown-menu-bullet" role="menu">
                                    <a class="dropdown-item" href="javascript:void(0)" role="menuitem"><i class="icon wb-flag" aria-hidden="true"></i> Action</a>
                                    <a class="dropdown-item" href="javascript:void(0)" role="menuitem"><i class="icon wb-print" aria-hidden="true"></i> Another action</a>
                                    <a class="dropdown-item" href="javascript:void(0)" role="menuitem"><i class="icon wb-heart" aria-hidden="true"></i> Something else here</a>
                                    <a class="dropdown-item" href="javascript:void(0)" role="menuitem"><i class="icon wb-share" aria-hidden="true"></i> Separated link</a>
                                  </div>
                                </div> 
                              

                               <a class="panel-action icon wb-refresh" data-toggle="panel-refresh" data-load-type="round-circle" data-load-callback="customRefreshCallback" aria-hidden="true"></a>
                                <a class="panel-action icon wb-minus" data-toggle="panel-collapse" aria-expanded="true" aria-hidden="true"></a>
                                <a class="panel-action icon wb-expand" data-toggle="panel-fullscreen" aria-hidden="true"></a> 
                               
                              </div>

                        </div>
                        <div class="panel-body">
                            <table class="table" >
                                <thead>
                                    <tr>
                                        <th>{{msg.metrics_list_table_cpu}}</th>
                                        <th>{{msg.metrics_list_table_disk}}</th>
                                        <th>{{msg.metrics_list_table_memory}}</th>
                                         <th>{{msg.metrics_list_table_date}}</th>
                                        <th class="text-nowrap">{{msg.deployment_list_table_actions}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="metric in metrics">
                                        <td>{{ metric.cpu  }}% 
                                            <!-- <span class="tag tag-primary">Australia</span> -->
                                        </td>
                                        <td>
                                            {{ metric.memory }}%
                                        </td>
                                        <td>
                                            {{ metric.disk }}%
                                        </td>
                                        <td>
                                            {{ metric.created }}
                                        </td>
                                    
                                        <td class="text-nowrap">

                                            <button type="button" class="btn btn-sm btn-icon btn-flat btn-default" data-toggle="tooltip" data-original-title="View Results" 
                                             @click="viewDeploymentResults(server)">
                                                <i class="icon wb-print" aria-hidden="true"></i>
                                            </button>

                                            
                                        </td>
                                      </tr>
                                      
                                    </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- End Server Metrics List -->

                </div>
            </div>
        </div>
    </div>


</template>

<script>

export default {

  name: 'ServerMetrics',

  data () {
    return {

        server : {},
        metrics : [],

        msg : AppMessages,
        shared : Window.store,

    };
  },

  mounted() {

    //Init the form
    VEvent.$on('server-metrics-init', this.initComponent );

  },

  methods : {

    initComponent : function() {
      this.server = this.shared.server;
      this.loadServerMetrics();            
    },


    loadServerMetrics : function(){
      ServerServices.getServerMetrics({ 'server' : this.server.id }, (response) => {
          this.metrics = response.data;
          console.log(response.data);
          //this.loadGuiComponents();
      },(error) => {
          Notifications.show({'message': AppMessages.site_get_err, 'status' : 'danger' });
      });
    }



  }


};
</script>

<style lang="css" scoped>
</style>