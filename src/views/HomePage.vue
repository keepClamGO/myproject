<template>
  <div class="conatiner">
    <div class="homepage_container fullPage">
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'HomePage',
  computed: {
    ...mapGetters(['UserInfo'])
  },
  data () {
    return {
      visible: false,
      checked: true
    }
  },
  methods: {
    /**
     * @description:获取导航栏列表
     * @param {type}null
     * @return:null
     */
    getNavList () {
      this.permissinEnumlist().then(res => {
        console.log(res)
      })
    },
    ...mapActions(['permissinEnumlist'])
  },
  created () {
    // this.getNavList()
  }
}
</script>

<style lang='less' scoped>
  .homepage_container{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center
  }
</style>
