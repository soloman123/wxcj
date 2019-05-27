// pages/sjhx/sjhx.js
var network = require("../../utils/network.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar_img: '../../images/user_img.png',
    ConsumptionCode: '',
    Consumption: ''
  },

  queding: function() {
    let data = {
      MerchantOpenId: app.globalData.openid,
      ConsumptionCode: this.data.ConsumptionCode,
    }
    network.request("Consumption/", data, this.doSuccess, this.doFail, 2)

  },

  quxiao: function() {
    wx.navigateBack({
      delta:1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    

    this.setData({
      Consumption :JSON.parse(options.Consumption),
      ConsumptionCode: options.code,
    })

    

  },
  doSuccess: function(res, type) {
    console.log(res)
    wx.hideLoading();
    switch (type) {
      case 1:
        break;
      case 2:
        if (res.Code < 0) {
          wx.showModal({
            title: '服务器返回错误',
            content: res.Message,
            showCancel:false,
            confirmText: '知道了',
          })
        } else {
          wx.navigateTo({
            
            url: '../sjhecg/hxcg?type=1' + "&Consumption=" + JSON.stringify(this.data.Consumption)
          })
        }
        break
    }

  },
  doFail: function(res) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})