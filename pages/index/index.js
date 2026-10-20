const app = getApp();

Page({
  data: {
    opened: false,
    musicPlaying: false,
    navOpacity: 0,
    role: '',
    inviteText: '',
    roleOptions: ['毕业生', '家长', '教师', '校友', '其他'],
    inviteMap: {
      '毕业生': '亲爱的同学，恭喜你顺利完成学业！人工智能学院诚挚邀请你参加2027届毕业典礼，亲手接过那份属于你的荣光。',
      '家长': '尊敬的家长，感谢您一路的陪伴与托举。人工智能学院诚挚邀请您参加2027届毕业典礼，共同见证孩子人生的重要一刻。',
      '教师': '尊敬的老师，感谢您的耕耘与点亮。人工智能学院诚挚邀请您参加2027届毕业典礼，与您一同见证学生的成长与远行。',
      '校友': '亲爱的校友，欢迎回家！人工智能学院诚挚邀请您参加2027届毕业典礼，重温青春岁月，共叙同窗情谊。',
      '其他': '人工智能学院诚挚邀请您参加2027届毕业典礼，与我们共同见证这一重要时刻。'
    },
    countdown: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    photos: [
      '/images/photo1.jpg',
      '/images/photo2.jpg',
      '/images/photo3.jpg'
    ],
    location: {
      name: '人工智能学院大礼堂',
      latitude: 28.68,
      longitude: 115.89
    },
    phone: '0791-88888888'
  },

  onLoad(options) {
    this.audio = wx.createInnerAudioContext();
    this.audio.src = '/audio/bg.mp3';
    this.audio.loop = true;
    this.audio.onPlay(() => this.setData({ musicPlaying: true }));
    this.audio.onPause(() => this.setData({ musicPlaying: false }));
    this.audio.onError(() => {
      console.warn('背景音乐加载失败，请检查 /audio/bg.mp3 是否存在');
    });

    const role = options.role || wx.getStorageSync('myRole') || '';
    if (role) this.applyRole(role);

    this.startCountdown();
  },

  applyRole(role) {
    this.setData({
      role: role,
      inviteText: this.data.inviteMap[role] || this.data.inviteMap['其他']
    });
    wx.setStorageSync('myRole', role);
  },

  chooseRole(e) {
    const role = e.currentTarget.dataset.role;
    this.applyRole(role);
    wx.showToast({ title: `已切换为${role}`, icon: 'none' });
  },

  onPageScroll(e) {
    const opacity = Math.min(e.scrollTop / 200, 1);
    this.setData({ navOpacity: opacity });
  },

  openEnvelope() {
    this.setData({ opened: true });
    if (this.audio) this.audio.play();
  },

  startCountdown() {
    const target = new Date(app.globalData.targetDate).getTime();
    this.countdownTimer = setInterval(() => {
      let diff = target - Date.now();
      if (diff <= 0) {
        diff = 0;
        clearInterval(this.countdownTimer);
      }
      this.setData({
        countdown: {
          days: Math.floor(diff / 86400000),
          hours: Math.floor(diff / 3600000) % 24,
          minutes: Math.floor(diff / 60000) % 60,
          seconds: Math.floor(diff / 1000) % 60
        }
      });
    }, 1000);
  },

  toggleMusic() {
    if (!this.audio) return;
    if (this.data.musicPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
  },

  scrollDown() {
    wx.pageScrollTo({ scrollTop: 900, duration: 400 });
  },

  goRsvp() {
    if (!this.data.role) {
      return wx.showToast({ title: '请先选择身份', icon: 'none' });
    }
    wx.navigateTo({ url: `/pages/rsvp/rsvp?role=${this.data.role}` });
  },

  goSchedule() {
    wx.navigateTo({ url: '/pages/schedule/schedule' });
  },

  openMap() {
    const { name, latitude, longitude } = this.data.location;
    wx.openLocation({ latitude, longitude, name, scale: 16 });
  },

  callPhone() {
    wx.showModal({
      title: '拨打电话',
      content: `是否拨打 ${this.data.phone}？`,
      success: (res) => {
        if (res.confirm) {
          wx.makePhoneCall({ phoneNumber: this.data.phone });
        }
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '诚挚邀请 | 人工智能学院2027届毕业典礼',
      path: '/pages/index/index',
      imageUrl: '/images/share-cover.png'
    };
  },

  onShareTimeline() {
    return {
      title: '人工智能学院2027届毕业典礼邀请函',
      imageUrl: '/images/share-cover.png'
    };
  },

  onUnload() {
    clearInterval(this.countdownTimer);
    if (this.audio) this.audio.destroy();
  }
});