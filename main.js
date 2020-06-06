import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 引入vuex文件
import store from 'store/store.js'
Vue.config.$store = store;
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
