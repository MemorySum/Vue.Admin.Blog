var root='http://localhost:44336/api/';

var axios=require('axios')

function totype(obj){
    return ({}).tostring.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull (o) {
    for (var key in o) {
      if (o[key] === null) {
        delete o[key]
      }
      if (toType(o[key]) === 'string') {
        o[key] = o[key].trim()
      } else if (toType(o[key]) === 'object') {
        o[key] = filterNull(o[key])
      } else if (toType(o[key]) === 'array') {
        o[key] = filterNull(o[key])
      }
    }
    return o
  }


  function apiAxios (method, url, params, success, failure) {
    if (params) {
      params = filterNull(params)
    }
    axios({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
  　　 //headers 是即将被发送的自定义请求头，还记得我们的jwt验证么，可以封装进来，注意!这里如果要添加 headers ，一定要是正确的值
  　　 headers:{"Authorization":"Bearer "+window.localStorage.getItem("AccessToken")},
      baseURL: root,
      withCredentials: false
    })
      .then(function (res) {
        if (res.data.success === true) {
          if (success) {
            success(res.data)
          }
        } else {
          if (failure) {
            failure(res.data)
          } else {
            window.alert('error: ' + JSON.stringify(res.data))
          }
        }
      })
      .catch(function (err) {
        let res = err.response
        if (err) {
          window.alert('api error, HTTP CODE: ' + res.status)
        }
      })
  }
  
  // 返回在vue模板中的调用接口
  export default {
    get: function (url, params, success, failure) {
      return apiAxios('GET', url, params, success, failure)
    },
    post: function (url, params, success, failure) {
      return apiAxios('POST', url, params, success, failure)
    },
    put: function (url, params, success, failure) {
      return apiAxios('PUT', url, params, success, failure)
    },
    delete: function (url, params, success, failure) {
      return apiAxios('DELETE', url, params, success, failure)
    }
  }