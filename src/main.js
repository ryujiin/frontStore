// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from '@/store/store'

import VueCookie from 'vue-cookie'
import VueProgressBar from 'vue-progressbar'
import VeeValidate from 'vee-validate'
import VueLocalStorage from 'vue-localstorage'
import VueHead from 'vue-head'

const options = {
  color: '#23d160',
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

Vue.use(VueHead)
Vue.use(VeeValidate)
Vue.use(VueProgressBar, options)
Vue.use(VueCookie)

Vue.config.productionTip = false

Vue.use(VueLocalStorage, {
  name: 'ls',
  createComputed: true // created computed members from your variable declarations
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
