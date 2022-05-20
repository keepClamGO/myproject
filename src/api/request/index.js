/*
 * @Descripttion:
 * @Author: huangfuchunmei
 * @Date: 2021-03-30 12:08:07
 * @LastEditors: huangfuchunmei
 * @LastEditTime: 2021-04-06 10:39:01
 */
import * as Login from './url/Login'
import * as Goods from './url/Goods'
import * as Merchant from './url/Merchant'
import * as Order from './url/Order'
import * as administrator from './url/administrator'
let requst = {
  ...Login,
  ...Merchant,
  ...Order,
  ...administrator,
  ...Goods
}

export default requst
