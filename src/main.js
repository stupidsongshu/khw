// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'
import md5 from 'blueimp-md5'
// import qs from 'qs'
import MintUI, {Indicator} from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'normalize.css'
import './assets/css/common.css'
import './assets/css/base.styl'
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.prototype.$http = axios

Vue.prototype.goHome = function() {
  this.$router.push('/')
}

/* eslint-disable no-undef */
// Vue.prototype.app = app
/**
 * 检查申请资格认证状态并存储
 * @return false未通过
 * @return true 已通过
 */
// app.IdcardCallBack = function(json) {
//   json = JSON.parse(json)
//   if (json.Step === 811 && json.Result === 0) {
//     // 申请资格认证状态 已通过
//     store.commit('applyQualificationAuthStatusSave', true)
//     store.commit('idFrontShowSave', 3)
//     store.commit('idBackShowSave', 3)
//   } else if (json.Step === 811 && json.Result !== 0) {
//     // 申请资格认证状态 未通过
//     store.commit('applyQualificationAuthStatusSave', false)
//     store.commit('idFrontShowSave', 2)
//     store.commit('idBackShowSave', 2)
//     Toast({
//       message: '申请资格认证未通过',
//       duration: 3000
//     })
//   }
// }

// app.ShowView = function() {
//   let el = store.state.common.toggleView.target
//   if (store.state.common.toggleView.status && el.length > 0) {
//     for (var i = 0; i < el.length; i++) {
//       el[i].style.display = 'block'
//     }
//     store.commit('toggleViewSave', {
//       status: false,
//       target: []
//     })
//   }
// }
app.back = function() {
  router.push()
  window.history.go(-1)
  let loginInfo = JSON.parse(this.isLogin())
  if (loginInfo.Step === 0 && loginInfo.Result === 0) { // 已登录
    // alert('已登录')
  } else if (loginInfo.Step === 0 && loginInfo.Result !== 0) { // 未登录
    // alert('未登录')
    // Vue.prototype.goHome = function() {
    //   console.log(this)
    // }
  }
}
Vue.prototype.goback = function() {
  this.$router.go(-1)
}

Vue.prototype.loading = function(txt) {
  Indicator.open({
    text: txt,
    spinnerType: 'fading-circle'
  })
}
Vue.prototype.closeLoading = function() {
  Indicator.close()
}

window.addEventListener('resize', function() {
  // alert(1)
  if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
    // alert(2)
    window.setTimeout(function() {
      // alert(3)
      document.activeElement.scrollIntoViewIfNeeded()
    }, 0)
  }
})

// 用户申请状态
// Vue.prototype.applystatus = function() {
//   let that = this
//   let loginInfo = JSON.parse(this.app.isLogin())
//   // console.log(loginInfo)
//   if (loginInfo.Step === 0 && loginInfo.Result !== 0) { // 未登录
//     this.$router.push('/login')
//   } else if (loginInfo.Step === 0 && loginInfo.Result === 0) { // 已登录
//     this.loading()
//
//     // 查询用户申请状态
//     this.app.AppStatus()
//     this.app.AppStatusCallBack = function(json) {
//       that.closeLoading()
//       json = JSON.parse(json)
//       console.log(json)
//       /**
//        * Result
//        * 0  缺少信息
//        [
//        {822,"身份证信息"},
//        {823,"身份证正面照片"},
//        {824,"身份证反面照片"},
//        {825,"活体照片"},
//        {826,"签约视频"},
//        {827,"信用卡"},
//        {828,"联系人信息"},
//        {829,"基本信息"},
//        {830,"银行卡信息"},
//        ]
//        * 100  申请开户
//        * 101  正在审核
//        * 102  审核通过
//        * 109  审核拒绝
//        * 121  调查问卷
//        */
//       if (json.Step === 35 && json.Result === 0) {
//         /* eslint-disable no-unused-vars */
//         var sign, msg
//         let requires = JSON.parse(json.Msg)
//
//         if (requires.length === 0) {
//           that.$router.push('/personalCertificate/agreeAuth')
//         } else if (requires.length > 0) {
//           for (let [k, v] of Object.entries(requires[0])) {
//             sign = k
//             msg = v
//           }
//           // console.log(sign, msg)
//           // Toast({
//           //   message: '请提交' + msg,
//           //   duration: 3000
//           // })
//
//           that.$store.commit('signSave', parseInt(sign))
//
//           if (parseInt(sign) === 822) {
//             // 申请资格认证未通过
//             that.$store.commit('applyQualificationAuthStatusSave', false)
//             that.$store.commit('applyQualificationAuthStatusSave', false)
//             that.$store.commit('idFrontApplyQualificationAuthStepSave', 8111)
//             that.$store.commit('idBackApplyQualificationAuthStepSave', 8111)
//           } else if (parseInt(sign) >= 825) {
//             // 申请资格认证已通过
//             that.$store.commit('applyQualificationAuthStatusSave', true)
//             that.$store.commit('idFrontApplyQualificationAuthStepSave', 8110)
//             that.$store.commit('idBackApplyQualificationAuthStepSave', 8110)
//           }
//           switch (sign) {
//             case '822':
//               // 身份证信息
//               that.$store.commit('personalCertificateSwiperProgressSave', 1)
//               that.$router.push('/personalCertificate')
//               break
//             case '823':
//               // 身份证正面照片
//               that.$store.commit('personalCertificateSwiperProgressSave', 1)
//               that.$router.push('/personalCertificate')
//               break
//             case '824':
//               // 身份证反面照片
//               that.$store.commit('personalCertificateSwiperProgressSave', 1)
//               that.$router.push('/personalCertificate')
//               break
//             case '825':
//               // 活体照片
//               that.$store.commit('personalCertificateSwiperProgressSave', 1)
//               that.$router.push('/personalCertificate/faceRecognition')
//               break
//             case '826':
//               // 签约视频
//               that.$router.push('/personalCertificate/videoAuth')
//               that.$store.commit('personalCertificateSwiperProgressSave', 5)
//               break
//             case '827':
//               // 信用卡
//               that.$router.push('/personalCertificate/agreeAuth')
//               break
//             case '828':
//               // 联系人信息
//               that.$router.push('/personalCertificate/linkman')
//               that.$store.commit('personalCertificateSwiperProgressSave', 4)
//               break
//             case '829':
//               // 基本信息
//               that.$router.push('/personalCertificate/baseInfo')
//               that.$store.commit('personalCertificateSwiperProgressSave', 3)
//               break
//             case '830':
//               // 银行卡信息-借记卡
//               that.$router.push('/personalCertificate/bankCardInfo')
//               that.$store.commit('personalCertificateSwiperProgressSave', 2)
//               break
//           }
//         }
//       } else if (json.Step === 35 && json.Result === 100) {
//         // 申请开户
//         that.$store.commit('waitAuditStatusSave', 0)
//         that.$router.push('/personalCertificate/waitAudit')
//         // that.$router.push('/personalCertificate')
//       } else if (json.Step === 35 && json.Result === 101) {
//         // 正在审核
//         that.$store.commit('waitAuditStatusSave', 0)
//         that.$router.push('/personalCertificate/waitAudit')
//       } else if (json.Step === 35 && json.Result === 102) {
//         // 审核通过
//         that.$store.commit('waitAuditStatusSave', 2)
//         that.$router.push('/personalCertificate/waitAudit')
//       } else if (json.Step === 35 && json.Result === 109) {
//         // 审核拒绝
//         that.$store.commit('waitAuditStatusSave', 1)
//         that.$router.push('/personalCertificate/waitAudit')
//       } else if (json.Step === 35 && json.Result === 121) {
//         // 调查问卷
//         that.$store.commit('waitAuditStatusSave', 3)
//         // that.$router.push('/personalCertificate/waitAudit')
//       }
//     }
//   }
// }

