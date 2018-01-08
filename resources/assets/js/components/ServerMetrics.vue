<template>


    <panel :title="msg.app_list_metrics_title">
      <table class="table" >
          <thead>
              <tr>
                  <th>{{msg.metrics_list_table_cpu}}</th>
                  <th>{{msg.metrics_list_table_disk}}</th>
                  <th>{{msg.metrics_list_table_memory}}</th>
                  <th>{{msg.metrics_list_table_date}}</th>
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
              </tr>
                
          </tbody>
      </table>
    </panel>
    
     


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
      },(error) => {
          Notifications.show({'message': AppMessages.site_get_err, 'status' : 'danger' });
      });
    }

  } 


};
</script>

<style lang="css" scoped>
</style>