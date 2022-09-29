
var Abi = require('wx-axios-promise');

const URL_PREFIX = 'https://pts.linkcld.com'

let api = Abi({
  url: URL_PREFIX,//默认的接口后缀
  dataType: 'json',//默认的返回类型
  header: {
    'content-type': "application/json"
  }
})

// console.log(setToken)
api.interceptors.response.use((config: any) => {
  wx.hideLoading()
  return config.data || config
}, function (error: any) {
  return error
})

api.interceptors.request.use(function (config: any) {
  try {
    wx.showLoading({
      title: api.req || '加载中'
    })
  } catch (e) {
  }
  return config;
}, function (error: any) {
  return error
})

export const searchBusLines = (lineName: string) => {
  return api({
    url: `/pts-server/busService/client/busLine/searchBusLines`,
    method: 'POST',
    data: { h: { deviceId: 'fixedDeviceID', userToken: '', appCode: '330900', codeValue: '330900', sourceCodeValue: '330900' }, b: { lineName, offset: 10, page: 1 } },
  })
}

export const queryLine = (lineName: string) => {
  return api({
    url: `/pts-server/busService/client/busLine/queryLine`,
    method: 'POST',
    data: { h: { deviceId: 'fixedDeviceID', userToken: '', appCode: '330900', codeValue: '330900', sourceCodeValue: '330900' }, b: { lineName, needGeometry: 123 } },
  })
}

export const details = (lineId: string) => {
  return api({
    url: `/pts-server/busService/client/bus/vehicle/dynamic/line/details`,
    method: 'POST',
    data: { h: { deviceId: 'fixedDeviceID', userToken: '', appCode: '330900', codeValue: '330900', sourceCodeValue: '330900' }, b: { lineId, offset: 100 } },
  })
}


