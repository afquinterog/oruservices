
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import {Errors} from './utils/errors.js';
//require('./utils/errors.js');

require('./bootstrap');
require('./store');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

var errors = new Errors();

Vue.component('ServerList', require('./components/ServerList.vue'));
Vue.component('ServerView', require('./components/ServerView.vue'));
Vue.component('ServerEdit', require('./components/ServerEdit.vue'));
Vue.component('ServerMetrics', require('./components/ServerMetrics.vue'));
Vue.component('ServerThresholds', require('./components/ServerThresholds.vue'));
Vue.component('ServerApplications', require('./components/ServerApplications.vue'));


Vue.component('ApplicationList', require('./components/ApplicationList.vue'));

Vue.component('DeploymentList', require('./components/DeploymentList.vue'));
Vue.component('ApplicationEdit', require('./components/ApplicationEdit.vue'));
Vue.component('NotificationList', require('./components/NotificationList.vue'));
Vue.component('CategoryList', require('./components/CategoryList.vue'));

//Generic components
Vue.component('Loading', require('./generics/Loading.vue'));
Vue.component('PageTitle', require('./generics/PageTitle.vue'));
Vue.component('FormInput', require('./generics/FormInput.vue'));
Vue.component('Panel', require('./generics/Panel.vue'));
Vue.component('Modal', require('./generics/Modal.vue'));



require('./controllers/admin.js');

