// components/image/image.js
Component({
  /**
   * Component properties
   */
  properties: {
    url: {
      type: String,
      value: '',
      observer: function(newVal, oldVal, changedPath) {

      }
    }
  },

  /**
   * Component initial data
   */
  data: {
  },

  /**
   * Component methods
   */
  methods: {
    close: function() {
      wx.navigateBack({
      })
    }
  }
})
