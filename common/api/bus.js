const { api } = require('./index')

export const searchBusLines = (lineName) => {
  return api({
    url: `/pts-server/busService/client/busLine/searchBusLines`,
    method: 'POST',
    data: { h: { deviceId: 'fixedDeviceID', userToken: '', appCode: '330900', codeValue: '330900', sourceCodeValue: '330900' }, b: { lineName, offset: 10, page: 1 } },
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

export const getHotBusLines = () => {
  return api({
    url: `https://s8zygv.laf.run/getHotBusLines`,
    method: 'GET',
  })
}

export const queryGasOnline = () => {
  return api({
    url: `https://s8zygv.laf.run/queryGasOnline`,
    method: 'GET',
  })
}
