<!--
 * @Author: caiqin.xie
 * @since: 2020-01-07 15:07:22
 * @lastTime: 2020-01-07 17:57:09
 * @LastEditors: huangfuchunmei
 * @message:
 -->
<template>
  <div class="breadCrumb_container">
    <el-breadcrumb separator-class="el-icon-arrow-right" v-if='flag'>
      <i class="iconfont icondingwei"></i>
      <template v-for="(item, index) in routerList">
        <el-breadcrumb-item
          :class="{red: index === routerList.length - 1}"
          :key="item.name"
        >
          <span @click="jumpItem(item, index)" :class="{pointer: index !== routerList.length - 1}">
            {{item.meta ? item.meta.routerName : item.name}}
          </span>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'BreadCrumb',
  data () {
    return {
      flag: true,
      routerList: []
    }
  },
  watch: {
    // '$route.matched': {
    //   handler (newValue, oldValue) {
    //     this.routerList = newValue.filter(item => item.name !== 'index')
    //   },
    //   immediate: true
    // }
  },
  methods: {
    /**
     * @description: 获取路由信息生成面包屑导航
     * @param {type} null
     * @return: null
     */
    // getBreadCrumb () {
    //   this.routerList = this.$route.matched.filter(item => item.name !== 'index')
    //   // if (typeof (BreadList[len].meta.parents) !== 'undefined') {
    //   //   let {routerName, name} = BreadList[len].meta.parents
    //   //   let routerItem = {
    //   //     ...BreadList[len],
    //   //     meta: {
    //   //       routerName
    //   //     },
    //   //     name
    //   //   }
    //   //   if (routerItem.name !== BreadList[len - 1].name) {
    //   //     BreadList.splice(len, 0, routerItem)
    //   //   }
    //   // }
    // }
    // jumpItem (item, index) {
    //   if (index !== this.routerList.length - 1) {
    //     this.$router.push({name: item.name})
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
  .breadCrumb_container{
    .font(12px, rgb(26, 25, 25));
    margin: 20px 0 20px 30px;
  }

  .icon-position {
    float: left;
    .font(20px, @red)
  }

  .el-breadcrumb {
    display: flex;
    align-items: center
  }

  .el-breadcrumb__item {
    padding-left: 5px;
    font-size: 14px;
    font-weight: 550;
  }

  .red {
    /deep/ span {
      color: #333 !important;
      font-weight: 550;
    }
  }
</style>
