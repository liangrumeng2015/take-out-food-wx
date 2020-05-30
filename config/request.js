// 公用接口
const httpURI = 'http://meituan.thexxdd.cn/api'

// 封装的网络请求
const request = function(url,data={},method){
  return new Promise((resolve,reject)=>{
    uni.request({
      url: httpURI + url,
      data,
      method,
      header: {
      	'content-type': 'application/x-www-form-urlencoded', 
      }
    }).then(res=>{
      resolve(res[1].data)
    }).catch(err=>{
      let error = '服务器错误，请稍后再试'
      catchToast(error)
      reject(err) 
    })
  })
}

// catch里面的提示
const catchToast = function(title){
  uni.showToast({
    title,
    icon:'none'
  })
}


export {
  request
}