<!--
 * @Author: caiqin.xie
 * @since: 2019-12-30 18:53:04
 * @lastTime     : 2020-01-16 11:15:44
 * @LastEditors: huangfuchunmei
 * @message: 登录
 -->
<template>
  <div id="Login">
    <!-- <div v-if="!isLogin" class="brand_logo">
      <img :src="this.$store.state.brandLogo" alt="品牌logo">
    </div> -->
    <div class="login">
      <h1 class="login_header">
        <img src="../assets/pic/loginLogo.png" alt="logo">
      </h1>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" placeholder="请输入账号 (必填)" maxlength="50" clearable>
            <i slot="prefix" class="icon iconfont icongerenzhongxin"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="new-password" placeholder="请输入密码 (必填)"  maxlength="20" clearable>
            <i slot="prefix" class="icon iconfont iconpassword"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login_button" type="primary" @click="submitForm('loginForm')">立即登录</el-button>
          <!-- <a class="login_button retrieve_button" @click="retrievePassword('loginForm')"><span class="pointer">找回密码</span></a> -->
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="choose_company" v-else>
      <h1 class="login_header company_header">人力资源业务平台</h1>
      <ChooseCompany class="company_content" @sure='_login'/>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Cookies from 'js-cookie'
// import ChooseCompany from '@/views/RetrievePassword/chooseCompany'
import FormValidate from '@/api/rules.js'
let commonRule = FormValidate.FormValidate
export default {
  components: {
    // ChooseCompany
  },
  data () {
    return {
      isLogin: true,
      loginForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: commonRule.Form('密码').validateUserPassword, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {

  },
  methods: {
    // 登录
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let {userName, password} = this.loginForm
          let payload = {
            username: userName,
            password
          }
          this.login(payload).then(res => {
            if (typeof res === 'string') {
              this.$message.error(res)
            } else {
              let date = new Date()
              date.setDate(date.getDate() + 30)
              window.localStorage.setItem('USERINFO', JSON.stringify(res.account))
              window.localStorage.setItem('timeout', res.account.timeout)
              Cookies.set('JGRZTOKEN', res.jwt, { expires: date })
              this.$store.commit('SETUSERINFO', res.account)
              this.$store.commit('SETCOMPANYID', '')
              this.$store.commit('SETCUSTOMERID', '')
              if (res.account.roleType === 'DIDI_ADMIN_ROLE') {
                this.$router.push({path: '/merchantManagementIndex/list'})
              } else {
                this.$router.push({path: '/GoodsManageList'})
              }
            }
          })
        } else {
          return false
        }
      })
    },

    // 找回密码
    // retrievePassword () {
    //   this.$router.push({name: 'RetrievePassword'})
    // },

    // 选择客户之后的登录
    // _login () {
    //   this.$router.push({path: '/merchantManagementIndex/list'})
    // },

    ...mapActions(['login'])
  }
}
</script>

<style lang='less' scoped>
  #Login{
    background: url('../assets/pic/loginBg.png') no-repeat center;
    background-size: cover;
    justify-content: center;
    height: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    .login{
      width: 470px;
      height: 500px;
      background-color: #fff;
      border-radius: 5px;
      padding: 25px 65px 70px 65px;
    }
    .login .el-form{
      .el-form-item {
        margin: 0;
        flex: 0 0 auto;
        /deep/ .el-input__prefix {
          right: auto;
          left: 0;
          color: #999999;
          line-height: 46px !important;
        }
        /deep/ .el-input--prefix .el-input__inner {
          padding-left: 30px;
          border: none;
          font-size: 16px;
          line-height: 1;
          border-radius: 0;
          background-color: #fff !important;
          border-bottom: 1px solid #eeeeee;
        }
        .el-input {
          font-size: 16px;
          height: 46px;
          line-height: 46px;
          margin-top: 40px;
        }
      }
      /deep/ .login_button{
        width: 100%;
        margin-top: 60px;
        font-size: 16px;
        padding: 9px 0;
        border-radius: 2px;
      }
      .login_button.retrieve_button{
        display: block;
        font-size: 16px;
        text-align: center;
      }
    }
    // .choose_company{
    //   display: flex;
    //   flex-direction: column;
    //   justify-content: center;
    //   align-items: center;
    //   .company_content{
    //     width: 862px;
    //     /deep/ .el-tab-pane{
    //       padding: 0 40px;
    //     }
    //   }
    // }
  }
</style>
