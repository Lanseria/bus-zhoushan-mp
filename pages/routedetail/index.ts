import { details, queryLine } from "../../utils/api"
const _ = require('../../utils/lodash-min')
interface BusItem {
  vehicleOrder: number
  lng: number
  distance: number
  gpsTime: string
  plateNumber: string
  lat: number
  isArriveStation: number
}
interface BusStatus {
  busAverageSpeed: number
  clientShowVehicleNumber: number
  list: BusItem[]
  startTime: string
}
interface StationItem {
  haveBikeStation: number
  id: string
  lastDistance: number
  poiOriginLat: number
  poiOriginLon: number
  stationName: string
  stationOrder: number
  busArr: BusItem[]
}
interface RouteDetail {
  endStation: string
  geometry: string
  id: string
  startFirst: string
  startLast: string
  startStation: string
  stationList: StationItem[]
}
// const vehicleDetail = ref({
//   busAverageSpeed: 420,
//   clientShowVehicleNumber: 3,
//   list: [],
//   startTime: '18:00',
// })
interface BusRouteDetail {
  areaCode: string
  down: RouteDetail
  lineName: string
  up: RouteDetail
}
const LOAD = '加载中'
let interval: number = 0
// pages/routedetail/index.ts
Page({
  options: {
    styleIsolation: 'apply-shared',
  },
  /**
   * 页面的初始数据
   */
  data: {
    linename: "",
    upOrDown: "down" as ("down" | "up"),
    routeDetail: {
      areaCode: LOAD,
      down: {
        endStation: LOAD,
        geometry: '',
        id: '3309002281',
        startFirst: LOAD,
        startLast: LOAD,
        startStation: LOAD,
        stationList: [],
      },
      lineName: '加载中',
      up: {
        endStation: LOAD,
        geometry: '',
        id: '3309002281',
        startFirst: LOAD,
        startLast: LOAD,
        startStation: LOAD,
        stationList: [],
      },
    } as BusRouteDetail,
    crtBusOrderId: [] as number[],
    groupsVl: {}
  },
  intervalDetail() {
    clearInterval(interval)
    interval = setInterval(() => {
      this.fetchDetail()
    }, 10000)
  },
  handleSwap() {
    this.setData({
      upOrDown: this.data.upOrDown === 'down' ? 'up' : 'down'
    })
  },
  async fetchDetail() {
    const res = await details(this.data.routeDetail[this.data.upOrDown].id)
    const vehicleDetail: BusStatus = res.data
    this.setData({
      crtBusOrderId: vehicleDetail.list.map((m: BusItem) => m.vehicleOrder)
    })
    ///
    const vL = vehicleDetail.list
    console.log(vL)
    const groups = vL.length ? _.groupBy(vL, 'vehicleOrder') : {}
    this.setData({
      groupsVl: groups
    })
  },
  async fetchData() {
    const res = await queryLine(this.data.linename)
    this.setData({
      routeDetail: res.data
    })
    if (this.data.routeDetail.down)
      this.setData({
        upOrDown: 'down'
      })
    else
      this.setData({
        upOrDown: 'up'
      })
    this.fetchDetail()
    this.intervalDetail()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: any) {
    this.setData({
      linename: options.linename
    })
    wx.setNavigationBarTitle({
      title: this.data.linename
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
    clearInterval(interval)
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