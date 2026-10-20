Component({
  properties: {
    title: { type: String, value: '' },
    opacity: { type: Number, value: 1 },
    showBack: { type: Boolean, value: false }
  },
  data: {
    statusBarHeight: 20,
    navHeight: 44
  },
  lifetimes: {
    attached() {
      const info = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
      this.setData({
        statusBarHeight: info.statusBarHeight || 20,
        navHeight: 44
      });
    }
  },
  methods: {
    goBack() {
      wx.navigateBack({ delta: 1 });
    }
  }
});