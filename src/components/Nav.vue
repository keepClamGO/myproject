<!--
 * @Author: caiqin.xie
 * @since: 2019-12-30 17:27:58
 * @lastTime     : 2020-01-15 11:35:43
 * @LastEditors: huangfuchunmei
 * @message:
 -->
<template>
  <div class="nav_container">
    <!-- <div class="logo">
      <img src="../../static/img1.jpg" alt="">
      <p class='pBox'>
        <span>
          {{companyName}}
        </span>
        <span>
          {{companySmallName}}
        </span>
      </p>
    </div> -->
    <el-menu
      class="el-menu-collapse"
      :default-active="defaultActivePath"
      background-color="#fff"
      text-color="#333333"
      ref="meun"
      :unique-opened="true"
      active-text-color="#ea3951"
      active-background-color="#fdebed"
      :collapse="isCollapse"
      :collapse-transition="false"
      v-if="menus.length"
      @open="openFn"
      router
    >
      <!-- <el-menu-item @click="closeItem" class="first-menu" index="/main">
        <i class="iconfont icon-shouye"></i>
        <span slot="title">首页</span>
      </el-menu-item> -->
      <!-- <el-submenu
        v-for="(menu,index) in menus"
        :key="menu.permissionName"
        v-show="menu.permissionList !== null"
        :index="String(index+2)"
      >
        <template slot="title">
          <i class="iconfont" :class="menu.icon"></i>
          <span slot="title">{{menu.permissionName}}</span>
        </template>
      </el-submenu> -->
      <el-menu-item
          v-for="menu in menus"
          :key="menu.permissionName"
          :index="menu.route"
          v-show='UserInfo && menu.i18nKeylist.includes(UserInfo.roleType)'
        >
          <i class="iconfont menu_icon" :class="menu.icon"></i><span slot="title">{{menu.permissionName}}</span>
        </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
      companyName: '桔 厂 内 购',
      companySmallName: 'INTERNAL  PURCHASE',
      isCollapse: false,
      defaultActivePath: this.$route.path,
      menus: [{
        'i18nKeylist': ['DIDI_ADMIN_ROLE'],
        'icon': 'iconshanghu',
        'id': '1',
        'isDisplay': 0,
        'kind': 1,
        'parentId': 0,
        'permissionName': '供应商管理',
        'route': '/merchantManagementIndex/list'
      },
      {
        'i18nKeylist': ['DIDI_ADMIN_ROLE', 'MERCHANT_ADMIN_ROLE'],
        'icon': 'iconshangpin_huaban1',
        'id': '2',
        'isDisplay': 0,
        'kind': 2,
        'parentId': 0,
        'permissionName': '商品管理',
        'route': '/GoodsManageList'
      },
      {
        'i18nKeylist': ['DIDI_ADMIN_ROLE', 'MERCHANT_ADMIN_ROLE'],
        'icon': 'icondingdan',
        'id': '3',
        'isDisplay': 0,
        'kind': 3,
        'parentId': 0,
        'permissionName': '订单管理',
        'route': '/orderManagementIndex/list'
      }]
    }
  },
  computed: {
    UserInfo () {
      return JSON.parse(localStorage.getItem('USERINFO'))
    }
  },
  watch: {
    '$route' (newValue, oldValue) {
      console.log(newValue, 'newValue')
      // let arr = to.path.split('/')
      // switch (arr.length) {
      //   case 4 :
      //     this.obj.defaultActive = `/${arr[1]}/${arr[2]}/${arr[3]}`
      //     break
      //   case 3 :
      //     this.obj.defaultActive = `/${arr[1]}/${arr[2]}`
      //     break
      //   default:
      //     this.obj.defaultActive = this.$route.path
      // }
      // console.log(this.obj.defaultActive)
    }
  },
  methods: {
    closeItem () {
      this.$refs.meun.close(this.index)
    },
    openFn (index) {
      this.index = index
    }
  },
  created () {
  }
}
</script>

<style scoped lang='less'>
  .nav_container{
    height: 100%;
    .logo{
      width: 100%;
      height: 70px;
      background: #3c3c44;
      display: flex;
      justify-content: center;
      align-items: center;
      .font(16px, #fefefe, 600);
      .pBox{
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        span{
          font-size: 16px;
          &:nth-child(2) {
            display: block;
            font-size: 12px;
            transform: scale(.6);
            word-break:keep-all;
            white-space:nowrap;
          }
        }
      }
      img{
        margin-right: 6px;
        width: 38px;
        height: 38px;
        border-radius: 20px;
      }
    }
    .iconfont {
      margin-right: 10px;
      font-size: 20px;
    }
    .menu_icon{
      display: inline-block;
      width: 20px;
    }
    .icondingdan {
      font-size: 14px;
    }
  }

</style>
