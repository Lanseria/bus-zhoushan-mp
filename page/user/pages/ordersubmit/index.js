// pages/ordersubmit/index.js
const log = require('~/common/log.js') // 引用上面的 log.js 文件
const { queryClassById } = require('~/common/api/class')
const { showToast } = require('~/common/methods')
const { initGoodsInfo, initClassInfo } = require('~/common/data')
const { queryGoods, payGoods } = equire('../../resource/api/goods')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    formData: initGoodsInfo,
    price: 0,
    showQrcode: false,
    classForm: initClassInfo
  },
  async handleDialog() {
    const res = await queryClassById(this.data.formData.goodsId)
    log.debug(res)
    this.setData({
      showQrcode: true,
      classForm: res.data
    })
  },
  handleBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  async onSubmit() {
    const res = await payGoods({ goodsOrderId: this.data.id })
    if (res.code) {
      showToast(res.msg)
    } else {
      const { data } = res
      const { params } = data
      const { appId, nonceStr, package: p, paySign, signType, timeStamp } = params

      wx.requestPayment({
        timeStamp,
        nonceStr,
        package: p,
        signType,
        paySign,
        success(res) {
          this.handleDialog()
        },
        fail(res) { }
      })
    }

    // const res = await postGoods(this.data.id)
    // if (res.code) {
    //   showToast(res.msg)
    // } else {
    //   wx.navigateBack({
    //     delta: 1
    //   })
    // }
  },
  async fetchForm() {
    const res = await queryGoods(this.data.id)
    if (res.code) {
      showToast(res.msg)
    } else {
      this.setData({
        formData: res.data,
        price: res.data.amount * 100
      })
    }
  },
  fetchData() {
    this.fetchForm()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
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
