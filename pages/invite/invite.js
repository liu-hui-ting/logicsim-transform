const ROLE_TEXT = {
  '毕业生': '亲爱的同学，恭喜你顺利完成学业！诚挚邀请你参加2027届毕业典礼，见证属于你的高光时刻。',
  '家长': '尊敬的家长，感谢您一路以来的陪伴与支持。诚挚邀请您参加2027届毕业典礼，共同见证孩子的成长与荣光。',
  '教师': '尊敬的老师，感谢您辛勤的耕耘与付出。诚挚邀请您参加2027届毕业典礼，与我们一同见证学生的成长。',
  '校友': '亲爱的校友，欢迎回家！诚挚邀请您参加2027届毕业典礼，重温青春岁月，共叙同窗情谊。',
  '其他': '人工智能学院诚挚邀请您参加2027届毕业典礼，与我们共同见证这一重要时刻。'
};

Page({
  data: { inviteText: '' },
  onLoad() {
    const role = wx.getStorageSync('myRole') || '';
    this.setData({ inviteText: ROLE_TEXT[role] || ROLE_TEXT['其他'] });
  },
  goRsvp() {
    const role = wx.getStorageSync('myRole') || '';
    wx.navigateTo({ url: `/pages/rsvp/rsvp?role=${role}` });
  },
  onShareAppMessage() {
    return { title: '诚挚邀请 | 人工智能学院2027届毕业典礼', path: '/pages/index/index' };
  }
});