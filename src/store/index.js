import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersist from 'vuex-persist'
import common from './modules/common'
import identity from './modules/personalCertificate.identity'
import loan from './modules/loan'

Vue.use(Vuex)

/*
 * isLoading是否正在请求(默认false,请求期间屏蔽后退功能)
 * 注意：巨坑来了，如果在axios全局拦截中使用vuex-persist修改，一旦某个请求被catch到后js就不再执行，目前去掉了插件vuex-persist
 */
// const vuexSession = new VuexPersist({
//   storage: window.sessionStorage
// })

// export default new Vuex.Store({
//   modules: {
//     common,
//     identity,
//     loan
//   },
//   plugins: [vuexSession.plugin]
// })

export default new Vuex.Store({
  modules: {
    common,
    identity,
    loan
  }
})
