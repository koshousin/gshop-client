
import {
  RECEIVE_SHOPS ,
  RECEIVE_TYPES ,
  RECEIVE_ADDRESS ,
  RECEIVE_USER_INFO
} from './mutation-types'
import {
  reqAddress ,
  reqShopList ,
  reqFoodTypes ,
  reqUserInfo
} from '../api'

export default {
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
  }

}
