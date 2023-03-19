const { api } = require('~/common/api/index')

module.exports = {
  postInvoice: (data) => {
    return api({
      url: `/mp/invoice`,
      data,
      method: 'POST'
    })
  },

  queryInvoicePage: (current = 1, params = {}) => {
    return api({
      url: `/mp/invoice/page`,
      data: { current, size: 10, ...params }
    })
  },

  queryInvoice: (id) => {
    return api({
      url: `/mp/invoice/${id}`,
    })
  },
}