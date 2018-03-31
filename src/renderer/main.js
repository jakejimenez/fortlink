import Vue from 'vue'

import App from './App'
import store from './store'
import router from './router'

Vue.config.productionTip = false

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
