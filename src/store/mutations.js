import Vue from 'vue'
import {
  RECEIVE_SHOPS ,
  RECEIVE_ADDRESS ,
  RECEIVE_TYPES ,
  RECEIVE_USER_INFO ,
  RESET_USER_INFO ,
  RECEIVE_GOODS ,
  RECEIVE_INFO ,
  RECEIVE_RATINGS ,
  INCREMENT_FOOD_COUNT ,
  DECREMENT_FOOD_COUNT ,
  CLEAR_CART
} from './mutation-types'


export default {
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  },
  [RECEIVE_TYPES](state, {types}) {
    state.types = types
  },
  [RECEIVE_SHOPS](state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO](state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO](state) {
    state.userInfo = {}
  },
  [RECEIVE_INFO](state,{info}) {
    state.info = info
  },
  [RECEIVE_RATINGS](state , {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state , {goods}) {
    state.goods = goods
  } ,
  [DECREMENT_FOOD_COUNT](state , {food}){
     if(food.count){
       food.count--
       // 如果食品数量为0 . 则从购物车中移除
       if(food.count === 0){
         let index = state.cartFoods.indexOf(food)
         state.cartFoods.splice(index,1)
       }
     }
  } ,
  [INCREMENT_FOOD_COUNT](state , {food}){
    if(!food.count){
      //food.count = 1    //新增属性没有数据绑定效果
      /*
      * 对象，属性名，属性值
      */
      Vue.set(food , 'count' ,1)    // 让新增的属性也有数据绑定
      // 将 food 添加到 cartFoods 中
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  } ,
  [CLEAR_CART] (state) {
    // 先将食物的count 更改为 0
    state.cartFoods.forEach( item => {
      item.count = 0
    })
    // 移除购物车所有购物项
    state.cartFoods = []
  }
}
