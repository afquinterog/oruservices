import VueRouter from 'vue-router';

let routes = [
	{
		path: '/servers',
		component: require('./components/ServerList.vue')
	},

	{ path: '/', redirect: '/servers' },

	{
		path: '/server/:serverId',
		name: 'server',
		component: require('./components/ServerView.vue')
	},

	{
		path: '/categories/',
		name: 'categories',
		component: require('./components/CategoryList.vue')
	}
];

export default new VueRouter({
	routes
});