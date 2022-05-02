import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router'
import hillo from 'hillo'
import IKUtils from 'innerken-js-utils'
import { customerConfirmRegister } from '@/api/customerService'

export function getToken () {
  console.log(sessionStorage.getItem('token'))

  return sessionStorage.getItem('token') ?? ''
}

Vue.config.productionTip = false


Vue.filter('priceDisplay',
  function (price) {
    return parseFloat(price).toFixed(2).replace('.', ',')
  })

hillo.initial('http://3.124.147.27:8080')

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

const uuid = IKUtils.getQueryString('uuid')
if (uuid) {
  customerConfirmRegister(uuid).then(() => router.push('/Login'))
}

refreshHeader()


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

// if (sessionStorage.getItem('token')) {
//   router.push('/OrderIndex')
// }
