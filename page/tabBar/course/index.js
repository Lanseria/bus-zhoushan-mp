// pages/course/index.js

const { queryNewList } = require("~/common/api/bus")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newList: [],
    show: false,
    content: ''
  },

  onClickHide() {
    this.setData({ show: false });
  },

  noop() { },
  onClick({ currentTarget }) {
    this.setData({ show: true, content: currentTarget.id });
    console.log(currentTarget)

  },
  async fetchData() {
    const data = await queryNewList()
    this.setData({
      newList: data
    })
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
