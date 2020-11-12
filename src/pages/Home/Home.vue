<template>
  <section class="msite">
    <!-- 标题 -->
    <HeaderTop :title='address.name'>
        <span class="header_search" slot="left">
          <i class="iconfont icon-sousuo"></i>
        </span>
        <span class="header_login" slot="right">
          <span class="header_login_text">登录|注册</span>
        </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="types.length">
        <div class="swiper-wrapper" >
          <div class="swiper-slide" v-for="(types , index) in typesArr">
            <a href="javascript:" class="link_to_food" v-for="(type , index) in types">
              <div class="food_container">
                <img :src="baseImageUrl + type['image_url']">
              </div>
              <span>{{type.title}}</span>
            </a>
          </div>
          <div class="swiper-slide">
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./imgs/nav/9.jpg">
              </div>
              <span>甜品饮品</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./imgs/nav/10.jpg">
              </div>
              <span>商超便利</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./imgs/nav/11.jpg">
              </div>
              <span>美食</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./imgs/nav/12.jpg">
              </div>
              <span>简餐</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./imgs/nav/13.jpg">
              </div>
              <span>新店特惠</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./imgs/nav/14.jpg">
              </div>
              <span>准时达</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./imgs/nav/1.jpg">
              </div>
              <span>预订早餐</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./imgs/nav/2.jpg">
              </div>
              <span>土豪推荐</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./imgs/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList />
    </div>
  </section>
</template>

<script>
  import Swiper from 'swiper'
  import {mapState , mapActions} from 'vuex'

  import 'swiper/css/swiper.min.css'
  import HeaderTop from "../../components/HeaderTop/HeaderTop";
  import ShopList from "../../components/ShopList/ShopList";

  export default {
    name: "Home" ,
    data() {
      return {
        baseImageUrl : 'http://fuss10.elemecdn.com'
      }
    } ,

    components : {
      HeaderTop ,
      ShopList
    },
    mounted () {
      // 获取食物类型列表
      this.getFoodTypes();
      this.getShopList()
    } ,
    computed : {
      ...mapState(['address','types']) ,
      /*
      *   根据types一维数组 生成一个二维数组，内层数组容量为8
      */
      typesArr() {
        // const {types} = this;
        // // 定义外层数组
        // const outArr = []
        // let innerArr = []
        // types.forEach( (type, index) => {
        //   // 如果满8个，则创建一个新的
        //   if(innerArr.length === 8){
        //     innerArr = []
        //   }
        //   // 如果 innerArr 是空的 ，将小数组保存到大数组中
        //   if(innerArr.length === 0){
        //     outArr.push(innerArr)
        //   }
        //   innerArr.push(type)
        // })
        // return outArr;
        const {types} = this
        // 准备空的2维数组
        const arr = []
        // 准备一个小数组(最大长度为8)
        let minArr = []
        // 遍历categorys
        types.forEach(c => {
          // 如果当前小数组已经满了, 创建一个新的
          if(minArr.length===8) {
            minArr = []
          }
          // 如果minArr是空的, 将小数组保存到大数组中
          if(minArr.length===0) {
            arr.push(minArr)
          }
          // 将当前分类保存到小数组中
          minArr.push(c)
        })
        return arr
      }
    } ,
    methods : {
      ...mapActions(['getFoodTypes','getShopList'])
    } ,
    watch : {
      types (value) {   // types数组中有数据，在异步更新界面之前执行
        // console.log(value)
        // 使用setTimeout 并非完美
        // setTimeout( () => {
        //   new Swiper('.swiper-container' , {
        //     loop : true ,  // 循环轮播
        //     pagination : {
        //       el : '.swiper-pagination',
        //     } ,
        //   })
        // },100)
        this.$nextTick( () => {   // 一旦完成界面更新立即调用
          new Swiper('.swiper-container' , {
            loop : true ,  // 循环轮播
            pagination : {
              el : '.swiper-pagination',
            } ,
          })
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774

</style>
