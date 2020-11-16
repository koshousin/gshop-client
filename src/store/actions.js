
import {
  RECEIVE_SHOPS ,
  RECEIVE_TYPES ,
  RECEIVE_ADDRESS ,
  RECEIVE_USER_INFO ,
  RESET_USER_INFO ,
  RECEIVE_GOODS ,
  RECEIVE_RATINGS ,
  RECEIVE_INFO ,
  INCREMENT_FOOD_COUNT ,
  DECREMENT_FOOD_COUNT
} from './mutation-types'
import {
  reqAddress ,
  reqShopList ,
  reqFoodTypes ,
  reqUserInfo ,
  reqLogout ,
  reqShopGoods ,
  reqShopInfo ,
  reqShopRatings
} from '../api'

export default {
  // 同步更新 food 中的食物数量
  updateFoodCount({commit , state} , {food , flag}){
    if(flag){
      commit(INCREMENT_FOOD_COUNT , {food})
    } else {
      commit(DECREMENT_FOOD_COUNT , {food})
    }
  } ,
  // 异步获取地址
  async getAddress({commit,state}){
    const {latitude , longitude} = state;
    let geohash = latitude + ',' + longitude
    const result = await reqAddress(geohash)
    if(result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS , {address})
    }
  } ,
  // 异步获取食品分类
  async getFoodTypes ({commit}) {
    const result = await reqFoodTypes()
    if(result.code === 0){
      const types = result.data
      commit(RECEIVE_TYPES , {types})
    }
  } ,
  // 异步获取商家列表
  async getShopList ({commit , state}) {
    const {latitude , longitude} = state;
    const result = await reqShopList(latitude , longitude)
    if(result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS ,{shops} )
    }
  } ,

  // 同步保存用户信息
  saveUser({commit} , userInfo){
    commit(RECEIVE_USER_INFO , {userInfo})
  } ,

  // 异步浏览器会话自动登录
  async getUserInfo({commit}) {
    const result = await reqUserInfo();
    if(result.code === 0){  // 自动登陆成功
      // 将信息保存到 userInfo
      const userInfo = result.data;
      commit(RECEIVE_USER_INFO , {userInfo} )
      // 跳转到主界面
    } else {
      //
    }
  },

  // 异步退出登录
  async logout({commit}){
    const result = await reqLogout();
    if(result.code === 0){
      commit(RESET_USER_INFO)
    }
  } ,

  // 异步获取商家评价
  async getShopRatings({commit}){
    const result = await reqShopRatings();
    if(result.code === 0){
      const ratings = result.data
      console.log(ratings)
      commit(RECEIVE_RATINGS, {ratings})
    }
  } ,

  // 异步获取商家信息
  async getShopInfo({commit}){
    const result = await reqShopInfo();
    if(result.code === 0){
      const info = result.data
      // console.log(info)
      commit(RECEIVE_INFO, {info})
    }
  } ,

  // 异步获取商品列表
  async getShopGoods({commit} , cb){
    const result = await reqShopGoods();
    if(result.code === 0){
      const goods  = result.data
      commit(RECEIVE_GOODS, {goods})
      // 数据更新了
      cb && cb()
    }
  }

}
