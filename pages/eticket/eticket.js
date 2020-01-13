Page({
  data: {},
  onLoad: function() {
    var o = getApp();
    this.setData({
      eTicketUrl: wx.getStorageSync('eticket')
    });
    console.log(o.globalData)
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});