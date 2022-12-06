// index.ts
import { searchBusLines } from "../../utils/api"

// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    activeTab: 'index',
    tabList: [
      { value: 'index', label: '公交', icon: 'location' },
      { value: 'oil', label: '油价', icon: 'money-circle' },
      { value: 'table', label: '表格', icon: 'logo-windows' },
      { value: 'image', label: '图片', icon: 'image' },
    ],
    value: '',
    list: [],
    history: [] as string[]
  },
  onChange(e: any) {
    this.setData({
      activeTab: e.detail.value,
    });
    wx.navigateTo({
      url: "/pages/" + e.detail.value + "/index"
    })
  },
  async searchKeyWords() {
    const res = await searchBusLines(this.data.value)
    console.log(res.data.list)
    this.setData({
      list: res.data.list
    })
  },
  changeHandle({ detail }: any) {
    console.log(detail.value)
    this.searchKeyWords()
  },
  handleClick({ target: { dataset: { linename } } }: any) {
    const { history } = this.data
    history.push(linename)
    let set1 = new Set(history)
    wx.setStorage({
      key: 'history',
      data: Array.from(set1)
    })
    wx.navigateTo({
      url: "/pages/routedetail/index?linename=" + linename
    })
  },
  onShow() {
    wx.getStorage({
      'key': 'history',
      success: (res) => {
        this.setData({
          history: res.data
        })
      }
    })
  }
})
