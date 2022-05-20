<!--
 * @Author: caiqin.xie
 * @since: 2020-01-09 10:58:20
 * @lastTime     : 2020-01-20 17:41:24
 * @LastEditors  : caiqin.xie
 * @message: 组织树
 -->
<template>
  <el-select
    class="common_select_tree"
    :value="valueTitle"
    :clearable="clearable"
    @clear="clearHandle"
    :placeholder="placeholder"
    filterable
    :filter-method="dataFilter"
    size="mini"
    :disabled="disabled">
    <el-option class="common_select_option" :value="valueTitle" :label="valueTitle">
      <el-tree
        id="tree-option"
        ref="selectTree"
        icon-class="iconfont icon-zhankai"
        :accordion="accordion"
        :data="options"
        :props="props"
        :node-key="props.value"
        :default-expanded-keys="defaultExpandedKey"
        @node-click="handleNodeClick"
        :render-content="renderContent"
        :filter-node-method="filterNode"
        :highlight-current="true">
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'selectTree',
  props: {
    /* 配置项 */
    props: {
      type: Object,
      default: () => {
        return {
          value: 'id',
          label: 'title',
          children: 'children'
        }
      }
    },
    options: {
      type: Array,
      default: () => { return [] }
    },

    /* 初始值 */
    value: { type: String, default: '' },

    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => { return true }
    },

    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => { return false }
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: () => { return false }
    }
  },
  data () {
    return {
      valueId: this.value,
      valueTitle: '',
      defaultExpandedKey: []
    }
  },
  mounted () {
    this.initHandle()
  },
  methods: {
    // 过滤
    dataFilter (val) {
      this.$refs.selectTree.filter(val)
    },
    filterNode (value, data) {
      if (!value) return true
      return data.orgName.indexOf(value) !== -1
    },

    // 自定义树形内容
    renderContent (h, { node, data, store }) {
      return (
        <span class="custom-tree-node el-tree-node__label">
          <span class="font12">{data.orgName}</span>
          <span class="font12 company_tree_people">({data.employeesNum})</span>
        </span>
      )
    },

    // 初始化值
    initHandle () {
      setTimeout(() => {
        if (this.valueId) {
          if (this.$refs.selectTree.getNode(this.valueId)) {
            this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[this.props.label]
          } else {
            this.valueTitle = this.valueId
          }
          this.$refs.selectTree.setCurrentKey(this.valueId)
          this.defaultExpandedKey = [this.valueId]
        } else {
          this.valueTitle = ''
        }
      }, 500)
    },

    // 切换选项
    handleNodeClick (node) {
      this._assign(node)
    },

    // 点击组织树赋值
    _assign (node) {
      if (this.props.disabled) {
        let {key, val} = this.props.disabled
        if (node[key] === val) {
          return false
        } else {
          this.valueTitle = node[this.props.label]
          this.valueId = node[this.props.value]
          this.$emit('getValue', this.valueId)
          this.defaultExpandedKey = []
        }
      } else {
        this.valueTitle = node[this.props.label]
        this.valueId = node[this.props.value]
        this.$emit('getValue', this.valueId)
        this.defaultExpandedKey = []
      }
      this.$refs.selectTree.filter('')
    },

    // 清除选中
    clearHandle () {
      this.clearTree()
      // this.$emit('getValue', null)
      this.$emit('clearHandle', this.props.disabled)
    },

    // 清除选中
    clearTree () {
      this.valueTitle = ''
      this.valueId = null
      this.defaultExpandedKey = []
      this.clearSelected()
    },

    /* 清空选中样式 */
    clearSelected () {
      let allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    }
  },
  watch: {
    value () {
      this.valueId = this.value
      this.initHandle()
    }
  }
}
</script>

<style lang="less">
  .el-select.common_select_tree .el-input .el-select__caret{
    transform:rotateZ(0);
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    &::before{
      content: "\e6bf";
    }
  }
  .el-scrollbar .el-scrollbar__view .el-select-dropdown__item.common_select_option{
    height: auto;
    width: 100%;
    background-color: #fff;
  }
  .common_select_tree .el-tree-node > .el-tree-node__content .el-tree-node__expand-icon.is-leaf + .el-tree-node__label {
    display: inline-block;
    padding: 0px;
  }
  .common_select_tree .el-tree-node.is-current > .el-tree-node__content .el-tree-node__expand-icon.is-leaf + .el-tree-node__label {
    height: 26px;
    line-height: 26px;
  }
  .el-select.common_select_tree {
    width: 100%;
  }
  .common_select_tree .el-tree#tree-option .el-tree-node__children{
    width: -webkit-fill-available;
  }
  .normal{
    font-weight: normal;
  }
  // .common_select_option /deep/ .el-tree-node > .el-tree-node__content .el-tree-node__label{
  //   background: #f8f8f8;
  //   color: #333;
  //   padding: 0 10px;
  // }
  // .common_select_option /deep/ .el-tree-node.is-current > .el-tree-node__content .el-tree-node__label{
  //   background: #ea3951;
  //   color: #fff;
  //   padding: 0 10px;
  // }
</style>
