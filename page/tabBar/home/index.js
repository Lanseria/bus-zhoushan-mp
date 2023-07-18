// pages/home/index.js
const { searchBusLines, getHotBusLines } = require('~/common/api/bus');
const { searchNearBusLines } = require('~/common/api/crypto');
const { LINE_HISTORY } = require('~/common/constant')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    searchInputFocus: false,
    searchList: [],
    historyList: [],
    hotList: []
  },
  onNavigate(id, upOrDown = 'down') {
    wx.navigateTo({
      url: `/page/home/pages/route/index?id=${id}&upOrDown=${upOrDown}`,
    })
  },
  onHotClick({ currentTarget }) {
    this.onNavigate(currentTarget.id)
  },
  onClick({ currentTarget }) {
    const { historyList } = this.data
    const idx = historyList.findIndex((m) => m.lineName === currentTarget.dataset.item.lineName)
    if (idx >= 0) {
      historyList.splice(idx, 1)
    }
    historyList.push(currentTarget.dataset.item)
    wx.setStorage({
      key: LINE_HISTORY,
      data: historyList
    })
    this.setData({
      history: historyList,
      value: ''
    })
    this.onNavigate(currentTarget.id, currentTarget.dataset.item.upOrDown)
  },
  async fetchSearchBuslines() {
    const data = await searchBusLines(this.data.value)
    this.setData({
      searchList: data
    })
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
    this.fetchSearchBuslines()
  },
  onBlur() {
    this.setData({
      searchInputFocus: false
    })
  },
  onFocus() {
    this.setData({
      searchInputFocus: true
    })
  },
  fetchNearBus() {
    searchNearBusLines()
  },
  async fetchHotLine() {
    const res = await getHotBusLines()
    this.setData({
      hotList: res
    })
  },
  fetchData() {
    // this.fetchNearBus()
    this.fetchHotLine()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
    this.fetchData()
    wx.getStorage({
      'key': LINE_HISTORY,
      success: (res) => {
        this.setData({
          historyList: res.data,
        })
      }
    })
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
