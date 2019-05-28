// pages/sjtcjl/sjtcjl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: '#ff6600',
    color1: '#999999',
    color2: '#ff6600',
    color3: '#999999',
    name: '',
    avatar_img: '',
    num:6,
    windowHeight: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    wx.getSystemInfo({
      success: (res) => {
        let windowHeight = res.windowHeight
        console.log(res.model.indexOf('iPhone X'))
        if (res.model.indexOf('iPhone X') >= 0) {

          this.setData({
            windowHeight: windowHeight,
         
          })


        }
        this.setData({
          windowHeight: windowHeight,
        })
      }
    })
    this.setData({
      name: options.name,
      avatar_img: options.avatar_img,
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

  }
})