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
  DECREMENT_FOOD_COUNT
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
     }
  } ,
  [INCREMENT_FOOD_COUNT](state , {food}){
    if(!food.count){
      //food.count = 1    //新增属性没有数据绑定效果
      /*
      * 对象，属性名，属性值
      */
      Vue.set(food , 'count' ,1)    // 让新增的属性也有数据绑定
    } else {
      food.count++
    }
  }
}
