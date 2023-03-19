const log = require('~/common/log.js') // 引用上面的 log.js 文件
const { ReportModule } = require('~/common/utils')
const { AES_EN } = require('../utils')
const { apiNoTip } = require('~/common/api/index')
const { COURSE_CRYPTO_KEY, COURSE_CRYPTO_IV } = require('~/common/constant')

async function getLatestUserKey() {
  return new Promise((resolve, reject) => {
    const userCryptoManager = wx.getUserCryptoManager()
    userCryptoManager.getLatestUserKey({
      success({ encryptKey, iv, version, expireTime }) {
        resolve({ encryptKey, iv, version, expireTime })
      },
      fail(res) {
        reject(res)
      }
    })
  })
}

async function wxlogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        log.error('page/course/resource/api/course.js wx.login', res)
        reject(res)
      }
    })
  })
}

const submitCourseProgressCrypto = (jsonData) => {
  return apiNoTip({
    url: `/mp/course/progress`,
    method: 'POST',
    data: jsonData
  })
}

const submitCourseProgress = (data) => {
  return apiNoTip({
    url: `/mp/course/progress1`,
    method: 'POST',
    data
  })
}

const submitCourseProgressCrypto2 = (jsonData) => {
  return apiNoTip({
    url: `/mp/course/progress2`,
    method: 'POST',
    data: jsonData
  })
}
module.exports = {
  queryCourseTreeById: (classId, courseId) => {
    return apiNoTip({
      url: `/mp/course/${classId}/tree/${courseId}`,
    })
  },

  cryptoCourseProgress: (json) => {
    return new Promise(async (resolve, reject) => {
      if (Math.random() < 0.8) {
        const dataStr = JSON.stringify(json)
        const enStr = AES_EN(dataStr, COURSE_CRYPTO_KEY, COURSE_CRYPTO_IV)
        const params = {
          encryptStr: enStr
        }
        const reportModule = new ReportModule('course_module', '/mp/course/progress2', 1)
        const res = await submitCourseProgressCrypto2(params)
        reportModule.report(res)
        if (res.code === 0) {
          resolve(res.code)
        } else {
          if (res === undefined) {
            reject(undefined)
          } else {
            reject(res.code)
          }
        }
      } else {
        const dataStr = JSON.stringify(json)
        const isSessionKeyValid = wx.getStorageSync('isSessionKeyValid')
        const { encryptKey, iv } = await getLatestUserKey()
        log.info(encryptKey, iv)
        const enStr = AES_EN(dataStr, encryptKey, iv)
        let params = {
          encryptStr: enStr
        }
        try {
          if (!isSessionKeyValid) {
            const r = await wxlogin()
            params = {
              ...params,
              code: r.code
            }
          }
          // 课程学习模块监控5
          const reportModule = new ReportModule('course_module', '/mp/course/progress', 1)
          const res = await submitCourseProgressCrypto(params)
          if (res) {
            if (res.code === 424) {
              // 课程学习模块监控5
              // 424 不算错误
              reportModule.report({ code: 0, msg: res.msg })
              wx.setStorage({
                key: "isSessionKeyValid",
                data: false
              })
              resolve(424)
            } else if (res.code === 0) {
              // 课程学习模块监控5
              reportModule.report(res)
              wx.setStorage({
                key: "isSessionKeyValid",
                data: true
              })
              resolve(0)
            } else {
              // 课程学习模块监控5
              // 捕捉500错误
              // 避免 Error: Network Error
              reportModule.report(res)
              resolve(500)
            }
          } else {
            log.error('page/course/resource/api/course.js catch network error:', res)
            reject(undefined)
          }
        } catch (error) {
          log.error('page/course/resource/api/course.js catch error:', error)
          reject(error)
        }
      }
    })
  },

}
