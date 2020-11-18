/*
  入口JS
*/
import Vue from "vue";
import {Button} from 'mint-ui'
import VueLazyload from "vue-lazyload";

import App from './App'
import router from './router'
import store from './store'
import loading from './common/img/loading.gif'
import './mock/mockServer'    // 加载 mockServer
import './filters'  // 加载过滤器

// 注册全局组件标签
Vue.component(Button.name , Button)     // <mt-button>

Vue.use(VueLazyload , {     // 内部自定义指令 v-lazy
  loading:loading
})

new Vue({
  el : '#app' ,
  render : h => h(App) ,
  router ,
  store
})
