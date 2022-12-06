// pages/oil/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'oil',
    tabList: [
      { value: 'index', label: '公交', icon: 'location' },
      { value: 'oil', label: '油价', icon: 'money-circle' },
      { value: 'table', label: '表格', icon: 'logo-windows' },
      { value: 'image', label: '图片', icon: 'image' },
    ],
  },

  onChange(e: any) {
    this.setData({
      activeTab: e.detail.value,
    });
    wx.navigateTo({
      url: "/pages/" + e.detail.value + "/index"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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