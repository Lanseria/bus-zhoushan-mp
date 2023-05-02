// pages/home/index.js
const { searchBusLines, getHotBusLines } = require('~/common/api/bus');
const { searchNearBusLines } = require('~/common/api/crypto');
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
  onNavigate(id) {
    wx.navigateTo({
      url: `/page/home/pages/route/index?id=${id}`,
    })
  },
  onHotClick({ currentTarget }) {
    this.onNavigate(currentTarget.id)
  },
  onClick({ currentTarget }) {
    const { historyList } = this.data
    console.log(currentTarget.dataset.item)
    historyList.push(currentTarget.dataset.item)
    const newHistoryList = Array.from(new Set(historyList.map(JSON.stringify)), JSON.parse);
    wx.setStorage({
      key: 'history',
      data: newHistoryList
    })
    this.setData({
      history: newHistoryList,
      value: ''
    })
    this.onNavigate(currentTarget.id)
  },
  async fetchSearchBuslines() {
    const { data } = await searchBusLines(this.data.value)
    const { list } = data
    this.setData({
      searchList: list
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
    this.fetchNearBus()
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
      'key': 'history',
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
