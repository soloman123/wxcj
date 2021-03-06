// pages/zjjg/zjjg.js
const app = getApp()
var util = require("../../utils/util.js");
var network = require("../../utils/network.js")
//计数器
var interval = null;

//值越大旋转时间越长  即旋转速度
var intime = 50;

Page({


  /**
   * 页面的初始数据
   */
  data: {
    error:'',
    buttonClicked: false,
    jumptpye:0,
    color: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    luckPosition: -1,
    close: true,
    PublishId: '',
    list: '',
    images: '',
    phonenum: '未验证',
    images_back: '/images/lottery_box_bg.png',
    btnconfirm: '/images/lottery_start.bak.png',
    avatar_img: '/images/user_img.png',
    headimg: '/images/head.png',
    defimg: '/images/2.png',
    hideModal: false,
    zhezhaoval: true,
    name: '姓名',
    retdata: null,
    list: '',
    deviceId: null,
    codeLength: 4,
    type: 'number',
    isFocus: true,
    code: '',
    agentId: '',
    availableCost:0,
  },

  focusBox() {
    this.setData({
      isFocus: true
    })
  },
  inputCode(e) {
    this.setData({
      code: e.detail.value
    })
  },


  submitCode( e) {
  console.log(e)
    util.buttonClicked(this)
    if (this.data.code.length < this.data.codeLength) {
      wx.showToast({
        title: '抽奖码错误',
        icon: "none",
        duration: 1500
      })
      this.setData({
        zhezhaoval: true,
        code: ''
      })
    } else {
      var data = {
        DeviceId: this.data.deviceId,
        Code: this.data.code,
        OpenId: app.globalData.openid,
      }
      network.getData("PrizeCode/", data, this.doSuccess, this.doFail, 3);
    }
  },


  mymd: function () {
    if (this.data.zhezhaoval == false || this.data.close == false || this.data.luckPosition > 0) {
      return;
    }
    let that = this;
    setTimeout(function () {
      
      wx.navigateTo({
        url: '../mymd/md?deviceId=' + that.data.deviceId
      })

    }, 100);
  },

  choujiang: function () {
    if (this.data.zhezhaoval == true) {
      this.setData({
        zhezhaoval: false,
        btnconfirm: '/images/dianjichoujiangd.png',
      });
    }
  },


  mysj: function () {
  
    if (this.data.zhezhaoval == false || this.data.close == false || this.data.luckPosition > 0) {
      return;
    }
    if (this.data.agentId > 0) {
      let that = this;
      setTimeout(function () {
        wx.navigateTo({
          url: '../wssj/sj?avatar_img=' + that.data.avatar_img +
            "&name=" + that.data.name + '&availableCost=' + that.data.availableCost
        })
      }, 100);
    } else {
      wx.showModal({
        title: '提示',
        content: '您不是商家，不能进入',
        showCancel: false
      })
    }

  },

  doSuccess: function (e, type) {
    console.log(e);
    let that = this;
    wx.hideLoading();
    switch (type) {
      case 1:
        {
          if (e.Code < 0) {
            wx.showModal({
              title: '服务器返回错误',
              content: e.Message,
              showCancel: false,
            })
       
          } else {
            that.setData({
              images: e.Images,
              list: e.Description,
            })
          }
        }
        break;
      case 2:
        {
          if (e.Code < 0) {
            wx.showModal({
              title: '服务器返回错误',
              content: e.Message,
              showCancel: false,
            })
            this.setData({
              btnconfirm: '/images/lottery_start.bak.png'
            })
       
          }else{
            this.setData({
              luckPosition: e.Index - 1,
              inputShowed1: true,
              PublishId: e.PublishId,
              zhezhaoval: true,
              code: ''
            })
            this.clickLuck();
          }
  
        }
        break;
      case 3:
        {
          if (e == true) {
            var arr = new Array;
            if (!this.data.images) {
              return;
            }
            this.data.images.forEach(function (value, index, arrSelf) {
              arr.push(arrSelf[index].GiftBagPublishId);
            })
            var data = {
              Id: that.data.deviceId,
              GiftBagPublishIds: arr,
              openid: app.globalData.openid,
            }
        
            network.request("Prize/", data, this.doSuccess, this.doFail, 2);
          } else {
            this.setData({
              error:'抽奖码错误',
              close: false,
              zhezhaoval: true,
              code:''
            })
          }
        }
        break;
      case 4:
        {
          if (e == null) {
            app.globalData.phonenum = '未验证'
            that.setData({
              phonenum: '未验证',
              agentId: 0,
            })
          } else {
            that.setData({
              agentId: e.AgentId,
              availableCost: e.AvailableCost,
            })
            if (util.isMobile(e.Phone)) {
              app.globalData.phonenum = e.Phone;
              that.setData({
                phonenum: e.Phone,
              })
              wx.setStorage({
                key: 'phone',
                data: app.globalData.phonenum,
              })
            } else {
              app.globalData.phonenum = '未验证';
              that.setData({
                phonenum: '未验证',
              })
            }
          }
        }
        break;
      case 5: {
        console.log(e);
      } break

    }

  },
  doFail: function (e) {
    wx.hideLoading();
    console.log(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    let scene = decodeURIComponent(options.scene);
    let devid = options.deviceId +'';
    this.data.deviceId = scene == "undefined" ? devid : scene;
    this.data.deviceId = '60427f874be4';
    if (this.data.deviceId != 'undefined'){
      wx.setStorage({
        key: 'deviceId',
        data: this.data.deviceId
      })
    }
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo;
              this.setData({
                hideModal: true,
                name: res.userInfo.nickName,
                avatar_img: res.userInfo.avatarUrl,
              })
              var userinfo = {
                OpenId:app.globalData.openid,
                NickName: res.userInfo.nickName,
                UserIcon: res.userInfo.avatarUrl
              }
              network.putData("UserInfo/", userinfo,this.doSuccess, this.doFail, 20);
              this.jump(this.data.deviceId)
            }
          })
        } else {
          this.showModal();
        }
      }
    })

    // 
    this.loadAnimation();
    this.getphone();
  },

  getphone: function (e) {
    var that = this;
    wx.getStorage({
      key: 'phone',
      success: function (res) {
     
        if (res.errMsg == 'getStorage:ok') {
          app.globalData.phonenum = res.data;
          that.setData({
            phonenum: app.globalData.phonenum,
          })
        }

      },
      fail: function (e) {
      }
    })
    setTimeout(function () {
      if (app.globalData.openid != null) {
        network.getData("UserInfo/" + app.globalData.openid, '', that.doSuccess, that.doFail, 4);
        clearTimeout()
      } else {
        clearTimeout()
      }
    }, 2000)
  },

  jump: function (deviceid) {
    var that = this;
    
    if (deviceid == 'undefined') {
      wx.redirectTo({
        url: '../qsye/qs?name=' + this.data.name + "&avatar_img=" + this.data.avatar_img
      })
    } else {

      wx.showLoading({
        title: '加载数据中...',
      })
      network.getData("GiftBagPool/" + this.data.deviceId, '', this.doSuccess, this.doFail, 1);
    }
  },

  // qes: function () {
  //   network.deleteData("MobileValidCode/" + 13810006824
  //     , '', this.doSuccess, this.doFail, 5);
  // },

  getUserInfo: function (res) {

    if (res.detail.errMsg == 'getUserInfo:fail auth deny') {

    } else {
      app.globalData.userInfo = res.detail.userInfo;
      this.setData({
        hideModal: true,
        name: res.detail.userInfo.nickName,
        avatar_img: res.detail.userInfo.avatarUrl,
      })
      var userinfo = {
        OpenId:app.globalData.openid,
        NickName: res.detail.userInfo.nickName,
        UserIcon: res.detail.userInfo.avatarUrl
      }
      console.log(userinfo);
      network.putData("UserInfo/", userinfo, this.doSuccess, this.doFail, 20);
    
      if (app.globalData.openid == 'undefined' || app.globalData.openid == null) {
        
        // this.jump('');
      } else {
        this.jump(this.data.deviceId)
      }

    }

  },


  //点击抽奖按钮
  clickLuck: function () {

    var e = this;

    //判断中奖位置格式
    if (e.data.luckPosition < 0 || isNaN(e.data.luckPosition)) {
      wx.showToast({
        title: '抽奖出现异常，请重新输入抽奖码',
        icon: 'none'
      })
      this.setData({
        btnconfirm: '/images/lottery_start.bak.png'
      })
      return;
    }

    //清空计时器
    clearInterval(interval);
    var index = 0;

    //循环设置每一项的透明度
    interval = setInterval(function () {
      if (index > 7) {
        index = 0;
        e.data.color[7] = 0.5
      } else if (index != 0) {
        e.data.color[index - 1] = 0.5
      }
      e.data.color[index] = 1
      e.setData({
        color: e.data.color,
      })
      index++;
    }, intime);

    //模拟网络请求时间  设为两秒
    var stoptime = 2000;
    setTimeout(function () {
      e.stop(e.data.luckPosition);
    }, stoptime)

  },


  stop: function (which) {
    var e = this;
    //清空计数器
    clearInterval(interval);
    //初始化当前位置
    var current = -1;
    var color = e.data.color;
    for (var i = 0; i < color.length; i++) {
      if (color[i] == 1) {
        current = i;
      }
    }
    //下标从1开始
    var index = current + 1;

    e.stopLuck(which, index, intime, 10);
  },


  /**
   * which:中奖位置
   * index:当前位置
   * time：时间标记
   * splittime：每次增加的时间 值越大减速越快
   */
  stopLuck: function (which, index, time, splittime) {
    var e = this;
    //值越大出现中奖结果后减速时间越长
    var color = e.data.color;
    setTimeout(function () {
      //重置前一个位置
      if (index > 7) {
        index = 0;
        color[7] = 0.5
      } else if (index != 0) {
        color[index - 1] = 0.5
      }
      //当前位置为选中状态
      color[index] = 1
      e.setData({
        color: color,
      })
      //如果旋转时间过短或者当前位置不等于中奖位置则递归执行
      //直到旋转至中奖位置
      if (time < 400 || index != which) {
        //越来越慢
        splittime++;
        time += splittime;
        //当前位置+1
        index++;
        e.stopLuck(which, index, time, splittime);
      } else {
        e.setData({
          luckPosition: -1,
          btnconfirm: '/images/lottery_start.bak.png'
        })
        //1秒后显示弹窗
        setTimeout(function () {
          if (e.data.images[which].GiftBagPublishId > 0) {
            //中奖

            wx.navigateTo({
              url: '../zjjg/zjjg?deviceId=' + e.data.deviceId + '&GiftBagPublishId=' + e.data.images[which].GiftBagPublishId + '&PublishId=' + e.data.PublishId
            })
          } else {
            //中奖
            var that = e;
            wx.showModal({
              title: '提示',
              content: '很遗憾未中奖',
              showCancel:false,
              confirmText:'知道了',
              success(e){
                wx.redirectTo({
                  url: '../qsye/qs?name=' + that.data.name + "&avatar_img=" + that.data.avatar_img
                })
              }
            })
          }
        }, 1000);
      }
    }, time);

  },
  //进入页面时缓慢切换
  loadAnimation: function () {
    var e = this;
    var index = 0;
    // if (interval == null){
    interval = setInterval(function () {
      if (index > 7) {
        index = 0;
        e.data.color[7] = 0.5
      } else if (index != 0) {
        e.data.color[index - 1] = 0.5
      }
      e.data.color[index] = 1
      e.setData({
        color: e.data.color,
      })
      index++;
    }, 1000);
    // }  
  },

  showModal: function () {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600, //动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快 
      timingFunction: 'ease', //动画的效果 默认值是linear 
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn(); //调用显示动画 
    }, 200)
  },

  // 隐藏遮罩层 
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800, //动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快 
      timingFunction: 'ease', //动画的效果 默认值是linear 
    })
    this.animation = animation
    that.fadeDown(); //调用隐藏动画 
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 720) //先执行下滑动画，再隐藏模块 
  },

  //动画集 
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性 
    })
  },
  fadeDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
    switch (this.data.jumptpye){
      case 0:{
        if (app.globalData.phonenum.length > 8) {
          this.setData({
            phonenum: app.globalData.phonenum,
          })
        }
      }break;
      case 1:{
        wx.navigateTo({
          url: '../mymd/md?deviceId=' + this.data.deviceId
        })
        this.setData({
          jumptpye:0,
        })
      }
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
    clearTimeout()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
    clearTimeout()
  },

})