// pages/wssj/sj.js

const app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 100,
    color: '#ff6600',
    color1: '#999999',
    currentData: 0,
    currenthxItemData: 0,
    currentItemData: 1,
    // color:'#ff6600',
    name: '',
    avatar_img: '',
  },

  catchTouchMove: function (res) {
    return false;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.avatar_img)
    this.setData({
      name: options.name,
      avatar_img: options.avatar_img,
    })
  },

  submit: function () {
    console.log("222222222")
    this.doSuccess();
    // network.getData("UserProductInfo/", '', this.doSuccess, this.doFail, 1);
  },

  doSuccess: function () {
    wx.navigateTo({
      url: '../sjhx/sjhx'
    })
  },

  saoma: function () {
    this.doSuccess();
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
      }
    })
  },

  bindchange1: function (e) {
    console.log(e);
    switch (e.detail.current) {
      case 0: break;
      case 1: {

        //获取用户的核销记录
      } break;
    }
  },
  item_hexiao: function () {
    this.setData({
      currenthxItemData: 0,
      color: '#ff6600',
      color1: '#999999',
    })
  },
  item_hexiaojilu: function () {
    this.setData({
      currenthxItemData: 1,
      color: '#999999',
      color1: '#ff6600',
    })
  },

  sjhx: function () {
    this.setData({
      currentData: 0,
    })
  },
  sjtc: function () {
    this.setData({
      currentData: 1,
    })
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

  },


  next: function () {
    wx.navigateTo({
      url: '../sjhecg/hxcg?type=2'
    })
  },

})