const { api } = require('~/common/api/index')

module.exports = {

  queryDownloadClassUserSignupPdf: (classesId) => {
    return api({
      url: `/mp/download/class/user/signup/${classesId}`,
    })
  },


  queryDownloadClassUserOnlineprove: (classesId) => {
    return api({
      url: `/mp/download/onlineprove/${classesId}`,
    })
  },
}