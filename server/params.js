const axios = require('axios')

async function searchStation(stationName) {
  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'DNT': '1',
    'Origin': 'https://pts.linkcld.com',
    'Referer': 'https://pts.linkcld.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
  };


  const data = {
    h: {
      deviceId: 'fixedDeviceID',
      userToken: '',
      appCode: '330900',
      codeValue: '330900',
      sourceCodeValue: '330900'
    },
    b: {
      stationName
    }
  };

  try {
    const response = await axios.post(
      'https://cxfwzlb.zsjtw.zhoushan.gov.cn/busServer/client/station/queryStation',
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


async function getVehicleDetailsParams(lineIds, stationIds) {
  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'DNT': '1',
    'Origin': 'https://pts.linkcld.com',
    'Referer': 'https://pts.linkcld.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
  };

  const data = {
    h: {
      deviceId: 'fixedDeviceID',
      userToken: '',
      appCode: '330900',
      codeValue: '330900',
      sourceCodeValue: '330900'
    },
    b: {
      lineIds,
      stationIds
    }
  };

  try {
    const response = await axios.post(
      'https://cxfwzlb.zsjtw.zhoushan.gov.cn/busServer/client/bus/vehicle/dynamic/station/details',
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  searchStation,
  getVehicleDetailsParams
}
