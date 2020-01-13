// pages/moments/moments.js
Page({

  /**
   * Page initial data
   */
  data: {
    //test images
    images2: ['https://images.unsplash.com/photo-1528055823578-1c18ae59ef8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80',
    'https://images.unsplash.com/photo-1506422748879-887454f9cdff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1462899006636-339e08d1844e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    'https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022__340.jpg'],
    
    // array of booleans, value at index indicates wether or not image is hidden
    flags: []
  },

  show: function (event) {
    var index = event.currentTarget.dataset.index;
    var updated = this.data.flags;
    var removed = updated.splice(index, 1, false);
    this.setData ({
      flags: updated
    })
  },

  hide: function (event) {
    var index = event.currentTarget.dataset.index;
    var updated = this.data.flags;
    var removed = updated.splice(index, 1, true);
    this.setData({
      flags: updated
    })
  },

  share: function() {
    console.log('share clicked');
  },

  buy: function () {
    console.log('buy clicked');
  },
  
  openFullSized: function (event) {
    var url = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../../components/image/image?url=' + url,
    })
  },
  
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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
    var that = this;
    var app = getApp();
    wx.request({
      url: "https://wechat.useritech.com/api/moments/all",
      method: "GET",
      header: {
        "X-Api-Key": wx.getStorageSync('apiKey'),
        "X-Token": wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        var length = res.data.data.moments.length;
        that.setData({
          images: res.data.data.moments,
          flags: Array(length).fill(true)
        })
      }
    })
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