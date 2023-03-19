const { api } = require('./index')


module.exports = {
  queryActivity: (id) => {
    return api({
      url: `/mp/activity/${id}`,
    })
  },
  queryPrivacy: () => {
    return api({
      url: '/mp/activity/terms'
    })
  }
}