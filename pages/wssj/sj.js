// pages/wssj/sj.js

const app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    retdata: '',
    hexiaolist: '',
    ishexiao: true,
    hexiaoPageIndex: 1,
    spname: '端午祥瑞大礼包',
    num: 4,
    color: '#ff6600',
    color1: '#999999',
    color2: '#ff6600',
    color3: '#999999',
    windowHeight: '',
    styh: 75,
    styh1: 65,
    currentData: 0,
    currenthxItemData: 0,
    currenttxItemData: 0,
    currentItemData: 1,
    // color:'#ff6600',
    name: '',
    avatar_img: '',
  },

  libaoxiaoshou: function () {
    this.setData({
      currenttxItemData: 0,
      color2: '#ff6600',
      color3: '#999999',
    })
  },

  tixianshenqing: function () {
    this.setData({
      currenttxItemData: 1,
      color3: '#ff6600',
      color2: '#999999',
    })
  },


  catchTouchMove: function (res) {
    return false;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        let windowHeight = res.windowHeight
        console.log(res.model.indexOf('iPhone X'))
        if (res.model.indexOf('iPhone X') >= 0) {
          this.setData({
            windowHeight: windowHeight,
            styh: 78,
            styh1: 70,
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


  loadhexiao: function () {

    wx.showLoading({
      title: '正在加载',
    })
    var data = {
      OpenId: app.globalData.openid,
      PageIndex: this.data.hexiaoPageIndex,
    }
    console.log(data);
    network.getData("MerchantList/", data, this.doSuccess, this.doFail, 1);
  },


  loadMore: function () {
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
        ishexiao: false,
      })
      this.loadhexiao();
    }
    console.log('loadMore')
  },

  loadMore1: function () {
    console.log('loadMore1')
  },
  loadMore2: function () {
    console.log('loadMore2')
  },

  submit: function () {
    console.log("222222222")
    // this.doSuccess();
    // network.getData("UserProductInfo/", '', this.doSuccess, this.doFail, 1);
  },

  doSuccess: function (e, type) {
    console.log(e);
    let that = this;
    wx.hideLoading();
    switch (type) {
      case 1:
        {

          var e = {
            "Page": {
              "CurrentPage": 1,
              "TotalPage": 2,
              "TotalCount": 3
            },
            "List": [
              {
                "PrizeProductId": 1,
                "ConsumptionCode": "sample string 2",
                "ConsumptionTime": "2019-05-11 14:38:39",
                "PayTime": "2019-05-11 14:38:39",
                "Nickname": "sample string 3",
                "UserIcon": "http://60.195.251.75:9800/content/images/1.png",
                "Code": "sample string 5",
                "ProductId": 6,
                "ProductName": "sample string 7",
                "Price": 8.0,
                "AgentName": "sample string 9",
                "Address": "sample string 10",
                "Phone": "sample string 11",
                "ProductIcon": "http://60.195.251.75:9800/content/images/1.png",
                "UseRole": "sample string 13"
              },
              {
                "PrizeProductId": 1,
                "ConsumptionCode": "sample string 2",
                "ConsumptionTime": "2019-05-11 14:38:39",
                "PayTime": "2019-05-11 14:38:39",
                "Nickname": "sample string 3",
                "UserIcon": "http://60.195.251.75:9800/content/images/1.png",
                "Code": "sample string 5",
                "ProductId": 6,
                "ProductName": "sample string 7",
                "Price": 8.0,
                "AgentName": "sample string 9",
                "Address": "sample string 10",
                "Phone": "sample string 11",
                "ProductIcon": "http://60.195.251.75:9800/content/images/1.png",
                "UseRole": "sample string 13"
              },
              {
                "PrizeProductId": 1,
                "ConsumptionCode": "sample string 2",
                "ConsumptionTime": "2019-05-11 14:38:39",
                "PayTime": "2019-05-11 14:38:39",
                "Nickname": "sample string 3",
                "UserIcon": "http://60.195.251.75:9800/content/images/1.png",
                "Code": "sample string 5",
                "ProductId": 6,
                "ProductName": "sample string 7",
                "Price": 8.0,
                "AgentName": "sample string 9",
                "Address": "sample string 10",
                "Phone": "sample string 11",
                "ProductIcon": "http://60.195.251.75:9800/content/images/1.png",
                "UseRole": "sample string 13"
              },
                   {
                "PrizeProductId": 1,
                "ConsumptionCode": "sample string 2",
                "ConsumptionTime": "2019-05-11 14:38:39",
                "PayTime": "2019-05-11 14:38:39",
                "Nickname": "sample string 3",
                "UserIcon": "http://60.195.251.75:9800/content/images/1.png",
                "Code": "sample string 5",
                "ProductId": 6,
                "ProductName": "sample string 7",
                "Price": 8.0,
                "AgentName": "sample string 9",
                "Address": "sample string 10",
                "Phone": "sample string 11",
                "ProductIcon": "http://60.195.251.75:9800/content/images/1.png",
                "UseRole": "sample string 13"
              }
            ]
          }
          that.setData({
            retdata: e,
          })

          setTimeout(function () {
            if (e.List.length > 0) {
              let searchList = '';
              that.data.ishexiao ? searchList = e.List : searchList = that.data.hexiaolist.concat(e.List)
              that.setData({
                hexiaolist: searchList,
                hexiaoPageIndex: that.data.hexiaoPageIndex + 1,
              })
            } else {
              wx.showToast({
                title: '无数据加载',
                icon: 'none'
              })
              that.setData({
                ishexiao: true,
              })
            }

          }, 400);

        }
        break;
      case 2:
        {

          wx.navigateTo({
            url: '../sjhx/sjhx'
          })
        }
        break;

    }

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
      case 0:
        break;
      case 1:
        {
          this.loadhexiao();
          //获取用户的核销记录
        }
        break;
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

    // wx.navigateTo({
    //   url: '../sjtcjl/sjtcjl?deviceId=' + this.data.deviceId + "&avatar_img=" + this.data.avatar_img +
    //     "&name=" + this.data.name
    // })


  },

  sqtx: function () {
    wx.navigateTo({
      url: '../sjtc/sjtc'
    })
  },


  scroll1:function(e){
console(1111);
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
    console.log(222)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      console.log(1111)
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