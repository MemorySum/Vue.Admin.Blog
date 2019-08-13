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