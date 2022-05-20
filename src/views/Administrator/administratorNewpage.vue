<template>
  <div class='wrap'>
    <div class="breadCrumb_container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <i class="iconfont icondingwei"></i>
        <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{title}}管理员</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
     <ModuleTitle>
      <p>{{title}}管理员</p>
      <p v-if='Number(this.$route.query.type) !== 1'>
        <el-button size="small" class="backBtn" @click='goBack'>返回</el-button>
      </p>
      <p v-else>
        <el-button size="small" class="cancel" @click='goBack'>取消</el-button>
        <el-button size="small" type="primary" @click='sureSave'>保存</el-button>
      </p>
    </ModuleTitle>
    <div class='cont'>
      <el-form label-position="right" label-width="120px" :model="form" :rules="rules"  ref="form" :disabled="String(this.$route.query.type) !== '1'">
        <el-form-item label="管理员账号" prop='username'>
          <el-input v-model="form.username" placeholder="请输入最长20位的大小写字母和数字以及特殊符号" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input v-model="form.password" placeholder="请输入最长20位的大小写字母和数字以及特殊符号" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop='name'>
          <el-input v-model="form.name" placeholder="请输入1-20的姓名" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop='roleType' class="release_channel">
            <el-checkbox-group v-model="form.roleType">
              <el-checkbox v-for="item in userNameList" :label="item.value" :key="item.value" class="release_channel_item">{{item.name}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import FormValidate from '@/api/rules.js'
let commonRule = FormValidate.FormValidate
export default {
  name: 'administratorNewpage',
  data () {
    return {
      title: '新建',
      form: {
        username: '',
        password: '',
        name: '',
        roleType: []
      },
      userNameList: [{name: '供应商', value: 'MERCHANT_ADMIN_ROLE'}],
      rules: {
        username: [
          { required: true, validator: commonRule.Form().validateAccount, trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, validator: commonRule.Form().validatePassword, trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: '请您输入姓名', trigger: ['blur', 'change'] }
        ],
        roleType: [
          { required: true, message: '请您选择角色名称', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    sureSave () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.roleType = this.form.roleType.join(',')
          this.administratorAdd(this.form).then(res => {
            if (res) {
              this.$message.success('新建成功')
              this.$router.push('/Administrator/list')
            }
          })
          this.form.roleType = this.form.roleType.split(',')
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    _administratorDetail () {
      this.administratorDetail(this.$route.query.id).then(res => {
        for (let i in this.form) {
          this.form[i] = res[i]
        }
        this.form.roleType = this.form.roleType.split(',')
      })
    },
    ...mapActions([
      'administratorAdd',
      'administratorDetail'
    ])
  },
  created () {
    if (String(this.$route.query.type) !== '1') {
      // this.$route.meta.routerName = '查看管理员'
      this.title = '查看'
      this._administratorDetail()
    } else {
      // this.$route.meta.routerName = '新建管理员'
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0 20px 20px 30px;
  color: #333;
 .cont {
   width: 460px;
 }
}
.el-form /deep/ .el-input__inner {
  line-height: 1;
  background: #f6f6f6;
}
.el-form /deep/ .el-form-item__content {
  line-height: 1;
}
.release_channel{
  .release_channel_item{
    transform: translateY(6px);
    /deep/ .el-checkbox__inner{
      display: none !important;
    }
    /deep/ .el-checkbox__label{
      border: 1px solid #fd9054;
      padding: 5px 20px;
      border-radius: 3px;
    }
    /deep/ .el-checkbox__input.is-checked+.el-checkbox__label{
      background: #fff4ee;
      &::after{
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
        border: 5px solid;
        border-color: transparent #fd9054 #fd9054 transparent;
      }
    }
  }
}
</style>
