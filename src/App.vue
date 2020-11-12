<template>
  <div id="app">
    <router-view />
    <FootGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  import FootGuide from "./components/FootGuide/FootGuide";
  import {reqFoodTypes} from './api'

  export default {
    components : {
      FootGuide
    } ,
    mounted() {
      this.getAddress()
    } ,
    methods : {
      ...mapActions(['getAddress'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
