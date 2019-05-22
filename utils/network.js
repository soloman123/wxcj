var app = getApp();

// var host = 'https://api.haoban173.com/xcxapi/';
var host = 'https://api.haoban173.com/wxprizeapi/';
/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function request(url, postData, doSuccess, doFail,type) {


  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host + url,
    header: {
      "Content-Type": "application/json"
    },
    data: postData,
    method: "POST",
    success: function (res) {

      if (res.statusCode == 200) {
        
        //参数值为res.data,直接将返回的数据传入
        doSuccess(res.data, type);
      } else {
        doFail('非200');
      }
    },
    fail: function (res) {
      doFail(res);
    }
  })
}

//GET请求，不需传参，直接URL调用，
function getData(url, data1, doSuccess, doFail, type) {
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    data: data1,
    method: 'GET',
    success: function (res) {
      
      doSuccess(res.data, type);
    },
    fail: function () {
      doFail();
    },
  })
}


//GET请求，不需传参，直接URL调用，
function deleteData(url, data1, doSuccess, doFail, type) {
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    data: data1,
    method: 'DELETE',
    success: function (res) {

      doSuccess(res.data, type);
    },
    fail: function () {
      doFail();
    },
  })
}


module.exports.request = request;
module.exports.getData = getData;
module.exports.deleteData = deleteData;
