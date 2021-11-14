import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import hillo from 'hillo'

export function getToken () {
  console.log(localStorage.getItem('token'))

  return localStorage.getItem('token') ?? ''
}

Vue.config.productionTip = false
hillo.initial('http://localhost:8080')

export function refreshHeader () {
  hillo.axios.defaults.headers.common = {
    'Content-Type': 'application/json',
    SaToken: getToken(),
    techV: 1
  }
  hillo.axios.defaults.headers.post = {
    'Content-Type': 'application/json',
    JWTToken: getToken(),
    techV: 1
  }
}

refreshHeader()
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
