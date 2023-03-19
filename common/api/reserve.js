const { api } = require('./index')


module.exports = {
  postReserve: (classesId) => {
    return api({
      url: `/mp/reserve`,
      method: 'POST',
      data: {
        classesId
      }
    })
  },
}
