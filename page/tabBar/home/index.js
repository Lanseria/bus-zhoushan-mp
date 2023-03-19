// pages/home/index.js
const log = require('~/common/log.js') // 引用上面的 log.js 文件
const { key } = require("~/common/constant");
const { searchBusLines } = require('~/common/api/bus');
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const qqmapsdk = new QQMapWX({
  key // 必填
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key,
    showPosition: true,
    location: {
      latitude: 30.040415,
      longitude: 122.273511
    },
    myLocation: {
      latitude: 30.040415,
      longitude: 122.273511
    },
    dragLocation: {
      latitude: 30.040415,
      longitude: 122.273511
    },
    minScale: 8,
    maxScale: 16,
    scale: 8,
    value: '',
    searchInputFocus: false,
    searchList: []
  },
  // 逆解析
  _reverseGeocoder(item, cb) {
    qqmapsdk.reverseGeocoder({
      // 调用逆地址解析
      location: {
        latitude: item.latitude,
        longitude: item.longitude
      },
      success: res => {
        cb(res)
      }
    }
    )
  },
  onClick({ currentTarget }) {
    wx.navigateTo({
      url: `/page/home/pages/route/index?id=${currentTarget.id}`,
    })
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
  fetchData() {
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

})
