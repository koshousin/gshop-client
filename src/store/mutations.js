
import {
  RECEIVE_SHOPS ,
  RECEIVE_ADDRESS ,
  RECEIVE_TYPES ,
  RECEIVE_USER_INFO
} from './mutation-types'


export default {
  [RECEIVE_ADDRESS] (state , {address}) {
    state.address = address
  } ,
  [RECEIVE_TYPES](state , {types}) {
    state.types = types
  } ,
  [RECEIVE_SHOPS](state , {shops}) {
    state.shops = shops
  } ,
  [RECEIVE_USER_INFO](state , {userInfo}) {
    state.userInfo = userInfo
  }
}
