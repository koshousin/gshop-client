/*
*    路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../pages/Home/Home";
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from "../pages/Login/Login";
import Shop from "../pages/Shop/Shop";
import ShopRatings from "../pages/Shop/ShopRatings/ShopRatings";
import ShopInfo from "../pages/Shop/ShopInfo/ShopInfo";
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods";

//声明使用
Vue.use(VueRouter)

export default new VueRouter({
  // 页面路由
  routes : [
    {
      path : '/home',
      component : Home ,
      meta : {
        showFooter : true
      }
    } ,

    {
      path : '/order' ,
      component : Order ,
      meta : {
        showFooter : true
      }
    } ,

    {
      path : '/profile' ,
      component : Profile ,
      meta : {
        showFooter : true
      }
    } ,

    {
      path : '/search' ,
      component : Search ,
      meta : {
        showFooter : true
      }
    } ,

    {
      path : '/login',
      component : Login
    },

    {
      path : '/shop' ,
      component: Shop ,
      children : [
        {
           path : '/shop/goods',
           component : ShopGoods
        },{
          path : '/shop/ratings',
          component : ShopRatings
        }
        ,{
          path : '/shop/info' ,
          component : ShopInfo
        } ,
        {
          path : '' ,
          redirect : '/shop/goods'
        }
      ]
    } ,
    // 默认显示页面
    {
      path : '/' ,
      redirect : '/home'
    }
  ]

})
