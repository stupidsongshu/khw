import store from './store/index'

function getDataFromIos() {
  let deviceType = store.state.common.deviceType
  if (deviceType === 'iphone') {
    if (window.webkit !== undefined && window.webkit.messageHandlers !== undefined) {
      try {
        console.log('window.webkit.messageHandlers')
        window.webkit.messageHandlers.getDataNotifition.postMessage()
        console.log('window.webkit.messageHandlers.getDataNotifition')

        // window.activeMethodIos = function(loanAcctNo, mobileNo, token, customerId) {
        //   console.log('loanAcctNo: ' + loanAcctNo)
        //   console.log('mobileNo: ' + mobileNo)
        //   console.log('token: ' + token)
        //   console.log('customerId: ' + customerId)
        //   let deviceType = store.state.common.deviceType
        //   if (deviceType === 'iphone') {
        //     store.commit('commonParamsSave', {
        //       ua: 'KHW_H5_SIGN',
        //       args: {
        //         loanAcctNo: loanAcctNo,
        //         mobileNo: mobileNo,
        //         token: token,
        //         customerId: customerId
        //       }
        //     })
        //   }
        // }
      } catch (err) {
        console.log('error:' + err)
      }
    }
  }
}

export default getDataFromIos
