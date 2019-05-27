// pages/hexiao/hx.js
var QRCode = require('../../utils/weapp-qrcode.js')
const app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:null,
    isshow:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('hxjs' + options.ConsumptionState)
    if (options.ConsumptionState === 1){
      
      wx.setNavigationBarTitle({ title:'免单详情'})
      this.setData({
        isshow:false
      })
    }else{
      wx.setNavigationBarTitle({ title:'核销'})
    }
    wx.showLoading({
      title: '加载中',
    })
    network.getData("UserProductInfo/" + options.PrizeProductid, '', this.doSuccess, this.doFail, 1);
    // console.log(that.data.item);

    
  },

  doSuccess:function(e,type){
    wx.hideLoading();
    this.setData({
      item:e,
    });

    var qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: this.data.item.ConsumptionCode,
      width: 150,
      height: 150,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });


  },

  doFail:function(){
    wx.hideLoading();
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