<template>
  <div class="star" :class=" 'star-'+size ">

    <span class="star-item on" v-for=" (sc,index) in starClasses" :class="sc" :key="index"></span>
  </div>
</template>

<script>
export default {
  name: "Star",
  props : {
    score : Number ,
    size : Number
  } ,
  // 将 评分 计算为 星星
  computed : {
    starClasses(){
      const starArr = []
      const {score} = this;
      // 向 starArr 中添加 n 个 'on'
      const scoreInt = Math.floor(score)
      for(let i=1;i <= scoreInt; i++){
        starArr.push('on')
      }
      // 向 starArr 中添加 0/1 个 'half'
      if((score-scoreInt)*10 >= .5){
        starArr.push('half')
      }
      // 向 starArr 中添加 n 个 'on'
      // const offInt = starArr.length < 5 && 5 - starArr.length
      // if(!offInt){
      //   for(let i=0; i<offInt; i++){
      //     starArr.push('off')
      //   }
      // }
      while(starArr.length < 5){
        starArr.push('off')
      }
      // debugger
      return starArr;
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./imgs/stars/star48_on')
        &.half
          bg-image('./imgs/stars/star48_half')
        &.off
          bg-image('./imgs/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./imgs/stars/star36_on')
        &.half
          bg-image('./imgs/stars/star36_half')
        &.off
          bg-image('./imgs/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./imgs/stars/star24_on')
        &.half
          bg-image('./imgs/stars/star24_half')
        &.off
          bg-image('./imgs/stars/star24_off')
</style>
