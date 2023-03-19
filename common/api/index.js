import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
import Abi from 'wx-axios-promise'
import { ReportBase } from '../utils';
const log = require('~/common/log.js') // 引用上面的 log.js 文件
var { baseUrl } = require('../constant');
axios.defaults.adapter = mpAdapter

const api = axios.create({
  baseURL: baseUrl,
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
const apiResponseConfig = (response) => {
  wx.hideLoading()
  // console.log('response response: ', response)
  const { status, config, data } = response
  const reportBase = new ReportBase(config.url, config.reportLevel || 0)
  // 如果是登录424，则是没有登录或已经过期
  if (status === 424) {
    reportBase.report(config, { code: 0, msg: data.msg })
    data.code = 424
    wx.switchTab({
      url: '/page/tabBar/user/index',
    })
  }
  // 如果是登录500，则是没有注册用户
  else if (status >= 500) {
    reportBase.report(config, { code: status, msg: data.msg })
    data.code = 500
    setToken('')
    wx.showModal({
      title: '提示',
      content: '需用户注册',
      confirmText: '去注册',
      showCancel: true,
      success: (res) => {
        if (res.confirm)
          wx.navigateTo({
            url: '/page/user/pages/login/index',
          })
        if (res.cancel)
          wx.switchTab({
            url: '/page/tabBar/home/index',
          })
      },
    })
  } else {
    reportBase.report(config, { code: 0, msg: data.msg })
    return data
  }
}

const apiResponseError = (error) => {
  // will return undefined
  log.error('api/NoTip/File response error: ', error)
}
api.interceptors.response.use(apiResponseConfig, apiResponseError)

apiNoTip.interceptors.response.use(apiResponseConfig, apiResponseError)
// request 拦截器
const apiRequestConfig = (isLoading = true) => {
  return function (config) {
    // console.log('request config: ', config)
    const start = +new Date
    config.start = start
    const token = wx.getStorageSync('token')
    isLoading && wx.showLoading({
      title: api.req || '加载中'
    })
    if (token) {
      config.headers = {
        'Authorization': 'Bearer ' + token,
        ...config.headers,
      }
    }
    return config;
  }
}

const apiRequestErrorConfig = (error) => {
  log.error('api/NoTip/File request error: ', error)
}

api.interceptors.request.use(apiRequestConfig(true), apiRequestErrorConfig)


apiNoTip.interceptors.request.use(apiRequestConfig(false), apiRequestErrorConfig)
// 上传文件用
apiUploadFile.interceptors.response.use((config) => {
  return config.data
}, function (error) {
  return error
})

apiUploadFile.interceptors.request.use(function (config) {
  const token = wx.getStorageSync('token')
  if (token)
    config.header = {
      'Authorization': 'Bearer ' + token,
      ...config.header,
    }
  return config;
}, apiRequestErrorConfig)


export {
  api, apiNoTip, apiUploadFile
}
