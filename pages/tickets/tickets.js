Page({
    data: {},
    openProductDetail: function(t) {
      var a = t.currentTarget.dataset.item;
      wx.navigateTo({
        url: "../../components/product-detail/product-detail?id=" + a.id
      })
    },
    navigateToSelections: function() {
      wx.navigateTo({
        url: "../home/home"
      })
    },
    navigateToCart: function() {
      wx.navigateTo({
        url: "../cart/cart"
      })
    },
    onLoad: function(t) {
      var a = this,
      o = getApp();
      wx.request({
        url: "https://wechat.useritech.com/api/attractions/all",
        method: "GET",
        header: {
          "X-Api-Key": wx.getStorageSync('apiKey'),
          "X-Token": wx.getStorageSync('token')
        },
        success: function(t) {
          a.setData({
            attractions: t.data.data.attractions
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