//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    type :0;
    // 登录
    wx.login({
     
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        var that = this;
        var str ='';
        wx.request({
          url: str,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            that.globalData.openid = res.data.openid //返回openid
          },fail(e){
            that.globalData.openid =1; //返回openid
          }
        })
      console.log(str);
      }
    })

  },
  globalData:{
    userinfo:null,
    openid:'',
    phonenum: '未验证',
  }


})