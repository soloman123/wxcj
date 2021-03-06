//app.js


App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
 
    type: 0;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      
        var that = this;
        var str = 'https://api.haoban173.com/wxprizeapi/Login/' + res.code;
        wx.request({
          url: str,
          // header: {
          //   'content-type': 'application/json'
          // },

          success: function (res) {
            //to do 'a68b71911f074c95a253782276b2a2f3'//
            that.globalData.openid = res.data.openid //返回openid
          }, fail(e) {
            that.globalData.openid = null; //返回openid
          }
        })
      }
    })

  },
  globalData: {
    userinfo: null,
    openid: null,
    phonenum: '未验证',
  },


  onShow: function () {

  },
  onHide: function () {

  
  }
})