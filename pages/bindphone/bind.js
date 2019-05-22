// pages/bindphone/bind.js
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    disabled: false,
    btntext: '获取验证码'
  },
  phone_input: function (e) {
    console.log(e);
    this.setData({
      phone: e.detail.value,
    })
  },

  ismobile:function(phone){
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var moblie = phone;
    if (moblie.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (!phonetel.test(moblie)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else {
      return true;

    }
  },
  getcode: function (e) {
    if (this.ismobile(this.data.phone)){

      var data ={
        Mobile: this.data.phone,
        Type: 0,

      }
      network.getData("MobileValidCode/", data, this.doSuccess, this.doFail, 1);
 
    }
  },

  doSuccess: function (e, type) {
    console.log(e);
    switch (type) {
      case 1: {
        if (e.Code < 0) {
          wx.showToast({
            title: e.Message,
            icon: 'none'
          })

        } else {
          this.verification();
        }
      } break;
      case 2:{
        if (e === false) {
          wx.showToast({
            title: '绑定失败',
            icon: 'none'
          })
        }else{
          setTimeout(function(){
            wx.showToast({
              title: '绑定成功',
              icon: 'none'
            },3900)
            wx.navigateBack({
              delta: 1
            })
          },4000)
     
        }
      }break;
      case 3:{
        if (e.Code < 0) {
          wx.showToast({
            title: e.Message,
            icon: 'none'
          })
        }
      }break;
    }
  },
  yuyin_click: function () {
    var data = {
      Mobile: this.data.phone,
      Type: 1,

    }
    network.getData("MobileValidCode/", data, this.doSuccess, this.doFail, 3);
  },
  code_input: function (e) {
    this.setData({
      code: e.detail.value,
    })
  },

  submit: function () {
    if (this.data.code.length < 4) {
      wx.showToast({
        title: '验证码输入错误',
        icon: 'none'
      })
      return;
    } else if (this.ismobile(this.data.phone)){
     let data = {
       'OpenId': app.globalData.openid,
        'Mobile': this.data.phone,
        'Code': this.data.code,
      }
      network.request("MobileValidCode/", data, this.doSuccess, this.doFail, 2);
    }

  },

  verification() { // 点击获取验证码
    //这里是要调api接口的，我这里就假装已经调成功了，返回200了
    var _this = this

    var coden = 60    // 定义60秒的倒计时
    var codeV = setInterval(function () {
      _this.setData({    // _this这里的作用域不同了
        btntext: '重新获取' + (--coden) + 's',
        disabled: true,
      })
      if (coden == -1) {  // 清除setInterval倒计时，这里可以做很多操作，按钮变回原样等
        clearInterval(codeV)
        _this.setData({
          btntext: '获取验证码',
          disabled: false,
        })
      }
    }, 1000)  //  1000是1秒

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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