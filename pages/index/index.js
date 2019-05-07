// pages/zjjg/zjjg.js
const app = getApp()
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
    color: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    luckPosition: -1,
    list: '',
    images: '',

    images_back: '/images/lottery_box_bg.png',
    btnconfirm: '/images/dianjichoujiangd.png',
    avatar_img: '/images/head.png',
    headimg:'/images/head.png',
    hideModal: false,
    phonenum: '未验证',
    zhezhaoval: true,
    name: '姓名',
    retdata: null,
    list: '',
    deviceId: null,
    one: null,
    two: null,
    three: null,
    four: null,
    inputShowed1: false,
    inputShowed2: false,
    inputShowed3: false,
    inputShowed4: false,
  },



  submit: function() {
    if (this.data.one === null,
      this.data.two === null,
      this.data.three === null,
      this.data.four === null) {
      wx.showToast({
        title: '请输入抽奖码',
        icon: 'none',
      })
      return;
    }
    var data = {
      DeviceId: this.data.deviceId,
      Code: this.data.one + this.data.two + this.data.three + this.data.four,
    }

    network.getData("PrizeCode/", data, this.doSuccess, this.doFail, 3);
  },

  one: function(e) {

    this.setData({
      one: e.detail.value,
      inputShowed1: false,
      inputShowed2: true,
      inputShowed3: false,
      inputShowed4: false,
    })
  },

  two: function(e) {
    this.setData({
      two: e.detail.value,
      inputShowed1: false,
      inputShowed2: false,
      inputShowed3: true,
      inputShowed4: false,
    })
  },
  three: function(e) {
    this.setData({
      three: e.detail.value,
      inputShowed1: false,
      inputShowed2: false,
      inputShowed3: false,
      inputShowed4: true,
    })
  },
  four: function(e) {
    this.setData({
      four: e.detail.value,
      inputShowed1: false,
      inputShowed2: false,
      inputShowed3: false,
      inputShowed4: false,
    })
  },

  mymd:function(){
    if (this.data.zhezhaoval ===false){
        return;
      }
      let that = this;
      setTimeout(function(){
        wx.navigateTo({
          url: '../mymd/md?deviceId=' + that.data.deviceId
        })

      },100);
     

  },

  doSuccess: function(e, type) {
    console.log(e)
    let that = this;
    switch (type) {
      case 1:
        {
          that.setData({
            images: e.Images,
            list: e.Description,
          })
          var arr = new Array;
          this.data.images.forEach(function(value, index, arrSelf) {
            arr.push(arrSelf[index].GiftBagPublishId);
          })
          var data = {
            Id: that.data.deviceId,
            GiftBagPublishIds: arr,
          }
          console.log(data);
          network.request("Prize/", data, this.doSuccess, this.doFail, 2);
        }
        break;
      case 2:
        {
          this.setData({
            luckPosition: e - 1,
            inputShowed1: true,
          })
        }
        break;
      case 3:
        {
          if (e === true) {
            this.clickLuck();
            this.setData({
              zhezhaoval: true,
            })
          } else {

          }
        }
        break;
    }

  },
  doFail: function(e) {
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.data.deviceId = '563fd56f11f0'; //options.deviceId
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
              this.jump(this.data.deviceId)
            }
          })
        } else {
          this.showModal();
        }
      }
    })


    this.loadAnimation();

  },

  jump: function(deviceid) {
    if (deviceid) {
      this.setData({
        zhezhaoval: false,
      })
      network.getData("GiftBagPool/" + this.data.deviceId, '', this.doSuccess, this.doFail, 1);
    } else {

    }
  },

  getUserInfo: function(res) {

    if (res.detail.errMsg === 'getUserInfo:fail auth deny') {

    } else {
      app.globalData.userInfo = res.detail.userInfo;
      this.setData({
        hideModal: true,
        name: res.detail.userInfo.nickName,
        avatar_img: res.detail.userInfo.avatarUrl,
      })
      this.jump(this.data.deviceId)
    }

  },


  //点击抽奖按钮
  clickLuck: function() {

    var e = this;
    console.log(e.data.luckPosition);
    //判断中奖位置格式
    if (e.data.luckPosition < 0 || isNaN(e.data.luckPosition)) {
      wx.showToast({
        title: '抽奖出现异常，请重新输入抽奖码',
        icon: 'none'
      })
      return;
    }
    //清空计时器
    clearInterval(interval);
    var index = 0;

    //循环设置每一项的透明度
    interval = setInterval(function() {
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
    setTimeout(function() {
      e.stop(e.data.luckPosition);
    }, stoptime)

  },

  //也可以写成点击按钮停止抽奖
  // clickStop:function(){
  //   var stoptime = 2000;
  //   setTimeout(function () {
  //     e.stop(1);
  //   }, stoptime)
  // },

  stop: function(which) {
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
  stopLuck: function(which, index, time, splittime) {
    var e = this;
    //值越大出现中奖结果后减速时间越长
    var color = e.data.color;
    setTimeout(function() {
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
        //1秒后显示弹窗
        setTimeout(function() {
          if (e.data.images[which].GiftBagPublishId > 0) {
            //中奖
            wx.navigateTo({
              url: '../zjjg/zjjg?deviceId=' + e.data.deviceId + '&GiftBagPublishId=' + e.data.images[which].GiftBagPublishId 
            })
          } else {
            //中奖

          }
        }, 1000);
      }
    }, time);

  },
  //进入页面时缓慢切换
  loadAnimation: function() {
    var e = this;
    var index = 0;
    // if (interval == null){
    interval = setInterval(function() {
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





  showModal: function() {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600, //动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快 
      timingFunction: 'ease', //动画的效果 默认值是linear 
    })
    this.animation = animation
    setTimeout(function() {
      that.fadeIn(); //调用显示动画 
    }, 200)
  },

  // 隐藏遮罩层 
  hideModal: function() {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800, //动画的持续时间 默认400ms 数值越大，动画越慢 数值越小，动画越快 
      timingFunction: 'ease', //动画的效果 默认值是linear 
    })
    this.animation = animation
    that.fadeDown(); //调用隐藏动画 
    setTimeout(function() {
      that.setData({
        hideModal: true
      })
    }, 720) //先执行下滑动画，再隐藏模块 
  },

  //动画集 
  fadeIn: function() {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性 
    })
  },
  fadeDown: function() {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },

})