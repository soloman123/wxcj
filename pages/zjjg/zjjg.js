// pages/zjjg/zjjg.js
const app = getApp()
var network = require("../../utils/network.js")
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

    PrizeId: '',
    retdata: null,
    list: '',
    PublishId: '',
    deviceId: 1,
    isFromSearch: true,
    PageIndex: 1, // 设置加载的第几次，默认是第一次  

    GiftBagPublishId: null
  },


  load: function () {

    wx.showLoading({
      title: '正在加载',
    })
    network.getData('GiftBag/' + this.data.GiftBagPublishId + "?PageIndex=" + this.data.PageIndex, '', this.doSuccess, this.doFail, 0);
    // network.getData('GiftBag/' + 1 + "?PageIndex =" + this.data.PageIndex, '', this.doSuccess, this.doFail, 0);

  },

  doSuccess: function (e, type) {
    console.log(e)
    let that = this;
    switch (type) {
      case 0:
        {
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
                icon: 'none'
              })
              that.setData({
                isFromSearch: true,
              })
            }
            wx.hideLoading();
          }, 400);
        }
        break;
      case 1:
        {
          if (e.Code < 0) {
            wx.showModal({
              title: '服务器返回错误',
              content: e.Message,
            })
          } else {
            that.setData({
              PrizeId: e,
            })
            wx.navigateTo({
              url: '../pay/pay?retdata=' + JSON.stringify(this.data.retdata) + "&PrizeId=" + this.data.PrizeId + "&deviceId=" + this.data.deviceId + "&type=" + 1
            })
          }
        }
        break;
    }



  },
  doFail: function (e) {
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.data.deviceId = options.deviceId
    this.data.GiftBagPublishId = options.GiftBagPublishId;
    this.data.PublishId = options.PublishId;
    this.load();
  },


  pay_mit: function () {

    // this.data.phonenum= 1;
    if (!util.isMobile(app.globalData.phonenum)) {
      wx.navigateTo({
        url: '../bindphone/bind'
      })
    } else {
      if (this.data.retdata) {
        var data = {
          Id: this.data.deviceId,
          PublishId: this.data.PublishId,
          openid: app.globalData.openid,
        }
        network.request('Order/', data, this.doSuccess, this.doFail, 1);
        // PrizeId

      }
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
    console.log('生命周期函数--监听页面显示');
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
    let pages = getCurrentPages();
    console.log(pages.length);
    var page = pages[pages.length - 2];
    page.setData({
      jumptpye: 1,
    })
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
    if (this.data.retdata == null) {
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