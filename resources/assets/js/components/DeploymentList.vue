	
	<template>



		<div>

      <panel :title=" app.name + '/' + msg.app_list_deployments_title">

        <div slot="actions" class="panel-actions">
           <a class="panel-action icon wb-reply" data-toggle="tooltip" data-original-title="Back to applications" @click="viewApplications()"></a>
        </div>


        <table class="table" >
          <thead>
            <tr>
              <th>{{msg.deployment_list_table_branch}}</th>
              <th>{{msg.deployment_list_table_updated}}</th>
              <th class="text-nowrap">{{msg.deployment_list_table_actions}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dep in deploymentData">
              <td>
                {{ dep.branch }} 
              </td>

              <td>
                {{ dep.updated_at_format }}
              </td>
          
              <td class="text-nowrap">

                  <button type="button" class="btn btn-sm btn-icon btn-flat btn-default" data-toggle="modal" data-original-title="View Results" data-target="#deploymentResults"
                   @click="viewDeploymentResults(dep)" >
                      <i class="icon wb-print" aria-hidden="true"></i>
                  </button>

              </td>
            </tr>
          </tbody>
        </table>
      </panel>


      <modal id="deploymentResults" :title=" msg.deployment_list_view_results_title + 2">
         <pre><code class="language-bash">{{ deployment.result }}</code></pre>
      </modal>


 
    </div>
	</template>
	
	<script>
	export default {
	
	  name: 'DeploymentList',
	
	  data () {
	    return {

	    	//Labels
        msg : AppMessages,

        viewList : true,
        viewDeploymentResult : false,

				app : {},
				deployments : [],
				deployment : {},
				filter : '',

				shared : Window.store,
	    };
	  },

   	computed : {

      deploymentData : function(){
          return this.deployments.filter( e => e.branch.toLowerCase().includes( this.filter.toLowerCase() ) );
      }
    },

    mounted(){
    	VEvent.$on('evt-deployment-list-init', this.initComponent );
   	},


	  methods : {

	    initComponent : function(){
	      this.app = this.shared.app;
	      this.getDeployments();
	    },

	    getDeployments : function() {
        ServerServices.getDeployments( { 'app' : this.app.id }, (response) => {
            this.deployments = response.data;
            this.loadGuiComponents();
        }, (error) => {
            Notifications.show({'message': AppMessages.site_get_err, 'status' : 'danger' });
        });
      },

      viewApplications : function(app){
        this.$emit('applicationListEvt');
      },

      viewDeploymentResults : function(deployment){
      	this.deployment = deployment;
      },

      loadGuiComponents : function (){
	      //Load after vue is loaded
	      Vue.nextTick(function () {
	          window.jQuery('[data-toggle="tooltip"]').tooltip();
	      });
    	}

    },

	};
	</script>
	
	<style lang="css" scoped>
	</style>