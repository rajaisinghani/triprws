Page({
    data: {
      floatingButtonSource: "../../assets/list.png",
      times: ["11:00 am", "12:30 pm", "1:00 pm", "3:00 pm"],
      visited: ["435", "434", "421", "158"]
    },
    navigateToSelections: function() {
      wx.navigateTo({
        url: "../home/home"
      })
    },

    openProductDetail: function(t) {
      var e = t.currentTarget.dataset.id;
      wx.navigateTo({
        url: "../../components/product-detail/product-detail?id=" + e
      })
    },
    redeemTicket: function(t) {
      var e = getApp(),
        a = wx.getStorageSync('cart'),
        o = t.currentTarget.dataset.id;
      a.includes(o) ? wx.navigateTo({
        url: "../eticket/eticket"
      }) : wx.showModal({
        title: "Unable to redeem",
        content: "Please purchase a ticket before you can redeem it",
        confirmText: "Ok",
        showCancel: !1
      })
    },
    onLoad: function(t) {
      var e = this,
        a = getApp();
      wx.request({
        url: "https://wechat.useritech.com/api/attractions/all",
        method: "GET",
        header: {
          "X-Api-Key": wx.getStorageSync('apiKey'),
          "X-Token": wx.getStorageSync('token')
        },
        success: function(t) {
          var attractions = t.data.data.attractions;
          var toAdd = [];
          attractions.forEach(function(item) {
            if (e.data.visited.includes(item.id)) {
              toAdd.push(item)
            }
          })
          console.log(t), e.setData({
            attractions: toAdd
          })
        }
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