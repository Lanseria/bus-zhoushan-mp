const { searchBusLinesByStation, postHotBusStop } = require("~/common/api/bus")
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
    lineList: []
  },

  onNavigate(id) {
    wx.navigateTo({
      url: `/page/home/pages/route/index?id=${id}`,
    })
  },
  onClick({ currentTarget }) {
    this.onNavigate(currentTarget.id)
  },
  async fetchLine() {
    const res = await searchBusLinesByStation(this.data.id)
    this.setData({
      lineList: res
    })
  },
  fetchData() {
    postHotBusStop(this.data.id)
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