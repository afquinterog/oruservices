
<template>

  <div class="page-content" >

    <panel :title="msg.categories_list_title">

      <div slot="actions" class="panel-actions">
          <button type="button" class="btn btn-sm btn-icon btn-inverse btn-round" data-toggle="modal"
                  data-original-title="Add a notification email" data-target="#addNotificationForm">
            <i class="icon wb-pencil" aria-hidden="true"></i>
          </button>
      </div>  


      <table class="table ">
            <thead>
                <tr>
                    <th>Description</th>
                    <th class="text-nowrap">{{msg.app_list_table_actions}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data">
                    
                    <td>
                        {{ item.description  }} 
                    </td>
                    
                
                    <td class="text-nowrap">

                        <button type="button" 
                                class="btn btn-sm btn-icon btn-flat btn-default" 
                                data-toggle="tooltip" 
                                :data-original-title="msg.categories_list_delete_tooltip"
                                @click="deleteItem(item)">
                            <i class="icon wb-close" aria-hidden="true"></i>
                        </button>
                        
                    </td>
                  </tr>
                  
                </tbody>
      </table>  


      <modal id="addNotificationForm" title="Add new category form component">

        <form class="form-horizontal" @keydown="form.errors.clear($event.target.name)">

          <form-input :hasError="form.errors.has('description')" :errorMsg="form.errors.get('description')" label="Description">
            <input type="text" class="form-control" autocomplete="off" name="description" v-model="form.description">
          </form-input>

          <form-input :hasError="form.errors.has('color')" :errorMsg="form.errors.get('color')" label="Color">
            <input type="text" class="form-control" autocomplete="off" name="color" v-model="form.color">
          </form-input>

          <div class="form-group row">
            <div class="col-xs-12 col-md-9 offset-md-3">
              <button type="button" class="btn btn-primary" @click="save()" :disabled="form.errors.any()">Save </button>
            </div>
          </div>
       
        </form>
      </modal>


     

      

    </panel>

  </div>

   <!--  <div class="page-header">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
      </ol>
       <h1 class="page-title">{{msg.categories_list_title}}</h1>

      <div class="page-header-actions">
        <button type="button" class="btn btn-sm btn-icon btn-inverse btn-round" data-toggle="modal"
         data-original-title="Add a notification email" data-target="#addNotificationForm">
          <i class="icon wb-pencil" aria-hidden="true"></i>
        </button>
       
      </div>

    </div> -->


 

</template>

<script>

import {Errors} from '../utils/errors.js';
import {Form} from '../utils/form.js';


export default {

  name: 'CategoryList',

  data () {
    return {
    	//Labels
      msg : AppMessages,

			data : [],
			filter : '',

			shared : Window.store,

			form : new Form(),

    };
  },

  mounted(){
    //VEvent.$on('evt-notification-list-init', this.initComponent );
    this.initComponent();
  },

  methods : {

	    initComponent : function(){

	      this.getCategories();

	      //Build the form
	      this.form = new Form({
            description: '',
            color: ''
      	});  
	    },

	    getCategories : function() {
        ServerServices.getServerCategories( {  }, (response) => {
            this.data = response.data;
            this.loadGuiComponents();
        }, (error) => {
            Notifications.show({'message': AppMessages.site_get_err, 'status' : 'danger' });
        });
      },

      viewApplications : function(app){
        this.$emit('applicationListEvt');
      },

      save : function(){
      	ServerServices.saveServerCategory( this.form.data() , (response) => {
          //Hide modal
          $("[data-dismiss=modal]").trigger({ type: "click" });
          //Add element to gui
          this.data.push(response.data);
          this.form.reset();
          Notifications.show({'message': AppMessages.data_saved, 'status' : 'info' });
        },(error) => {
        	this.form.errors.record( error.response.data );
          Notifications.show({'message': AppMessages.site_get_err, 'status' : 'warning' });
      	});

      },

      deleteItem : function(element){
      	ServerServices.deleteServerCategory( element , (response) =>{
      		//Remove the notification on the gui
      		this.data = this.data.filter(function (item) {
    				return item.id != element.id;
					});
      		Notifications.show({'message': AppMessages.data_deleted, 'status' : 'info' });
      	}, (error) => {
      		Notifications.show({'message': AppMessages.site_get_err, 'status' : 'warning' });
      	});
      },

      removeItemGui : function(notification){
      	this.notifications.$remove(notification);
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