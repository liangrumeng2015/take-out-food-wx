import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 数据仓库
const state = {
  screenArr:[],   // 存储筛选出来的数据
}

export default new Vuex.Store({
  state,
  mutations:{   // 同步存储数据
    screenStoreFn(state,listData){
      state.screenArr = listData
    }
  }
})