// pages/zjjg/zjjg.js
const app = getApp()
var network = require("../../utils/network.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenum: null,
    retdata: null,
    list: '',
    deviceId: 1,
    isFromSearch: true,
    PageIndex: 1,   // 设置加载的第几次，默认是第一次  
     
  
  },


  load: function () {

      wx.showLoading({
        title: '正在加载',
      })
      console.log(this.data.PageIndex);
      network.getData('GiftBag/' + this.data.deviceId + "?PageIndex =" + this.data.PageIndex, '', this.doSuccess, this.doFail, 0);
    

  },

  doSuccess: function (e) {
    console.log(e)
    let that = this;
    setTimeout(function () {
      that.setData({
        retdata: e,
      })

      if (e.Products.length > 0) {
        let searchList = '';
        that.data.isFromSearch ? searchList = e.Products : searchList = that.data.list.concat(e.Products)
        that.setData({
          retdata: e,
          list: searchList,
          PageIndex: that.data.PageIndex + 1,
        })
      } else {
        wx.showToast({
          title: '以无数据加载',
          icon:'none'
        })
        that.setData({
          isFromSearch: true,
        })
      }
      wx.hideLoading();
    }, 400);

  },
  doFail: function (e) {
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.data.deviceId = options.deviceId

    this.load();
  },


  pay_mit: function () {
    console.log(33333);
    console.log(app.globalData.openid);

    if (this.data.phonenum == null) {
      wx.navigateTo({
        url: '../bindphone/bind'
      })
    }
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
    console.log('!!!!!!');
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {


    var request = false;
    if (this.data.retdata === null) {
      request = true;
    } else if (this.data.PageIndex <= this.data.retdata.Page.TotalPage) {
      request = true;
    } else {
      request = false;
    }
    if (request) {
      this.setData({
        isFromSearch: false,
      })
      this.load();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})