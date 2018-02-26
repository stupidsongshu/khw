// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'
import config from './config'
// import qs from 'qs'
import MintUI, {Indicator, Toast} from 'mint-ui'
import 'mint-ui/lib/style.css'
import {Swipe, SwipeItem} from 'vant'
import 'normalize.css'
import './assets/css/common.css'
import './assets/css/base.styl'
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'

/* eslint-disable no-unused-vars */
// var VConsole = require('vconsole/dist/vconsole.min')
// var vConsole = new VConsole()

// if (process.env.NODE_ENV === 'development') {
//   axios.defaults.baseURL = config.api.dev + '/khw/c/h'
// } else if (process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = config.api.pro
// }
// console.log(axios.defaults.baseURL)
// `timeout` 指定请求超时的毫秒数(0 表示无超时时间)，如果请求超过 `timeout` 的时间，请求将被中断
axios.defaults.timeout = 20000

axios.interceptors.request.use(function(config) {
  // Indicator.open({
  //   text: '加载中...',
  //   spinnerType: 'fading-circle'
  // })

  // if (config.method.toLowerCase() === 'post') {
  //   config.data = qs.stringify(config.data)
  // }
  store.commit('isLoadingSave', true)

  return config
}, function(error) {
  store.commit('isLoadingSave', true)
  return Promise.reject(error)
})
axios.interceptors.response.use(function(response) {
  Indicator.close()
  store.commit('isLoadingSave', false)
  return response
}, function(error) {
  Indicator.close()
  store.commit('isLoadingSave', false)

  // let toastInstance = Toast({
  //   message: '获取数据失败，请稍后重试',
  //   duration: 2000
  // })
  // store.commit('toastInstanceSave', toastInstance)

  Toast({
    message: '获取数据失败，请稍后重试',
    duration: 1500
  })
  return Promise.reject(error)
})

if (process.env.NODE_ENV === 'development') {
  store.commit('apiSave', config.api.dev + '/khw/c/h')
} else if (process.env.NODE_ENV === 'production') {
  // 测试环境
  // store.commit('apiSave', config.api.dev + '/khw/c/h')

  // 跑批环境
  // store.commit('apiSave', 'http://xfjr.ledaikuan.cn:9292/khw/c/h')

  // 生产环境
  store.commit('apiSave', config.api.pro)
}
console.log(store.state.common.api)

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(Swipe)
Vue.use(SwipeItem)

/* eslint-disable no-undef */
Vue.prototype.app = app

Vue.prototype.$http = axios

// if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined) {
//   try {
//     window.webkit.messageHandlers.activeMethodIos.postMessage()
//   } catch (err) {
//     console.log(err)
//   }
// } else if (window.jsInterface !== undefined) {
//   try {
//     /* eslint-disable no-labels */
//     javascript:jsInterface.activeMethodIos()
//   } catch (err) {
//     console.log(err)
//   }
// } else {
//   console.log('调用ios或android接口失败！')
// }

/**
 * 检查申请资格认证状态并存储
 * @return false未通过
 * @return true 已通过
 */
app.IdcardCallBack = function(json) {
  json = JSON.parse(json)
  if (json.Step === 811 && json.Result === 0) {
    // 申请资格认证状态 已通过
    store.commit('applyQualificationAuthStatusSave', true)
    store.commit('idFrontShowSave', 3)
    store.commit('idBackShowSave', 3)
  } else if (json.Step === 811 && json.Result !== 0) {
    // 申请资格认证状态 未通过
    store.commit('applyQualificationAuthStatusSave', false)
    store.commit('idFrontShowSave', 2)
    store.commit('idBackShowSave', 2)
    Toast({
      message: '申请资格认证未通过',
      duration: 3000
    })
  }
}

app.ShowView = function() {
  let el = store.state.common.toggleView.target
  if (store.state.common.toggleView.status && el.length > 0) {
    for (var i = 0; i < el.length; i++) {
      el[i].style.display = 'block'
    }
    store.commit('toggleViewSave', {
      status: false,
      target: []
    })
  }
}

var startTime = new Date().getTime()
// 物理返回键
app.back = function() {
  // fix 若有popup组件显示，点击后退先消失而不是直接返回上一页
  let hasPopup = store.state.common.hasPopup
  // isLoading是否正在请求(默认false,请求期间屏蔽后退功能 [注意：巨坑来了，如果在全局拦截中使用vuex-persist修改，一旦某个请求被catch到后js就不再执行，目前去掉了插件vuex-persist])
  let isLoading = store.state.common.isLoading
  console.log('isLoading', isLoading)
  if (hasPopup) {
    store.commit('hasPopupSave', false)
    return
  }
  if (isLoading) {
    return
  }

  if (router.currentRoute.path === '/' || router.currentRoute.path === '/repay') {
    Toast({
      message: '再按一次退出应用',
      duration: 1000,
      position: 'bottom'
    })
    var time = new Date().getTime()
    // 双击后退退出应用
    if (time - startTime < 1000) {
      app.exit()
    } else {
      startTime = time
    }

    return
  }

  // 屏蔽借款处理中、还款处理中返回
  // if (router.currentRoute.path === '/loanDeal' || router.currentRoute.path === '/repay/repayDeal') {
  //   return
  // }

  // 借款处理中返回首页
  if (router.currentRoute.path === '/loanDeal') {
    router.push({name: 'khw'})
    return
  }
  // 还款处理中返回还款页面
  if (router.currentRoute.path === '/repay/repayDeal') {
    router.push({name: 'repay'})
    return
  }

  // 逾期还款返回到还款页面
  if (router.currentRoute.path === '/repay/overdueRepay') {
    router.push({name: 'repay'})
    return
  }

  window.history.go(-1)
}

