
import {
  RECEIVE_SHOPS ,
  RECEIVE_ADDRESS ,
  RECEIVE_TYPES ,
  RECEIVE_USER_INFO ,
  RESET_USER_INFO ,
  RECEIVE_GOODS ,
  RECEIVE_INFO ,
  RECEIVE_RATINGS
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
  }
}
