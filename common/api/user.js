const { api } = require('./index')

module.exports = {
  queryUserFormList: () => {
    return api({
      url: `/mp/user/form/list`,
    })
  },
  queryUserForm: (id) => {
    return api({
      url: `/mp/user/form/${id}`,
    })
  },
  querySmsSend: (phone) => {
    return api({
      url: `/mp/user/sendSms/${phone}`,
    })
  },
  postUserIdCard: (data) => {
    return api({
      url: `/mp/user/bind/idcard`,
      data,
      method: 'POST'
    })
  },
  postUserPhone: (data) => {
    return api({
      url: `/mp/user/bind/phone`,
      data,
    })
  },

  queryUserCertificate: () => {
    return api({
      url: `/mp/user/certificate`,
    })
  },

  queryUserCount: () => {
    return api({
      url: `/mp/user/count`,
    })
  },

  queryUserReserve: () => {
    return api({
      url: `/mp/user/reserve/list`,
    })
  },

  queryUserUnbinding: () => {
    return api({
      url: "/mp/user/unbinding",
    })
  },

  cancellationUser: () => {
    return api({
      url: "/mp/user/cancellation",
    })
  },
}
