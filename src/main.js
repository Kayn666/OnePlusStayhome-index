import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'u-reset.css'
import vconsole from 'vconsole'
import store from "./store";
import { Toast } from 'vant';


Vue.config.productionTip = false
new vconsole();
new Vue({
  store,
  router,
  Toast,
  render: h => h(App)
}).$mount('#app')
