//index.js
//获取应用实例
const app = getApp()
const QRCode = require('../../utils/weapp-qrcode.js')
import rpx2px from '../../utils/rpx2px.js'
let qrcode;

const qrcodeWidth = rpx2px(300)

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    floatingButtonSource: "../../assets/list.png",
    information: [],
    ticketColor: 'crimson',
    qrColor: 'lightgrey',
    hideTickets: false,
    hideQr: true,
    qrcodeWidth,
    hideVip: true
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  vip: function() {
    this.setData({
      hideVip: false
    })

    //load custom qrcode using user's name as input string
    qrcode = new QRCode('canvas', {
      text: this.data.userInfo.nickName,
      width: qrcodeWidth,
      height: qrcodeWidth,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  },

  //open up qr code scanner
  scan: function () {
    wx.scanCode({
      onlyfromCamera: true,
      scanType: ['qrCode'],
      success: function (res) {
        wx.navigateTo({
          url: '../queue_registration/queue_registration',
        })
      },
      fail: function (res) {
        console.error(res)
      },
      complete: function (res) {
        console.log(res)
      },
    })
  },

  //toggle between showing ticket and qrcode 'tabs'
  toggleTicket: function() {
    if (this.data.ticketColor === 'lightgrey') {
      this.setData({
        ticketColor: 'crimson',
        qrColor: 'lightgrey',
        hideTickets: false,
        hideQr: true
      })
    }
  },

  toggleQr: function () {
    if (this.data.qrColor === 'lightgrey') {
      this.setData({
        ticketColor: 'lightgrey',
        qrColor: 'crimson',
        hideTickets: true,
        hideQr: false
      })
    }
  },

  //Navigate back to initial home page where user selects from buttons
  navigateToSelections: function () {
    wx.navigateTo({
      url: '../home/home',
    })
  },

  qrcode: function () {
    wx.navigateTo({
      url: '../qrcode/qrcode',
    })
  },

  onLoad: function () {
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          wx.setStorageSync('userInfo', res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onShow: function() {
    var that = this
    var cartItemIds = wx.getStorageSync('cart')

    //resetting the data so that no duplicates occur
    that.setData({
      information: []
    })

    //load tickets that user has purchased
    cartItemIds.forEach(function (item) {
      wx.request({
        url: 'https://wechat.useritech.com/api/attractions/detail?id=',
        method: 'GET',
        header: {
          "X-Api-Key": wx.getStorageSync('apiKey'),
          "X-Token": wx.getStorageSync('token')
        },
        data: {
          id: item
        },
        success: function (res) {
          that.setData({
            information: that.data.information.concat(res.data.data.attractions)
          })
        }
      })
    })
  },

  getUserInfo: function(e) {
    wx.setStorageSync('userInfo', e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
