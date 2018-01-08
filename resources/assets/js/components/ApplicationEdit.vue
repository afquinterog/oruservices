
<template>


		<panel :title="msg.app_edit_title">

			<div slot="actions" class="panel-actions">
            <a class="panel-action icon wb-reply" data-toggle="tooltip" data-original-title="Back to applications" @click="viewApplications()"></a>
      </div>	

      <form class="form-horizontal" @keydown="form.errors.clear($event.target.name)">

			    <form-input :hasError="form.errors.has('name')" :errorMsg="form.errors.get('name')" label="Name"  >
			      <input type="text" class="form-control" autocomplete="off" name="name" v-model="form.name">
			    </form-input>

			    <form-input :hasError="form.errors.has('repo')" :errorMsg="form.errors.get('repo')" label="Repo"  >
			      <input type="text" class="form-control" autocomplete="off" name="repo" v-model="form.repo">
			    </form-input>

					<form-input :hasError="form.errors.has('branch')" :errorMsg="form.errors.get('branch')" label="Branch"  >
			      <input type="text" class="form-control" autocomplete="off" name="branch" v-model="form.branch">
			    </form-input>

			    <form-input :hasError="form.errors.has('route')" :errorMsg="form.errors.get('route')" label="Route"  >
			      <input type="text" class="form-control" autocomplete="off" name="route" v-model="form.route">
			    </form-input>

			    <form-input :hasError="form.errors.has('automatic_deploy')" :errorMsg="form.errors.get('automatic_deploy')" label="Automatic deploy"  >
			      <select class="form-control" name="automatic_deploy" v-model="form.automatic_deploy" 
			                @change="form.errors.clear($event.target.name)" >
			          <option value="">Choose an option</option>
			          <option value="0" :selected=" ! app.automatic_deploy ? 'selected' : '' " >No</option>
						    <option value="1" :selected=" app.automatic_deploy ? 'selected' : '' ">Yes</option>
			        </select>
			    </form-input>


			    <div class="form-group row">
						<div class="col-xs-12 col-md-9 offset-md-3">
						  	<button type="button" class="btn btn-primary" @click="saveApplication()" :disabled="form.errors.any()">Save </button>
						</div>
					</div>
			</form>

		</panel>

</template>

<script>

import {Errors} from '../utils/errors.js';
import {Form} from '../utils/form.js';


export default {

  name: 'ApplicationEdit',

  data () {
    return {

    	//Labels
      msg : AppMessages,

      app : {},

      servers : [],

    	form : new Form({
            name: '',
            repo: '',
            branch: '',
            route : '',
            automatic_deploy : '',
      }),

    	shared : Window.store,
    };
  },

  mounted(){
    	VEvent.$on('evt-application-form-init', this.initComponent );
  },

  methods: {

  	initComponent : function(){

      this.app = this.shared.app;
      this.form = new Form({
      	id : this.app.id,
        name: this.app.name,
        repo: this.app.repo,
        branch: this.app.branch,
        route: this.app.route,
        automatic_deploy : this.app.automatic_deploy
      });
      
	  },

  	viewApplications : function(app){
      this.$emit('applicationListEvt');
    },

    saveApplication : function(){

    	ServerServices.saveApplication( this.form.data() , (response) => {
          Notifications.show({'message': AppMessages.data_saved, 'status' : 'info' });
        },(error) => {
        	this.form.errors.record( error.response.data );
          Notifications.show({'message': AppMessages.site_get_err, 'status' : 'warning' });
      });
    }


  }
};
</script>

<style lang="css" scoped>
</style>


