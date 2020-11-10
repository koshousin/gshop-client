/*
*    路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../pages/Home/Home";
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'

//声明使用
Vue.use(VueRouter)

export default new VueRouter({
  // 页面路由
  routes : [
    {
      path : '/home',
      component : Home
    } ,
    {
      path : '/order' ,
      component : Order
    } ,
    {
      path : '/Profile' ,
      component : Profile
    } ,
    {
      path : '/Search' ,
      component : Search
    } ,
    // 默认显示页面
    {
      path : '/' ,
      redirect : '/home'
    }
  ]

})
