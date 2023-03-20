import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
import Abi from 'wx-axios-promise'
import { ReportBase } from '../utils';
const log = require('~/common/log.js') // 引用上面的 log.js 文件
var { baseUrl, cryptoUrl } = require('../constant');
axios.defaults.adapter = mpAdapter

const api = axios.create({
  baseURL: baseUrl,
  validateStatus: (status) => {
    return status >= 200 && status <= 600 // 全部允许, 不会遇到错误就停止
  },
})


const apiCrypto = axios.create({
  baseURL: cryptoUrl,
  validateStatus: (status) => {
    return status >= 200 && status <= 600 // 全部允许, 不会遇到错误就停止
  },
})

const apiNoTip = axios.create({
  baseURL: baseUrl,
  validateStatus: (status) => {
    return status >= 200 && status <= 600 // 全部允许, 不会遇到错误就停止
  },
})
const apiUploadFile = Abi({
  url: baseUrl,
})
// response 拦截器
const apiResponseConfig = (isCrypto = false) => {
  return function (response) {
    const { status, config, data } = response
    wx.hideLoading()
    if (!isCrypto) {
      return data
    }
    else {
      console.log(data)
      return data
    }
  }
}

const apiResponseError = (error) => {
  log.error('api/NoTip/File response error: ', error)
}
api.interceptors.response.use(apiResponseConfig(false), apiResponseError)

apiNoTip.interceptors.response.use(apiResponseConfig(false), apiResponseError)

apiCrypto.interceptors.response.use(apiResponseConfig(true), apiResponseError)
// request 拦截器
const apiRequestConfig = (isLoading = true) => {
  return function (config) {
    config.headers = {
      Referer: 'https://web.chelaile.net.cn/ch5/index.html?src=wechat_zhoushan&showHeader=1&showHomeBack=0&hideFooter=0&showWxmpFooter=0&hideCity=1&switchCity=0&showAllCity=0&showFav=0&showLineReview=0&showFrontLoading=0&topLogoUnredirect=0&supportSubway=0&homePage=linearound&homePagetitle=%E8%BD%A6%E6%9D%A5%E4%BA%86&cityId=301&cityName=%E8%88%9F%E5%B1%B1&cityVersion=0&noCheckCity=1&isEdit=1&utm_source=wechat_zhoushan&showMap=0&showTopLogo=0&hideTimeTable=1&autoRefreshTime=15000&utm_medium=entrance&randomTime=1679313852525&src=wechat_zhoushan'
    }
    isLoading && wx.showLoading({
      title: api.req || '加载中'
    })
    return config;
  }
}

const apiRequestErrorConfig = (error) => {
  log.error('api/NoTip/File request error: ', error)
}

api.interceptors.request.use(apiRequestConfig(true), apiRequestErrorConfig)

apiNoTip.interceptors.request.use(apiRequestConfig(false), apiRequestErrorConfig)

apiCrypto.interceptors.request.use(apiRequestConfig(true), apiRequestErrorConfig)
// 上传文件用
apiUploadFile.interceptors.response.use((config) => {
  return config.data
}, function (error) {
  return error
})

apiUploadFile.interceptors.request.use(function (config) {
  return config;
}, apiRequestErrorConfig)


export {
  api, apiNoTip, apiUploadFile, apiCrypto
}
