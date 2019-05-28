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
    PrizeId: '',
    deviceId: '',
    type: 0,
    index:'',
  },

  pay_mit: function () {

    if (!util.isMobile(app.globalData.phonenum)) {
      wx.navigateTo({
        url: '../bindphone/bind'
      })
      return;
    } else {
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

  doSuccess: function (e, type) {
    console.log(e);
    wx.hideLoading();
    if (e.Code < 0) {
      wx.showModal({
        title: '服务器返回错误',
        content: e.Message,
        showCancel: false,
      })
    } else {
      let that = this;
      wx.requestPayment({
        timeStamp: e.timeStamp,
        nonceStr: e.nonceStr,
        package: e.package,
        signType: e.signType,
        paySign: e.paySign,
        success(res) {
          if (res.errMsg == 'requestPayment:ok') {
              if (that.data.type == 0) {
                let pages = getCurrentPages();
                let mdpage = pages[pages.length - 2]; 
                mdpage.data.retdata.List[that.data.index].PayState = 1;
               
                mdpage.data.retdata.List[that.data.index].PayTime = util.formatTime(new Date(e.timeStamp * 1000));
                mdpage.setData({
                  list: mdpage.data.retdata.List,
                })
                wx.navigateBack({
                  delta: 1
                })
              } else {
                // wx.redirectTo({
                //   url: '../mymd/md?deviceId=' + that.data.deviceId
                // })
                let pages = getCurrentPages();
                let mdpage = pages[pages.length - 3];
                wx.navigateBack({
                  delta: pages.length
                })
              }
          }
        },
        fail(res) {
          wx.showModal({
            title: '订单未完成',
            showCancel:false,
            confirmText:'知道了',
            content: '订单未完成付款，有效期30分钟，请尽快支付，您可以在我的免单里继续支付',
            success(res){
              let pages = getCurrentPages();
              if (that.data.type == 0) {
                wx.navigateBack({
                  delta:1
                })
              }
              else{
                let mdpage = pages[pages.length - 3];
                wx.navigateBack({
                  delta: pages.length
                })
              }
            }
          })
        }
      })
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    let _index  = -1;
    if (options.type == 0){
      _index = options.index;
    }
    var readata  = JSON.parse(options.retdata);
    if (readata.ExpireDate.length>0){
      readata.ExpireDate = readata.ExpireDate.substr(0, readata.ExpireDate.indexOf(" "))
    }
   
    this.setData({
      item: readata,
      PrizeId: options.PrizeId,
      deviceId: options.deviceId,
      type: options.type,
      index: _index,
    })
    // console.log(this.data.item)
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