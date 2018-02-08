<template>
  <div class="repay-deal">
    <mt-header fixed class="header" title="还款"></mt-header>

    <div class="deal-banner">
      <div class="status" v-if="status === 0">提交成功</div>
      <div class="status" v-if="status === 1">银行处理中</div>
      <div class="status">
        <span v-if="status === 2">还款成功</span>
        <span v-if="status === 3">还款失败</span>
      </div>

      <div class="step">
        <ul class="step-progress">
          <li class="step-content" :class="{active: status >= 0}">
            <div class="step-icon icon1"></div>
            <div class="step-line"></div>
            <div class="step-desc">提交成功</div>
          </li>
          <li class="step-content" :class="{active: status >= 1}">
            <div class="step-icon icon2"></div>
            <div class="step-line"></div>
            <div class="step-desc">银行处理中</div>
          </li>
          <li class="step-content" :class="{active: status >= 2}">
            <div class="step-icon icon3"></div>
            <div class="step-line"></div>
            <div class="step-desc">
              <span v-if="status <= 2">还款成功</span>
              <span v-if="status === 3">还款失败</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="loan-btn count-down" v-if="status > 1" @click="checkLoanAcctInfo">
      <mt-button class="btn">{{restTime}}s后返回</mt-button>
    </div>

    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      :modal="true"
      :closeOnClickModal="false">
      <div class="deal-success">
        <img class="deal-success-repay-gif" src="../../assets/img/deal-success-repay.gif" alt="">
        <div class="deal-success-txt">您的还款正在处理哦~请耐心等待</div>
      </div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  // import step from './../common/step'

  export default {
    // components: {
    //   step
    // },
    data() {
      return {
        popupVisible: false,
        // 还款处理状态 0提交成功 1银行处理中 2还款成功 3还款失败
        status: 0,
        // 是否刷新接口
        isRefresh: true,
        restTime: 5
      }
    },
    created() {
      this.checkRepayDeal()

      let that = this
      let timer = setInterval(function() {
        that.checkRepayDeal()

        if (!that.isRefresh) {
          clearInterval(timer)
        }
      }, 3000)

      window.onresize = function() {
        console.log('onresize')
      }
    },
    methods: {
      // 更新还款处理结果状态
      updateRepayDealStatus() {
        let that = this

        let cashRepay = this.$store.state.common.cashRepay

        let commonParams = this.$store.state.common.commonParams
        let ua = commonParams.ua
        let call = 'Loan.singleTrans'
        let timestamp = new Date().getTime()
        this.getSign(call, timestamp).then(sign => {
          let paramString = JSON.stringify({
            ua: ua,
            call: call,
            args: {
              customerId: commonParams.args.customerId,
              mobileNo: commonParams.args.mobileNo,
              token: commonParams.args.token,
              loanAcctNo: commonParams.args.loanAcctNo,
              // 单笔交易金额(交易后服务器返回)
              returnAmt: cashRepay.amount,
              // 单笔交易订单号(交易后服务器返回)
              oriMerchantOrderId: cashRepay.merchantOrderId
              // 单笔交易交易时间(交易后服务器返回)
              // oriPayTime:
            },
            sign: sign,
            timestamp: timestamp
          })

          that.$http.post(that.$store.state.common.api, paramString).then(res => {
            let data = res.data
            if (data.returnCode === '000000') {
              let res = data.response
              console.log(res)
              // transStus 0成功 1失败 2处理中 9订单不存在
              if (res.transStus === 0) {
                that.status = 2
                that.toast('还款成功', 3000)
              } else if (res.transStus === 1) {
                that.status = 3
                that.toast('还款失败，请确保卡内余额是否充足', 3000)
              } else if (res.transStus === 2) {
                that.status = 1
              } else if (res.transStus === 9) {
                that.status = 3
                that.toast('订单不存在', 3000)
              }

              // 返回处理结果后
              if (res.transStus !== 2) {
                that.popupVisible = false
                that.isRefresh = false
                that.updateLoanAcctInfo()
              }
            } else {
              that.popupVisible = false
              that.toast(data.returnMsg, 3000)
            }
          }).catch(err => {
            console.log(err)
          })
        })
      },
      // 更新账户汇总信息
      updateLoanAcctInfo() {
        let that = this

        let cashRepay = this.$store.state.common.cashRepay
        // 账户汇总信息查询
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

          that.$http.post(that.$store.state.common.api, paramString).then(res => {
            let data = res.data
            if (data.returnCode === '000000') {
              let loanAcctInfo = data.response
              // 更新汇总信息
              that.$store.commit('summaryInfoSave', loanAcctInfo)

              if (cashRepay.amount && cashRepay.merchantOrderId) { // 正常情况(有单笔交易信息)
                // 5秒倒计时
                let timer = setInterval(function() {
                  that.restTime --
                  if (that.restTime <= 1) {
                    clearInterval(timer)
                    that.checkSummaryInfo()
                    that.restTime = 5
                  }
                }, 1000)
              } else { // 异常情况(借款处理中未出结果重新进入，无单笔交易信息)
                // 账户还款中冻结状态为0时，停止请求并关闭动画
                if (loanAcctInfo.payFrozenStus === '0') {
                  that.isRefresh = false
                  that.popupVisible = false
                }
                that.checkSummaryInfo()
              }
            } else {
              that.toast(data.returnMsg)
            }
          }).catch(err => {
            console.log(err)
          })
        })
      },
      checkRepayDeal() {
        // fix ios 底部tab空白
        var timer = setTimeout(() => {
          this.popupVisible = true
          clearTimeout(timer)
        }, 100)

        let cashRepay = this.$store.state.common.cashRepay
        console.log(cashRepay.amount, cashRepay.merchantOrderId)

        if (cashRepay.amount && cashRepay.merchantOrderId) {
          // 正常情况(有单笔交易信息): 不断更新单笔交易结果接口(Loan.singleTrans)
          this.updateRepayDealStatus()
        } else {
          // 异常情况(无单笔交易信息): 不断更新账户汇总信息(Loan.loanAcctInfo)
          this.updateLoanAcctInfo()
        }
      },
      // fix 倒计时失效
      checkLoanAcctInfo() {
        // this.checkSummaryInfo()
        this.reGetLoanAcctInfo()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/loanReapyDeal.styl'

  .repay-deal
    width: 100%
    height: 100%
    padding: 12px 15px
</style>
