/*
 * @Descripttion:
 * @Author: huangfuchunmei
 * @Date: 2021-03-30 12:08:07
 * @LastEditors: wangyu
 * @LastEditTime: 2021-04-13 15:30:31
 */
import {post, singlefetch, fetch} from '../../api/untils'
import Url from '../../api/request'

const actionHfcm = {
  // 查询数据字典getDictionary
  async getDictionary ({commit, state}, params) {
    const {code, data} = await post(Url.getDictionary, params)
    if (code === 200) {
      return data
    }
  },
  // 登录userList
  async login ({commit, state}, params) {
    const {code, data, messageInfo} = await post(Url.login, params)
    if (code === 200) {
      return data
    } else {
      return messageInfo
    }
  },

  // 供应商表单获取管理员列表
  async userList ({commit, state}, params) {
    const {code, data, messageInfo} = await fetch(Url.userList, params)
    if (code === 200) {
      return data
    } else {
      return messageInfo
    }
  },

  // 获取供应商列表
  async merchantList ({commit, state}, params) {
    const {code, data} = await post(Url.merchantList, params)
    if (code === 200) {
      return data
    }
  },

  // 查看供应商详情
  async merchantDetail ({commit, state}, params) {
    const {code, data} = await singlefetch(Url.merchantDetail, params)
    if (code === 200) {
      return data
    }
  },

  // 删除供应商
  async merchantDelete ({commit, state}, params) {
    const {code, data} = await post(Url.merchantDelete, params)
    if (code === 200) {
      return data
    }
  },

  // 供应商审核
  async merchantReview ({commit, state}, params) {
    const {code, data} = await singlefetch(Url.merchantReview, params)
    if (code === 200) {
      return data
    }
  },

  // 供应商编辑
  async merchantUpdate ({commit, state}, params) {
    const {code, data} = await post(Url.merchantUpdate, params)
    if (code === 200) {
      return data
    }
  },

  // 新增供应商
  async merchantAdd ({commit, state}, params) {
    const {code, data, messageInfo} = await post(Url.merchantAdd, params)
    if (code === 200) {
      return data
    } else if (code === 4001) {
      return {
        messageInfo: messageInfo
      }
    }
  },

  // 获取订单列表
  async orderList ({commit, state}, params) {
    const {code, data} = await post(Url.orderList, params)
    if (code === 200) {
      return data
    }
  },

  // 订单获取供应商列表
  async merchantSelectList ({commit, state}, params) {
    const {code, data} = await fetch(Url.merchantSelectList, params)
    if (code === 200) {
      return data
    }
  },

  // 商户下拉查询
  async selectForReleaseChannel ({commit, state}, params) {
    const {code, data} = await post(Url.selectForReleaseChannel, params)
    if (code === 200) {
      return data
    }
  },

  // 物流公司
  async expressCompany ({commit, state}, params) {
    const {code, data} = await fetch(Url.expressCompany, params)
    if (code === 200) {
      return data
    }
  },

  // 发货
  async sendProducts ({commit, state}, params) {
    const {code, data} = await post(Url.sendProducts, params)
    if (code === 200) {
      return data
    }
  },

  // 查看订单详情
  async ordertDetail ({commit, state}, params) {
    const {code, data} = await fetch(Url.orderDetail, params)
    if (code === 200) {
      return data
    }
  },
  // 完成
  async orderComplete ({commit, state}, params) {
    const {code, data} = await fetch(Url.orderComplete, params)
    if (code === 200) {
      return data
    }
  },

  // 商户频道类目
  async getDictionariesByType ({commit, state}, params) {
    const {code, data, messageInfo} = await fetch(Url.getDictionariesByType, params)
    if (code === 200) {
      return data
    } else {
      return messageInfo
    }
  }
}

export default actionHfcm
