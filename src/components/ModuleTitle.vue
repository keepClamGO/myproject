<!--
 * @Descripttion:
 * @Author: huangfuchunmei
 * @Date: 2021-03-30 12:08:07
 * @LastEditors: huangfuchunmei
 * @LastEditTime: 2021-04-07 14:47:12
-->
<template>
  <div class="title_wrap">
    <div class="bg"></div>
    <div class="module_title">
      <slot></slot>
      <slot name='title'></slot>
      <slot name ='btnGroup'></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleTitle',
  data () {
    return {
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.title_wrap{
  position: relative;
  .module_title{
    .font(16px, #333, 550);
    height: 54px;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-left: 10px;
  }
  .bg{
    position: absolute;
    width: 22px;
    height: 22px;
    top: 16px;
    background: #ddd;
  }
}
</style>
