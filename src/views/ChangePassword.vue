<!--
 * @Author: caiqin.xie
 * @since: 2020-01-07 17:47:26
 * @lastTime     : 2020-01-20 14:52:09
 * @LastEditors  : caiqin.xie
 * @message: 修改密码
 -->
<template>
  <div class="container">
    <ModuleTitle><p>修改密码</p></ModuleTitle>
    <el-form :model="passwordForm" :rules="rules" ref="passwordForm" label-position='top' class="passwordForm">
      <el-form-item label="原密码 (必填)" prop="oldPassword">
        <el-input type="password" v-model="passwordForm.oldPassword" autocomplete="new-password"></el-input>
      </el-form-item>
      <el-form-item label="新密码 (必填)" prop="newPassword">
        <el-input type="password" v-model="passwordForm.newPassword" autocomplete="new-password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码 (必填)" prop="checkPassword">
        <el-input type="password" v-model="passwordForm.checkPassword" autocomplete="new-password"></el-input>
      </el-form-item>
      <el-form-item class="btn_group">
        <el-button class="blackBtn" @click="resetForm('passwordForm')">取消</el-button>
        <el-button class="redBtn" @click="submitForm('passwordForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import FormValidate from '@/api/rules.js'
import {mapActions} from 'vuex'
let commonRule = FormValidate.FormValidate
let reg = /^[\da-zA-Z~!@#$%^&*]{6,20}$/
export default {
  data () {
    let validateNewPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('新密码不可为空'))
      } else {
        if (this.passwordForm.oldPassword === '') {
          callback(new Error('请先输入旧密码'))
          this.passwordForm.newPassword = ''
        } else {
          if (!reg.test(value)) {
            callback(new Error('请输入6-20位字符,格式为数字,字母（大小写）,特殊字符'))
          } else {
            if (this.passwordForm.oldPassword === this.passwordForm.newPassword) {
              callback(new Error('新密码和旧密码一致，请重新输入'))
            } else {
              callback()
            }
          }
        }
      }
    }
    let validateCheckPwd = (rule, value, callback) => {
      if (value && this.passwordForm.newPassword === '') {
        this.passwordForm.checkPassword = ''
        return callback(new Error('请先输入新密码'))
      }
      if (value === '') {
        callback(new Error('确认新密码不可为空'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入6-20位字符，格式为数值、字母（大小写）、特殊字符'))
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, validator: commonRule.Form('原密码').validateUserPassword, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validateNewPwd, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, validator: validateCheckPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(this.$store.state.UserInfo)
          let payload = {
            id: this.$store.state.UserInfo.userId,
            password: this.passwordForm.newPassword,
            oldPassword: this.passwordForm.oldPassword
          }
          this.updatePassword(payload).then(res => {
            if (res) {
              this.$message.success('修改密码成功')
            }
          })
        }
      })
    },
    resetForm (form) {
      this.$router.go(-1)
    },
    ...mapActions(['updatePassword'])
  }

}
</script>
<style lang="less" scoped>
  .passwordForm{
    width: 404px;
    /deep/ .el-form-item__content{
      height: 34px;
    }
    /deep/ .el-form-item__label{
      line-height: 1;
      .font();
    }
    .btn_group{
      text-align: right;
      margin-top: 30px;
    }
  }
</style>
