const { searchBusLinesByStation, postHotBusStop, getVehicleDetails } = require("~/common/api/bus")
const _ = require('~/common/lodash-min')
// page/home/pages/route/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    lineList: [],
    direction: 'up',
    lineIds: '',
    stationIds: '',
    detailMap: {}
  },
  handleExchange() {
    if (this.data.direction === 'up') {
      this.setData({
        direction: 'down'
      })
    } else {
      this.setData({
        direction: 'up'
      })
    }
  },
  onNavigate(id) {
    wx.navigateTo({
      url: `/page/home/pages/route/index?id=${id}`,
    })
  },
  onClick({ currentTarget }) {
    this.onNavigate(currentTarget.id)
  },
  async fetchDetail() {
    const res = await getVehicleDetails(this.data.lineIds, this.data.stationIds)
    this.setData({
      detailMap: _.keyBy(res, 'lineId')
    })
  },
  async fetchLine() {
    const res = await searchBusLinesByStation(this.data.id)
    this.setData({
      lineList: res
    })
    const lineIds = []
    const stationIds = []
    this.data.lineList.forEach((item) => {
      if (item.up) {
        lineIds.push(item.up.lineId)
        stationIds.push(item.up.stationId)
      }
      if (item.down) {
        lineIds.push(item.down.lineId)
        stationIds.push(item.down.stationId)
      }
    })
    this.setData({
      lineIds: lineIds.join(),
      stationIds: stationIds.join()
    })
  },
  async fetchData() {
    postHotBusStop(this.data.id)
    await this.fetchLine()
    await this.fetchDetail()
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
    // this.intervalDetail()
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