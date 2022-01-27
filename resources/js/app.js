/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
// Npm Imports
import VueRouter from 'vue-router'
import Vue from 'vue'
import Form from 'vform'
import moment from 'moment'
import VueProgressBar from 'vue-progressbar'
import Swal from 'sweetalert2/src/sweetalert2.js'

// Vform
window.Form = Form


//Filters
 Vue.filter('upText', function(text){
   return text.charAt(0).toUpperCase() + text.slice(1);
 });
Vue.filter('myDate', function(date){
   return moment(date,).format('Do MM YYYY');
});

//Vue ProgressBar
const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.use(VueProgressBar, options)

// SweetAlerts
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
window.Toast = Toast
window. Swal = Swal

//Custom Events
let Fire = new Vue()
window.Fire = Fire




Vue.use(VueRouter)
let routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue').default },
    { path: '/apartments', component: require('./components/Apartment.vue').default },
    { path: '/bills', component: require('./components/Bill.vue').default },
    { path: '/profile', component: require('./components/Profile.vue').default }
  ]


  const router = new VueRouter({
    mode : 'history',
    routes, // short for `routes: routes`
    linkActiveClass: 'active'
  })

  




/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('dashboard', require('./components/Dashboard.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
