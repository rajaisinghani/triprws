// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/wxapp-jsapi-master/src/bmap-wx.js');
var wxMarkerData = [];
var longitude = 1.257224;
var latitude = 103.820548;
var BMap = new bmap.BMapWX({
  ak: 'cmPO0buupy4VMvcr37oHsdFG7MEOWgMx'
});
var app = getApp();

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    attractions: [],
    array: ['請選擇類型', '酒店', '餐饮', '娱乐'],
    index: 0,
    copy: [],
    queueHidden: true
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    this.searchloc()
  },

  goToTickets: function (t) {
    wx.switchTab({
      url: '../tickets/tickets',
    })
  },

  searchloc: function(){
    var that = this
    BMap.search({
      'query': this.data.array[this.data.index],
      success: function (res) {
        console.log(res)
        var len = res.wxMarkerData.length
        var mks = []
        var list = []
        for (var i = 0; i < len; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.wxMarkerData[i].title,
            id: res.wxMarkerData[i].id,
            latitude: res.wxMarkerData[i].latitude,
            longitude: res.wxMarkerData[i].longitude,
            iconPath: "/images/location-pin.png", //图标路径
            width: 20,
            height: 20
          })
        }
        
        for (var i = 0; i < len; i++) {
          list.push({
            title: res.wxMarkerData[i].title,
            id: res.wxMarkerData[i].id,
            description: res.wxMarkerData[i].address,
            latlon: [res.wxMarkerData[i].latitude, res.wxMarkerData[i].longitude],
            distance: that.getDistance(res.wxMarkerData[i].latitude, res.wxMarkerData[i].longitude, latitude, longitude)
          })
        }
        that.setData({
          markers: mks,
          attractions: list,
          copy:list,
        })
        console.log("success")
      },
      fail: function(res){
        console.error(res)
      }
    })
  },

  getDistance: function (lat1, lon1, lat2, lon2) {
    var R = 6371; // km (change this constant to get miles)
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    var k = d / 1000;
    var m = d % 1000;
    return Math.round(k) + "km " + Math.round(m) + "m";
  },

  markertap(e) {
    var that = this;
    var result = []
    var array = that.data.copy;
    var z;
    console.log(array)
    for (z = 0; z < array.length; z++) {
      if (e.markerId == array[z].id) {
        console.log(array[z])
        result.push({
          title: array[z].title,
          id: array[z].id,
          description: array[z].description,
          distance: array[z].distance,
        })
        that.setData({
          attractions: result
        })
      }
    }
  },

  onLoad: function () {
    var that = this;
    // 新建百度地图对象 
    var fail = function (data) {
      console.log("error")
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      wxMarkerData[0].latitude = 1.2494;
      wxMarkerData[0].longitude = 103.8303;
      console.log(wxMarkerData[0])
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: 1.2494
      });
      that.setData({
        longitude: 103.8303
      });
    }
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
    })

    //load queue information
    wx.request({
      url: "https://wechat.useritech.com/api/queue/all",
      method: "GET",
      header: { "X-Api-Key": wx.getStorageSync('apiKey'), "X-Token": wx.getStorageSync('token') },
      success: function (res) {
        console.log(res)
        that.setData({
          queue: res.data.data.queue[0]
        })
      }
    })
  },

  onShow: function() {
    this.setData({
      queueHidden: wx.getStorageSync('queueHidden')
    })
  }
})