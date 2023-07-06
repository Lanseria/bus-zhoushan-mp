// pages/course/index.js

const { queryGasOnline } = require("~/common/api/bus")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gasPriceList: [],
    avg92: 0,
    avg95: 0,
    avg98: 0,
    avgdiesel: 0,
    currentProvince: 'Avgs'
  },
  selectProvince({ currentTarget }) {
    wx.setStorageSync('currentProvince', currentTarget.id)
    this.setData({ currentProvince: currentTarget.id });
    console.log(currentTarget)
  },
  async fetchData() {
    const data = await queryGasOnline()
    const avg92 = (data.data.map(m => +m.gasoline92).reduce((x, y) => x + y, 0) / 31).toFixed(2)
    const avg95 = (data.data.map(m => +m.gasoline95).reduce((x, y) => x + y, 0) / 31).toFixed(2)
    const avg98 = (data.data.map(m => +m.gasoline98).reduce((x, y) => x + y, 0) / 31).toFixed(2)
    const avgdiesel = (data.data.map(m => +m.diesel).reduce((x, y) => x + y, 0) / 31).toFixed(2)
    this.setData({
      gasPriceList: data.data,
      avg92: avg92,
      avg95: avg95,
      avg98: avg98,
      avgdiesel: avgdiesel,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const currentProvince = wx.getStorageSync('currentProvince')
    this.setData({
      currentProvince
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
