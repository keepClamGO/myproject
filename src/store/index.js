import Vue from 'vue'
import VueX from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import * as getters from './getters'
import creatLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'
Vue.use(VueX)

const debug = process.env.NODE_ENV !== 'production'

export default new VueX.Store({
  state,
  actions,
  getters,
  mutations,
  strict: debug,
  plugins: debug ? [creatLogger(), createPersistedState({storage: window.sessionStorage})] : [createPersistedState({storage: window.sessionStorage})]
})
