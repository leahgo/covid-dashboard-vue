import Vue from 'vue'
import App from './App.vue'
import './wijmo.js'
import Buefy from 'buefy'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VCalendar from 'v-calendar';

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

Vue.use(Buefy, {
  defaultIconPack: 'mdi'
})

Vue.use(VCalendar);

new Vue({
  render: h => h(App),
}).$mount('#app')
