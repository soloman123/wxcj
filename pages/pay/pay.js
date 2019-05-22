// pages/pay/pay.js

const app = getApp()
var network = require("../../utils/network.js")
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: '',
    PrizeId:'',
    deviceId:'',
  },

  pay_mit: function () {
  
    if (!util.isMobile(app.globalData.phonenum)) {
      wx.navigateTo({
        url: '../bindphone/bind'
      })
      return;
    }else{
      console.log()
      let data = {
        PrizeId: this.data.PrizeId,
        OpenId: app.globalData.openid
      }
      console.log(data);
      wx.showLoading({
        title: '付款中...',
      })
      network.request("Pay/", data, this.doSuccess, this.doFail, 1)
      
    }
  },
  doFail: function () {

  },

  doSuccess:function(e ,type){
    console.log(e);
    wx.hideLoading();
    let that = this;
    wx.requestPayment({
      timeStamp: e.timeStamp,
      nonceStr: e.nonceStr,
      package: e.package,
      signType: e.signType,
      paySign: e.paySign,
      success(res){
        if (res.errMsg == 'requestPayment:ok') {
     
          setTimeout(function () {
            
            wx.redirectTo({
              url: '../mymd/md?deviceId=' + that.data.deviceId
            })

          }, 100);
        }
      },
      fail(res){
        console.log(res)
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      item: JSON.parse(options.retdata),
      PrizeId: options.PrizeId,
      deviceId: options.deviceId
    })
    console.log(this.data.item)
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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