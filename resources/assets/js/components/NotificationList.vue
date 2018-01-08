
<template>

  <panel :title="app.name + ' / ' + msg.notification_list_title">
    <div slot="actions" class="panel-actions">

      <a class="panel-action icon wb-plus" data-toggle="modal" data-original-title="Add a notification email" data-target="#addNotificationForm"></a> 

      <a class="panel-action icon wb-reply" data-toggle="tooltip" data-original-title="Back to applications" @click="viewApplications()"></a>

    </div>


    <table class="table" >
      <thead>
          <tr>
              <th>{{msg.notification_list_table_email}}</th>
              <th class="text-nowrap">{{msg.notification_list_table_actions}}</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="notification in notifications">
              <td>
                {{ notification.email  }} 
              </td>
                                 
              <td class="text-nowrap">

                  <button type="button" class="btn btn-sm btn-icon btn-flat btn-default" data-toggle="tooltip" data-original-title="Delete" 
                   @click="deleteNotification(notification)">
                      <i class="icon wb-close" aria-hidden="true"></i>
                  </button>

                  
              </td>
            </tr>
      </tbody>
    </table>


    <modal id="addNotificationForm" title="Add new notification">
      <form class="form-horizontal" @keydown="form.errors.clear($event.target.email)">


        <form-input :hasError="form.errors.has('email')" :errorMsg="form.errors.get('email')" label="Email">
            <input type="text" class="form-control" autocomplete="off" name="email" v-model="form.email">
        </form-input>

        <div class="form-group row">
          <div class="col-xs-12 col-md-9 offset-md-3">
            <button type="button" class="btn btn-primary" @click="saveNotification()" :disabled="form.errors.any()">Save </button>
          </div>
        </div>

      </form>
    </modal>

  </panel>  

</template>

<script>

import {Errors} from '../utils/errors.js';
import {Form} from '../utils/form.js';

export default {

  name: 'NotificationList',

  data () {
    return {
    	//Labels
      msg : AppMessages,

			app : {},
			notifications : [],
			filter : '',

			shared : Window.store,

			form : new Form(),

    };
  },

  mounted(){
    VEvent.$on('evt-notification-list-init', this.initComponent );
  },

  methods : {

	    initComponent : function(){
	      this.app = this.shared.app;
	      this.getNotifications();

	      //Build the form
	      this.form = new Form({
            email: '',
            application_id: this.app.id
      	});

      	console.log( this.form.data() );
	    },

	    getNotifications : function() {
        ServerServices.getApplicationNotifications( { 'app' : this.app.id }, (response) => {
            this.notifications = response.data;
            this.loadGuiComponents();
        }, (error) => {
            Notifications.show({'message': AppMessages.site_get_err, 'status' : 'danger' });
        });
      },

      viewApplications : function(app){
        this.$emit('applicationListEvt');
      },

      saveNotification : function(){
      	ServerServices.saveApplicationNotification( this.form.data() , (response) => {
          //Hide modal
          $("[data-dismiss=modal]").trigger({ type: "click" });
          //Add element to gui
          this.notifications.push(response.data);
          this.form.email = '';
          Notifications.show({'message': AppMessages.data_saved, 'status' : 'info' });
        },(error) => {
        	this.form.errors.record( error.response.data );
          Notifications.show({'message': AppMessages.site_get_err, 'status' : 'warning' });
      	});

      },

      deleteNotification :  function(notification){
      	ServerServices.deleteApplicationNotification( notification , (response) =>{
      		console.log( response.data );
      		console.log( notification );
      		//this.removeItemGui(notification);
      		//Remove the notification on the data object
      		this.notifications = this.notifications.filter(function (item) {
    				return item.id != notification.id;
					});

      		Notifications.show({'message': AppMessages.data_deleted, 'status' : 'info' });
      	}, (error) => {
      		console.log(error);
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