
import {
  RECEIVE_SHOPS ,
  RECEIVE_ADDRESS ,
  RECEIVE_TYPES
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
  }
}