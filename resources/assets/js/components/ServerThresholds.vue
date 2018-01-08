<template>
    

    <panel :title="msg.app_list_thresholds_title">
        <table class="table" >
          <thead>
              <tr>
                  <th>{{msg.thresholds_list_table_metric}}</th>
                  <th>{{msg.thresholds_list_table_limit}}</th>
                  
              </tr>
          </thead>

          <tbody>
              <tr v-for="threshold in thresholds">
                  <td>{{ threshold.metric  }}
                      <!-- <span class="tag tag-primary">Australia</span> -->
                  </td>
                  <td>
                      {{ threshold.limit }}
                  </td>
                  
              </tr>
                
          </tbody>
      </table>
    </panel>

    


</template>

<script>

export default {

  name: 'ServerThresholds',

  data () {
    return {

        server : {},
        thresholds : [],

        msg : AppMessages,
        shared : Window.store,

    };
  },

  mounted() {

    //Init the form
    VEvent.$on('server-thresholds-init', this.initComponent );

  },

  methods : {

    initComponent : function() {
      this.server = this.shared.server;
      this.loadServerThresholds();            
    },


    loadServerThresholds : function(){
      ServerServices.getServerThresholds({ 'server' : this.server.id }, (response) => {
          this.thresholds = response.data;
          console.log(response.data);
      },(error) => {
          Notifications.show({'message': AppMessages.site_get_err, 'status' : 'danger' });
      });
    }


  }


};
</script>

<style lang="css" scoped>
</style>