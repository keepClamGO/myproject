<template>
  <div class='main_wrap'>
    <div class="breadCrumb_container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <i class="iconfont icondingwei"></i>
        <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
        <el-breadcrumb-item>列表</el-breadcrumb-item>
      </el-breadcrumb>
     </div>
    <ModuleTitle>
      <p>管理员列表</p>
      <el-button size="small" type="primary" @click='goAdd(1)'>新建管理员</el-button>
    </ModuleTitle>
    <div class='content'>
       <TableList
          :total='total'
          :tableData='tableData'
          :dataLibrary='dataLibrary'
          :tableSetting='tableSetting'
          @handleSelectionChanges="handleSelectionChange"
          @handleClickCallBacks='handleClickCallBack'
          @tableChange='tableChange'
        />
    </div>
  </div>
</template>

<script>
import TableList from '@/components/TableList'
import { mapActions } from 'vuex'
export default {
  name: 'administratorList',
  components: {
    TableList
  },
  data () {
    return {
      page: 1,
      rows: 20,
      total: 0,
      tableData: [],
      id: '',
      dataLibrary: [{
        id: 1,
        label: '管理员账号',
        prop: 'username'
      },
      {
        id: 2,
        label: '管理员姓名',
        prop: 'name'
      },
      {
        id: 3,
        label: '角色名称',
        prop: 'roleType'
      },
      {
        id: 4,
        label: '创建人',
        prop: 'createdBy'
      },
      {
        id: 5,
        label: '更新时间',
        prop: 'updateTime',
        momentType: 'YYYY-MM-DD HH:mm:ss'
      }],
      tableSetting: {
        hasSelect: false,
        userOperation: [{text: '查看', className: 'operation_red', clicks: () => { this.goAdd('2') }}],
        morePage: true,
        checked: false
      }
    }
  },
  methods: {
    handleSelectionChange () {
    },
    tableChange (page, rows) {
      this.page = page
      this.rows = rows
      this._administratorList()
    },
    handleClickCallBack (val, Fun) {
      this.id = val.id
      Fun()
    },
    goAdd (type) {
      this.$router.push({
        path: '/Administrator/administratorNewpage',
        query: {type, id: this.id}
      })
    },
    _administratorList () {
      let {page, rows} = this
      let payload = {
        page,
        rows
      }
      this.administratorList(payload).then(res => {
        this.total = Number(res.total)
        this.tableData = res.records
      })
    },
    ...mapActions([
      'administratorList'
    ])
  },
  created () {
    this._administratorList()
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
  }
</style>
