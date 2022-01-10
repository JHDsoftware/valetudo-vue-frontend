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
hillo.initial('http://192.168.31.245:8080')

export function refreshHeader () {
  hillo.axios.defaults.headers.common = {
    'Content-Type': 'application/json',
    'satoken': getToken()
  }
  hillo.axios.defaults.headers.post = {
    'Content-Type': 'application/json',
    'satoken': getToken()
  }
  hillo.axios.defaults.headers.get = {
    'Content-Type': 'application/json',
    'satoken': getToken()
  }
}


refreshHeader()
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
