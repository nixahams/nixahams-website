import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from "./routes";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);//enables routing



const router = new VueRouter({
  routes
});//routes stores in an array of objects

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
