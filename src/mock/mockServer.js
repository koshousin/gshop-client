/*
*  使用 mockjs 提供 mock 数据接口
*
*/
import Mock from 'mockjs'
import data from './data.json'

//返回 goods 的接口
Mock.mock('/goods?', {code:0 ,data :data.goods})
//返回 rating 的接口
Mock.mock('/ratings?', {code:0 ,data :data.ratings})
//返回 info 的接口
Mock.mock('/info?', {code:0 ,data :data.info})

// 不需要暴露任何东西，只需要执行即可