// 汇总信息
Vue.prototype.summerInfo = function() {
  /* eslint-disable no-unreachable */
  console.log(this.$http)
  let that = this
  this.$http.post('/khw/c/l?mobileNo=13786868686').then(res => {
    if (res.data.returnCode === '000000') {
      let data = res.data.response
      // console.log(data)
      alert(0)
      let ua = 'KHW_H5_SIGN'
      let call = 'Loan.loanAcctInfo'
      let timestamp = new Date().getTime()
      let signKey = '68352e6b616875616e77616e672e636f6d'
      let sign = md5(ua + '&' + call + '&' + timestamp + '&' + signKey)
      let args = {
        customerId: data.customerId,
        loanAcctNo: data.loanAcctNo,
        mobileNo: data.mobileNo,
        token: data.token
      }
      store.commit('commonParamsSave', {
        ua: ua,
        // call: call,
        args: args,
        sign: sign,
        timestamp: timestamp
      })
      alert(1)
      // 账户汇总信息查询
      let commonParams = that.$store.state.common.commonParams
      let st = JSON.stringify({
        ua: commonParams.ua,
        call: 'Loan.loanAcctInfo',
        args: {
          customerId: commonParams.args.customerId,
          mobileNo: commonParams.args.mobileNo,
          token: commonParams.args.token,
          loanAcctNo: commonParams.args.loanAcctNo
        },
        sign: commonParams.sign,
        timestamp: commonParams.timestamp
      })
      alert(2)
      that.$http.post('/khw/c/h', st).then(res => {
        if (res.data.returnCode === '000000') {
          let data = res.data.response
          console.log(data)
          /**
           * @param: overdueStatus 逾期状态
           * @param: ovdDayCnt 逾期天数
           * @param: minReturnAmount 解除逾期状态所需偿还金额
           * @param: totalLoanAmt 实际欠款合计
           * @param: tempFrozenAmt 临时冻结额度
           * @param: payFrozenStus 账户还款中冻结状态
           * @return:
           */
          // 逾期状态
          if (data.overdueStatus === 2) {
            // 实际欠款合计
            if (data.totalLoanAmt === 0) {
              // 临时冻结额度
              if (data.tempFrozenAmt === 0) {
                // 账户还款中冻结状态
                if (data.payFrozenStus === '0') {
                  alert(3)
                  that.$router.push('/')
                  that.$store.commit('baseTotCreLineSave', data.baseTotCreLine)
                }
              }
            }
          }
        }
      }).catch(error => {
        console.log(error)
      })
      alert(4)
    }
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  created() {
    axios.defaults.baseURL = 'http://xfjr.ledaikuan.cn:9191'
    axios.interceptors.request.use((config) => {
      // Indicator.open({
      //   text: '加载中...',
      //   spinnerType: 'fading-circle'
      // })
      if (config.method.toLowerCase() === 'post') {
        // config.data = qs.stringify(config.data)
      }
      return config
    }, function(error) {
      return Promise.reject(error)
    })
    axios.interceptors.response.use(function(response) {
      // Indicator.close()
      return response
    }, function(error) {
      return Promise.reject(error)
    })

    this.summerInfo()
  }
})
