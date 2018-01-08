<template>
   
    <div>    
        <div class="panel-body">

            <div class="row">
                <div class="col-lg-12 col-xs-12">

                    <application-list @deploymentListEvt="viewDeployments" 
                                      @applicationEditEvt="viewEditApplication"
                                      @notificationListEvt="viewNotifications"
                                    v-show="showApplications">
                    </application-list>

                    <deployment-list @applicationListEvt="viewApplications" v-show="showDeployments">
                    </deployment-list>

                    <application-edit @applicationListEvt="viewApplications"
                                      v-show="showApplicationEdit">                    
                    </application-edit>

                    <notification-list @applicationListEvt="viewApplications"   v-show="showNotifications">
                    </notification-list>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        data () {
            return {
                //Labels
                msg : AppMessages,

                //Data
                server : {},
                

                //Show elements
                showApplications : true,
                showDeployments : false,
                showApplicationEdit: false,
                showNotifications: false,

                shared : Window.store,
            };
        },

        mounted() {
            //Define events
            VEvent.$on('application-view-init', this.initComponent );
        },

        computed : {

        },

        methods : {

            initComponent : function(){
                this.server = this.shared.server;
            },

            viewApplications : function(){
                this.hideElements();
                this.showApplications = true;
                VEvent.$emit('evt-application-list-init' );
            },

            viewDeployments : function(){
                this.hideElements();
                this.showDeployments = true;  
                VEvent.$emit('evt-deployment-list-init' );
            },

            viewNotifications : function(){
                this.hideElements();
                this.showNotifications = true;  
                VEvent.$emit('evt-notification-list-init' );
            },

            viewEditApplication : function(){
                this.hideElements();
                this.showApplicationEdit = true;
                VEvent.$emit('evt-application-form-init' );
            },
            

            hideElements : function(){
                this.showDeployments = false;
                this.showApplications = false;
                this.showApplicationEdit= false;
                this.showNotifications = false;
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