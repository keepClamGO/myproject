<!--
 * @Descripttion: 供应商管理列表
 * @Author: huangfuchunmei
 * @Date: 2021-03-31 13:47:35
 * @LastEditors: wangyu
 * @LastEditTime: 2021-04-14 11:36:10
-->
<template>
  <div class="merchant_list main_wrap">
    <div class="breadCrumb_container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <i class="iconfont icondingwei"></i>
        <el-breadcrumb-item>供应商管理</el-breadcrumb-item>
        <el-breadcrumb-item>列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <ModuleTitle>
      <p slot="title">供应商管理列表</p>
      <p slot="btnGroup">
        <el-button size="small" type="primary" @click="newMerchant()">创建供应商</el-button>
      </p>
    </ModuleTitle>
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
          <el-table-column type="selection" align="center" :reserve-selection='true' v-if='show' show-overflow-tooltip></el-table-column>
          <el-table-column show-overflow-tooltip prop="merchantCode" align="right" label="供应商编号" min-width="80"></el-table-column>
          <el-table-column show-overflow-tooltip prop="releaseChannel" label="商户频道" min-width="100">
            <template slot-scope="scope">
              <span>
                <!--1=桔厂内购,4桔厂旅行，5桔厂美食，6桔厂闪购，7桔厂丽人，8桔厂亲子-->
                  {{ statusHash[scope.row.releaseChannel] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="merchantName" label="供应商名称" min-width="100"></el-table-column>
          <el-table-column show-overflow-tooltip prop="merchantAddress"  label="供应商地址" min-width="150"></el-table-column>
          <el-table-column show-overflow-tooltip prop="mobilePhone" label="供应商联系电话" min-width="100">
            <template slot-scope="scope">{{scope.row.mobilePhone | phone}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="createdBy" label="创建人" min-width="100"></el-table-column>
          <el-table-column show-overflow-tooltip prop="updateTime" label="更新时间" min-width="150">
            <template slot-scope="scope">{{scope.row.updateTime ? $moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss') : '--'}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" fixed="right" show-overflow-tooltip  min-width="100">
            <template slot-scope="scope">
              <el-popover
                popper-class="popper_dark"
                :ref="'popover-' + scope.$index"
                placement="left"
                trigger="click">
                <ul style="right:-75px">
                  <!--<li class="operation_orange" @click="viewDetails(scope.row)">查看</li>-->
                  <li class="operation_green" @click="updateDetails(scope.row)">编辑</li>
                  <li class="operation_red" @click="deleteDetails(scope.row)">删除</li>
                  <!-- <li class="operation_blue" v-if="scope.row.status === '未审核'" @click="auditMerchant(scope.row)">审核</li> -->
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
import ModuleTitle from '../../components/ModuleTitle.vue'
import {statusHash} from '@/common/js/index'
export default {
  data () {
    return {
      statusHash: statusHash,
      tableData: [],
      total: 0,
      page: 0,
      rows: 20,
      pageNum: 1,
      show: false,
      rowKey (row) {
        return row.id
      },
      selectRow: [],
      multipleSelection: []
    }
  },
  computed: {
  },

  components: {
    ModuleTitle
  },

  created () {
    this.getMerchantList()
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
    // 报表管理列表
    getMerchantList () {
      let {page, rows} = this
      let payload = {
        page,
        rows
      }
      this.merchantList(payload).then(res => {
        this.tableData = res.records
        this.total = Number(res.total)
        this.pageNum = Number(res.pages)
      })
    },

    // 分页器页码改变
    handleCurrentChange (val) {
      this.page = val
      this.getMerchantList()
    },

    // 分页器页数改变
    handleSizeChange (val) {
      this.page = 1
      this.rows = val
      this.pages = 1
      this.getMerchantList()
    },

    // 新建供应商
    newMerchant () {
      this.$router.push({
        path: '/merchantManagementIndex/add',
        query: {
          type: 'new'
        }
      })
    },

    // 查看
    viewDetails (data) {
      this.$router.push({
        path: '/merchantManagementIndex/add',
        query: {
          type: 'view',
          id: data.id
        }
      })
    },
    // 编辑
    updateDetails (data) {
      this.$router.push({
        path: '/merchantManagementIndex/add',
        query: {
          type: 'update',
          id: data.id
        }
      })
    },
    // 删除
    deleteDetails (data) {
      this.$confirm('您确认删除该供应商吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.merchantDelete(data).then(res => {
          this.$message.success('删除成功')
          this.getMerchantList()
        })
      }).catch(() => {
      })
    },

    // 审核
    auditMerchant (row) {
      this.$confirm('您是否确认对该供应商的审核？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.merchantReview(row.id).then(res => {
          this.$message.success('审核成功')
          this.getMerchantList()
        })
      }).catch(() => {
      })
    },

    // 表格
    handleSelectionChange (val) {
      console.log(val)
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

    ...mapActions([
      'userList',
      'merchantList',
      'merchantDelete',
      'merchantReview'
    ])
  }
}
</script>
<style lang="less" scoped>

</style>
