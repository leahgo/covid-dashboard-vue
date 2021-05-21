import Vue from 'vue'
import App from './App.vue'
import './wijmo.js'
import Buefy from 'buefy'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

Vue.use(Buefy, {
  defaultIconPack: 'mdi'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
