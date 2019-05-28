// pages/sjhecg/hxcg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cgimg: '../../images/icon_hx01.png',
    avatar_img: '../../images/user_img.png',
    status_text:'1111',
    retdata:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    var type = options.type;
    switch(type){
      case '1':
      this.setData({
        status_text: '核销成功!',
        retdata: JSON.parse(options.Consumption),
        
      })
      break;
      case '2':
        this.setData({
          status_text: '已核销!',
          retdata: JSON.parse(options.data),
        })
      break;
    }
  },

  close:function(){
    let pages = getCurrentPages();
    let page = pages[pages.length-3]
    page.setData({
      isclean:true,
    })
    wx.navigateBack({
      delta:2
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