// pages/qsye/qs.js
const app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar_img: '/images/user_img.png',
    name: '',
    phonenum: '',
    deviceid: '',
    dz: '',
    ishide: true,
    agentId:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      avatar_img: options.avatar_img,
      phonenum: app.globalData.phonenum,
    })
    let that = this;
    setTimeout(function () {
      if (app.globalData.openid != null) {
        network.getData("UserInfo/" + app.globalData.openid, '', that.doSuccess, that.doFail, 2);
        clearTimeout()
      } else {
        clearTimeout()
      }
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(111);
    var that = this;
    wx.getStorage({
      key: 'deviceId',
      success: function (res) {
        that.setData({
          deviceid: res.data,
          ishide: false
        })
        wx.showLoading({
          title: '获取设备信息',
        })
        network.getData("DeviceInfo/" + res.data, '', that.doSuccess, that.doFail, 1);
      },
      fail(e) {
        that.setData({
          ishide: true,
        })
      }
    })

  },


  mymd: function () {
    wx.navigateTo({
      url: '../mymd/md?deviceId=' + this.data.deviceId
    })
  },
  wssj: function () {
    if (this.data.agentId > 0) {
      let that = this;
      setTimeout(function () {
        wx.navigateTo({
          url: '../wssj/sj?avatar_img=' + that.data.avatar_img +
            "&name=" + that.data.name
        })
      }, 100);
    } else {
      wx.showModal({
        title: '提示',
        content: '您不是商家，不能进入',
        showCancel: false
      })
    }
  },

  doSuccess: function (res, type) {
    wx.hideLoading();
    switch (type) {
      case 1:{
          if (res.Code < 0) {
            wx.showModal({
              title: '服务器放回错误',
              content: res.Message,
              showCancel: false
            })
          } else {
            this.setData({
              dz: res.Name
            })
          }
        }
        break;
        case 4:{
        {
          if (e == null) {
            app.globalData.phonenum = '未验证'
            that.setData({
              phonenum: '未验证',
              agentId: 0,
            })
          } else {
            that.setData({
              agentId: e.AgentId,
            })
            if (util.isMobile(e.Phone)) {
              app.globalData.phonenum = e.Phone;
              that.setData({
                phonenum: e.Phone,
              })
              wx.setStorage({
                key: 'phone',
                data: app.globalData.phonenum,
              })
            } else {
              app.globalData.phonenum = '未验证';
              that.setData({
                phonenum: '未验证',
              })
            }
          }
        }
        }break;
    }


  },

  opencj: function () {
    wx.redirectTo({
      url: '../index/index?deviceId=' + this.data.deviceid
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log(222);
    this.onUnload();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})