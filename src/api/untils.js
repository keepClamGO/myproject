/*
 * @Author: 马强
 * @since: 2019-12-27 14:09:23
 * @lastTime     : 2020-01-20 15:08:29
 * @LastEditors: huangfuchunmei
 * @message:axios  请求拦截
 */
/* eslint-disable */

import axios from 'axios';
import router from '@/router/index'
import authorization from '@/api/author'
import { i18n } from '@/main'
import store from '@/store'
import Vue from 'vue'
import {
  MessageBox,
  Message,
  Loading
} from 'element-ui'
import de from "element-ui/src/locale/lang/de";
let loading //定义loading变量
function startLoading() { //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() { //使用Element loading-close 方法
  loading.close()
}

let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

axios.defaults.timeout = 20000;
axios.defaults.withCredentials = false
// axios.defaults.headers.common['Authorization'] = authorToken();
let BaseUrl = ''
switch(process.env.EVN_CONFIG) {
  case 'development':
    // BaseUrl = 'http://10.8.7.69/hrsp-yanglin' //李杨林
    // BaseUrl = 'http://10.8.7.69:80/bmp-gaoyuan/' //高源
    // BaseUrl = 'http://10.26.2.54:9092' //飞飞
    // BaseUrl = 'http://10.8.7.69/hrsp-yaobo/' //平静
    // BaseUrl = 'http://10.8.7.69:80/bmp-yaobo/' //耀波
    // BaseUrl = 'http://10.8.7.69:9095'//测试地址
    // BaseUrl = 'http://didi.shiyouhelp.com:6080/didi/api'//qa地址
    // BaseUrl = 'https://di-life-admin.1boyun.com/api'//测试地址
    //  BaseUrl = 'http://10.8.7.70:9095'//测试地址
    // BaseUrl = 'http://life.didi.bpo.com/api'//测试地址
    // BaseUrl = 'https://xcq80.1boyun.com/api-xel/'//测试地址
       BaseUrl = 'https://di-life-admin.1boyun.com/api'//测试地址
    break
  case 'develop':
    BaseUrl = window.location.origin + '/api'
    break
  case 'qa':
    BaseUrl = window.location.origin + '/api'
    break
  default:
    BaseUrl = window.location.origin + '/api'
    break
}
axios.defaults.baseURL = BaseUrl
Vue.BASEURL = Vue.prototype.BASEURL = BaseUrl


let num = 0
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    let token = JSON.parse(authorization());
    num++
    store.commit("SETLOADING", true)
    // Vuex.commit("LOADING",true)
    if (!!token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers = {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    } else {
      config.headers = {
        'Content-Type': 'application/json'
      }
    }
    config.data = JSON.stringify(config.data);
    // showFullScreenLoading()
    return config;
  }
);
function codeStatus (error) {
  let code = error.response.data.code
  switch (code) {
    case 400:
      Message.error(error.response.data.messageInfo)
      break
    case 4001:
      if (error.response.data.messageInfo) {
        Message.error(error.response.data.messageInfo)
      } else if(error.response.data.messageKey) {
        Message.error(i18n.t(error.response.data.messageKey))
      }else{
        Message.error('接口返回值不规范')
      }
    break
    case 4002:
      Message.error(error.response.data.messageInfo)
      break
    default:
      console.log(error.response)
      MessageBox({
        type: 'warning',
        title: '提示',
        message: '系统异常，请稍后再试'
      })
  }
}
// 响应拦截

axios.interceptors.response.use(
  response => {
    store.commit("SETLOADING", false)
    return response
  },
  error => {
    store.commit("SETLOADING", false)
    if (error.response) {
      switch (error.response.status) {
        case 400:
          codeStatus(error)
          // return error.response
          break
        case 403:
          MessageBox({
            type: 'warning',
            title: '提示',
            message: '权限未通过校验'
          })
          break
        case 404:
          MessageBox({
            type: 'warning',
            title: '提示',
            message: '链接出错，请检查网络状况'
          })
          break
        case 401:
          let arr = ['key_user_no_have_merchant_error', 'key_ps_and_user_name_error', 'key_user_name_not_fund']
          if (arr.includes(error.response.data.messageKey)) {
            Message.error(error.response.data.messageInfo)
          } else {
            MessageBox({
              type: 'warning',
              title: '提示',
              message: '登录过期, 请先登录'
            })
            router.push({ path: '/login'})
          }
          break
        case 500:
          MessageBox({
            type: 'warning',
            title: '提示',
            message: '系统异常，请稍后再试'
          })
          break
        default:
          MessageBox({
            type: 'warning',
            title: '提示',
            message: '链接出错，请检查网络状况'
          })
      }
    } else {
      Message.error('请检查您的网络')
    }
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        if (response && response.data) {
          resolve(response.data)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装get Download方法
 * @param url
 * @param blob
 * @returns {Promise}
 */

export function getDownload(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
      responseType: 'blob'
    })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * 封装get File方法
 * @param url
 * @param blob
 * @returns {Promise}
 */
export function getFile(url, params = '') {
  return new Promise((resolve, reject) => {
    axios.get(url + '/' + params,{
      responseType: 'blob'
    })
    .then(response => {
      resolve(response)
    })
    .catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post Download方法
 * @param url
 * @param blob
 * @returns {Promise}
 */

export function postDownload(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, {
      responseType: 'blob'
    })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装get方法
 * @param url
 * @single data
 * @returns {Promise}
 */

export function singlefetch(url, params = '') {
  return new Promise((resolve, reject) => {
    axios.get(url + '/' + params)
      .then(response => {
        if (response && response.data) {
          resolve(response.data);
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装delete方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function Delete(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      data: params
    })
      .then(response => {
        if (response) {
          resolve(response.data);
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * 封装delete方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function singleDelete(url, params = '') {
  return new Promise((resolve, reject) => {
    axios.delete(url + '/' + params)
    .then(response => {
      if (response) {
        resolve(response.data);
      }
    })
    .catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装上传头像方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function upload(Url, data) {
  let token = JSON.parse(authorization());
  let instance = axios.create({
    baseURL: process.env.BASEURL,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': token
    },
  });
  return new Promise((resolve, reject) => {
    instance.post(Url, data).then(response => {
      if (response) {
        resolve(response.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
