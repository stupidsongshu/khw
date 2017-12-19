<template>
  <div class="loan-deal">
    <mt-header fixed class="header" title="卡还王"></mt-header>

    <div class="deal-banner">
      <div class="status" v-show="status === 0">提交成功</div>
      <div class="status" v-show="status === 1">银行处理中</div>
      <div class="status" v-show="status === 2">借款成功</div>
      <!--<div class="loan-amount">
        <span class="icon-money"></span>{{payAmtInt}}.<span class="decimals">{{payAmtFlo}}</span>
      </div>-->

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
            <div class="step-desc">借款成功</div>
          </li>
        </ul>
      </div>
    </div>

    <!--<div class="loan-desc">
      <ul>
        <li class="item clearfix">
          <div class="pull-left name">还款期限</div>
          <div class="pull-left value">{{repayDuration}}个月</div>
        </li>
        <li class="item clearfix">
          <div class="pull-left name">日利率</div>
          <div class="pull-left value">{{nowDayRate}}%<span class="calc-rate"></span></div>
        </li>
        <li class="item clearfix">
          <div class="pull-left name">共计应还</div>
          <div class="pull-left value">{{payOffAmt / 100}}元</div>
        </li>
      </ul>
    </div>-->

    <!--<div class="hint" v-if="status === 2">
      款项已打至您的{{decardOpenBank}}(尾号{{debitCardNo}})账户<br>
      具体到账时间以银行为准
    </div>-->

    <div class="loan-btn count-down" v-show="status > 1">
      <mt-button class="btn">{{restTime}}s后返回</mt-button>
    </div>

    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      :modal="true"
      :closeOnClickModal="false">
      <div class="deal-success">
        <img class="deal-success-gif" src="../../assets/img/deal-success-loan.gif" alt="">
        <div class="deal-success-txt">您的钱款正在处理哦~请耐心等待</div>
      </div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        popupVisible: false,
        // 借款处理状态 0提交成功 1银行处理中 2借款成功 3借款失败
        status: 0,
        // 借款提交成功、处理中时间
        // transTime: '',
        // 借款成功时间
        // transTimeS: '',
        // 借款额度
        // payAmt: 0,
        // 借款额度整数部分
        // payAmtInt: 0,
        // 借款额度小数部分
        // payAmtFlo: 0,
        // 还款总额
        // payOffAmt: 0,
        // 是否刷新接口
        isRefresh: true,
        // 还款期限
        // repayDuration: 0,
        // 日利率
        // nowDayRate: 0,
        // 借记卡开户行
        // decardOpenBank: '',
        // 借记卡号
        // debitCardNo: '',
        restTime: 5
      }
    },
    created() {
      // this.repayDuration = this.$store.state.loan.loan_duration
      // let summaryInfo = this.$store.state.common.summaryInfo
      // this.nowDayRate = summaryInfo.nowDayRate
      // this.decardOpenBank = summaryInfo.decardOpenBank
      // this.debitCardNo = summaryInfo.debitCardNo.substring(summaryInfo.debitCardNo.length - 4)

      // 单笔用款明细查询
      // let commonParams = this.$store.state.common.commonParams
      // let ua = commonParams.ua
      // let call = 'Loan.cashExtractDetail'
      // let timestamp = new Date().getTime()
      // let sign = this.sign(ua, call, timestamp)
      // let paramString = JSON.stringify({
      //   ua: ua,
      //   call: call,
      //   args: {
      //     customerId: commonParams.args.customerId,
      //     mobileNo: commonParams.args.mobileNo,
      //     token: commonParams.args.token,
      //     loanAcctNo: commonParams.args.loanAcctNo
      //   },
      //   sign: sign,
      //   timestamp: timestamp
      // })
      //
      // this.$http.post('/khw/c/h', paramString).then(res => {
      //   let data = res.data
      //   if (data.returnCode === '000000') {
      //     console.log(data.response)
      //     let dataS = data.response
      //
      //     this.payOffAmt = dataS.payOffAmt
      //     this.payAmt = dataS.payAmt
      //
      //     let payAmtStr = dataS.payAmt.toString()
      //     this.payAmtInt = payAmtStr.substring(0, payAmtStr.length - 2)
      //     this.payAmtFlo = payAmtStr.substring(payAmtStr.length - 2)
      //   }
      // })

      //
      this.checkLoanDeal()

      let that = this
      let timer = setInterval(function() {
        that.checkLoanDeal()

        if (!that.isRefresh) {
          clearInterval(timer)
        }
      }, 3000)
    },
    methods: {
      checkLoanDeal() {
        let that = this

        let cashExtract = this.$store.state.common.cashExtract
        console.log(cashExtract.amount, cashExtract.merchantOrderId)

        let commonParams = this.$store.state.common.commonParams
        let ua = commonParams.ua
        let call = 'Loan.singleTrans'
        let timestamp = new Date().getTime()
        let sign = this.sign(ua, call, timestamp)
        let paramString = JSON.stringify({
          ua: ua,
          call: call,
          args: {
            customerId: commonParams.args.customerId,
            mobileNo: commonParams.args.mobileNo,
            token: commonParams.args.token,
            loanAcctNo: commonParams.args.loanAcctNo,
            // 单笔交易金额(交易后服务器返回)
            returnAmt: cashExtract.amount,
            // 单笔交易订单号(交易后服务器返回)
            oriMerchantOrderId: cashExtract.merchantOrderId
            // 单笔交易交易时间(交易后服务器返回)
            // oriPayTime:
          },
          sign: sign,
          timestamp: timestamp
        })

        // this.loading()
        this.$http.post('/khw/c/h', paramString).then(res => {
          // this.closeLoading()
          that.popupVisible = true
          let data = res.data
          if (data.returnCode === '000000') {
            let res = data.response
            console.log(res)
            // transStus 0成功 1失败 2处理中 9订单不存在
            if (res.transStus === 0) {
              this.status = 2
              // this.transTimeS = res.transTime
              this.toast('借款成功')
            } else if (res.transStus === 1) {
              this.status = 3
              this.toast('借款失败，请稍后重试')
              this.$router.push('/khw')
            } else if (res.transStus === 2) {
              this.status = 1
            } else if (res.transStus === 9) {
              this.toast('订单不存在')
            }

            // 返回处理结果后
            if (res.transStus !== 2) {
              that.popupVisible = false
              that.isRefresh = false
              that.updateLoanAcctInfo()
            }
          }
        })
      },
      // 更新账户汇总信息
      updateLoanAcctInfo() {
        let that = this
        // 账户汇总信息查询
        let commonParams = that.$store.state.common.commonParams
        let ua = commonParams.ua
        let call = 'Loan.loanAcctInfo'
        let timestamp = new Date().getTime()
        let sign = that.sign(ua, call, timestamp)
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

        that.$http.post('/khw/c/h', paramString).then(res => {
          let data = res.data
          if (data.returnCode === '000000') {
            let loanAcctInfo = data.response
            // 缓存汇总信息
            that.$store.commit('summaryInfoSave', loanAcctInfo)
            // 5秒倒计时
            let timer = setInterval(function() {
              that.restTime --
              if (that.restTime === 0) {
                clearInterval(timer)
                that.restTime = 5
                that.checkSummaryInfo()
              }
            }, 1000)
          } else {
            // Toast({
            //   message: data.returnMsg,
            //   duration: 3000
            // })
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'
  @import '../../assets/css/loanReapyDeal.styl'

  .loan-deal
    padding: 12px 15px

    /*.loan-desc
      padding-top: 29px
      padding-left: 39px
      .item
        line-height: 30px
        font-size: 15px
        .name
          width: 110px
          color: #666
        .value
          color: #333
          .calc-rate
            display: inline-block
            width: 14px
            height: 16px
            margin-left: 15px
            vertical-align: -3px
            background-image: url("../../assets/img/icon_rate.png")
            background-size: 100% 100%
        .loan-plan
          display: inline-block
          color: main-color
          .icon-plan
            display: inline-block
            width: 17px
            height: 17px
            margin-right: 4px
            vertical-align: -3px
            background-image: url("../../assets/img/icon_plan.png")
            background-size: 100% 100%

    .hint
      margin: 59px 0 48px 0
      line-height: 20px
      text-align: center
      color: #999
      font-size: 12px

    .back-btn
      width: 100%
      height: 45px
      color: #fff
      background-color: #999*/
</style>
