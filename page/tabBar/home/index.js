// pages/home/index.js
const { searchBusLines } = require('~/common/api/bus');
const { searchNearBusLines } = require('~/common/api/crypto');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    searchInputFocus: false,
    searchList: [],
    historyList: []
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
  fetchNearBus() {
    searchNearBusLines()
  },
  fetchData() {
    this.fetchNearBus()
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

})
