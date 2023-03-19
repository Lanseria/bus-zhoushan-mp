const { baseUrl, key } = require("../env")
let host = 'https://zawx-gateway.vip.cpolar.top';
// 获取小程序当前版本信息 https://developers.weixin.qq.com/miniprogram/dev/api/open-api/account-info/wx.getAccountInfoSync.html
// 自动根据版本切换接口请求地址
const { miniProgram: { envVersion } } = wx.getAccountInfoSync();

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


module.exports = {
  key,
  baseUrl: host,
  envVersion,
}
