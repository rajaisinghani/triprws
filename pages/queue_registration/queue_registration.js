// pages/queue_registration/queue_registration.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    wx.request ({ 
      url: "https://wechat.useritech.com/api/queue/all",
      method: "GET", 
      header: {
        "X-Api-Key": wx.getStorageSync('apiKey'),
        "X-Token": wx.getStorageSync('token')
      },
      success: function (res) { 
        console.log(res)
        that.setData ({
          queue: res.data.data.queue[0]
        })
      } 
    })
  },

  register: function() {
    wx.navigateTo({
      url: '../queue/queue',
    })
    wx.setStorageSync('queueHidden', false)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})