<!--
 * @Descripttion:
 * @Author: huangfuchunmei
 * @Date: 2021-03-30 12:08:07
 * @LastEditors: wangyu
 * @LastEditTime: 2021-04-13 17:01:48
-->
<template>
  <div class="heade_container">
    <div class="logo">
      <img src="../assets/pic/img1.png" alt="">
    </div>
    <div class="heade_picture pointer">
      <i slot="prefix" class="icon iconfont icongerenzhongxin"></i>
      <span class="user_name el-dropdown-link">
        {{UserInfo && UserInfo.name}}
      </span>
      <el-button class='btn' @click='logOut'>退出</el-button>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
// import ChooseCompany from '@/views/RetrievePassword/chooseCompany'
import Cookies from 'js-cookie'
export default {
  name: 'Header',
  components: {
    // ChooseCompany
  },
  data () {
    return {
      onLine: navigator.onLine
    }
  },
  computed: {
    UserInfo () {
      return JSON.parse(localStorage.getItem('USERINFO'))
    }
  },
  mounted () {
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
  },
  methods: {
    // 退出
    logOut () {
      console.log(this.onLine, 'this.onLine')
      if (!this.onLine) {
        MessageBox({
          type: 'warning',
          title: '提示',
          message: '请检查您的网络'
        })
        return false
      }
      this.$store.commit('SETUSERINFO', null)
      this.$store.commit('SETCOMPANYID', null)
      this.$store.commit('SETCUSTOMERID', null)
      this.$store.commit('SETBRANDLOGO', null)
      this.$store.commit('SETCOMPANYLOGO', null)
      this.$store.commit('SETCOMPANYNAME', null)
      window.sessionStorage.clear()
      window.localStorage.clear()
      Cookies.remove('JGRZTOKEN')
      this.$router.push('/login')
    },
    updateOnlineStatus (e) {
      const { type } = e
      this.onLine = type === 'online'
    }
  }
}
</script>

<style lang="less" scoped>
  .heade_container{
    width: 100%;
    height: 70px;
    padding: 0 20px;
    background: #3c3c44;
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.07);
    display: flex;
    // justify-content: flex-end;
    justify-content: space-between;
    align-items: center;
    .heade_picture{
      display: flex;
      align-items: center;
      color: #fff;
      margin-left: 60px;
      // margin-right: 20px;
      font-size: 14px;
      .user_name {
        margin: 0 20px 0 10px;
      }
      .btn {
        font-size: 12px;
        padding: 2px 10px;
        background-color:#3c3c44;
        border-radius: 4px;
        border: solid 1px #fd9054;
        outline: none;
        color:  #fd9054;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .logo{
      // width: 100%;
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
    }
  }
</style>
<style lang="less">
.el-popper.company_popover{
  padding: 10px 20px 20px;
}
.user_dropdown .el-dropdown-menu__item{
  width: 100px;
}
</style>
