<!--
 * @Author: caiqin.xie
 * @since: 2019-12-30 18:53:04
 * @lastTime     : 2020-01-17 16:36:28
 * @LastEditors  : caiqin.xie
 * @message: 找回密码
 -->
<template>
  <div id="retrievePassword">
    <h1 class="retrieve_header">找回密码</h1>
    <div class="baseStep">
      <el-steps class="step" :active="active" finish-status="success">
        <el-step title="验证信息" ></el-step>
        <el-step title="确认密码"></el-step>
        <el-step title="找回成功" ></el-step>
        <el-step style="display: none" title="找回成功"></el-step>
      </el-steps>
    </div>
    <!-- 验证信息 -->
    <CheckInfo v-if="active === 0" @next='nextTo' />

    <!-- 确认密码 -->
    <ConfirmPassword v-if="active === 1" @next='nextTo' :mobile='mobile' :verificationCode='verificationCode' />

    <!-- 找回成功 -->
    <div class="retrieve_success" v-if="active === 2">
      <dl class="success">
        <dt><i class="icon iconfont icon-success"></i></dt>
        <dd>密码找回成功!</dd>
      </dl>
      <p>{{loginTime}}秒后自动跳转到登录页面，若未跳转，可<span class="red pointer" @click="backToLogin">点击跳转</span></p>
    </div>

  </div>
</template>

<script>
import CheckInfo from '@/views/RetrievePassword/checkInfo'
import ConfirmPassword from '@/views/RetrievePassword/confirmPassword'

export default {
  components: {
    CheckInfo,
    ConfirmPassword
  },
  data () {
    return {
      active: 0,
      loginTimer: null,
      loginTime: 3,
      mobile: '',
      verificationCode: ''
    }
  },
  methods: {
    // 下一步
    nextTo (info) {
      if (info.active === '1') {
        this.active++
        if (this.active === 2) {
          const TIME_COUNT = 3
          if (!this.loginTimer) {
            this.loginTime = TIME_COUNT
            this.loginTimer = setInterval(() => {
              if (this.loginTime > 0 && this.loginTime <= TIME_COUNT) {
                this.loginTime--
              } else {
                clearInterval(this.loginTimer)
                this.loginTimer = null
                this.loginTime = 0
                this.backToLogin()
              }
            }, 1000)
          }
        } else {
          this.mobile = info.mobile ? info.mobile : ''
          this.verificationCode = info.verificationCode ? info.verificationCode : ''
        }
      } else {
        return false
      }
    },

    // 返回登录
    backToLogin () {
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style lang='less' scoped>
  #retrievePassword{
    height: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    flex-direction: column;
    .retrieve_header{
      width: 306px;
      text-align: center;
      .font(18px,#333,600);
      position: relative;
      line-height: 1;
      margin-bottom: 40px;
      margin-top: 175px;
    }
    .baseStep{
      width: 500px;
      margin-bottom: 40px;
      /deep/ .el-step__title{
        font-size: 14px;
        line-height: 52px;
      }
    }
    .retrieve_success{
      text-align: center;
      .success{
        .icon{
          line-height: 1;
          .font(76px,#88e399);
        }
        dt{
          margin: 10px 0;
        }
        dd{
          .font(16px,#333,600)
        }
      }
      p{
        .font(14px,#333);
        line-height: 1;
        margin-top: 18px;
        span{
          margin-left: 5px;
        }
      }
      .red{
        color: @red;
      }
    }
  }
</style>
