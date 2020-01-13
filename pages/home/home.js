// pages/home/home.js
import { $wuxSelect } from '../../dist/index'

Page({
  /**
   * Page initial data
   */
  data: {
    firstChoice: '',
    value1: 'test',
    displayValue1: '可以选超过一个',
    displayValue2: '今天您想做什么呢？',
    attractions: [
      { title: '环球影城', value: 'Universal Studios' },
      { title: '圣淘沙海洋馆', value: 'S.E.A World' },
      { title: '观光', value: 'Sightseeing' },
      { title: '夜生活', value: 'Nightlife' },
      { title: '赌场', value: 'Casino' },
    ],
    restaurants: [
      { title: '硬石餐厅', value: 'Hard Rock Cafe' },
      { title: '翡翠小厨', value: 'Crystal Jade' },
      { title: '小贩中心', value: 'Hawker Center' },
      { title: '泰式料理', value: 'Thai' },
      { title: '夜生活', value: 'Nightlife' },
      { title: '赌场', value: 'Casino' },
    ],
    selections: ['吃/喝', '玩', '逛街', '返回'],
    lang: 'en',
    time: '',
    displayValue7: '选择时间',
    translated: ''
  },

  setValue(values, key, mode) {
    this.setData({
      [`value${key}`]: values.value,
      [`displayValue${key}`]: values.label,
      // [`displayValue${key}`]: values.displayValue.join(' '),
    })
  },

  onClick() {
    this.setData({ visible: true })
  },

  onConfirm(e) {
    const { index, mode } = e.currentTarget.dataset
    this.setValue(e.detail, index, mode)
    console.log(`onConfirm${index}`, e.detail)
  },

  translate: function () {
    var first = ''
    var second = ''
    switch (this.data.firstChoice) {
      case "吃喝":
        first = "dine";
        break;
      case "玩":
        first = "be entertained";
        break;
      case "逛街":
        first = "shop";
        break;
    }
    var trans = "I want to " + first + " at " + this.data.value1 + "."
    this.setData({
      translated: trans
    })
  },

  initialSelection() {
    $wuxSelect('#wux-select1').open({
      value: this.data.firstChoice,
      options: this.data.selections,
      toolbar: {
        title: '今天您想做什么呢',
        cancelText: '返回',
        confirmText: '确定'
      },
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        if (index !== -1) {
          this.setData({
            firstChoice: value,
            displayValue2: options[index],
          })
        }
      },
    })
  },

  onClick1() {
    //
    $wuxSelect('#wux-select1').open({
      value: this.data.value1,
      multiple: true,
      options: this.data.firstChoice == 'Play' ? this.data.attractions : this.data.restaurants,
      toolbar: {
        title: '可以选超过一个',
        cancelText: '返回',
        confirmText: '确定'
      },
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        if (index !== -1) {
          this.setData({
            value1: value,
            displayValue1: index.map((n) => options[n].title),
          })
        }
      },
    })
  },

  viewItinerary: function () {
    wx.switchTab({
      url: '../planner/planner',
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
