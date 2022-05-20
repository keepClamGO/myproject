<!--
 * @Author: caiqin.xie
 * @since: 2019-12-30 18:46:35
 * @lastTime     : 2019-12-31 14:33:17
 * @LastEditors  : caiqin.xie
 * @message:
 -->
<template>
  <div id="app">
    <router-view :key="new Date().getTime()"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang='less'>
  #app{
    height: 100%
  }
</style>
