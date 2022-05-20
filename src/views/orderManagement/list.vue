<!--
 * @Descripttion: 订单管理列表
 * @Author: huangfuchunmei
 * @Date: 2021-03-31 16:52:39
 * @LastEditors: wangyu
 * @LastEditTime: 2021-04-22 09:36:03
-->
<template>
  <div class="order_list main_wrap">
    <div class="breadCrumb_container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <i class="iconfont icondingwei"></i>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <ModuleTitle>
      <p slot="title">订单管理列表</p>
    </ModuleTitle>
    <div class="search_wrap">
      <el-form
        :model="searchForm"
        ref="searchForm"
        class="searchForm"
        :rules="rules"
        label-width="100px"
        label-position="right">
        <div class="row">
          <el-form-item label="订单ID" prop="orderCode">
            <el-input v-model.trim="searchForm.orderCode" maxlength='50' placeholder="请输入订单ID进行模糊搜索" clearable></el-input>
          </el-form-item>
          <el-form-item label="订单创建时间" prop="createTimeFrame">
            <el-date-picker
              v-model="searchForm.createTimeFrame"
              unlink-panels
              clearable
              size="small"
              format="yyyy-MM-dd"
              type="daterange"
              value-format="timestamp"
              @blur="changeTime"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
              >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态" prop="orderStatus" >
            <el-select v-model="searchForm.orderStatus" placeholder="请选择订单状态" clearable>
              <el-option
                v-for="item in orderStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="商品频道" prop="releaseChannel">
            <el-select v-model="searchForm.releaseChannel" placeholder="请选择商品频道" clearable>
              <el-option
                v-for="item in releaseChannelList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="购买人手机号" prop="buyerPhone">
            <el-input v-model.trim="searchForm.buyerPhone" maxlength='11' placeholder="请输入购买人手机号进行模糊搜索" clearable></el-input>
          </el-form-item>
          <el-form-item label="付款时间" prop="paymentTimeFrame">
            <el-date-picker
              v-model="searchForm.paymentTimeFrame"
              align="right"
              unlink-panels
              clearable
              size="small"
              format="yyyy-MM-dd"
              type="daterange"
              value-format="timestamp"
              @blur="changeTime"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="供应商名称" prop="merchantIds" >
            <el-select v-model="searchForm.merchantId" placeholder="请选择供应商名称" clearable>
              <el-option
                v-for="item in userLists"
                :key="item.merchantId"
                :label="item.merchantName"
                :value="item.merchantId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="btn_group">
          <el-button size="small" type="primary" @click="newMerchant()">搜索</el-button>
        </div>
      </el-form>
    </div>
      <div class="content-main">
        <el-table
          size='mini'
          ref="multipleTable"
          :row-key='rowKey'
          @selection-change="handleSelectionChange"
          :data="tableData"
          border
          :row-class-name="rowStyle"
          @row-click="clickRow($event, 'multipleTable')"
        >
          <el-table-column type="selection" align="center" show-overflow-tooltip :reserve-selection='true' v-if='show'></el-table-column>
          <el-table-column show-overflow-tooltip  prop="orderCode" label="订单ID" min-width="80" align="right">
            <template slot-scope="scope" >
              <span v-if="scope.row.category === '4'" class="shopIcon">秒杀</span>
              <span v-if="scope.row.category === '5'" class="shopIcon">团购</span>
              <span>{{scope.row.orderCode}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="releaseChannel" label="商品频道" show-overflow-tooltip align="center" >
            <template slot-scope="scope">
              <span>
                <!--9=桔厂内购,4桔厂旅行，5桔厂美食，6桔厂闪购，7桔厂丽人，8桔厂亲子-->
                  {{ statusHash[scope.row.releaseChannel] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="productName" label="商品名称" min-width="100" align="center" ></el-table-column>
          <el-table-column show-overflow-tooltip prop="buyerPhone" label="购买人手机号" min-width="100" align="center" ></el-table-column>
          <!--<el-table-column show-overflow-tooltip prop="sellingPrice" label="商品价格"></el-table-column>-->
          <el-table-column show-overflow-tooltip label="订单状态" min-width="90" align="center" >
            <template slot-scope="scope">
              {{ orderHash[scope.row.orderStatus] }}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="createTime" label="订单创建时间" min-width="100" align="center" >
            <template slot-scope="scope">{{scope.row.createTime ? $moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') : '--'}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="updateTime" label="修改时间" min-width="100" align="center" >
            <template slot-scope="scope">{{scope.row.updateTime ? $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss') : '--'}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" fixed="right" show-overflow-tooltip min-width="100">
            <template slot-scope="scope">
              <el-popover
                popper-class="popper_dark"
                :ref="'popover-' + scope.$index"
                placement="left"
                trigger="click">
                <ul>
                  <li class="operation_red" @click="viewDetails(scope.row)">详情</li>
                  <li class="operation_blue" v-if="scope.row.orderStatus === '201'" @click="sendGoods(scope.row)">完成</li>
                </ul>
                <span slot="reference" class="cp quitBtn"><i class="iconfont iconcaozuo"></i></span>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 底部分页 -->
      <el-footer class="content-footer">
        <div class="page-box employeePageBox">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[20, 30, 50, 100]"
            :page-size="20"
            layout="sizes, prev, pager, next, total"
            :total="total"
          ></el-pagination>
        </div>
      </el-footer>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapActions } from 'vuex'
import {statusHash, orderHash} from '@/common/js/index'
export default {
  data () {
    return {
      releaseChannelList: [],
      statusHash: statusHash,
      orderHash: orderHash,
      searchForm: {
        merchantId: null,
        orderCode: null,
        orderStatus: null,
        buyerPhone: null,
        createTimeStart: null,
        createTimeEnd: null,
        paymentTimeStart: null,
        paymentTimeEnd: null
      },
      sendForm: {
        courierServicesCompany: null,
        trackingNumber: null
      },
      orderStatusList: [
        {id: '101', 'name': '未付款'},
        {id: '102', 'name': '已取消'},
        {id: '103', 'name': '已取消（系统）'},
        {id: '201', 'name': '已付款'},
        {id: '502', 'name': '退款中'},
        {id: '503', 'name': '已退款'},
        {id: '601', 'name': '已完成'},
        {id: '602', 'name': '清算中'},
        {id: '603', 'name': '清算失败'},
        {id: '506', 'name': '退款失败'}
      ], // 订单状态
      tableData: [],
      userLists: [],
      page: 1,
      rows: 20,
      total: 0,
      pageNum: 1,
      currentRow: null,
      show: false,
      rowKey (row) {
        return row.id
      },
      selectRow: [],
      multipleSelection: [],
      // newDialogVisible: false,
      orderCode: null,
      rules: {
        trackingNumber: [
          { required: true, message: '请输入物流单号', trigger: ['blur', 'change'] }
        ],
        courierServicesCompany: [
          { required: true, message: '请选择快递公司', trigger: ['blur', 'change'] }
        ],
        buyerPhone: [
          { required: false, message: '请输入手机号', trigger: ['blur', 'change'] },
          {pattern: /^[0-9]*$/, message: '请输入最多11位数字', trigger: ['blur', 'change']}
        ]
      }
    }
  },
  computed: {
  },
  watch: {
    multipleSelection (newVal, oldVal) {
      this.selectRow = []
      if (newVal.length > 0) {
        newVal.forEach((item, index) => {
          this.selectRow.push(item.id)
        })
      }
    }
  },
  methods: {
    // 订单详情
    viewDetails (row) {
      this.$router.push({
        path: '/orderManagementIndex/detail',
        query: {
          id: row.id,
          releaseChannel: row.releaseChannel
        }
      })
    },

    // 获取管理员列表
    getUserList () {
      this.merchantSelectList().then(res => {
        this.userLists = res
      })
    },

    // 分页器页码改变
    handleCurrentChange (val) {
      this.page = val
      this._getOrderList()
    },

    // 分页器页数改变
    handleSizeChange (val) {
      this.page = 1
      this.rows = val
      this.pages = 1
      this._getOrderList()
    },

    // 完成
    sendGoods (row) {
      this.$confirm('您确定完成该订单吗？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let payload = {
          id: row.id
        }
        this.orderComplete(payload).then(res => {
          this.$message.success('操作成功')
          this._getOrderList()
        })
      }).catch(() => {
      })
    },

    // 表格
    handleSelectionChange (val) {
      this.multipleSelection = val
    },

    // 点击行切换勾选状态
    clickRow (row, table) {
      // this.$refs.multipleTable.clearSelection()
      // if (row.length === 0) return
      // this.$refs.multipleTable.toggleRowSelection(row)
    },

    // 选中高亮选中行
    rowStyle ({ row, rowIndex }) {
      // if (this.selectRow.includes(row.id)) {
      //   console.log(this.selectRow.includes(row.id))
      //   return 'is-checked'
      // }
    },
    // 强制更新时间
    changeTime () {
      this.$forceUpdate()
    },

    // 订单搜索
    newMerchant () {
      if (this.searchForm.paymentTimeFrame) {
        this.searchForm.paymentTimeStart = this.searchForm.paymentTimeFrame[0]
        this.searchForm.paymentTimeEnd = this.searchForm.paymentTimeFrame[1]
      } else {
        this.searchForm.paymentTimeStart = null
        this.searchForm.paymentTimeEnd = null
      }
      if (this.searchForm.createTimeFrame) {
        this.searchForm.createTimeStart = this.searchForm.createTimeFrame[0]
        this.searchForm.createTimeEnd = this.searchForm.createTimeFrame[1]
      } else {
        this.searchForm.createTimeStart = null
        this.searchForm.createTimeEnd = null
      }
      this.page = 1
      this._getOrderList()
    },

    // 订单管理列表
    _getOrderList () {
      let {page, rows} = this
      let payload = {
        page,
        rows,
        ...this.searchForm
      }

      this.orderList(payload).then(res => {
        this.tableData = res.records
        this.total = Number(res.total)
        this.pageNum = Number(res.pages)
      })
    },
    // 商品频道类目列表
    _getDictionariesByType () {
      let payload = {type: 0}
      this.getDictionariesByType(payload).then(res => {
        this.releaseChannelList = res
      })
    },
    ...mapActions([
      'orderList',
      'merchantSelectList',
      'sendProducts',
      'orderComplete',
      'expressCompany',
      'getDictionariesByType'
    ])
  },
  created () {
    this._getOrderList()
    this.getUserList()
    this._getDictionariesByType()
  }
}
</script>
<style lang="less" scoped>
.searchForm{
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
  .row {
    display: flex;
    justify-content: space-between;
  }
  .el-form-item {
    width: 370px;
    position: relative;
    /deep/ .el-form-item__content {
      line-height: 1;
    }
    /deep/ .el-date-editor {
      width: 100%;
      height: 34px;
      line-height: 1;
      input {
        background: #f6f6f6;
        font-size: 14px;
        color: #666;
      }
    }
  }
  .btn_group {
    text-align: right;
  }
}
/deep/ .el-input__inner {
  font-size: 14px;
  border: none;
  line-height: 1;
  background: #f6f6f6;
}
/deep/ .el-select {
  width: 100%;
}
/deep/ .el-form-item__label {
  line-height: 34px;
  text-align: right;
  font-size: 12px;
}
.el-select-dropdown__item{
  font-size: 14px !important;
}
.shopIcon{
  padding:4px;
  background-color: #fd9054;
  color: #fff;
  border-radius: 4px;
}
</style>
