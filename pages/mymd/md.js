// pages/mymd/md.js

//获取应用实例
const app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    retdata: '',
    list: '',
    deviceId: 1,
    isFromSearch: true,
    PageIndex: 1, // 设置加载的第几次，默认是第一次  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.load();
  },

  load: function () {
    var data = {
      OpenId: app.globalData.openid,
      PageIndex: this.data.PageIndex,
    }
    wx.showLoading({
      title: '正在加载数据...',
    })
    network.getData("UserGiftBag", data, this.doSuccess, this.doFail, 1);
  },




  click_item: function (e) {

console.log("sssss");
    if (this.data.list[e.currentTarget.dataset.index].PayState === 0) {
      wx.navigateTo({
        url: '../pay/pay?retdata=' + JSON.stringify(this.data.list[e.currentTarget.dataset.index]) + "&deviceId=" + this.data.deviceId + "&PrizeId=" + this.data.list[e.currentTarget.dataset.index].PrizeId
      })
    } else {
      wx.navigateTo({
        url: '../lbxq/lbxq?PrizeId=' + this.data.list[e.currentTarget.dataset.index].PrizeId + "&icon=" +
          this.data.list[e.currentTarget.dataset.index].Icon + "&name=" + this.data.list[e.currentTarget.dataset.index].Name
      })
    }


    // network.getData("UserProducts", data, this.doSuccess, this.doFail, 2);
  },

  doSuccess: function (e, tpye) {
    console.log(e);
    wx.hideLoading();
    var that = this;
    switch (tpye) {
      case 1:
        {
          if (e.List.length > 0) {
            let searchList = '';
            that.data.isFromSearch ? searchList = e.List : searchList = that.data.list.concat(e.List)
            that.setData({
              retdata: e,
              list: searchList,
              PageIndex: that.data.PageIndex + 1,
            })
          } else {
            wx.showToast({
              title: '无数据加载',
              icon: 'none'
            })
            that.setData({
              isFromSearch: true,
            })
          }
        }
        break;
    }
  },
  doFail: function () {
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
    var request = false;
    if (this.data.retdata === null) {
      request = true;
    } else if (this.data.PageIndex <= this.data.retdata.Page.TotalPage) {
      request = true;
    } else {
      request = false;
    }
    if (request) {
      wx.showLoading({
        title: '正在加载数据...',
      })
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