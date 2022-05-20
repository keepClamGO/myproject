/*
 * @Author: caiqin.xie
 * @since: 2019-12-31 17:04:18
 * @lastTime     : 2020-01-19 16:17:10
 * @LastEditors  : caiqin.xie
 * @message:
 */
/**
 * Created with vue.js
 * User: 马强/529524114@qq.com
 * Date: 2019/4/3
 * Time: 4:29 PM
 * name:$END$
 */
let UserInfo = {
  userName: '马强',
  userId: '1',
  roleType: 'DIDI_ADMIN_ROLE'
}
let loading = false
let batchEditList = []
const state = {
  UserInfo,
  batchEditList,
  loading,
  companyId: '1',
  customerId: '12345',
  companyLogo: '',
  brandLogo: '',
  companyName: '博彦科技'
}

export default state
