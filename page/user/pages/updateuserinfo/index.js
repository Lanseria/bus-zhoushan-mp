// pages/updateuserinfo/index.js
const { putUserInfo } = require('~/common/api/login')
const { cancellationUser } = require('~/common/api/user')
const { uploadFileUrl } = require('~/common/api/upload')
const { initUserInfo } = require('~/common/data')
const { showToast, mpLogin } = require('~/common/methods')

const setToken = (access_token) => {
  wx.setStorage({
    key: 'token',
    data: access_token
  })
}

Page({
  data: {
    userInfo: initUserInfo,
    avatar: '',
    portrait: '',
    nickname: '',
    company: '',
    jobTitle: '',
    email: '',
    show: false,
    actions: [
      {
        name: '男',
        value: '1'
      },
      {
        name: '女',
        value: '2'
      },
    ]
  },

  async cancellationAccount() {
    if (this.data.userInfo.phone) {
      wx.showModal({
        title: '提示',
        content: '请先解绑手机号，使手机号(包含身份信息与报名信息)与微信账号分离',
        confirmText: '好的',
        showCancel: false,
      })
    } else {
      // 注销账号
      const res = await cancellationUser()
      if (res.code) {
        showToast(res.msg)
      } else {
        showToast('注销成功', 'success')
        setToken('')
        wx.switchTab({
          url: '/page/tabBar/home/index',
        })
      }
    }
  },

  onOpen() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },

  onSelect({ detail }) {
    this.setData({
      'userInfo.sex': detail.value
    })
  },
  // 小程序获取头像与微信名
  getUserProfile(e) {
    // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善学员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        const userInfo = {
          ...this.data.userInfo,
          avatar: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName,
        }
        this._updateUserInfo(userInfo)
      }
    })
  },
  // 更新用户信息
  async handleUpdate() {
    const userInfo = {
      ...this.data.userInfo,
      nickname: this.data.nickname,
      avatar: this.data.avatar,
      portrait: this.data.portrait,
      company: this.data.company,
      jobTitle: this.data.jobTitle,
      email: this.data.email,
    }
    const res = await putUserInfo(userInfo)
    if (res.code) {
      showToast(res.msg)
    } else {
      wx.navigateBack()
    }
  },
  async onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const res = await uploadFileUrl(avatarUrl)
    this.setData({
      avatar: res.data.url,
    })
  },
  async onChoosePortrait(e) {
    const { avatarUrl } = e.detail
    const res = await uploadFileUrl(avatarUrl)
    this.setData({
      portrait: res.data.url,
    })
  },
  _updateUserInfo(userInfo) {
    this.setData({
      userInfo,
      nickname: userInfo.nickname,
      avatar: userInfo.avatar,
      portrait: userInfo.portrait,
      company: userInfo.company,
      jobTitle: userInfo.jobTitle,
      email: userInfo.email,
    })
  },
  fetchData() {
    mpLogin().then((res) => {
      this._updateUserInfo(res)
    })
  },
  async onLoad(options) {
    this.fetchData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

})
