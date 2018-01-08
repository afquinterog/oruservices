<template>
   
     <div>


      <page-title :title="shared.server.name">

        <div slot="breadcrumb">

          <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <a href="#" @click.preventDefault="goServerList()" >Servers</a>
            </li>
            <li class="breadcrumb-item active">{{shared.server.name}}</li>
          </ol>

        </div>

        <button type="button" 
                class="btn btn-sm btn-icon btn-inverse btn-round" 
                data-toggle="tooltip" 
                data-original-title="Back" 
                @click.preventDefault="goServerList()">
                  <i class="icon wb-arrow-left" aria-hidden="true"></i>
        </button>


      </page-title>

      
      <div class="page-content container-fluid" >
            <div class="panel">

              <!-- Page Title -->
              <div class="panel-heading">
                 <h3 class="panel-title">{{this.shared.server.name}}</h3>
              </div>
              <!-- End page title -->

              <div class="panel-body">

                <div class="row row-lg">
                    <div class="col-xs-12 col-xl-12">
                    

                      <div class="example-wrap">


                        <div class="nav-tabs-vertical">
                          <!-- Nav links -->
                          <ul class="nav nav-tabs m-r-25" role="tablist">

                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-toggle="tab" href="#tabOne" aria-controls="tabOne" role="tab" aria-expanded="false">
                                <i class="icon wb-dashboard" aria-hidden="true"></i> Information
                                </a>
                            </li>

                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" data-toggle="tab" href="#tabTwo" aria-controls="exampleTabsLeftTwo" role="tab" aria-expanded="true">
                                <i class="icon wb-order" aria-hidden="true"></i>Applications
                                </a>
                            </li>

                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-toggle="tab" href="#tabThree" aria-controls="three" role="tab" aria-expanded="false">
                                <i class="icon wb-stats-bars" aria-hidden="true"></i>Metrics
                                </a>
                            </li>

                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-toggle="tab" href="#tabFour" aria-controls="four" role="tab">
                                <i class="icon wb-alert-circle" aria-hidden="true"></i>Thresholds
                                </a>
                            </li>

                          </ul>
                          <!-- End nav links -->

                          <!-- Nav content -->
                          <div class="tab-content p-y-15">
                            <div class="tab-pane" id="tabOne" role="tabpanel" aria-expanded="false">

                                <server-edit></server-edit>                                

                            </div>
                            <div class="tab-pane active" id="tabTwo" role="tabpanel" aria-expanded="true">
                                <!-- <application-view ></application-view> -->
                                <server-applications></server-applications>
                            </div>
                            <div class="tab-pane" id="tabThree" role="tabpanel" aria-expanded="false">

                               <server-metrics></server-metrics>

                            </div>
                            <div class="tab-pane" id="tabFour" role="tabpanel">

                               <server-thresholds></server-thresholds>

                            </div>
                          </div>
                          <!-- End nav content -->
                        </div>
                      </div>
                      <!-- End Example Tabs Left -->

                    </div>  
                </div>
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

                shared : Window.store,
            };
        },


        created(){
            console.log('creating view ...');
            this.loadServer( this.$route.params.serverId );

        },

        mounted() {
            
            //Set class to body
            //window.jQuery('body').addClass('page-aside-static');
            //window.jQuery('body').addClass('page-aside-left'); 
            this.loadGuiComponents();

            console.log('view server');
            console.log( this.shared.server);

            //Register for events
        },

        computed : {
            
        },


        methods : {


          loadServer : function(serverId){

                        
            ServerServices.getServer({'id': serverId }, (response) => {
              //this.server = response.data;
              this.shared.server = response.data;

              //Emit events to initialize internal components
              VEvent.$emit('application-view-init');
              VEvent.$emit('server-edit-init');
              VEvent.$emit('server-metrics-init');
              VEvent.$emit('server-thresholds-init');
              
                            
            },(error) => {
                console.log(error);
                Notifications.show({'message': AppMessages.site_get_err, 'status' : 'danger' });
            });


      //this.server = this.shared.server;
      //Update form data with the server
      
    },

            goServerList : function(){
                VEvent.$emit('go-to-server-list');
            },

            loadGuiComponents : function (){
                //Load after vue is loaded
                Vue.nextTick(function () {
                    //window.jQuery('[data-toggle="tooltip"]').tooltip();
                    //window.jQuery('.page-aside').slidePanel(); 
                    //window.Site.run();
            
                });
            },
        }
    }

</script>