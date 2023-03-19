import { api } from './index'

module.exports = {
  /**
   * 注册接口
   * @param {*} data 
   */
  createUserByCode: (data) => {
    return api({
      isBasicReport: true,
      reportLevel: 1,
      url: `/mp/login/create`,
      method: 'POST',
      data,
    })
  },
  /**
   * 查询手机号状态
   * @param {*} phone 
   */
  queryPhoneBindStatus: (phone) => {
    return api({
      url: `/mp/login/bind/phone/${phone}`,
    })
  },
  /**
   * 登录接口
   * @param {*} code 
   */
  loginUseMpCode: (code) => {
    return api({
      isBasicReport: true,
      reportLevel: 1,
      url: '/auth/oauth/token',
      params: {
        'grant_type': 'mobile',
        'mobile': `MINI@${code}`,
        'code': code
      },
      headers: {
        Authorization: 'Basic c29jaWFsOnNvY2lhbA==',
      },
    })
  },
  sendSmsCode: (phone) => {
    return api({
      url: `/admin/mobile/${phone}`,
    })
  },

  loginUsePhoneCode: (phone, code) => {
    return api({
      url: `/auth/oauth/token`,
      params: {
        'grant_type': 'mobile',
        'mobile': `SMS@${phone}`,
        'code': code
      },
      headers: {
        'Authorization': 'Basic cGlnOnBpZw==',
      },
    })
  },

  bindPhoneMp: (code) => {
    // const token = wx.getStorageSync('token')
    return api({
      url: `/admin/social/bind`,
      data: {
        'state': 'MINI',
        'code': code
      },
    })
  },

  queryUserInfo: () => {
    return api({
      isBasicReport: true,
      reportLevel: 0,
      url: `/mp/user/info`,
    })
  },

  putUserInfo: (data) => {
    return api({
      url: `/mp/user/info`,
      method: "PUT",
      data,
    })
  }
}
