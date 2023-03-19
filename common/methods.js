const log = require('~/common/log.js') // 引用上面的 log.js 文件
const { loginUseMpCode, queryUserInfo } = require('./api/login')
/**
 * 动态更新tabbar组件active值
 * @param {number} idx tabbar index
 * @param {this} that 当前this作用域
 */
// const setTabBarStatus = (idx = 0, that) => {
//   return () => {
//     if (typeof that.getTabBar === 'function' && that.getTabBar()) {
//       that.getTabBar().setData({
//         active: idx
//       })
//     }
//   }
// }

const setToken = (access_token) => {
  wx.setStorage({
    key: 'token',
    data: access_token
  })
}
const setRToken = (refresh_token) => {
  wx.setStorage({
    key: 'refresh_token',
    data: refresh_token
  })
}

const getToken = () => {
  return wx.getStorageSync('token')
}

const showToast = (title, icon = "error") => {
  wx.showToast({
    title,
    icon
  })
}

const getUserInfo = async () => {
  try {
    const res = await queryUserInfo()
    // console.log(res);
    if (res.code) {
      throw res
    } else {
      return res.data
    }
  } catch (error) {
    throw error
  }

}

const wxLogin = (resolve, reject) => {
  wx.login({
    success: async (r) => {
      loginUseMpCode(r.code).then(async (res) => {
        if (res.access_token) {
          setToken(res.access_token)
          setRToken(res.refresh_token)
          setTimeout(async () => {
            const data = await getUserInfo()
            resolve(data)
          }, 100)
        } else {
          reject(res.code)
        }
      })
    },
    fail: (res) => {
      log.error('common/methods.js: wx.login', res)
    }
  })
}

const mpLogin = () => {
  return new Promise((resolve, reject) => {
    const token = getToken()
    if (token) {
      getUserInfo().then((data) => {
        // console.log('has token', data);
        // 每次获取用户详情都将用户信息放在localStorage
        wx.setStorage({
          key: "user_info",
          data: data
        })
        if (data) {
          resolve(data)
        }
      }).catch((err) => {
        log.info('get userinfo but token 424', err);
        setTimeout(() => {
          wxLogin(resolve, reject)
        }, 100)
      })
    } else {
      wxLogin(resolve, reject)
    }
  })
}

module.exports = {
  showToast,
  mpLogin,
}
