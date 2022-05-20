<!--
 * @Author: caiqin.xie
 * @since: 2019-12-30 18:53:04
 * @lastTime     : 2020-01-17 11:37:20
 * @LastEditors  : caiqin.xie
 * @message: 找回密码--验证信息
 -->
<template>

  <el-form :model="retrievePwdForm" :rules="rules" ref="checkInfo" class="retrievePwdForm">
    <el-form-item prop="mobile">
      <el-input v-model="retrievePwdForm.mobile" placeholder="请输入手机号码" maxlength="11" clearable>
        <i slot="prefix" class="icon iconfont icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="verificationCode">
      <el-input v-model="retrievePwdForm.verificationCode" placeholder="请输入验证码" maxlength="6" clearable>
        <i slot="prefix" class="icon iconfont icon-suo"></i>
        <span class="pointer" slot="append" v-if="isGetCode" @click="getCode">获取验证码</span>
        <span class="pointer" slot="append" v-else>{{seconds}}s重新获取</span>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="login_button" type="primary" @click="next('checkInfo')">下一步</el-button>
      <a class="login_button retrieve_button" @click="backToLogin"><span class="pointer">返回登录</span></a>
    </el-form-item>
  </el-form>

</template>

<script>
import FormValidate from '@/api/rules.js'
import {mapActions} from 'vuex'
let commonRule = FormValidate.FormValidate
export default {
  data () {
    return {
      timer: null,
      seconds: 60,
      isGetCode: true,
      retrievePwdForm: {
        mobile: '',
        verificationCode: ''
      },
      rules: {
        mobile: [
          { required: true, validator: commonRule.Form().validatePhone, trigger: 'blur' }
        ],
        verificationCode: [
          { required: true, message: '验证码不可为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 下一步
    next (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let {mobile, verificationCode} = this.retrievePwdForm
          let payload = {
            mobile,
            verificationCode
          }
          this.checkVerificationCode(payload).then(res => {
            this.$emit('next', {
              active: '1',
              mobile,
              verificationCode
            })
          })
        } else {
          return false
        }
      })
    },

    // 获取验证码
    getCode () {
      this.$refs.checkInfo.validateField('mobile', (errorMessage) => {
        console.log(errorMessage)
        if (errorMessage) {
          // 手机号为空
          return false
        } else {
          let payload = {mobile: this.retrievePwdForm.mobile}
          this.getVerificationCode(payload).then(res => {
            this.isGetCode = false
            const TIME_COUNT = 60
            if (!this.timer) {
              this.seconds = TIME_COUNT
              this.timer = setInterval(() => {
                if (this.seconds > 0 && this.seconds <= TIME_COUNT) {
                  this.seconds--
                } else {
                  clearInterval(this.timer)
                  this.timer = null
                  this.seconds = 60
                  this.isGetCode = true
                }
              }, 1000)
            }
          })
        }
      })
    },

    // 返回登录
    backToLogin () {
      this.$router.push({name: 'Login'})
    },
    ...mapActions(['getVerificationCode', 'checkVerificationCode'])
  }
}
</script>

<style lang='less' scoped>

.retrievePwdForm.el-form{
  width: 306px;
  font-size: 16px;
  /deep/ .el-form-item{
    margin-bottom: 44px;
  }
  /deep/ .el-form-item__content /deep/ .el-input {
    /deep/ .el-input__prefix{
      left: 0;
    }
    /deep/ .icon{
      .font(16px,#999);
      text-align: left;
      line-height: 40px;
    }
    /deep/ .el-input__inner{
      border: none;
      border-bottom: 1px solid #eee;
      border-radius: 0;
      background: @bg-fff;
      height: 40px;
      .font(16px,#333);
      &::-webkit-input-placeholder{
        color: #c5c5c5;
      }
    }
    /deep/ .el-input-group__append{
      border: none;
      background: @bg-fff;
      border-bottom: 1px solid #eee;
      border-radius: 0;
      .font(16px,@red);
      padding: 0;
    }
  }
  /deep/ .login_button{
    width: 100%;
    margin: 0 0 10px 0;
    font-size: 16px;
    padding: 9px 0;
    border-radius: 2px;
  }
  .login_button.retrieve_button{
    display: block;
    .font(14px,@red);
    text-align: center;
  }
}

</style>
