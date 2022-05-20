import * as types from '@/store/mutation-types';
import operation from '@/views/ApprovalManagement/stage/Operation';
<!--
 * @Author: 马强
Date: 2019-09-19 13:54:15
 * @LastEditTime: 2021-04-14 15:46:33
 * @LastEditors: huangfuchunmei
 * @Description:
 -->
<template>
  <div class="content-main">
    <el-table
      border
      size="mini"
      ref="multipleTable"
      :data="tableData"
      @selection-change="handleSelectionChange"
      @row-click="clickRow($event, 'multipleTable')"
      :row-key="getRowKeys"
      :row-class-name="rowStyle"
    >
      <el-table-column
        v-if="tableSetting && tableSetting.hasSelect"
        type="selection"
        width="55"
        :reserve-selection="true"
      ></el-table-column>
      <template v-for="(item) in dataLibrary">
        <el-table-column
          :key="item.id"
          :label="item.label"
          align="center"
          show-overflow-tooltip
          v-if='!item.methods'
          min-width="120"
        >
          <template slot-scope="scope">
            {{item.momentType ? $momentTime(scope.row[item.prop], item.momentType) : scope.row[item.prop] || '--'}}
          </template>
          <!-- <template slot-scope="scope">{{scope.row[item.prop] | tableFilter(item.filter)}}</template> -->
        </el-table-column>
        <el-table-column
          :key="item.id"
          :label="item.label"
          align="center"
          show-overflow-tooltip
          v-else
        >
          <template slot-scope="scope">
             <span class="cp" @click="doMethod(item.methods, scope.row)">查看</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        label="操作"
        align="center"
        show-overflow-tooltip
        v-if="tableSetting.userOperation"
      >
        <template slot-scope="scope">
          <el-popover
           popper-class="popper_dark"
            :ref="'popover-' + scope.$index"
            placement="left"
            trigger="click">
            <ul>
              <li
                v-for="(item, index) in tableSetting.userOperation"
                :key='index'
                :class="[item.className]"
                @click="handleClickCallBack(scope.$index, scope.row, item)"
                >{{item.text}}</li>
            </ul>
            <span slot="reference" class="cp quitBtn"><i class="iconfont iconcaozuo"></i></span>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-footer class="content-footer" v-if='tableSetting.morePage'>
      <!-- 底部分页 -->
      <div>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="rows"
          layout="sizes, prev, pager, next, total"
          :total="total"
          :hide-on-single-page='false'
          :current-page.sync='pages'
        ></el-pagination>
        <span class="checked" v-if="tableSetting.checked">已勾选{{multipleSelection.length}}条</span>
      </div>
    </el-footer>
  </div>
</template>

<script>
import tabelMixins from '@/mixins/tableMixins'
export default {
  name: 'TableList',
  mixins: [tabelMixins],
  data () {
    return {
    }
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    dataLibrary: {
      type: Array,
      default: () => []
    },
    tableSetting: {
      type: Object,
      default: () => {}
    },
    handleSelectionChanges: {
      type: Function
    },
    tableChange: {
      type: Function
    },
    handleClickCallBacks: {
      type: Function
    },
    total: {
      type: Number,
      default: 0
    }
    // rows: {
    //   type: Number,
    //   default: 10
    // },
    // userOperation: {
    //   type: Array,
    //   default: () => []
    // },
    // ids: {
    //   type: Array,
    //   default: () => []
    // }
  },
  mounted () {
    // console.log(this.ids)
  },
  watch: {
    // ids (newData, oldData) {
    //   console.log(newData)
    //   if (newData.length) {
    //     this.tableData.forEach((item, index) => {
    //       if (newData.includes(item.userId)) {
    //         this.$refs.multipleTable.toggleRowSelection(item, true)
    //       }
    //     })
    //   }
    // }
  },
  methods: {

    tableList () {
      this.$emit('tableChange', this.page, this.rows)
    },

    handleSelectionChange (val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChanges', val)
    },

    handleClickCallBack (index, val, item) {
      this.$emit('handleClickCallBacks', val, item.clicks)
    },
    clickRow () {}
    // doMethod (val, scope) {
    //   this.$emit(val, scope)
    // }
  }
}
</script>

<style lang="less" scoped>
.content-footer > div{
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  span {
    font-size: 14px;
    transform: translateY(4px);
  }
}
</style>
