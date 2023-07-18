const { baseUrl, key, cryptoHost } = require("../env")
// 获取小程序当前版本信息 https://developers.weixin.qq.com/miniprogram/dev/api/open-api/account-info/wx.getAccountInfoSync.html
// 自动根据版本切换接口请求地址
const { miniProgram: { envVersion } } = wx.getAccountInfoSync();
let host = ''
if (envVersion === 'release') {
  host = baseUrl;
}
if (envVersion === 'trial') {
  host = baseUrl;
}
if (envVersion === 'develop') {
  host = baseUrl;
  // host = 'https://dev-zawx-gateway.vip.cpolar.top';
}


const LINE_HISTORY = 'line_history'


module.exports = {
  key,
  baseUrl: host,
  cryptoUrl: cryptoHost,
  envVersion,
  LINE_HISTORY
}
