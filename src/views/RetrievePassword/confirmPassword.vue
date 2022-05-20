<!--
 * @Author: caiqin.xie
 * @since: 2019-12-30 18:53:04
 * @lastTime     : 2020-01-17 11:39:10
 * @LastEditors  : caiqin.xie
 * @message: 找回密码---确认密码
 -->
<template>
  <el-form :model="confirmPassword" :rules="rules" ref="confirmPassword" class="retrievePwdForm">
    <el-form-item prop="password">
      <el-input :type="type" @focus="type='password'" v-model="confirmPassword.password" autocomplete="new-password" placeholder="请输入新密码" clearable>
        <i slot="prefix" class="icon iconfont icon-suo"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="checkPassword">
      <el-input :type="type" @focus="type='password'" v-model="confirmPassword.checkPassword" autocomplete="new-password" placeholder="请确认密码"  clearable>
        <i slot="prefix" class="icon iconfont icon-suo"></i>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="login_button" type="primary" @click="next('confirmPassword')">确定</el-button>
      <a class="login_button retrieve_button" @click="backToLogin"><span class="pointer">返回登录</span></a>
    </el-form-item>
  </el-form>
</template>

<script>
import FormValidate from '@/api/rules.js'
import {mapActions} from 'vuex'
let commonRule = FormValidate.FormValidate
let reg = /^[\da-zA-Z~!@#$%^&*]{6,20}$/
export default {
  props: ['mobile', 'verificationCode'],
  data () {
    let validateCheckPwd = (rule, value, callback) => {
      if (value && this.confirmPassword.password === '') {
        this.confirmPassword.checkPassword = ''
        return callback(new Error('请先输入新密码'))
      }
      if (value === '') {
        callback(new Error('确认新密码不可为空'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入6-20位字符,格式为数字,字母（大小写）,特殊字符'))
      } else if (value !== this.confirmPassword.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      type: 'text',
      confirmPassword: {
        password: '',
        checkPassword: ''
      },
      rules: {
        password: [
          { required: true, validator: commonRule.Form('新密码').validateUserPassword, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, validator: validateCheckPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 下一步
    next (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let payload = {
            mobile: this.mobile,
            verificationCode: this.verificationCode,
            password: this.confirmPassword.password
          }
          this.retrievePassword(payload).then(res => {
            this.$message.success('密码找回成功')
            this.$emit('next', {active: '1'})
          })
        } else {
          return false
        }
      })
    },

    // 返回登录
    backToLogin () {
      this.$router.push({name: 'Login'})
    },
    ...mapActions(['retrievePassword'])
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
