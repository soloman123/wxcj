// pages/lbxq/lbxq.js


const app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

    icon:'',
    name:'',
    retdata: '',
    list: '',
    deviceId: 1,
    isFromSearch: true,
    PageIndex: 1,   // 设置加载的第几次，默认是第一次  
  },

  load: function (_PrizeId) {
    console.log(_PrizeId);
    var data = {
      PrizeId: 22,//_PrizeId,
      PageIndex: this.data.PageIndex,
    }
    network.getData("UserProducts", data, this.doSuccess, this.doFail, 1);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      name:options.name,
      icon:options.icon,
    })
    this.load(options.PrizeId);
  },

  click_item:function(e){

    wx.navigateTo({
                         
      url: '../hexiao/hx?PrizeProductid=' + 
        this.data.list[e.currentTarget.dataset.index].PrizeProductid +"&ConsumptionState="+
        this.data.list[e.currentTarget.dataset.index].ConsumptionState

    })

      // ? info = ' + JSON.stringify(this.data.list[e.currentTarget.dataset.index])
  },

  doSuccess: function (e, tpye) {
    console.log(e);
    var that = this;
    switch (tpye) {
      case 1: {
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
            title: '以无数据加载',
            icon: 'none'
          })
          that.setData({
            isFromSearch: true,
          })
        }
      } break;
    }
  },
  doFail: function () {

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