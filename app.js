//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    wx.request({
      url: 'https://uat-api.globaltix.com/api/auth/login',
      method: 'POST',
      data: {
        "username": "reseller@globaltix.com",
        "password": "12345"
      },
      success: function (res) {
        wx.setStorageSync('tokenType', res.data.data.token_type)
        wx.setStorageSync('accessToken', res.data.data.access_token)
      }
    })
    // Color UI setup
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })

    wx.setStorageSync('apiKey', '88EDD1BDC24D9E178CAA131AAA9FCC61');
    wx.setStorageSync('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjoiMSJ9LCJpYXQiOjE1NjM2ODMzMjIsImV4cCI6MTU2NjI3NTMyMn0.yByH0eiij9oN_zph4mG5dI5QDwij5q2RKt3ysmX7Mp4');
    wx.setStorageSync('eticket', '');
    wx.setStorageSync('cart', []);
    wx.setStorageSync('userInfo', null);
    wx.setStorageSync('queueHidden', true);
  },

  //not using anymore, switched over to local cache
  globalData: {
    userInfo: null,
    apiKey: '88EDD1BDC24D9E178CAA131AAA9FCC61',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjoiMSJ9LCJpYXQiOjE1NjM2ODMzMjIsImV4cCI6MTU2NjI3NTMyMn0.yByH0eiij9oN_zph4mG5dI5QDwij5q2RKt3ysmX7Mp4',
    cart: [],
    eticket: '',
    queueHidden: true
  }
})
