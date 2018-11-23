const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 本服务用于公用的封装请求
// 返回的是一个promisepromise
// url:网络请求的url
// params:请求参数
// method:请求方式
// header:头部信息(提交内容类型)

const sendRequest = function (url, params, method, header) {
  var promise = new Promise(function (resolve, reject) {
      wx.request({
        url    : url,
        data   : params,
        method : method,
        header:  header,
        success: resolve,
        fail   : reject
      })
  });
  return promise;
};

module.exports = {
  formatTime: formatTime,
  sendRequest: sendRequest
}
