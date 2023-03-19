const { apiUploadFile } = require('./index')

module.exports = {
  uploadFile: (file) => {
    return apiUploadFile.wx.uploadFile({
      url: `/admin/sys-file/upload`,
      filePath: file.url,
      name: 'file',
    }).then((res) => {
      return JSON.parse(res)
    })
  },
  uploadFileUrl: (fileUrl) => {
    return apiUploadFile.wx.uploadFile({
      url: `/admin/sys-file/upload`,
      filePath: fileUrl,
      name: 'file',
    }).then((res) => {
      return JSON.parse(res)
    })
  },

  uploadIdcardByFileUrl: (fileUrl) => {
    return apiUploadFile.wx.uploadFile({
      url: `/mp/user/checkIdcard`,
      filePath: fileUrl,
      name: 'file',
    }).then((res) => {
      return JSON.parse(res)
    })
  }
}
