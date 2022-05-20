import { post, singlefetch } from '../../api/untils'
import Url from '../../api/request'
const actionGcc = {
  // 管理员列表
  async administratorList ({ commit, state }, params) {
    const { code, data } = await post(Url.administratorList, params)
    if (code === 200) {
      return data
    }
  },
  // 管理员新建
  async administratorAdd ({ commit, state }, params) {
    const { code, data } = await post(Url.administratorAdd, params)
    if (code === 200) {
      return data
    }
  },
  // 管理员查看
  async administratorDetail ({ commit, state }, params) {
    const { code, data } = await singlefetch(Url.administratorDetail, params)
    if (code === 200) {
      return data
    }
  }
}
export default actionGcc
