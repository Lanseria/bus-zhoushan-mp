const { queryLine, details } = require("~/common/api/bus")
const { defaultRouteDetail } = require("~/common/data")
const _ = require('~/common/lodash-min')
let interval = 0
// page/home/pages/route/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    routeDetail: defaultRouteDetail,
    upOrDown: 'down',
    groupsVl: {}
  },
  intervalDetail() {
    clearInterval(interval)
    interval = setInterval(() => {
      this.fetchDetails()
    }, 30000)
  },
  handleSwap() {
    this.setData({
      upOrDown: this.data.upOrDown === 'down' ? 'up' : 'down'
    })
    this.fetchDetails()
  },
  async fetchDetails() {
    const { data } = await details(this.data.routeDetail[this.data.upOrDown].id)
    const vehicleDetail = data
    this.setData({
      crtBusOrderId: vehicleDetail.list.map((m) => m.vehicleOrder)
    })
    const vL = vehicleDetail.list
    const groups = vL.length ? _.groupBy(vL, 'vehicleOrder') : {}
    this.setData({
      groupsVl: groups
    })
  },
  async fetchLine() {
    const { data } = await queryLine(this.data.id)
    this.setData({
      routeDetail: data
    })
    if (this.data.routeDetail.down) {
      this.setData({
        upOrDown: 'down'
      })
    }
    else {
      this.setData({
        upOrDown: 'up'
      })
    }
    this.fetchDetails()
    this.intervalDetail()
  },
  fetchData() {
    this.fetchLine()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: decodeURIComponent(options.id)
    })
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
    this.intervalDetail()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    clearInterval(interval)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    clearInterval(interval)
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