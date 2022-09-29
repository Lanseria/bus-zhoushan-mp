// index.ts
import { searchBusLines } from "../../utils/api"

// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    value: '',
    list: [],
    history: [] as string[]
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
    console.log(linename)
    const { history } = this.data
    history.push(linename)
    wx.setStorage({
      key: 'history',
      data: history
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
