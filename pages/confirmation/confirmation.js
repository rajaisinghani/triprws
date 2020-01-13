Page({
    data: {
      information: []
    },
    
    viewTicket: function() {
      wx.navigateTo({
        url: "../eticket/eticket"
      })
    },

    qrCode: function() {
      wx.navigateTo({
        url: "../qrcode/qrcode"
      })
    },

    navigateHome: function() {
      wx.switchTab({
        url: '../map/map',
      })
    },

    onLoad: function(t) {
      var a = this
      var cart = wx.getStorageSync('cart')
      cart.forEach(function(t) {
        wx.request({
          url: "https://wechat.useritech.com/api/attractions/detail?id=",
          method: "GET",
          header: {
            "X-Api-Key": wx.getStorageSync('apiKey'),
            "X-Token": wx.getStorageSync('token')
          },
          data: {
            id: t
          },
          success: function(t) {
            a.setData({
              information: a.data.information.concat(t.data.data.attractions)
            })
          }
        })
      })
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
  }

);