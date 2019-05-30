// pages/wssj/sj.js

const app = getApp()
var network = require("../../utils/network.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isclean: false,
    retdata: '',
    hexiaolist: '',
    ishexiao: true,
    hexiaoPageIndex: 1,

    libaoxiaoshouretdata: '',
    islibaoxiaoshou: true,
    libaoxiaoshoulist: '',
    libaoxiaoshouPageIndex: 1,
    libaoxiaoshoutext: '正在加载',


    txjlretdata: '',
    istxjl: true,
    txjllist: '',
    txjlPageIndex: 1,

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
    sgcode: '',
    phonenum: '',
    availableCost:0,
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
    wx.hideShareMenu()
    wx.getSystemInfo({
      success: (res) => {
        let windowHeight = (res.windowHeight * (750 / res.windowWidth));
        this.setData({
          windowHeight: windowHeight,
        })
      }
    })
    this.setData({
      name: options.name,
      avatar_img: options.avatar_img,
      phonenum: app.globalData.phonenum,
      availableCost: options.availableCost,
    })



  },
  grzx:function(){
    wx.reLaunch({
      url: '../qsye/qs?name=' + this.data.name + "&avatar_img=" + this.data.avatar_img
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
    if (this.data.retdata == null) {
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

  loadMore2: function () {
    var request = false;
    if (this.data.libaoxiaoshouretdata == null) {
      request = true;
    } else if (this.data.libaoxiaoshouPageIndex <= this.data.libaoxiaoshouretdata.Page.TotalPage) {
      request = true;
    } else {
      request = false;
    }
    if (request) {
      this.setData({
        islibaoxiaoshou: false,
      })
      this.loadlbxs();
    }
  },


  loadMore1: function () {
    var request = false;
    if (this.data.txjlretdata.Page == undefined) {
      return false;
    }
    if (this.data.txjlretdata == null) {
      request = true;
    } else if (this.data.txjlPageIndex <= this.data.txjlretdata.Page.TotalPage) {
      request = true;
    } else {
      request = false;
    }
    if (request) {
      this.setData({
        istxjl: false,
      })
      this.loadtxjl();
    }
  },


  hem: function (e) {
    console.log(e);
    e.detail.value
    this.setData({
      sgcode: e.detail.value.trim(),
    })
  },

  submit: function () {
    if (this.data.sgcode.length <= 0) {
      wx.showModal({
        title: '错误提示',
        content: '请正确输入核销码',
        showCancel: false,
        confirmText: '知道了'
      })
    } else {
   
      network.getData("Consumption/" + this.data.sgcode, '', this.doSuccess, this.doFail, 4);
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
              title: '错误提示',
              content: e.Message,
              showCancel: false,
            })
          } else {
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

                that.setData({
                  ishexiao: true,
                  libaoxiaoshoutext: '无数据加载',
                })
              }

            }, 400);

          }

        }
        break;
      case 2:
        {
          if (e.Code < 0) {
            wx.showModal({
              title: '错误提示',
              content: e.Message,
              showCancel: false,
            })
          } else {
            that.setData({
              libaoxiaoshouretdata: e,
            })
            setTimeout(function () {
              if (e.List.length > 0) {
                let searchList = '';
                that.data.islibaoxiaoshou ? searchList = e.List : searchList = that.data.libaoxiaoshoulist.concat(e.List)
                that.setData({
                  libaoxiaoshoulist: searchList,
                  libaoxiaoshouPageIndex: that.data.libaoxiaoshouPageIndex + 1,
                })
              } else {

                that.setData({
                  islibaoxiaoshou: true,
                  libaoxiaoshoutext: '无数据加载',
                })
              }

            }, 400);

          }

        }
        break;
      case 3:
        {
          if (e.Code < 0) {
            wx.showModal({
              title: '服务器返回错误信息',
              content: e.Message,
              showCancel: false,
            })
          } else {
            that.setData({
              txjlretdata: e,
            })
            setTimeout(function () {
              if (e.List.length > 0) {
                let searchList = '';
                that.data.istxjl ? searchList = e.List : searchList = that.data.txjllist.concat(e.List)
                that.setData({
                  txjllist: searchList,
                  txjlPageIndex: that.data.txjlPageIndex + 1,
                })
              } else {

                that.setData({
                  istxjl: true,
                  libaoxiaoshoutext: '无数据加载',
                })
              }
            }, 400);
          }
        }
        break;
      case 4:
        console.log(e)
        if (e) {
          wx.navigateTo({
            url: '../sjhx/sjhx?code=' + this.data.sgcode + "&Consumption=" + JSON.stringify(e)
          })
          // this.setData({
          //   Consumption: res,
          // })
        } else {
          wx.showModal({
            title: '错误信息',
            content: '核销码不正确,请仔细填写核销码',
            showCancel: false,
            success(res) {

            }
          })
        }


        break;
    }

  },

  saoma: function () {
    let that = this;
    wx.scanCode({
      onlyFromCamera: true,
   
      success(res) {
        console.log(res)

        if (res.errMsg != 'scanCode:ok') {
          wx.showModal({
            title: '错误提示',
            content: '请正确输入核销码',
            showCancel: false,
            confirmText: '知道了'
          })
        } else {
          that.setData({
            sgcode: res.result.trim(),
          })
          network.getData("Consumption/" + that.data.sgcode, '', that.doSuccess, that.doFail, 4);
        }
        // wx.navigateTo({
        //   url: '../sjhx/sjhx?code=' + res
        // })
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
          this.setData({
            retdata: '',
            hexiaolist: '',
            ishexiao: true,
            hexiaoPageIndex: 1,
          })
          this.loadhexiao();
          //获取用户的核销记录
        }
        break;
    }
  },

  bindchange2: function (e) {
    console.log(e);
    switch (e.detail.current) {
      case 0:
        this.setData({
          libaoxiaoshouretdata: '',
          islibaoxiaoshou: true,
          libaoxiaoshoulist: '',
          libaoxiaoshouPageIndex: 1,
        })
        this.loadlbxs();
        break;
      case 1:
        {
          this.setData({
            txjlretdata: '',
            istxjl: true,
            txjllist: '',
            txjlPageIndex: 1,
          })
          this.loadtxjl();
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
    // 
    console.log('sjtc ====' + this.data.currenttxItemData)
    switch (this.data.currenttxItemData) {
      case 0:
        this.loadlbxs();
        break;
      case 1:
        this.loadtxjl();
        break;
    }

    // wx.navigateTo({
    //   url: '../sjtcjl/sjtcjl?deviceId=' + this.data.deviceId + "&avatar_img=" + this.data.avatar_img +
    //     "&name=" + this.data.name
    // })


  },


  loadlbxs: function () {

    wx.showLoading({
      title: '正在加载',
    })
    var data = {
      OpenId: app.globalData.openid,
      PageIndex: this.data.libaoxiaoshouPageIndex,
    }
    console.log(data);
    network.getData("MerchantGiftBag/", data, this.doSuccess, this.doFail, 2);
  },

  loadtxjl: function () {

    wx.showLoading({
      title: '正在加载',
    })
    var data = {
      OpenId: app.globalData.openid,
      PageIndex: this.data.txjlPageIndex,
    }
    console.log(data);
    network.getData("WithdrawList/", data, this.doSuccess, this.doFail, 3);
  },




  sqtx: function () {
    wx.navigateTo({
      url: '../sjtc/sjtc'
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
    if (this.data.isclean == true) {
      this.setData({
        sgcode: '',
        isclean: false,
      })
    }
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



  next: function (e) {
    console.log(this.data.retdata.List[e.currentTarget.dataset['index']])
    wx.navigateTo({
      url: '../sjhecg/hxcg?type=2&data=' + JSON.stringify(this.data.retdata.List[e.currentTarget.dataset['index']])
    })
  },

})