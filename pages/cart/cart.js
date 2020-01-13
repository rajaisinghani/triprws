Page({
    data: {
      information: []
    },
    checkout: function() {
      wx.navigateTo({
        url: "../checkout/checkout"
      })
    },
    onLoad: function(a) {
      var t = this,
      o = getApp();
      var cart = wx.getStorageSync('cart')
      cart.forEach(function(a) {
        wx.request({
          url: "https://wechat.useritech.com/api/attractions/detail?id=",
          method: "GET",
          header: {
            "X-Api-Key": wx.getStorageSync('apiKey'),
            "X-Token": wx.getStorageSync('token')
          },
          data: {
            id: a
          },
          success: function(a) {
            t.setData({
              information: t.data.information.concat(a.data.data.attractions)
            })
          }
        })
      })
    }
  }

);