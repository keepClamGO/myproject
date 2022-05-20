// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import enLocale from '../node_modules/element-ui/lib/locale/lang/en'
import zhLocale from '../node_modules/element-ui/lib/locale/lang/zh-CN'
import zhElementLocale from './assets/Element-Lang/zh-CN'
import enJson from './assets/lang/en' // 英文
import cnJson from './assets/lang/cn' // 中文.
import VueI18n from 'vue-i18n'
import GeminiScrollbar from 'vue-gemini-scrollbar' // 改变默认滚动条样式
import VueDnd from 'awe-dnd' // 拖拽
import filter from './api/filter' // 过滤器
import rules from './api/rules.js' // 验证
import store from './store'
import './assets/style/index.css' // element 初始化
import './assets/style/reset.less' // css 初始化
import './assets/style/iconfont.css' // 字体
import './assets/style/common.less' // 公共样式
import moment from 'moment'// 时间插件
import ModuleTitle from './components/ModuleTitle'
// import common from './common/js/common'
import common from './api/common'
// // 富文本编辑器
// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false

Vue.use(VueDnd)
Vue.use(VueI18n)
Vue.use(GeminiScrollbar)
// Vue.use(VueQuillEditor)
Vue.prototype.$moment = moment
Vue.prototype.$common = common
const ElTab = {
  install: function (Vue) {
    Vue.component('ModuleTitle', ModuleTitle)
    Vue.prototype.$momentTime = (value, type) => {
      return Vue.prototype.$moment(value).format(type)
    }
  }
}
Vue.use(ElTab)

const messages = {
  en: {
    ...enJson,
    ...enLocale
  },
  zh: {
    ...cnJson.login,
    ...cnJson.mainIndex,
    ...cnJson.employee,
    ...cnJson.employeRoster,
    ...cnJson.organization,
    ...cnJson.salary,
    ...cnJson.department,
    ...cnJson.welfare,
    ...cnJson.common,
    ...cnJson.error,
    ...cnJson.changePassword,
    ...cnJson.systemSettings,
    ...cnJson.salaryaccount,
    ...cnJson.bankOffer,
    ...cnJson.payroll,
    ...zhLocale,
    ...zhElementLocale,
    ...cnJson.position,
    ...cnJson.stayPositiveInfo
  }
}
const i18n = new VueI18n({
  locale: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'zh', // set locale
  messages // set locale messages
})

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  filter,
  rules,
  store,
  components: { App },
  template: '<App/>'
})

export { i18n, Vue }
