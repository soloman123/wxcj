// pages/qsye/qs.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar_img:'/images/user_img.png',
    name: '',
    phonenum:'',
    deviceid:'',
    dz:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      avatar_img:options.avatar_img,
      phonenum: app.globalData.phonenum,
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
    console.log(111);
    let that = this;
    wx.getStorage({
      key: 'deviceId',
      success: function(res) {
        
        that.setData({
          deviceid: res.data,
        })
        console.log('getStorage')
        console.log(res.data)
      },
    })
  },
  opencj:function(){
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
    console.log(333);
    wx.clearStorage();
    wx.navigateBack()
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