Page({
    data: {
      information: [],
      selected: !0,
      total: 0,
      shipping: 2.5,
      tax: 3.7,
      color1: "white",
      color2: "white"
    },
    subtotal: function() {
      var t = 0;
      return this.data.information.forEach(function(a) {
        t += a.price
      }), t
    },
    changeColor1: function() {
      "white" === this.data.color1 && this.setData({
        color1: "green",
        color2: "white"
      })
    },
    changeColor2: function() {
      "white" === this.data.color2 && this.setData({
        color1: "white",
        color2: "green"
      })
    },
    createTransaction: function() {
      var t = wx.getStorageSync("tokenType"),
      a = wx.getStorageSync("accessToken");
      wx.request({
        url: "https://uat-api.globaltix.com/api/transaction/create",
        method: "POST",
        header: {
          "Accept-Version": "1.0",
          Authorization: t + " " + a,
          "Content-Type": "application/json"
        },
        data: {
          ticketTypes: [{
            index: 0,
            id: 1447,
            fromResellerId: null,
            quantity: 1
          }],
          customerName: "Raj Jaisinghani",
          email: "customer.a@email.com",
          paymentMethod: "CREDIT"
        },
        success: function(t) {
          wx.setStorageSync('eticket',t.data.data.eTicketUrl)
        }
      }), wx.navigateTo({
        url: "../confirmation/confirmation"
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
              information: a.data.information.concat(t.data.data.attractions),
              total: a.data.total += parseFloat(t.data.data.attractions.price)
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