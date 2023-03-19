// pages/login/index.js
const log = require('~/common/log.js') // 引用上面的 log.js 文件
const { createUserByCode } = require('~/common/api/login')
const { showToast, } = require('~/common/methods')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    checked: false,
  },
  handlePrivacy() {
    wx.navigateTo({
      url: '/page/user/pages/privacy/index',
    })
  },
  agree() {
    this.setData({
      checked: true,
    });
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  handleCheckOn() {
    this.setData({
      checked: !this.data.checked,
    });
  },
  wxBack() {
    wx.switchTab({
      url: '/page/tabBar/home/index',
    })
  },
  wxLogin() {
    wx.getUserProfile({
      desc: '用于完善学员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (r) => {
        const userInfo = {
          avatar: r.userInfo.avatarUrl,
          nickname: r.userInfo.nickName,
          code: this.data.code
        }
        createUserByCode(userInfo).then((res) => {
          log.debug(res);
          if (res.code) {
            showToast(res.msg)
          } else {
            wx.navigateBack()
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.login({
      success: (res) => {
        this.setData({
          code: res.code
        })
      },
      fail: (res) => {
        log.error('page/user/pages/login/index.js: wx.login', res)
      }
    })
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
