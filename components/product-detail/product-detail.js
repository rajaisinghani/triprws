Component({
    properties: {
      id: {
        type: Number,
        value: 1,
        observer: function(a, t, e) {}
      }
    },
    data: {
      confirmationText: "You will receive a confirmation email and voucher instantly after booking. In the event that you do not receive an email from us, please check your spam folder or notify us via email"
    },
    methods: {
      onLoad: function(a) {
        var t = this,
          e = getApp();
        wx.request({
          url: "https://wechat.useritech.com/api/attractions/detail?id=",
          method: "GET",
          header: {
            "X-Api-Key": wx.getStorageSync('apiKey'),
            "X-Token": wx.getStorageSync('token')
          },
          data: {
            id: this.data.id
          },
          success: function(a) {
            console.log(a), t.setData({
              information: a.data.data.attractions
            })
          }
        })
      },
      addToCart: function() {
        var a = getApp(),
        t = this.data.information.id
        var globalCart = wx.getStorageSync('cart')
        globalCart.includes(t) || globalCart.push(t)
        wx.setStorageSync('cart', globalCart)
        wx.navigateTo({
          url: "../../pages/cart/cart"
        })
      }
    }
  }

);