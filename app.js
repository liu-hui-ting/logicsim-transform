App({
  onLaunch() {
    if (wx.cloud) {
      wx.cloud.init({ traceUser: true });
    }
  },
  globalData: {
    targetDate: '2027-06-20T09:00:00'
  }
});