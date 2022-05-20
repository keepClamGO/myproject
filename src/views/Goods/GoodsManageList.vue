<!--
 * @Author: tianxin,
 * @Date: 2021-04-09 17:00:20,
 * @lastTime: 2021-04-09 17:00:20,
 * @LastEditors: huangfuchunmei
 * @Description: '商品管理列表'
 -->
<template>
  <div class="goods main_wrap">
    <div class="breadCrumb_container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <i class="iconfont icondingwei"></i>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <ModuleTitle>
      <p slot="title">商品管理列表</p>
      <p slot="btnGroup">
        <el-button
          size="small"
          type="primary"
          @click="createGoods"
          >创建商品</el-button
        >
      </p>
    </ModuleTitle>
    <el-form
      :model="didiForm"
      ref="form"
      class="goods_form"
      size="small"
      label-width="85px"
    >
      <div class="form_wrap">
        <div class="row">
          <el-form-item label="商品名称">
            <el-input
              maxlength="1000"
              v-model="didiForm.name"
              placeholder="请输入商品名称进行模糊搜索"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="商品编码">
            <el-input
              maxlength="20"
              v-model="didiForm.code"
              placeholder="请输入商品编码进行模糊搜索"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" prop="merchantId" >
            <el-select v-model="didiForm.merchantId" placeholder="请选择供应商名称" clearable>
              <el-option
                v-for="item in userLists"
                :key="item.merchantId"
                :label="item.merchantName"
                :value="item.merchantId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="城市">
          <el-cascader
            size="small"
            :options="options"
            v-model="didiForm.addressCode"
            placeholder="请选择城市"
            @change="addressChange"
            clearable
          >
          </el-cascader>
        </el-form-item>
          <el-form-item label="商品状态">
            <el-select
              v-model="didiForm.statusSearch"
              placeholder="请选择状态"
              filterable
              clearable
              multiple
            >
              <el-option
                v-for="(item1, index) in statusLists"
                :key="index"
                :label="item1.name"
                :value="item1.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="新建时间">
            <el-date-picker
              v-model="didiForm.createTimeSearch"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <div clas="row">
          <el-form-item label="商品频道" prop="releaseChannel">
            <el-select v-model="didiForm.releaseChannel" placeholder="请选择商户频道" clearable>
              <el-option
                v-for="item in releaseChannelList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="search_wrap">
      <el-button size="small" type="primary" @click="getGoodsList">搜索</el-button
      >
    </div>
    <div style="width: 100%">
      <el-table
        size="mini"
        ref="multipleTable"
        :row-key="rowKey"
        @selection-change="handleSelectionChange"
        :data="records"
        border
        :row-class-name="rowStyle"
        @row-click="clickRow($event, 'multipleTable')"
      >
        <el-table-column prop="code" label="商品编码" align="right" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.category === '4'" class="shopIcon">秒杀</span>
            <span v-if="scope.row.category === '5'" class="shopIcon">团购</span>
            <span>{{scope.row.code}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="releaseChannel" label="商品频道" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>
                <!--9=桔厂内购,4桔厂旅行，5桔厂美食，6桔厂闪购，7桔厂丽人，8桔厂亲子-->
                  {{ statusHash[scope.row.releaseChannel] }}
              </span>
          </template>
        </el-table-column>
        <el-table-column prop="merchantName" label="供应商名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sellingPrice" label="商品价格" show-overflow-tooltip></el-table-column>
        <el-table-column prop="categoryName" label="商品类目" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="stock"
          label="剩余库存"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <div style="width: 100%" class="crease">
              <el-input-number
                size="mini"
                v-model="scope.row.stock"
                @change="changeGoodsNumber($event, scope.row)"
                :disabled="scope.row.status === '1' || scope.row.status === '3' || scope.row.status === '4'"
              ></el-input-number>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ statusListsName[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column prop="createdBy" label="创建人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="updateTime"
          label="更新时间"
        >
          <template slot-scope="scope"
          >{{
            scope.row.updateTime
            ? $moment(scope.row.updateTime).format(
            "YYYY-MM-DD HH:mm:ss"
            )
            : "--"
            }}
          </template
          >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="230">
          <template slot-scope="scope">
            <el-popover
              popper-class="popper_dark"
              :ref="'popover-' + scope.$index"
              placement="left"
              trigger="click"
            >
              <ul class="editUl" style="right:-115px">
                <li class="see" @click="lookGoods(scope.$index, scope.row)">
                  查看
                </li>
                <li
                  class="copy"
                  @click="copyGoods(scope.$index, scope.row)"
                >
                  复制
                </li>
                <li
                  class="edit"
                  @click="editGoods(scope.$index, scope.row)"
                  v-if="(scope.row.status === '1' || scope.row.status === '3' || scope.row.status === '4')"
                >
                  编辑
                </li>
                <li
                  class="up"
                  @click="upGoods(scope.$index, scope.row)"
                  v-if="(scope.row.status === '1' || scope.row.status === '3' || scope.row.status === '4')"
                >
                  上架
                </li>
                <li
                  class="down"
                  @click="downGoods(scope.$index, scope.row)"
                  v-if="scope.row.status === '2'"
                >
                  下架
                </li>
              </ul>
              <span slot="reference" class="cp quitBtn"
              ><i class="iconfont iconcaozuo"></i
              ></span>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      :page-size="rows"
      :page-sizes="[20, 30, 50, 100]"
      layout="sizes, prev, pager, next, total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :total="total"
      :hide-on-single-page="false"
      :current-page.sync="page"
    >
    </el-pagination>
  </div>
</template>
<script>
import { regionDataPlus, CodeToText } from 'element-china-area-data'
import {mapActions} from 'vuex'
import {statusHash} from '@/common/js/index'
export default {
  data () {
    return {
      releaseChannelList: [],
      statusHash: statusHash,
      didiForm: {
        name: '',
        code: '',
        releaseChannelSearch: '',
        categorySearch: '',
        statusSearch: '',
        createTimeSearch: '',
        address: '',
        salePeriodSearch: '',
        merchantId: ''
      },
      rowKey (row) {
        return row.id
      },
      page: 1,
      rows: 20,
      total: 0,
      records: [],
      stocks: {},
      role: '',
      channelLists: [
        {
          id: 1,
          name: '桔厂生活'
        }
      ],
      statusLists: [
        {
          id: 1,
          name: '未上架'
        },
        {
          id: 2,
          name: '已上架'
        },
        {
          id: 3,
          name: '已下架'
        },
        {
          id: 4,
          name: '已结束'
        }
      ],
      statusListsName: ['全部', '未上架', '已上架', '已下架', '已结束'],
      productCategoryListsName: [],
      options: regionDataPlus,
      selectRow: [],
      multipleSelection: [],
      // disabledFlag: false,
      userLists: []
    }
  },
  methods: {
    // 选中高亮选中行
    rowStyle ({ row, rowIndex }) {
      if (this.selectRow.includes(row.id)) {
        console.log(this.selectRow.includes(row.id))
        return 'is-checked'
      }
    },
    // 点击行切换勾选状态
    clickRow (row, table) {
      this.$refs.multipleTable.clearSelection()
      if (row.length === 0) return
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    // 获取管理员列表
    getUserList () {
      this.merchantSelectList().then(res => {
        this.userLists = res
      })
    },
    // 表格
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    // 城市
    addressChange (arr) {
      let _arr = []
      arr.map((item, index) => {
        if (item !== '') {
          _arr.push(item)
        }
      })
      if (_arr.length === 0) { this.didiForm.address = '全部' }
      if (_arr.length === 1) { this.didiForm.address = `${CodeToText[_arr[0]]}` }
      if (_arr.length === 2) { this.didiForm.address = `${CodeToText[_arr[0]]}/${CodeToText[_arr[1]]}` }
      if (_arr.length === 3) { this.didiForm.address = `${CodeToText[_arr[0]]}/${CodeToText[_arr[1]]}/${CodeToText[_arr[2]]}` }
    },
    // 新建商品
    createGoods () {
      this.$router.push({name: 'GoodsManagePage', query: {dotype: '0'}})
    },
    // 查看
    lookGoods (index, row) {
      this.$router.push({name: 'GoodsManagePage', query: {dotype: '1', id: row.id}})
    },
    // 复制
    copyGoods (index, row) {
      this.$router.push({name: 'GoodsManagePage', query: {dotype: '3', id: row.id}})
    },
    // 编辑
    editGoods (index, row) {
      this.$router.push({name: 'GoodsManagePage', query: {dotype: '2', id: row.id}})
    },
    // 上架
    upGoods (index, row) {
      let payload = {
        id: row.id,
        status: 2
      }
      this.$confirm('您确认上架该商品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.goodsUpdateStatus(payload).then(res => {
          if (res.code !== '200') {
            this.$message.error(res.mesg)
          } else {
            this.$message.success('上架成功')
            this.getGoodsList()
          }
        })
      }).catch(() => {
      })
    },
    // 下架
    downGoods (index, row) {
      let payload = {
        id: row.id,
        status: 3
      }
      this.$confirm('您确认下架该商品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.goodsUpdateStatus(payload).then(res => {
          this.$message.success('下架成功')
          this.getGoodsList()
        })
      }).catch(() => {
      })
    },
    // 修改库存
    changeGoodsNumber (value, row) {
      if (value > '99999999') {
        this.$message.warning('请输入0-99999999以内的数字')
        row.stock = this.stocks[row.id]
        return false
      }
      if (value < '0') {
        this.$message.warning('请输入0-99999999以内的数字')
        row.stock = this.stocks[row.id]
        return false
      }
      let payload = {
        id: row.id,
        stock: value
      }
      this.goodsUpdateInventory(payload).then(res => {
        // this.disabledFlag = false
        this.getGoodsList()
      })
    },
    // 改变每页显示条数
    handleSizeChange (val) {
      this.page = 1
      this.rows = val
      this.getGoodsList()
    },
    // 改变当前页
    handleCurrentChange (val) {
      this.page = val
      this.getGoodsList()
    },
    getGoodsList () {
      let payload = {
        ...this.didiForm,
        page: this.page,
        rows: this.rows
      }
      if (payload.statusSearch === 0) {
        payload.statusSearch = ''
      }
      this.goodsList(payload).then(res => {
        console.log(res)
        this.records = res.records || []
        this.page = Number(res.current)
        this.rows = Number(res.size)
        this.total = Number(res.total)
        // 抽取接口库存数据
        this.stocks = this.records.reduce((item, cur, index) => {
          item[`${cur['id']}`] = cur['stock']
          return item
        }, {})
      })
    },
    /* 获取商品类目 */
    getTypeList () {
      this.goodsCategory().then(res => {
        let productCategorys = []
        res.forEach(function (productCategory) {
          productCategorys.push(productCategory.typeName)
        })
        /* 给商品类目赋值 */
        this.productCategoryListsName = productCategorys
      })
    },
    // 商品频道类目列表
    _getDictionariesByType () {
      let payload = {type: 0}
      this.getDictionariesByType(payload).then(res => {
        this.releaseChannelList = res
      })
    },
    ...mapActions(['goodsList', 'goodsUpdateStatus', 'goodsUpdateInventory', 'goodsCategory', 'merchantSelectList', 'getDictionariesByType'])
  },
  created () {
    let temp = regionDataPlus.filter(item => {
      return item.label !== '全部'
    })
    this.options = temp
    this.getGoodsList()
    this.getUserList()
    this.getTypeList()
    this.role = JSON.parse(localStorage.getItem('USERINFO')).roleType
    this._getDictionariesByType()
  }
}
</script>
<style lang="less" scoped>
.goods {
  width: 100%;
  padding: 0 20px 0 30px;
}
.search_wrap {
  height: 78px;
  line-height: 78px;
  text-align: right;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 30px;
  .search_goods {
    padding: 0 15px;
  }
}
.goods_form {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-input {
    width: 290px;
  }
  /deep/ .el-date-editor,
  /deep/ .el-range-editor,
  /deep/ .el-input__inner, /deep/ .el-date-editor--datetimerange,
  /deep/ .el-range-editor--small {
    width:  290px !important;
  }
  /deep/ .el-input--small, /deep/ .el-input__inner {
    width:  290px;
    line-height: 1;
  }
  /deep/ .el-tooltip__popper.is-light {
    background: #fff;
    border: 1px solid #fff;
  }
}
.el-pagination {
  text-align: right;
  font-size: 12px !important;
  height: 60px;
}
.crease /deep/ .el-input-number,
.crease /deep/ .el-input-number--mini {
  width: 100%;
}
.crease /deep/ .el-input-number__decrease,
.crease /deep/ .el-input-number__increase {
  height: 28px;
  line-height: 28px;
  background: #fff;
  font-size: 14px;
  border: 0;
}
/deep/ .el-select-dropdown,
/deep/ .el-popper {
  min-width: 300px;
  width: 300px;
}
.form_wrap{
  padding-right: 10px;
  .el-form-item {
    width: 368px;
  }
  .el-form-item .el-date-editor {
    width: 100%;
  }
  .row{
    display: flex;
    width: 100%;
    .el-form-item{
      display: inline-block;
    }
    justify-content: space-between;
  }
}
.shopIcon{
  padding:4px;
  background-color: #fd9054;
  color: #fff;
  border-radius: 4px;
}
</style>
<style>
.el-cascader-panel {
  font-size: 12px !important;
}
.el-select-dropdown {
  min-width: 300px !important;
  width: 300px !important;
}
input {
  line-height: normal;
}
</style>
