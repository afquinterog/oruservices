
window.VEvent = new Vue();
Vue.prototype.$http = axios;


import router  from '../routes.js';

new Vue({

	el : '#vue-app',
	router: router,
	//components: { 'movement-list' },

	data : {

		//Handler for the application components
		showServerList : true,
		showServerView : false,

		//Actual server
		server : {},

		shared : Window.store,


	},

	methods : {

		serverList(){
			//this.hideComponents();
			//this.showServerList = true;
			router.push({ name: 'servers', params: { } })
		},

		serverView(server){
			//Navigate to server 
			router.push({ name: 'server', params: { serverId: this.shared.server.id }})
		},

		hideComponents(){
			this.showServerList = false;
			this.showServerView = false;
		},

	},


	//Initialize the page
	created : function(){
		console.log('ready');
		
		//Register event handlers
		VEvent.$on('server-view-evt', this.serverView );
		VEvent.$on('go-to-server-list', this.serverList );
	}


})