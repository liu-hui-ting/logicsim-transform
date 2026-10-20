Page({
  data: {
    roleOptions: ['毕业生', '家长', '教师', '校友', '其他'],
    roleIndex: 0,
    attendOptions: ['出席', '不出席'],
    attendIndex: 0,
    guestOptions: ['0人', '1人', '2人', '3人', '4人及以上'],
    guestIndex: 0,
    formData: {},
    submitting: false
  },

  onLoad(options) {
    if (options.role) {
      const idx = this.data.roleOptions.indexOf(options.role);
      if (idx >= 0) this.setData({ roleIndex: idx, 'formData.role': options.role });
    } else {
      this.setData({ 'formData.role': this.data.roleOptions[0] });
    }
    this.setData({ 'formData.attend': this.data.attendOptions[0] });
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`formData.${field}`]: e.detail.value });
  },

  onRoleChange(e) {
    this.setData({ roleIndex: e.detail.value, 'formData.role': this.data.roleOptions[e.detail.value] });
  },

  onAttendChange(e) {
    this.setData({ attendIndex: e.detail.value, 'formData.attend': this.data.attendOptions[e.detail.value] });
  },

  onGuestChange(e) {
    this.setData({ guestIndex: e.detail.value, 'formData.guest': this.data.guestOptions[e.detail.value] });
  },

  submitRsvp() {
    if (this.data.submitting) return;
    const form = this.data.formData;

    if (!form.name) return wx.showToast({ title: '请填写姓名', icon: 'none' });
    if (!form.role) return wx.showToast({ title: '请选择身份', icon: 'none' });
    if (!form.attend) return wx.showToast({ title: '请选择是否出席', icon: 'none' });

    this.setData({ submitting: true });

    // 没开云开发时，先用本地缓存模拟提交
    const list = wx.getStorageSync('rsvpList') || [];
    list.push({ ...form, createTime: Date.now() });
    wx.setStorageSync('rsvpList', list);

    // 开了云开发就换成下面这段
    // wx.cloud.callFunction({ name: 'submitRsvp', data: { ...form, createTime: new Date() } })

    wx.showToast({ title: '提交成功，期待与您相见', icon: 'success' });
    setTimeout(() => wx.navigateBack(), 1500);
    this.setData({ submitting: false });
  },

  goHome() {
    wx.navigateBack({ delta: 1 });
  }
});