
<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item"  v-for="(item , index) in goods" :key="index"
              :class="{current : index === currentIndex}" @click="changeHeight(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src=" item.icon" v-if="item.icon">
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul ref="foodsUrl">
          <li class="food-list-hook" v-for="(item , index) in goods" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul >
              <li class="food-item bottom-border-1px" v-for="(food , index) in item['foods']"
                  @click="showFood(food)" :key="index">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food['icon']">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food['sellCount']}}份</span>
                    <span>好评率 {{food['rating']}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food['price']}}</span>
                    <span class="old" v-if="food['oldPrice']">￥{{food['oldPrice']}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <FoodDetail ref="food" :food="food" />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'

  import CartControl from "../../../components/CartControl/CartControl";
  import FoodDetail from "../../../components/Food/FoodDetail";
  export default {
    name: "ShopGoods" ,
    mounted (){
      this.$store.dispatch('getShopGoods',() => {
        this.$nextTick( () => {
          this._initScroll()
          // 初始化 tops
          this._initTops()
        })
      })

    } ,
    data(){
      return {
        scrollY : 0,    // 右侧滑动的 Y轴坐标
        tops : [] ,      // 右侧分类 li 组成的数组
        food: {}
      }
    } ,
    computed :{
      ...mapState(['goods']) ,
      // 计算当前分类的下标
      currentIndex(){
        // 先得到条件数据
        let scrollY = this.scrollY
        const tops = this.tops
        // 根据条件计算产生一个结果
        const index = tops.findIndex( (currentValue , index) => {
          // scrollY >= currentValue && scrollY < nextValue
          return scrollY >= currentValue && scrollY < tops[index+1]
        })
        // 返回结果
        return index
      } ,
    } ,
    methods : {
      /*
        非事件 methods 标识符前缀 '_'
      */
      // 添加滚动
      _initScroll (){
        // 列表显示之后创建
        new BScroll('.menu-wrapper',{
          click : true
        })
        this.foodScroll = new BScroll('.foods-wrapper',{
          probeType :3 ,  // 设值 探头类型 1：延时分发  2：滚动触发 3.滚动触发（惯性也能触发） 分发 scroll 时间
          click : true
        })
        // 给右侧列表绑定 scroll
        this.foodScroll.on('scroll' , ({x , y}) => {
          // console.log(x , '-' , y)
          this.scrollY = Math.abs(y)
        })
        // foodScroll.on('scrollEnd' , ())
      } ,
      // 初始化tops
      _initTops (){
        const tops = []
        let top = 0;
        tops.push(top)
        //找到所有分类右侧 li
        const lis = this.$refs.foodsUrl.children;
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        // 更新状态
        this.tops = tops;
        console.log(tops)
      } ,
      // 设置右侧食物列表的 clientHeight
      changeHeight(index){
        let y = this.tops[index]
        this.scrollY = y;
        // 使用右侧列表滑动
        this.foodScroll.scrollTo(0 , -y , 500)
      } ,
      // 显示点击的食物详情
      showFood(food){
        // 设置food
        this.food = food
        // 显示 foodDetail 组件 (父组件调用子组件对象的方法)
        this.$refs.food.toggleShow()
      }
    } ,
    components : {
      CartControl ,
      FoodDetail
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