Vue.prototype.goback = function() {
  // isLoading是否正在请求(默认false,请求期间屏蔽后退功能[注意：巨坑来了，如果在全局拦截中使用vuex-persist修改，一旦某个请求被catch到后js就不再执行，目前去掉了插件vuex-persist])
  let isLoading = store.state.common.isLoading
  console.log('isLoading', isLoading)
  if (isLoading) {
    return
  }

  this.$router.go(-1)
}

Vue.prototype.loading = function(txt) {
  Indicator.open({
    text: txt | '',
    spinnerType: 'fading-circle'
  })
  // store.commit('isLoadingSave', true)
}
Vue.prototype.closeLoading = function() {
  Indicator.close()
  // store.commit('isLoadingSave', false)
}
Vue.prototype.toast = function(message, duration) {
  if (!message) {
    message = ''
  }
  if (!duration) {
    duration = 1200
  }
  Toast({
    message: message,
    duration: duration
  })
}

// window.addEventListener('resize', function() {
//   if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
//     window.setTimeout(function() {
//       document.activeElement.scrollIntoViewIfNeeded()
//     }, 0)
//   }
// })

// 签名
Vue.prototype.getSign = function(call, timestamp) {
  // 注意: 传入Android的timestamp<number>需转成<string>
  let timestampStr = timestamp.toString()

  return new Promise((resolve, reject) => {
    var sign = ''
    let deviceType = this.$store.state.common.deviceType
    if (deviceType === 'android') {
      sign = app.sign(call, timestampStr)
      resolve(sign)
    } else if (deviceType === 'iphone') {
      if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined) {
        let params = {
          call: call,
          timestamp: timestampStr
        }
        try {
          window.webkit.messageHandlers.getSignKeyFromIos.postMessage(params)

          window.getSignKeyToWeb = function(sign) {
            resolve(sign)
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
  })
}

// 根据账户汇总信息控制跳转逻辑
Vue.prototype.checkSummaryInfo = function() {
  /**
   * @param: overdueStatus 逾期状态
   * @param: minReturnAmount 解除逾期状态所需偿还金额
   * @param: totalLoanAmt 实际欠款合计
   * @param: tempFrozenAmt 临时冻结额度
   * @param: payFrozenStus 账户还款中冻结状态
   * @return:
   */
  let loanAcctInfo = this.$store.state.common.summaryInfo
  console.log(loanAcctInfo)
  let deviceType = this.$store.state.common.deviceType

  // 账户还款中冻结状态
  if (loanAcctInfo.payFrozenStus !== '0') {
    // 还款处理中
    this.$router.replace('/repay/repayDeal')
    /**
     * 用户借还款状态
     * userStatus: 0借款 1还款
     */
    this.$store.commit('userStatusSave', 1)
    if (deviceType === 'android') {
      // setLoanStatus(int) 借还款状态: 0借款 1还款
      app.setLoanStatus(1)
    }
    return
  }

  // 临时冻结额度
  if (loanAcctInfo.tempFrozenAmt > 0) {
    // 借款处理中
    this.$router.replace('/loanDeal')
    this.$store.commit('userStatusSave', 0)
    if (deviceType === 'android') {
      // setLoanStatus(int) 借还款状态: 0借款 1还款
      app.setLoanStatus(0)
    }
    return
  }

  // 逾期状态 1逾期 2正常
  if (loanAcctInfo.overdueStatus === 1) {
    this.$router.replace('/repay/overdueRepay')
    this.$store.commit('userStatusSave', 1)
    if (deviceType === 'android') {
      // setLoanStatus(int) 借还款状态: 0借款 1还款
      app.setLoanStatus(1)
    }
    return
  }

  // 实际欠款合计
  if (loanAcctInfo.totalLoanAmt > 0) {
    this.$router.replace('/repay')
    this.$store.commit('userStatusSave', 1)
    if (deviceType === 'android') {
      // setLoanStatus(int) 借还款状态: 0借款 1还款
      app.setLoanStatus(1)
    }
    return
  }

  // 额度状态
  if (loanAcctInfo.creLineStus === '90') {
    this.$store.commit('userStatusSave', 0)
    if (deviceType === 'android') {
      // setLoanStatus(int) 借还款状态: 0借款 1还款
      app.setLoanStatus(0)
    }
    this.$router.replace('/inactivated')
    return
  }

  this.$router.replace('/')
  this.$store.commit('userStatusSave', 0)
  if (deviceType === 'android') {
    // setLoanStatus(int) 借还款状态: 0借款 1还款
    app.setLoanStatus(0)
  }
}

// 获取账户汇总信息
let getLoanInfoNum = 0
Vue.prototype.getLoanInfo = function() {
  getLoanInfoNum++
  console.log('获取账户汇总信息第 ' + getLoanInfoNum + ' 次')
  this.loading()

  let that = this
  let commonParams = store.state.common.commonParams
  let ua = commonParams.ua
  let call = 'Loan.loanAcctInfo'
  let timestamp = new Date().getTime()

  this.getSign(call, timestamp).then(sign => {
    let paramString = JSON.stringify({
      ua: ua,
      call: call,
      args: {
        customerId: commonParams.args.customerId,
        mobileNo: commonParams.args.mobileNo,
        token: commonParams.args.token,
        loanAcctNo: commonParams.args.loanAcctNo
      },
      sign: sign,
      timestamp: timestamp
    })
    console.log(paramString)

    that.$http.post(store.state.common.api, paramString).then(res => {
      let data = res.data
      if (data.returnCode === '000000') {
        that.closeLoading()

        let loanAcctInfo = data.response
        that.$store.commit('loan_max_save', loanAcctInfo.baseTotCreLine)
        that.$store.commit('loan_limit_save', loanAcctInfo.baseTotCreLine)
        // 缓存汇总信息
        that.$store.commit('summaryInfoSave', loanAcctInfo)
        that.checkSummaryInfo()
      } else {
        if (getLoanInfoNum < 10) {
          that.getLoanInfo()
        }
      }
    }).catch(err => {
      console.log(err)
      // let toastInstance = store.state.common.toastInstance
      // toastInstance.close()

      if (getLoanInfoNum < 10) {
        that.getLoanInfo()
      }
    })
  })
}

// 重新获取账户汇总信息
Vue.prototype.reGetLoanAcctInfo = function() {
  this.loading()

  let that = this
  let commonParams = this.$store.state.common.commonParams
  let ua = commonParams.ua
  let call = 'Loan.loanAcctInfo'
  let timestamp = new Date().getTime()

  this.getSign(call, timestamp).then(sign => {
    let paramString = JSON.stringify({
      ua: ua,
      call: call,
      args: {
        customerId: commonParams.args.customerId,
        mobileNo: commonParams.args.mobileNo,
        token: commonParams.args.token,
        loanAcctNo: commonParams.args.loanAcctNo
      },
      sign: sign,
      timestamp: timestamp
    })
    console.log(paramString)

    that.$http.post(store.state.common.api, paramString).then(res => {
      that.closeLoading()

      let data = res.data
      if (data.returnCode === '000000') {
        let loanAcctInfo = data.response
        that.$store.commit('loan_max_save', loanAcctInfo.baseTotCreLine)
        that.$store.commit('loan_limit_save', loanAcctInfo.baseTotCreLine)
        // 缓存汇总信息
        that.$store.commit('summaryInfoSave', loanAcctInfo)
        that.checkSummaryInfo()
      } else {
        that.toast(data.returnMsg)
      }
    }).catch(err => {
      console.log(err)
    })
  })
}
// init 正式
Vue.prototype.init = function() {
  let that = this

  let deviceType = this.$store.state.common.deviceType
  if (deviceType === 'android') {
    let userData = app.userData()
    userData = JSON.parse(userData)
    // console.log('Android 获取用户基本信息4个字段')
    // console.log(userData)

    if (userData.loanAcctNo && userData.mobileNo && userData.token && userData.customerId) {
      store.commit('commonParamsSave', {
        ua: 'KHW_H5_SIGN',
        args: userData
      })

      this.getLoanInfo()
    }
  } else if (deviceType === 'iphone') {
    if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined) {
      try {
        window.webkit.messageHandlers.getDataNotifition.postMessage('')

        window.activeMethodIos = function(loanAcctNo, mobileNo, token, customerId) {
          let userData = {
            loanAcctNo: loanAcctNo,
            mobileNo: mobileNo,
            token: token,
            customerId: customerId
          }
          console.log('ios userData')
          console.log(userData)

          if (loanAcctNo && mobileNo && token && customerId) {
            store.commit('commonParamsSave', {
              ua: 'KHW_H5_SIGN',
              args: userData
            })

            that.getLoanInfo()
          }
        }
      } catch (err) {
        console.log(err)
      }
    } else if (window.jsInterface !== undefined) {
      try {
        /* eslint-disable no-labels */
        javascript:jsInterface.getDataNotifition()
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('调用ios或android接口失败！')
    }
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  created() {
    this.init()
  }
})

Vue.filter('dateformat', function(value) {
  let tmp = value.split(' ')[0]
  return tmp.split('-').join('/')
  // return tmp.replace(/(\d{4})(\d{2})(\d{2})/g, '$1/$2/$3')
})
Vue.filter('datepoint', function(value) {
  let tmp = value.split(' ')[0]
  // return tmp.split('-').join('/')
  return tmp.replace(/(\d{4})(\d{2})(\d{2})/g, '$1.$2.$3')
})
