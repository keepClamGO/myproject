<!--
 * @Author: caiqin.xie
 * @since: 2020-01-03 11:24:27
 * @lastTime     : 2020-01-16 16:20:47
 * @LastEditors  : caiqin.xie
 * @message: 登录--选择所属公司/客户
 -->
<template>
  <el-tabs class="login_tabs" v-model="activeName">
    <el-tab-pane label="所属公司" name="company">
      <el-radio-group v-model="companyId" class="company_list">
        <el-radio v-for="(item,key) in companyList" :key="key" class="radio_width" :label="item.id" border>
          {{item.name}}
          <i class="el-icon-success"></i>
        </el-radio>
      </el-radio-group>
    </el-tab-pane>
    <el-tab-pane label="选择客户" name="customer">
      <div class="customer_content">
        <el-input class="search" v-model="keyword" size="small" placeholder="请输入关键字">
          <i slot="suffix" class="el-input__icon el-icon-search pointer"></i>
        </el-input>
        <div class="customer_list">
          <div class="customer_item">
            <p>绑定客户</p>
            <el-radio-group v-model="customerId" class="customer_group" @change="getCustomer($event,'customer')">
              <el-radio v-for="(item,key) in filterCustomerList" :key="key" :label="item.id" :disabled="item.isExpire==='1'">
                {{item.name}}  {{isDisText[item.isExpire]}}
              </el-radio>
              <div class="no_data" v-if="filterCustomerList.length === 0">暂无数据</div>
            </el-radio-group>
          </div>
          <div class="customer_item" >
            <p>其他客户</p>
            <el-radio-group v-model="otherCustomerId" class="customer_group" @change="getCustomer($event,'otherCustomer')">
              <el-radio v-for="(item,key) in filterOtherList" :key="key" :label="item.id" :disabled="item.isExpire==='1'">
                {{item.name}}  {{isDisText[item.isExpire]}}
              </el-radio>
              <div class="no_data" v-if="filterOtherList.length === 0">暂无数据</div>
            </el-radio-group>
          </div>
        </div>
        <div class="button_group mt30 align_right">
          <el-button class="blackBtn" v-if="showCancel" @click="_cancel">取消</el-button>
          <el-button class="redBtn" @click='_sure'>确定</el-button>
          <el-button class="plain_red" @click="goToOperation" plain="plain" size="mini">操作台</el-button>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  props: {
    showCancel: {
      type: Boolean,
      required: false,
      default: false
    },
    options: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      activeName: 'company',
      companyId: '',
      keyword: '',
      companyList: [],
      customerId: '',
      userCustomerList: [],
      otherCustomerId: '',
      otherCustomerList: [],
      isDisText: ['', '（停止）']
    }
  },
  computed: {
    filterCustomerList () {
      if (this.keyword) {
        return this.userCustomerList.filter(item => {
          return item.name.match(this.keyword)
        })
      } else {
        return this.userCustomerList
      }
    },
    filterOtherList () {
      if (this.keyword) {
        return this.otherCustomerList.filter(item => {
          return item.name.match(this.keyword)
        })
      } else {
        return this.otherCustomerList
      }
    }
  },
  methods: {
    // 确定
    _sure () {
      if (this.customerId || this.otherCustomerId) {
        this._assign()
        this.$emit('sure')
      } else {
        this.$message.warning('请选择一个客户')
      }
    },

    // 赋值
    _assign () {
      let customerId = this.customerId ? this.customerId : this.otherCustomerId
      let companyItem = this.companyList.filter(item => item.id === this.companyId)
      let companyName = companyItem[0].name
      if (this.options) { this.options.companyName = companyName }
      this.$store.commit('SETCOMPANYID', this.companyId)
      this.$store.commit('SETCUSTOMERID', customerId)
      this.$store.commit('SETCOMPANYNAME', companyName)
    },

    // 跳转到操作台
    goToOperation () {
      if (this.customerId || this.otherCustomerId) {
        this._assign()
        if (this.$route.name !== 'systemSettings') {
          this.$router.push({
            path: '/systemSettings'
          })
        }
      } else {
        this.$message.warning('请选择一个客户')
      }
    },

    // 取消
    _cancel () {
      this.$emit('cancel')
    },

    // 获取value并做校验（客户和其他客户只可选择一个）
    getCustomer (val, current) {
      if (val && current === 'customer') {
        this.otherCustomerId = ''
      } else if (val && current === 'otherCustomer') {
        this.customerId = ''
      }
    },

    // 获取公司列表
    getCompanyList () {
    },

    // 获取客户列表
    getCustomerList () {
      this.customerId = ''
      this.otherCustomerId = ''
      let payload = {
        companyId: this.companyId
      }
      this.chooseCustomer(payload).then(res => {
        this.userCustomerList = res.binding || []
        this.otherCustomerList = res.other || []
        let storeCustomerId = this.$store.state.customerId
        this.userCustomerList.map(item => {
          if (item.id === storeCustomerId) {
            this.customerId = storeCustomerId
          }
        })
        this.otherCustomerList.map(item => {
          if (item.id === storeCustomerId) {
            this.otherCustomerId = storeCustomerId
          }
        })
      })
    },

    // 获取logo
    getCompanyLogo () {
      let payload = {
        companyId: this.companyId
      }
      this.companyLogo(payload).then(res => {
        this.$store.commit('SETBRANDLOGO', res.companyBrandLogoUrl)
        this.$store.commit('SETCOMPANYLOGO', res.companyLogoUrl)
      })
    },
    ...mapActions(['chooseCompany', 'chooseCustomer', 'companyLogo'])
  },
  watch: {
    'companyId' (newVal, oldVal) {
      this.getCustomerList()
      this.getCompanyLogo()
    }
  },
  created () {
    this.getCompanyList()
  }
}
</script>
<style lang="less" scoped>
  .login_tabs{
    height: 480px;
    /deep/ .el-tabs__header{
      margin-bottom: 28px;
    }
    /deep/ .el-tabs__nav{
      left: 50%;
      transform: translateX(-50%) !important;
      .el-tabs__item{
        font-size: 16px;
        padding: 0 28px;
      }
    }
    /deep/ .el-tabs__nav-wrap{
      &::after{
        height: 1px;
        background-color: #eee;
      }
    }
    /deep/ .el-tabs__content{
      height: 412px;
      overflow: auto;
    }
    .radio_width{
      width: 376px;
    }
    .company_list{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      /deep/ .el-radio{
        padding: 8px 0;
        text-align: center;
        display: block;
        .el-radio__inner{
          opacity: 0;
          position: absolute;
        }
        .el-radio__label{
          padding: 0;
          i{
            margin-left: 15px;
            font-size: 18px;
            color: #fff;
          }
        }
        .el-radio__input.is-checked+.el-radio__label i{
          color: @red;
        }
      }
      .el-radio.is-bordered{
        margin: 0 0 20px 0;
      }
    }
    .customer_content{
      width: 502px;
      margin: 0 auto;
      .search{
        margin-bottom: 20px;
      }
      .customer_list{
        display: flex;
      }
      .customer_item{
        width: 240px;
        &+.customer_item{
          margin-left: 22px;
        }
        .font(12px,#333);
        overflow: hidden;
        p{
          line-height: 1;
          padding: 10px 0;
        }
        .customer_group{
          padding: 20px;
          background: #f8f8f8;
          width: 100%;
          overflow: auto;
          height: 260px;
        }
        /deep/ .el-radio{
          margin: 0 0 15px 0;
          display: block;
          /deep/ .el-radio__label{
            font-size: 12px;
          }
        }
      }
    }
  }
  .no_data{
    .font(12px,#666)
  }
</style>
