<!--
 * @Descripttion:
 * @Author: huangfuchunmei
 * @Date: 2021-03-30 12:08:07
 * @LastEditors: huangfuchunmei
 * @LastEditTime: 2021-04-16 10:23:22
-->
<template>
  <el-container class="index-content">
    <LoadingPage v-if="$store.state.loading"></LoadingPage>
    <el-header>
      <Header/>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Nav/>
      </el-aside>
      <el-main>
        <!-- <BreadCrumb/> -->
        <router-view keep-alive/>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import Nav from '../components/Nav'
import Header from '../components/Header'
// import BreadCrumb from '../components/BreadCrumb'
import LoadingPage from '../components/LoadingPage'
import {mapActions} from 'vuex'

export default {
  name: 'Index',
  components: {
    Nav,
    Header,
    // BreadCrumb,
    LoadingPage
  },
  data () {
    return {
      menus: []
    }
  },
  methods: {
    _getNavList () {
    },
    ...mapActions([])
  },
  computed: {
  },
  created () {
    this._getNavList()
  }
}
</script>
<style scoped>
  .el-container{
    height: 100%
  }
  .el-aside{
    position: relative;
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.07);
  }
  .el-header{
    box-shadow: 7px 0px 5px 2px #f8f8f8;
    position: relative;
    z-index: 1000;
  }
  .index-content{
    /* height: 100%; */
    /* 为了兼容safari windows版本上下滚动条 */
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .el-main{
    width: calc(100vw - 200px);
    width: -moz-calc(100vw - 200px);
    width: -webkit-calc(100vw - 200px);
    /* height: calc(100vh - 80px); */
    box-sizing: border-box;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    min-width: 1166px;
    display: inline-block;
  }
  .el-header {
    height: 70px !important;
    min-width: 1366px;
  }
</style>
