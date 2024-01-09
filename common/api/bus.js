const { api } = require('./index')
const prefixUrl = 'http://192.168.31.32:3000'
// const prefixUrl = 'https://s8zygv.laf.run'
export const getVehicleDetails = (lineIds, stationIds) => {
  return api({
    url: `${prefixUrl}/getVehicleDetails?lineIds=${lineIds}&stationIds=${stationIds}`,
    method: 'GET',
  })
}

export const searchBusLinesByStation = (name) => {
  return api({
    url: `${prefixUrl}/getLinesByStation?stationName=${name}`,
    method: 'GET',
  })
}

export const searchBusLines = (name) => {
  return api({
    url: `${prefixUrl}/searchBusLines?busLineName=${name}`,
    method: 'GET',
  })
}

export const searchBusStations = (name) => {
  return api({
    url: `${prefixUrl}/searchStation?stationName=${name}`,
    method: 'GET',
  })
}

export const queryLine = (lineName) => {
  return api({
    url: `/pts-server/busService/client/busLine/queryLine`,
    method: 'POST',
    data: { h: { deviceId: 'fixedDeviceID', userToken: '', appCode: '330900', codeValue: '330900', sourceCodeValue: '330900' }, b: { lineName, needGeometry: 123 } },
  })
}

export const details = (lineId) => {
  return api({
    url: `/pts-server/busService/client/bus/vehicle/dynamic/line/details`,
    method: 'POST',
    data: { h: { deviceId: 'fixedDeviceID', userToken: '', appCode: '330900', codeValue: '330900', sourceCodeValue: '330900' }, b: { lineId, offset: 100 } },
  })
}


export const queryNewList = () => {
  return api({
    url: `${prefixUrl}/queryBusNews`,
    method: 'GET',
  })
}

export const postHotRoute = (name) => {
  return api({
    url: `${prefixUrl}/postHotRoute?busLineName=${name}`,
    method: 'GET',
  })
}

export const postHotBusStop = (name) => {
  return api({
    url: `${prefixUrl}/postHotBusStop?stationName=${name}`,
    method: 'GET',
  })
}

export const getHotBusLines = () => {
  return api({
    url: `${prefixUrl}/getHotBusLines`,
    method: 'GET',
  })
}

export const getHotBusStops = () => {
  return api({
    url: `${prefixUrl}/getHotBusStops`,
    method: 'GET',
  })
}

export const queryGasOnline = () => {
  return api({
    url: `${prefixUrl}/queryGasOnline`,
    method: 'GET',
  })
}
