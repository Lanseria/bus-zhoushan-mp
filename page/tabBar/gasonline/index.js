// pages/course/index.js

const { queryGasOnline } = require("~/common/api/bus")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oilType: [
      {
        label: '#92',
        value: 'gasoline92',
      },
      {
        label: '#95',
        value: 'gasoline95',
      },
      {
        label: '#98',
        value: 'gasoline98',
      },
      {
        label: '柴油',
        value: 'diesel',
      }
    ],
    date: new Date().toLocaleDateString(),
    rawData: [],
    gasPriceList: [],
    avg92: 0,
    avg95: 0,
    avg98: 0,
    avgdiesel: 0,
    currentProvince: 'Avgs',
    sortBy: 'gasoline92'
  },
  handleSortOil({ currentTarget }) {
    wx.setStorageSync('sortBy', currentTarget.id)
    this.setData({ sortBy: currentTarget.id });
    this.sortOilList()
  },
  selectProvince({ currentTarget }) {
    wx.setStorageSync('currentProvince', currentTarget.id)
    this.setData({ currentProvince: currentTarget.id });
  },
  sortOilList() {
    const oilList = this.data.rawData.sort((a, b) => +a[this.data.sortBy] - +b[this.data.sortBy])
    this.setData({
      gasPriceList: oilList,
    })
  },
  async fetchData() {
    const data = await queryGasOnline()
    const rawData = data.data
    const avg92 = (rawData.map(m => +m.gasoline92).reduce((x, y) => x + y, 0) / 31).toFixed(2)
    const avg95 = (rawData.map(m => +m.gasoline95).reduce((x, y) => x + y, 0) / 31).toFixed(2)
    const avg98 = (rawData.map(m => +m.gasoline98).reduce((x, y) => x + y, 0) / 31).toFixed(2)
    const avgdiesel = (rawData.map(m => +m.diesel).reduce((x, y) => x + y, 0) / 31).toFixed(2)
    this.setData({
      rawData,
      avg92: avg92,
      avg95: avg95,
      avg98: avg98,
      avgdiesel: avgdiesel,
    })
    this.sortOilList()
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
