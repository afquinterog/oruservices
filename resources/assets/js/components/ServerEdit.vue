<template>
	

  <panel :title="msg.server_view_title">

    <form class="form-horizontal" @keydown="form.errors.clear($event.target.name)">

        <form-input :hasError="form.errors.has('name')" :errorMsg="form.errors.get('name')" label="Names"  >
          <input type="text" class="form-control" autocomplete="off" name="name" v-model="form.name">
        </form-input>

        <form-input :hasError="form.errors.has('description')" :errorMsg="form.errors.get('description')" label="Description"  >
          <input type="text" class="form-control" autocomplete="off" name="description" v-model="form.description">
        </form-input>

        <form-input :hasError="form.errors.has('host')" :errorMsg="form.errors.get('host')" label="Host"  >
          <input type="text" class="form-control" autocomplete="off" name="host" v-model="form.host">
        </form-input>

        <form-input :hasError="form.errors.has('category_id')" :errorMsg="form.errors.get('category_id')" label="Category"  >
          <select class="form-control" name="category_id" v-model="form.category_id" 
                    @change="form.errors.clear($event.target.name)" >
              <option value="">Choose a Category</option>
              <option v-for="category in categories" :value="category.id" >{{category.description}}</option>
            </select>
        </form-input>

        <div class="form-group row">
          <div class="col-xs-12 col-md-9 offset-md-3">
            <button type="button" class="btn btn-primary" @click="saveServer()" :disabled="form.errors.any()">Save </button>
          </div>
        </div>
      </form>
  </panel>


</template>

<script>

import {Errors} from '../utils/errors.js';
import {Form} from '../utils/form.js';

export default {

  name: 'ServerEdit',

  data () {
    return {

      msg : AppMessages,
    	categories : [],
    	server : {},

    	
    	form : new Form({
            name: '',
            description: '',
            host: '',
            category_id : '',
          }),

    	shared : Window.store,

    };
  },

  mounted() {

  	//Init the form
  	VEvent.$on('server-edit-init', this.initComponent );

  },

  methods : {


  	initForm : function(){

  	},

  	createServerForm : function(){

      this.server = this.shared.server;

      this.form = new Form({
    		id: this.server.id,
    		name: this.server.name,
        description: this.server.description,
        host: this.server.host,
        category_id : this.server.category_id,
			});
    },


  	initComponent : function() {
     
      ServerServices.getServerCategories({}, (response) => {
          this.categories = response.data;
          this.createServerForm();
      },(error) => {
          Notifications.show({'message': AppMessages.site_get_err, 'status' : 'danger' });
      });
                
    },

    saveServer : function(){

    	ServerServices.saveServer( this.form.data() , (response) => {
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