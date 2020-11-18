import Vue from 'vue'
import moment from "moment";
import {format} from 'date-fns'

/*
*  自定义过滤器
* */

Vue.filter('date-format' , function(value){
  return format(value , 'yyyy-MM-dd')
})
