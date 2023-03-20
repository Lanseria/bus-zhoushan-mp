const { apiCrypto } = require('./index')


export const searchNearBusLines = () => {
  return apiCrypto({
    url: `/api/bus/stop!encryptedNearlines.action`,
    method: 'GET',
    params: {
      cityState: '2',
      cryptoSign: '1afce70334f2a474c998cd35dc8b97b3',
      s: 'h5',
      v: '3.3.19',
      vc: '1',
      src: 'wechat_zhoushan',
      userId: 'browser_1679220999857',
      h5Id: 'browser_1679220999857',
      unionId: '',
      sign: '1',
      cityId: '301',
      geo_lat: '30.0117',
      geo_lng: '122.0987',
      lat: '30.0117',
      lng: '122.0987',
      gpstype: 'wgs'
    }
  })
}
