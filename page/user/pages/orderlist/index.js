// pages/orderlist/index.js
const { queryGoodsList, refundGoods } = require('../../resource/api/goods')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },
  handleInvoicingDetail({ currentTarget }) {
    wx.navigateTo({
      url: `/page/user/pages/invoicing_request/index?id=${currentTarget.dataset.id}`,
    })
  },
  handleInvoicingRequest({ currentTarget }) {
    wx.navigateTo({
      url: `/page/user/pages/invoicing_request/index?orderId=${currentTarget.dataset.id}`,
    })
  },
  async requestRefund(id, status) {
    const res = await refundGoods(id, status)
    if (res.code) {
      showToast(res.msg)
    } else {
      this.fetchList()
    }
  },
  handleRefund({ currentTarget }) {
    const str = currentTarget.dataset.status === '1' ? '确认' : '取消'
    wx.showModal({
      title: '提示',
      content: `是否${str}退款`,
      confirmText: str,
      cancelText: '返回',
      showCancel: true,
      success: async (res) => {
        if (res.cancel) {
          // 继续提交信息
          return
        }
        if (res.confirm) {
          // 跳转去上传附件
          this.requestRefund(currentTarget.dataset.id, currentTarget.dataset.status)
        }
      }
    })
  },
  handleDetail({ currentTarget }) {
    wx.navigateTo({
      url: `/page/user/pages/ordersubmit/index?id=${currentTarget.dataset.id}`,
    })
  },
  async fetchList() {
    const res = await queryGoodsList()
    if (res.code) {
      showToast(res.msg)
    } else {
      this.setData({
        orderList: res.data
      })
    }
  },
  fetchData() {
    this.fetchList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
