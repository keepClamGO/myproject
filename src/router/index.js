/*
 * @Author: caiqin.xie
 * @since: 2019-12-30 18:49:50
 * @lastTime     : 2020-01-16 16:20:08
 * @LastEditors: huangfuchunmei
 * @message:
 */
import Vue from 'vue'
import Router from 'vue-router'

// 懒加载导入组件
// const HomePage = () => import('../views/HomePage')
const index = () => import('../views/index')
const Login = () => import('../views/Login')
const RetrievePassword = () => import('@/views/RetrievePassword')
const ChangePassword = () => import('@/views/ChangePassword')
const GoodsManagelist = () => import('@/views/Goods/GoodsManageList')
const GoodsManagePage = () => import('@/views/Goods/GoodsManagePage')
const merchantManagementList = () => import('@/views/merchantManagement/list')
const merchantManagementAdd = () => import('@/views/merchantManagement/add')
const orderManagementList = () => import('@/views/orderManagement/list')
const orderManagementDetail = () => import('@/views/orderManagement/detail')

// 管理员管理
const administratorList = () => import('@/views/Administrator/administratorList') // 管理员列表
const administratorNewpage = () => import('@/views/Administrator/administratorNewpage') // 管理员新增/编辑/查看页面
Vue.use(Router)

const RouterView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export default new Router({
  routes: [
    {path: '/', redirect: '/Login'},
    {path: '/Login', name: 'Login', component: Login},
    {path: '/RetrievePassword', name: 'RetrievePassword', component: RetrievePassword},
    {
      path: '/main',
      name: 'index',
      component: index,
      children: [
        // {
        //   path: '/HomePage',
        //   name: 'HomePage',
        //   component: HomePage,
        //   meta: {
        //     requireAuth: true,
        //     routerName: '首页',
        //     disabled: true
        //   }
        // },
        // 修改密码
        {
          path: '/changePassword',
          name: 'ChangePassword',
          component: ChangePassword,
          meta: {
            requireAuth: true,
            routerName: '修改密码',
            disabled: true
          }
        },
        // 商品管理
        {
          path: '/Goods',
          name: 'Goods',
          component: RouterView,
          redirect: '/Goods/GoodsManagelist',
          meta: {
            requireAuth: true,
            routerName: '商品管理',
            disabled: true
          },
          children: [{
            path: '/GoodsManagelist',
            name: 'GoodsManagelist',
            component: GoodsManagelist,
            meta: {
              requireAuth: true,
              routerName: '列表',
              disabled: true,
              activeDefault: '/Goods/GoodsManagelist'
            }
          },
          {
            path: '/goodsManagePage',
            name: 'GoodsManagePage',
            component: GoodsManagePage,
            meta: {
              requireAuth: true,
              routerName: '详情',
              disabled: true,
              activeDefault: '/Goods/GoodsManagelist'
            }
          }]
        },
        // 管理员管理
        {
          path: '/Administrator',
          name: 'Administrator',
          component: RouterView,
          redirect: '/Administrator/list',
          meta: {
            requireAuth: true,
            routerName: '管理员管理',
            disabled: true
          },
          children: [{
            path: 'list',
            name: 'AdministratorList',
            component: administratorList,
            meta: {
              requireAuth: true,
              routerName: '列表',
              disabled: true,
              activeDefault: '/Administrator/list'
            }
          },
          {
            path: 'administratorNewpage',
            name: 'administratorNewpage',
            component: administratorNewpage,
            meta: {
              requireAuth: true,
              routerName: '新建管理员',
              disabled: true,
              activeDefault: '/Administrator/list'
            }
          }]
        },
        // 供应商管理
        {
          path: '/merchantManagementIndex',
          name: '供应商管理',
          component: RouterView,
          redirect: '/merchantManagementIndex/list',
          meta: {
            requireAuth: true,
            disabled: true,
            routerName: '供应商管理'
          },
          children: [
            {
              path: 'list',
              name: 'merchantManagementList',
              component: merchantManagementList,
              meta: {
                requireAuth: true,
                disabled: true,
                routerName: '列表',
                activeDefault: '/merchantManagementIndex/list'
              }
            },
            {
              path: 'add',
              name: 'merchantManagementAdd',
              component: merchantManagementAdd,
              meta: {
                requireAuth: true,
                routerName: '新建供应商',
                disabled: true,
                activeDefault: '/merchantManagementIndex/list'
              }
            }
          ]
        },
        // 订单管理
        {
          path: '/orderManagementIndex',
          name: '订单管理',
          component: RouterView,
          redirect: '/orderManagementIndex/list',
          meta: {
            requireAuth: true,
            disabled: true,
            routerName: '订单管理'
          },
          children: [
            {
              path: 'list',
              name: 'orderManagementList',
              component: orderManagementList,
              meta: {
                requireAuth: true,
                disabled: true,
                routerName: '列表',
                activeDefault: '/orderManagementIndex/list'
              }
            },
            {
              path: 'detail',
              name: 'orderManagementDetail',
              component: orderManagementDetail,
              meta: {
                requireAuth: true,
                disabled: true,
                routerName: '订单详情',
                activeDefault: '/orderManagementIndex/list'
              }
            }
          ]
        }
      ]
    }

  ]
})
