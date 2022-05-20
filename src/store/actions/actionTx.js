import {post, fetch, put} from '../../api/untils'
import Url from '../../api/request/index'
console.log(Url)
const actionTx = {
  // 客户管理列表
  async goodsAdd ({ commit, state }, params) {
    const { code, data } = await post(Url.goodsAdd, params)
    if (code === 200) {
      return data
    }
  },
  // 客户管理列表
  async goodsList ({ commit, state }, params) {
    const { code, data } = await post(Url.goodsList, params)
    if (code === 200) {
      return data
    }
  },
  // 客户管理列表
  async goodsUpdate ({ commit, state }, params) {
    const { code, data } = await put(Url.goodsUpdate, params)
    if (code === 200) {
      return data
    }
  },
  // 客户管理列表
  async goodsCopy ({ commit, state }, params) {
    const { code, data } = await post(Url.goodsCopy, params)
    if (code === 200) {
      return data
    }
  },
  // 客户管理列表
  async goodsView ({ commit, state }, params) {
    const { code, data } = await fetch(Url.goodsView, params)
    if (code === 200) {
      return data
    }
  },
  // 客户管理列表
  async goodsUpdateInventory ({ commit, state }, params) {
    const { code, data } = await put(Url.goodsUpdateInventory, params)
    if (code === 200) {
      return data
    }
  },
  async goodsUpdateStatus ({ commit, state }, params) {
    const { code, data } = await put(Url.goodsUpdateStatus, params)
    if (code === 200) {
      return data
    }
  },
  async goodsCategory ({ commit, state }, params) {
    const { code, data } = await fetch(Url.goodsCategory, params)
    if (code === 200) {
      return data
    }
  }
}
export default actionTx
