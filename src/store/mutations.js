/*
 * @Author: 马强
 * @since: 2019-12-27 11:26:45
 * @lastTime     : 2020-01-16 10:16:14
 * @LastEditors  : caiqin.xie
 * @message:
 */
import * as type from './mutationType'

const mutations = {
  [type.SETUSERINFO] (state, UserInfo) {
    state.UserInfo = UserInfo
  },
  [type.SETLOADING] (state, loading) {
    state.loading = loading
  },
  [type.SETCOMPANYID] (state, companyId) {
    state.companyId = companyId
  },
  [type.SETCUSTOMERID] (state, customerId) {
    state.customerId = customerId
  },
  [type.SETBATCHEDITLIST] (state, batchEditList) {
    state.batchEditList = batchEditList
  },
  [type.SETCOMPANYLOGO] (state, companyLogo) {
    state.companyLogo = companyLogo
  },
  [type.SETBRANDLOGO] (state, brandLogo) {
    state.brandLogo = brandLogo
  },
  [type.SETCOMPANYNAME] (state, companyName) {
    state.companyName = companyName
  }
}

export default mutations
