
import {
  RECEIVE_SHOPS ,
  RECEIVE_TYPES ,
  RECEIVE_ADDRESS
} from './mutation-types'
import {
  reqAddress ,
  reqShopList ,
  reqFoodTypes
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

}
