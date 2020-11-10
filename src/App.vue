<template>
  <div id="app">
    <router-view />
    <FootGuide />
  </div>
</template>

<script>
  import FootGuide from "./components/FootGuide/FootGuide";
  export default {
    components : {
      FootGuide
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
