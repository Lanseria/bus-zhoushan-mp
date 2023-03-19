// pages/user/index.js
const log = require('~/common/log.js') // 引用上面的 log.js 文件
const { queryPhoneBindStatus } = require('~/common/api/login')
const { initUserInfo } = require('~/common/data')
const { showToast, mpLogin } = require('~/common/methods')
const { queryUserCount, queryUserUnbinding } = require('~/common/api/user')
const { openDoc } = require('~/common/utils')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: initUserInfo,
    certificate: 0,
    classes: 0,
    submit: 0,
    unpaid: 0,
  },
  handleUserGuide() {
    openDoc('https://asqz.obs.cn-east-2.myhuaweicloud.com/60dd82a1200f4324aa8fb1150fdbbbdc.pdf')
  },
  navUserform() {
    wx.navigateTo({
      url: '/page/user/pages/userform/index',
    })
  },

  navCertificate() {
    wx.navigateTo({
      url: '/page/user/pages/certificate/index',
    })
  },

  handleAnnex() {
    wx.navigateTo({
      url: '/page/user/pages/annex/index?status=' + this.data.userInfo.status,
    })
  },
  handleBindIdCardFront() {
    if (this.data.userInfo.status === '2') {
      return
    }
    wx.navigateTo({
      url: '/page/user/pages/bind_idcard_front/index',
    })
  },
  handleBindIdCard() {
    if (this.data.userInfo.status === '2') {
      return
    }
    wx.navigateTo({
      url: '/page/user/pages/bind_idcard/index',
    })
  },
  handleBindPhone() {
    if (this.data.userInfo.phone) {
      wx.showModal({
        title: '提示',
        content: '是否解除绑定此手机号？解绑后身份信息(包含手机号，报名等信息)处于游离状态',
        confirmText: '解绑',
        showCancel: true,
        success: async (res) => {
          if (res.confirm) {
            const r = await queryUserUnbinding()
            if (r.code) {
              showToast(r.msg)
            } else {
              showToast('解绑成功', 'success')
              this.fetchData()
            }
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '/page/user/pages/bind_phone/index',
      })
    }
  },
  handleClearStore() {
    wx.clearStorage({
      success: (res) => {
        showToast('清空数据成功', 'success')
        this.fetchData()
      },
    })
  },
  handleUpdateInfo() {
    wx.navigateTo({
      url: '/page/user/pages/updateuserinfo/index',
    })
  },
  async getPhoneStatus() {
    // TODO: 验证手机号
    if (this.data.userInfo.phone) {
      const res = await queryPhoneBindStatus(this.data.userInfo.phone)
      log.debug(res);
    }
  },
  async fetchUserCount() {
    const res = await queryUserCount()
    if (res.code) {
      showToast(res.msg)
      throw new Error(res.msg)
    } else {
      this.setData({
        certificate: res.data.certificate,
        classes: res.data.classes,
        submit: res.data.submit,
        unpaid: res.data.unpaid,
      })
    }
  },
  fetchData() {
    mpLogin().then((res) => {
      this.setData({
        userInfo: res,
      })
      clearInterval(this.interval)
      this.fetchUserCount()
    })
    // .catch((code) => {
    //   if (code === 500) {
    //     wx.navigateTo({
    //       url: "/page/user/pages/login/index"
    //     })
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
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
    this.fetchData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
