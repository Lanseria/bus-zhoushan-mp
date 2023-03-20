const log = require('~/common/log.js') // 引用上面的 log.js 文件
const { envVersion } = require('~/common/constant')
const openDoc = (url, fileType = 'pdf') => {
  wx.downloadFile({
    url,
    header: {
      'content-type': "application/pdf"
    },
    success: function (res) {
      const filePath = res.tempFilePath
      wx.openDocument({
        filePath: filePath,
        fileType,
        showMenu: true,
        success: function (res) {
          log.info('打开文档成功')
        }
      })
    }
  })
}
// wxdata_perf_monitor 基础监控 接口
class ReportBase {
  wxdata_perf_monitor_id = ''
  wxdata_perf_monitnor_level = 0
  start = 0
  constructor(wxdata_perf_monitor_id, wxdata_perf_monitor_level) {
    this.wxdata_perf_monitor_id = wxdata_perf_monitor_id
    this.wxdata_perf_monitor_level = wxdata_perf_monitor_level
    this.start = +new Date
  }
  report(config, res) {
    // 正式环境才发送
    if (config.isBasicReport && res && wx.reportEvent && envVersion === 'release') {
      const costTime = +new Date - this.start
      log.info('reportEvent基础监控: ', this.wxdata_perf_monitor_id, res.code, res.msg)
      wx.reportEvent('wxdata_perf_monitor', {
        wxdata_perf_monitor_id: this.wxdata_perf_monitor_id,
        wxdata_perf_monitor_level: this.wxdata_perf_monitor_level,
        wxdata_perf_error_code: res.code,
        wxdata_perf_error_msg: res.msg || 'success',
        wxdata_perf_cost_time: costTime,
      })
    }
  }
}
// 功能/模块监控
class ReportModule {
  wxdata_perf_module_id = ''
  wxdata_perf_monitor_id = ''
  wxdata_perf_monitnor_level = 0
  start = 0
  constructor(wxdata_perf_module_id, wxdata_perf_monitor_id, wxdata_perf_monitor_level) {
    this.wxdata_perf_module_id = wxdata_perf_module_id
    this.wxdata_perf_monitor_id = wxdata_perf_monitor_id
    this.wxdata_perf_monitor_level = wxdata_perf_monitor_level
    this.start = +new Date
  }
  report(res) {
    // 正式环境才发送
    if (res && wx.reportEvent && envVersion === 'release') {
      const costTime = +new Date - this.start
      log.info('reportEvent模块监控: ', this.wxdata_perf_module_id, this.wxdata_perf_monitor_id, res.code, res.msg)
      wx.reportEvent('wxdata_perf_module_monitor', {
        wxdata_perf_module_id: this.wxdata_perf_module_id,
        wxdata_perf_monitor_id: this.wxdata_perf_monitor_id,
        wxdata_perf_monitor_level: this.wxdata_perf_monitor_level,
        wxdata_perf_error_code: res.code,
        wxdata_perf_error_msg: res.msg || 'success',
        wxdata_perf_cost_time: costTime,
      })
    }
  }
}
// 服务/流程监控
class ReportService {
  // 服务ID 例如公积金服务的内部ID编码
  wxdata_perf_service_id = ''
  // 0代表服务步骤，1代表服务开始，2代表服务成功结束
  wxdata_perf_step_type = 0
  // 	环节步骤ID，例如人脸验证环节的内部ID编码
  wxdata_perf_step_id = ''
  // 接口ID，即服务调用接口ID或者接口英文名称
  wxdata_perf_monitor_id = ''
  wxdata_perf_monitor_level = 0
  start = 0

  constructor(wxdata_perf_service_id, wxdata_perf_step_type, wxdata_perf_step_id, wxdata_perf_monitor_id, wxdata_perf_monitor_level) {
    this.wxdata_perf_service_id = wxdata_perf_service_id
    this.wxdata_perf_step_type = wxdata_perf_step_type
    this.wxdata_perf_step_id = wxdata_perf_step_id
    this.wxdata_perf_monitor_id = wxdata_perf_monitor_id
    this.wxdata_perf_monitor_level = wxdata_perf_monitor_level
    this.start = +new Date
  }

  report(res) {
    // 正式环境才发送
    if (res && wx.reportEvent && envVersion === 'release') {
      const costTime = +new Date - this.start
      log.info('reportEvent流程监控: ', this.wxdata_perf_service_id, this.wxdata_perf_step_id, res.code, res.msg)
      wx.reportEvent('wxdata_perf_service_monitor', {
        wxdata_perf_service_id: this.wxdata_perf_service_id,
        wxdata_perf_step_type: this.wxdata_perf_step_type,
        wxdata_perf_step_id: this.wxdata_perf_step_id,
        wxdata_perf_monitor_id: this.wxdata_perf_monitor_id,
        wxdata_perf_monitor_level: this.wxdata_perf_monitor_level,
        wxdata_perf_error_code: res.code || 500,
        wxdata_perf_error_msg: res.msg || 'success',
        wxdata_perf_cost_time: costTime,
      })
    }
  }
}

function AES_DE(text) {
  const t = CryptoJS.enc.Utf8.parse("422556651C7F7B2B5C266EED06068230")
  const n = CryptoJS.AES.decrypt(
    text, t, {
    mode: CryptoJS.mode.ECB
  }
  )
  const i = JSON.parse(n.toString(CryptoJS.enc.Utf8))
  console.log(i)
}
export {
  openDoc, ReportBase, ReportModule, ReportService, AES_DE
}
