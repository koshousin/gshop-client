<template>
  <div id="app">
    <router-view />
    <FootGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
  import FootGuide from "./components/FootGuide/FootGuide";
  import {reqFoodTypes} from './api'

  export default {
    components : {
      FootGuide
    } ,
    mounted() {
      reqFoodTypes().then(value => console.log(value))
    } ,
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
