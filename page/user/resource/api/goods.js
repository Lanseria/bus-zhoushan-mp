const { api } = require('~/common/api/index')

module.exports = {
  queryGoods: (id) => {
    return api({
      url: `/mp/goods/${id}`,
    })
  },
  queryGoodsList: () => {
    return api({
      url: `/mp/goods/list`,
    })
  },
  postGoods: (id) => {
    return api({
      url: `/mp/goods/submit/${id}`,
      method: "POST",
    })
  },
  payGoods: (data) => {
    return api({
      url: `/mp/goods/pay`,
      data
    })
  },

  refundGoods: (id, status) => {
    return api({
      url: `/mp/goods/refund/${id}?status=${status}`,
      method: "POST",
    })
  }
}
