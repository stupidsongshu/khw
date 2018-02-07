import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../store'
import { Toast } from 'mint-ui'

// 借款
import Khw from '@/components/loan/khw'
import Loan from '@/components/loan/loan'
import LoanDeal from '@/components/loan/loanDeal'
import Inactivated from '@/components/loan/inactivated'
// 还款
import Repay from '@/components/repay/repay'
import OnTimeRepay from '@/components/repay/onTimeRepay'
import OverdueRepay from '@/components/repay/overdueRepay'
import InAdvanceRepay from '@/components/repay/inAdvanceRepay'
import InAdvanceRepayCurrent from '@/components/repay/inAdvanceRepayCurrent'
import RepayDeal from '@/components/repay/repayDeal'
// 文档 包括费用说明、各种协议
import Rate from '@/components/document/rate'

Vue.use(VueRouter)

const routes = [
  // 借款
  {
    path: '/',
    name: 'khw',
    component: Khw,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/loan',
    name: 'loan',
    component: Loan,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/loanDeal',
    name: 'loanDeal',
    component: LoanDeal,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/inactivated',
    name: 'inactivated',
    component: Inactivated,
    meta: {
      keepAlive: true
    }
  },
  // 还款
  {
    path: '/repay',
    name: 'repay',
    component: Repay,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/repay/onTimeRepay',
    name: 'onTimeRepay',
    component: OnTimeRepay,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/repay/overdueRepay',
    name: 'overdueRepay',
    component: OverdueRepay,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/repay/inAdvanceRepay',
    name: 'inAdvanceRepay',
    component: InAdvanceRepay,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/repay/inAdvanceRepayCurrent',
    name: 'inAdvanceRepayCurrent',
    component: InAdvanceRepayCurrent,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/repay/repayDeal',
    name: 'repayDeal',
    component: RepayDeal,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/rate',
    name: 'rate',
    component: Rate,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '*',
    redirect: '/',
    meta: {
      keepAlive: false
    }
  }
]
const router = new VueRouter({
  routes
})

/**
 * 检测设备类型
 */
let ua = window.navigator.userAgent
if (/iphone/gi.test(ua)) {
  console.log('iphone')
  store.commit('deviceTypeSave', 'iphone')
} else if (/android/gi.test(ua)) {
  console.log('android')
  store.commit('deviceTypeSave', 'android')
}

let deviceType = store.state.common.deviceType

// 网络监测
function getNetStatus() {
  return new Promise((resolve, reject) => {
    if (deviceType === 'android') {
      /* eslint-disable no-undef */
      let netStatus = app.isNet()
      // console.log('android网络监测: ' + netStatus)
      resolve(netStatus)
    } else if (deviceType === 'iphone') {
      if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined) {
        try {
          window.webkit.messageHandlers.getNetStatus.postMessage('')

          window.getNetStatusToWeb = function(netStatus) {
            // console.log('iphone网络监测：' + netStatus)
            resolve(netStatus)
          }
        } catch (err) {
          console.log(err)
        }
      } else {
        console.log('调用ios接口失败！')
      }
    }
  })
}

router.beforeEach((to, from, next) => {
  /**
   * 底部tabbar显示隐藏
   */
  // let filterPaths = ['/', '/repay', '/my']
  // let bool = filterPaths.some((path) => {
  //   return to.path === path
  // })
  // if (bool) {
  //   store.commit('hasFooterSave', true)
  // } else {
  //   store.commit('hasFooterSave', false)
  // }

  getNetStatus().then(netStatus => {
    console.log('deviceType：' + deviceType, '; 网络监测：' + netStatus)
    // 注意：这里有个巨坑,android传过来的netStatus是boolean类型，但是ios传过来的netStatus是string类型
    if (deviceType === 'android') {
      if (!netStatus) {
        Toast({
          message: '请打开网络',
          duration: 800
        })

        next(false)
      } else {
        next()
      }
    } else if (deviceType === 'iphone') {
      if (netStatus === 'false') {
        Toast({
          message: '请打开网络',
          duration: 800
        })

        next(false)
      } else if (netStatus === 'true') {
        // fix ios footer只在贷后首页和还款页面显示
        if (deviceType === 'iphone') {
          if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined) {
            try {
              if (to.path === '/') {
                window.webkit.messageHandlers.footerShow.postMessage({
                  show: true,
                  // 用户借还款状态: 0借款 1还款
                  loanReapyStatus: 0
                })
              } else if (to.path === '/repay') {
                window.webkit.messageHandlers.footerShow.postMessage({
                  show: true,
                  // 用户借还款状态: 0借款 1还款
                  loanReapyStatus: 1
                })
              } else {
                window.webkit.messageHandlers.footerShow.postMessage({
                  show: false
                })
              }
            } catch (err) {
              console.log(err)
            }
          } else {
            console.log('调用ios接口失败！')
          }
        }

        next()
      }
    }
  })
})

export default router
