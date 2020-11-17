/*
*  基于 state的 getter 计算属性的对象
*
*/
export default {
  totalPrice : state => {
    return state.cartFoods.reduce((acumu , food) => acumu + food.count * food.price , 0)
  } ,
  totalCount : state => {
    return state.cartFoods.reduce((acumu , food) => acumu + food.count  , 0)
  } ,
  positive : state => {
   return state.ratings.filter(rating => rating['rateType'] === 0 ).length
  } ,
  negative : state => {
    return state.ratings.filter(rating => rating['rateType'] === 1).length
  }
}
