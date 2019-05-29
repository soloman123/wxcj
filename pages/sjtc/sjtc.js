// pages/sjtc/sjtc.js
const app = getApp();
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btntext: '获取验证码',
    cursor:2,
    cost:'',
    bankAccount:'',
    alipayAccount:'',
    bankName:'',
    bankDeposit:'',
    bandReceiveName:'',
    alipayReceiveName:'',
    disabled:false,
    code:'',
    items: [{
        name: 1,
        value: '支付宝'
      },
      {
        name: 2,
        value: '银行卡',
        checked: 'true'
      },

    ]
  },

  checkboxChange: function(e) {

    console.log(e)
    switch (e.detail.value) {
      case '1':
      this.setData({
        cursor:1,
      })
      break;
      case '2':
        this.setData({
          cursor:2,
        })
      break;
    }
  },

  click_getcode:function(){
      var data = {
        Mobile: app.globalData.phonenum,
        Type: 0,
        BType: 2,
      }
      console.log(data)
      network.getData("MobileValidCode/", data, this.doSuccess, this.doFail, 1);
  },

  click_yuyin:function(){
    var data = {
      Mobile: app.globalData.phonenum,
      Type: 1,
      BType: 2,
    }
    console.log(data)
    network.getData("MobileValidCode/", data, this.doSuccess, this.doFail, 2);
  },

  doFail:function(){

  },

  doSuccess:function(ret , type){
    console.log(ret);
    switch (type){
      case 1:
        if(ret.Code< 0){
          wx.showModal({
            showCancel:false,
            title: '服务器返回错误',
            content: ret.Message,
          })
        }else{
          this.verification();
        }
   
      break;
      case 2:break;
      case 3:{
        if(ret.Code<0){
          wx.showModal({
            title: '服务器返回错误',
            content: ret.Message,
            showCancel: false,
          })
        }else{
          if (ret) {
            wx.showModal({
              title: '提现结果',
              content: '提现成功',
              showCancel: false,
            })
          } else {
            wx.showModal({
              title: '提现结果',
              content: '提现失败',
              showCancel: false,
            })
          }
        }


      }break;
    }
  },
  doFail: function (ret){

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

  Cost:function(e){
    console.log(e)
    this.setData({
      cost : e.detail.value,
    })
  },
  BankName:function(e){
    this.setData({
      bankName: e.detail.value,
    })
  },

  Account:function(e){
    switch (this.data.cursor) {
      case 1:
        this.setData({
          alipayAccount: e.detail.value,
        })
        break;
      case 2:
        this.setData({
          bankAccount: e.detail.value,
        })
        break;
    }
  },

  ReceiveName:function(e){
      switch(this.data.cursor){
          case 1:
          this.setData({
            alipayReceiveName: e.detail.value,
          })
          break;
          case 2:
          this.setData({
            bandReceiveName: e.detail.value,
          })
          break;
      }
  },
  BankDeposit:function(e){
    this.setData({
      bankDeposit: e.detail.value,
    })

  },

  input_code:function(e){
    this.setData({
      code : e.detail.value,
    })
  },

  click_submit:function(){
    let data= {
      OpenId:app.globalData.openid,
      Cost: this.data.cost,
      PaymentType:this.cursor,
      BankName:this.data.bankName,
      BankDeposit: this.data.bankDeposit,
      BandReceiveName: this.data.bandReceiveName,
      AlipayReceiveName:this.data.alipayReceiveName,
      BankAccount:this.data.bankAccount,
      AlipayAccount:this.data.alipayAccount,
      Code:this.data.code,
    }
    network.request("WithdrawRequest/", data, this.doSuccess, this.doFail, 3)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})