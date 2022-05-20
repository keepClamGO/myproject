/**
 * @Author: wangyu
 * @date: 2020-01-08 15:11:45
 * @Description: 过滤器
 */
import Vue from 'vue'
Vue.filter('phone', value => {
  if (value) {
    return value.substr(0, 3) + '****' + value.substr(7)
  }
})

Vue.filter('cardID', value => {
  if (value) {
    return value.replace(/^(.{4})(?:\d+)(.{4})$/, '$1******$2')
  }
})

Vue.filter('phone', value => {
  if (value) {
    return value.substr(0, 3) + '****' + value.substr(7)
  }
})

// yyyy-MM-dd
Vue.filter('formatDate', (value) => {
  let time = new Date(value)
  function timeAdd0 (str) {
    if (str < 10) {
      str = '0' + str
    }
    return str
  }
  let y = time.getFullYear()
  let m = time.getMonth() + 1
  let d = time.getDate()
  if (value) {
    return y + '-' + timeAdd0(m) + '-' + timeAdd0(d)
  }
})
// yyyy-MM
Vue.filter('formatMonth', (value) => {
  let time = new Date(value)
  function timeAdd0 (str) {
    if (str < 10) {
      str = '0' + str
    }
    return str
  }
  let y = time.getFullYear()
  let m = time.getMonth() + 1
  if (value) {
    return y + '-' + timeAdd0(m)
  }
})

// 时间戳转化为年月日时分秒
Vue.filter('formatDateTime', (value) => {
  let time = new Date(value)
  let Y = time.getFullYear() + '-'
  let M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-'
  let D = time.getDate() + ' '
  let h = (time.getHours() < 10 ? '0' + (time.getHours()) : time.getHours()) + ':'
  let m = (time.getMinutes() < 10 ? '0' + (time.getMinutes()) : time.getMinutes()) + ':'
  let s = (time.getSeconds() < 10 ? '0' + (time.getSeconds()) : time.getSeconds())
  if (value) {
    return Y + M + D + h + m + s
  }
})

// 时间戳转化为年月日时分
Vue.filter('formatDateMinutes', (value) => {
  let time = new Date(value)
  function timeAdd0 (str) {
    if (str < 10) {
      str = '0' + str
    }
    return str
  }
  let Y = time.getFullYear()
  let M = timeAdd0(time.getMonth() + 1)
  let D = timeAdd0(time.getDate())
  let h = timeAdd0(time.getHours())
  let m = timeAdd0(time.getMinutes())
  if (value) {
    return Y + '-' + M + '-' + D + ' ' + h + ':' + m
  }
})

// 列表
Vue.filter('tableFilter', (value, name) => {
  let showStateArr = ['正常', '无效']
  switch (name) {
    case 'dateFormate':
      return value + '123123'
    case 'userNum':
      return value + '223'
    case 'showState':
      return showStateArr[value]
    default:
      return value
  }
})

Vue.filter('nameFilter', (value) => {
  return value.substr(0, 1) + '*' + value.slice(2)
})
export default{}
