<!--
 * @Descripttion: 订单管理详情
 * @Author: huangfuchunmei
 * @Date: 2021-03-31 13:57:29
 * @LastEditors: huangfuchunmei
 * @LastEditTime: 2021-04-14 15:39:39
-->
<template>
  <div id="order_detail" class="main_wrap">
    <div class="breadCrumb_container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <i class="iconfont icondingwei"></i>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <ModuleTitle>
      <p slot="title">订单管理详情</p>
      <p slot="btnGroup">
        <el-button size="small" class="backBtn" @click="goback">返回</el-button>
      </p>
    </ModuleTitle>
    <div class="content_box">
      <div class="content_top">
        <div class="content_item">
          <p class="sub_title">订单信息</p>
          <div class="content_section">
            <p>订单号：{{detail.orderCode ? detail.orderCode : ''}}</p>
            <p>订单状态：  {{ orderHash[detail.orderStatus] }}</p>
            <p>订单金额：{{detail.actuallyPaidAmount ? detail.actuallyPaidAmount: ''}} 元</p>
          </div>
        </div>
        <div class="content_item">
          <p class="sub_title">买家信息</p>
          <div class="content_section">
            <p>买家姓名：{{detail.buyerName ? detail.buyerName : '--'}}</p>
            <p>联系方式：{{detail.buyerPhone ? detail.buyerPhone : '--'}}</p>
            <p>
              备注：{{detail.leaveMessage ? detail.leaveMessage : '--'}}
            </p>
            <p v-if="this.$route.query.releaseChannel === '6'">
              收货地址：{{detail.bOrderAddress ? detail.bOrderAddress.provinceName: '-'}}
              {{detail.bOrderAddress ? detail.bOrderAddress.cityName : '-'}}
              {{detail.bOrderAddress ? detail.bOrderAddress.countyName : '-'}}
              {{detail.bOrderAddress ? detail.bOrderAddress.detailedAddress : '-'}}</p>
          </div>
        </div>
        <div class="content_item">
          <p class="sub_title">商品信息</p>
          <div class="content_section content_section_last">
            <p>商品名称：{{detail.productName ? detail.productName:'--'}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapActions} from 'vuex'
import {orderHash} from '@/common/js/index'
export default {
  data () {
    return {
      detail: {},
      tableData: [],
      orderHash: orderHash
    }
  },
  watch: {

  },
  methods: {
    // 获取订单详情
    getDetail () {
      let payload = {
        id: this.$route.query.id
      }
      this.ordertDetail(payload).then(res => {
        this.detail = res
      })
    },

    // 返回
    goback () {
      this.$router.back()
    },

    ...mapActions(['ordertDetail'])
  },
  created () {
    this.getDetail()
  }
}
</script>
<style lang="less" scoped>
  #order_detail{
    .content_box{
      padding-bottom: 50px;
    }
    .row{
      display: flex;
    }
    .content_top{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .content_item {
        width: calc(50% - 15px)!important;
        min-width: 450px;
        height: auto;
        margin-bottom: 40px;
        &:nth-child(2n) {
          margin-left: 30px;
        }
        .content_section{
          padding: 30px 0 0 30px;
          min-height: 200px;
          font-size: 14px;
          border-left: 3px solid #fd9054;
          border-right: 1px solid #eee;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          p{
            color: #5d5d5d;
            margin-bottom: 20px;
          }
        }
        .content_section_last{
          min-height:88px;
        }
      }
    }
    .product_table{
      margin-bottom: 0;
    }
    .total{
      display: flex;
      border-bottom: 1px solid #eee;
      background: #f8f8f8;
      font-weight: bold;
      margin-bottom: 30px;
      p{
        width: 140px;
        border-right: 1px solid #eee;
        text-align: center;
        color: #333;
        font-size: 12px;
        padding-left: 10px;
        line-height: 36px;
      }
      p:last-child{
        border-right: none;
        color: #f43f3f;
      }
      p:first-child{
        width: 420px;
        text-align: left;
        padding-left: 63px;
      }
    }
    .sub_title {
      font-size: 14px;
      font-weight: 550;
      color: #333;
      margin-bottom: 20px;
    }
    .table_list{
      width: 700px;
    }
  }
</style>
