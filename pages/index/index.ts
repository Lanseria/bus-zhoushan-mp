// index.ts
import { searchBusLines } from "../../utils/api"


Page({
  data: {
    value: '',
    list: [],
    history: [] as string[]
  },
  async searchKeyWords() {
    if (this.data.value.trim() === '') {
      this.setData({
        list: []
      })
    } else {
      const res = await searchBusLines(this.data.value)
      this.setData({
        list: res.data.list
      })
    }
  },
  changeHandle({ detail }: any) {
    this.searchKeyWords()
  },
  handleClick({ target: { dataset: { linename } } }: any) {
    const { history } = this.data
    history.push(linename)
    let set1 = new Set(history)
    const newHistory = Array.from(set1)
    wx.setStorage({
      key: 'history',
      data: newHistory
    })
    this.setData({
      history: newHistory
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
