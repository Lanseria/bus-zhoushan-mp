const { api } = require('./index')

module.exports = {
  queryBannerList: () => {
    return api({
      url: `/mp/class/banner/list`,
    })
  },
  queryCategoryList: (pid = 0) => {
    return api({
      url: `/mp/class/category/${pid}/list`,
    })
  },

  queryCategoryTree: (cid = 0) => {
    return api({
      url: `/mp/class/category/${cid}/tree`,
    })
  },
  queryClassPage: (current = 1, params = {}) => {
    return api({
      url: `/mp/class/page`,
      data: { current, size: 10, ...params }
    })
  },

  queryClassById: (id) => {
    return api({
      url: `/mp/class/${id}`,
    })
  },

  submitClass: (data) => {
    return api({
      url: `/mp/class/submit`,
      method: "POST",
      data,
    })
  },

  queryLearningClassList: () => {
    return api({
      url: `/mp/class/learning/list`,
    })
  }
}
