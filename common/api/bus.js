const { api } = require('./index')

export const searchBusLinesByStation = (name) => {
  return api({
    url: `https://s8zygv.laf.run/getLinesByStation?stationName=${name}`,
    method: 'GET',
  })
}

export const searchBusLines = (name) => {
  return api({
    url: `https://s8zygv.laf.run/searchBusLines?busLineName=${name}`,
    method: 'GET',
  })
}

export const searchBusStations = (name) => {
  return api({
    url: `https://s8zygv.laf.run/searchStation?stationName=${name}`,
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
    url: `https://s8zygv.laf.run/queryBusNews`,
    method: 'GET',
  })
}

export const postHotRoute = (name) => {
  return api({
    url: `https://s8zygv.laf.run/postHotRoute?busLineName=${name}`,
    method: 'GET',
  })
}

export const postHotBusStop = (name) => {
  return api({
    url: `https://s8zygv.laf.run/postHotBusStop?stationName=${name}`,
    method: 'GET',
  })
}

export const getHotBusLines = () => {
  return api({
    url: `https://s8zygv.laf.run/getHotBusLines`,
    method: 'GET',
  })
}

export const getHotBusStops = () => {
  return api({
    url: `https://s8zygv.laf.run/getHotBusStops`,
    method: 'GET',
  })
}

export const queryGasOnline = () => {
  return api({
    url: `https://s8zygv.laf.run/queryGasOnline`,
    method: 'GET',
  })
}
