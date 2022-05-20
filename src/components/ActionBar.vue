<template>
  <div class="actionBar_container">
    <!--    新建  add-->
    <div class="actionBar_item" v-if="actionBarList.includes('add')" @click="handleClick('add')">
      <i class="iconfont icon-add"></i>
      <span>新建</span>
    </div>
    <div class="actionBar_item" v-if="actionBarList.includes('batchImport')" @click="handleClick('batchImport')">
      <i class="iconfont icon-piliangguanli"></i>
      <span>批量导入</span>
    </div>
    <div class="actionBar_item" v-if="actionBarList.includes('delete')" @click="handleClick('delete')">
      <i class="el-icon-delete"></i>
      <span>删除</span>
    </div>
    <div class="actionBar_item" v-if="actionBarList.includes('batchEdit')" @click="handleClick('batchEdit')">
      <i class="iconfont icon-piliangguanli"></i>
      <span>批量编辑</span>
    </div>
    <div class="actionBar_item" v-if="actionBarList.includes('export')" @click="handleClick('export')">
      <i class="iconfont icon-export"></i>
      <span>导出</span>
    </div>
    <div class="actionBar_item" v-if="actionBarList.includes('viewEmail')" @click="handleClick('viewEmail')">
      <i class="iconfont icon-yulan"></i>
      <span>查看邮件标题及内容</span>
    </div>
    <div class="actionBar_item" v-if="actionBarList.includes('exportExcel')" @click="handleClick('exportExcel')">
      <i class="iconfont icon-excel"></i>
      <span>导出Excel</span>
    </div>
    <div class="actionBar_item" v-if="actionBarList.includes('exportFdf')" @click="handleClick('exportFdf')">
      <i class="iconfont icon-pdf"></i>
      <span>导出PDF</span>
    </div>
    <div class="actionBar_item" v-if="actionBarList.includes('exportEncExcel')" @click="handleClick('exportEncExcel')">
      <i class="iconfont icon-excel"></i>
      <span>导出加密Excel</span>
    </div>
    <div class="actionBar_item" v-if="actionBarList.includes('exportEncPdf')" @click="handleClick('exportEncPdf')">
      <i class="iconfont icon-pdf"></i>
      <span>导出加密PDF</span>
    </div>
    <div class="actionBar_item" v-if="actionBarList.includes('view')" @click="handleClick('view')">
      <i class="iconfont icon-preview"></i>
      <span>预览</span>
    </div>
    <div class="actionBar_item" v-if="actionBarList.includes('callIn')" @click="handleClick('callIn')">
      <i class="iconfont icon-import"></i>
      <span>调入</span>
    </div>
    <div class="actionBar_item" v-if="actionBarList.includes('callOut')" @click="handleClick('callOut')">
      <i class="iconfont icon-export"></i>
      <span>调出</span>
    </div>
    <div class="actionBar_item" v-if="actionBarList.includes('pageSelectAll')" @click="handleClick('callOut')">
      <i class="iconfont icon-export"></i>
      <span>本页全选</span>
    </div>
    <div class="actionBar_item" v-if="actionBarList.includes('pageSelectedAll')" @click="handleClick('callOut')">
      <i class="iconfont icon-export"></i>
      <span>本页反选</span>
    </div>
    <div class="actionBar_item" v-if="actionBarList.includes('selectAllPage')" @click="handleClick('callOut')">
      <i class="iconfont icon-export"></i>
      <span>全部全选</span>
    </div>
    <div class="actionBar_item" v-if="actionBarList.includes('selectedAllPage')" @click="handleClick('callOut')">
      <i class="iconfont icon-export"></i>
      <span>全部反选</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionBar',
  props: ['actionBarList'],
  methods: {
    handleClick (val) {
      this.$emit('handleClickButton', val)
    }
  },
  created () {
  }
}
</script>

<style scoped lang="less">
  .actionBar_container{
    display: flex;
  }
  .actionBar_item{
    margin-right: 16px;
    cursor: pointer;
    span{
      .font(12px)
    }
    .iconfont, .el-icon-delete{
      .font(14px, @red);
      margin-right: 2px;
    }
  }

</style>
