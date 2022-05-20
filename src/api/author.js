/*
 * @Author: 马强
 * @Date: 2019-09-23 10:21:46
 * @LastEditTime: 2019-09-23 10:21:46
 * @LastEditors: 马强
 * @Description:
 */
import Cookies from 'js-cookie'

function authorization () {
  return JSON.stringify(Cookies.get('JGRZTOKEN')) || null
}
export default authorization
