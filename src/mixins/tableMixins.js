const tablemixins = {
  data () {
    return {
      selectRow: [],
      pages: 1,
      page: 1,
      rows: 20,
      totals: 0,
      multipleSelection: []
      // startTime: {
      //   disabledDate: time => {
      //     if (this.form.endTime) {
      //       return (
      //         time.getTime() > new Date(this.form.endTime).getTime()
      //       )
      //     }
      //   }
      // },
      // endTime: {
      //   disabledDate: time => {
      //     if (this.form.startTime) {
      //       return (
      //         time.getTime() < new Date(this.form.startTime).getTime()
      //       )
      //     }
      //   }
      // }
    }
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

    // 缓存key值
    getRowKeys (row) {
      return row.id
    },

    // 多选高亮选中行
    rowStyle ({ row, rowIndex }) {
      if (this.selectRow.includes(row.id)) {
        console.log(this.selectRow.includes(row.id))
        return 'is-checked'
      }
    },

    // 行点击
    clickRow (row) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },

    // 文本选中事件
    handleSelectionChange (val) {},

    // 页数改变时间
    handleCurrentChange (val) {
      this.page = val
      this.tableList()
    },

    // 页码改变事件
    handleSizeChange (val) {
      this.pages = 1
      this.page = 1
      this.rows = val
      this.tableList()
    },

    // 搜索
    search () {
      this.pages = 1
      this.page = 1
      this.tableList()
    }
  },
  created () {
    // this.tableList()
  }
}
export default tablemixins
