const { apiUploadFile, api } = require('./index')

module.exports = {
  queryAnnexList: () => {
    return api({
      url: `/mp/mpuserannex/list`,
    })
  },

  uploadAnnexFile: (fileUrl) => {
    return apiUploadFile.wx.uploadFile({
      url: `/mp/mpuserannex`,
      filePath: fileUrl,
      name: 'file',
    }).then((res) => {
      return JSON.parse(res)
    })
  },

  uploadFaceFile: (fileUrl) => {
    return apiUploadFile.wx.uploadFile({
      url: `/mp/user/checkface`,
      filePath: fileUrl,
      name: 'file',
    }).then((res) => {
      return JSON.parse(res)
    })
  },

  delAnnex: (id) => {
    return api({
      url: `/mp/mpuserannex/${id}`,
      method: 'DELETE'
    })
  },
}
