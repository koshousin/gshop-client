/*
*   ajax 请求函数模块
*/
import axios from 'axios'

/*
*   const response = await ajax()
*   const result = response.data
*
*   const result = await ajax()   直接获取需要的数据
*/

export default function ajax(url , data = {} , type = 'GET'){
  return new Promise( (resolve , reject) => {
    let promise ;
    // 执行异步请求
    if(type === 'POST'){
      promise = axios.post(url , data)
    }else {
      let dataStr = ''
      let reqStr = Object.keys(data).reduce( (acumulator , currentStr) => {
        acumulator += `${currentStr}=${data[currentStr]}&`
        return acumulator
      } , '' ).slice(0,-1)
      if(!dataStr){
        url = url + '?' + reqStr
      }
      promise = axios.get(url)
      // debugger
    }
    promise.then(
      response => {
        // console.log(response)
        return resolve(response.data)
      }
    ).catch(error => console.log('返回数据错误：' , error))
  })
}


