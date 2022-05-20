<template>
  <div>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" :disabled="flag">全选</el-checkbox>
    <el-checkbox-group v-model="checkedValue" @change="handleCheckedChange">
      <el-checkbox v-for="item in list" :label="item.id" :key="item.id" :disabled="flag">{{item.permissionName}}
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.description"
          placement="bottom-start"
          v-if="item.remark"
        >
          <i class="el-icon-question remark"></i>
        </el-tooltip>
      </el-checkbox>

    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'checkBox',
  props: {
    list: {
      type: Array,
      default: () => { return [] }
    },
    flag: {
      type: Boolean,
      default: () => { return false }
    }
  },
  data () {
    return {
      nowList: [],
      checkAll: false,
      isIndeterminate: true,
      checkedValue: []
    }
  },
  watch: {
    list: function (newVal, oldVal) {
      this.nowList = newVal
      newVal && this.getCheckedList()
    }
  },
  methods: {
    getCheckedList () {
      this.checkedValue = []
      this.nowList.forEach(item => {
        if (item.checked) {
          this.checkedValue.push(item.id)
        }
      })
      this.checkAll = this.checkedValue.length === this.list.length
      this.isIndeterminate = (this.checkedValue.length !== this.list.length && this.checkedValue.length !== 0)
    },
    handleCheckAllChange (val) {
      let arr = []
      this.list.forEach(item => {
        arr.push(item.id)
      })
      this.checkedValue = val ? arr : []
      this.isIndeterminate = false
    },
    handleCheckedChange (value) {
      this.checkedValue = value
      this.list.forEach(item => {
        if (item.mustSelected) {
          if (this.list.length > 0 && this.checkedValue.length > 0 && this.checkedValue.indexOf(item.id) < 0 && !item.checked) {
            item.checked = true
            this.checkedValue.push(item.id)
          } else if (this.checkedValue.indexOf(item.id) < 0 && item.checked) {
            item.checked = false
            this.checkedValue = []
          }
        }
      })
      console.log(this.checkedValue)
      // if (this.list[0].permissionName === '查看客户列表（包含搜索）') {
      //   this.$emit('changePayroll', this.checkedValue.length)
      // }
      let checkedCount = this.checkedValue.length
      this.checkAll = checkedCount === this.list.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length
    }
  }
}
</script>

<style scoped>
.remark{
  color: #f99511;
  font-size: 14px;
}
.el-checkbox {
  height: 24px;
  line-height: 2.5;
  color: #606266;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-right: 30px;
}
</style>
