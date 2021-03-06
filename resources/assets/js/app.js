/* jshint esversion: 6 */

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import {Pagination} from 'vue-pagination-2';
import modal from 'vue-strap/src/Modal';
import Multiselect from 'vue-multiselect';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'

Vue.router = router;

Vue.use(VueAxios, axios)
Vue.use(VueAuth, {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    rolesVar: 'role',
    loginData: {url: 'api/auth/login', method: 'POST', redirect: '/'},
    logoutData: {url: 'api/auth/logout', method: 'POST', redirect: 'login', authType: 'bearer'},
    fetchData: {url: 'api/auth/account', method: 'GET', authType: 'bearer'},
    refreshData: {url: 'api/auth/refresh', method: 'POST'}
});

Vue.component('multiselect', Multiselect);
Vue.component('App', require('./App.vue'));
Vue.component('pagination', Pagination);
Vue.component('modal', modal);

/* eslint-disable no-new */
const app = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
});
