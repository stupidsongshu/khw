<template>
  <div class="loanRepayDesc">
    <mt-header fixed class="header" title="按期还款">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="banner">
      <div class="title">当前应还</div>
      <div class="amount">
        <span class="icon-money"></span> {{payOffAmtInt}}.<span class="decimals">{{payOffAmtFlo}}</span>
      </div>
      <div class="time">申请时间：{{transTime | dateformat}}</div>
    </div>

    <div class="desc">
      <div class="title">明细</div>
      <div class="item">
        <div class="name">本金</div>
        <div class="value">{{payAmt / 100}}</div>
      </div>
      <div class="item">
        <div class="name">当前利息</div>
        <div class="value">{{intTot}}元 <router-link to="/rate" class="calc-rate"></router-link></div>
      </div>
      <div class="item">
        <div class="name">还款借记卡</div>
        <div class="value">尾号{{debitCardNo}}</div>
      </div>
      <div class="item">
        <div class="name">开卡银行</div>
        <div class="value">{{decardOpenBank}}</div>
      </div>
      <div class="item">
        <div class="loan-plan" @click="showRepayPlan">
          <span class="icon-plan"></span>还款计划
        </div>
      </div>
    </div>

    <ul class="hint">
      <li>特别提示：</li>
      <li>1.还款日自动还款，请注意还款卡内的余额是否足额</li>
      <li>2.扣款一旦成功，不可申请撤诉</li>
    </ul>

    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom"
      modal="false"
      closeOnClickModal="false">
      <div class="loan-plan-nav">
        <div class="ensure-btn" @click="ensure">确定</div>
      </div>

      <loan-plan :overflowScroll="true" :loanPlanList="loanPlanList"></loan-plan>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import loanPlan from './../common/loanPlan'

  export default {
    components: {
      loanPlan
    },
    data() {
      return {
        popupVisible: false,
        // 单笔结清还款金额
        payOffAmt: 0,
        payOffAmtInt: 0,
        payOffAmtFlo: 0,
        transTime: '',
        // 本金
        payAmt: 0,
        // 利息
        intTot: 0,
        // 借记卡卡号
        debitCardNo: '',
        // 开户行
        decardOpenBank: '',
        // 中银交易订单号
        paygateOrderId: '',
        // 实际分期数
        realInstalPeriod: 0,
        // 还款计划
        loanPlanList: []
      }
    },
    created() {
      let summaryInfo = this.$store.state.common.summaryInfo
      this.debitCardNo = summaryInfo.debitCardNo.substring(summaryInfo.debitCardNo.length - 4)
      this.decardOpenBank = summaryInfo.decardOpenBank

      let commonParams = this.$store.state.common.commonParams
      let ua = commonParams.ua
      let call = 'Loan.cashExtractDetail'
      let timestamp = new Date().getTime()
      let sign = this.sign(ua, call, timestamp)
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

      this.$http.post('/khw/c/h', paramString).then(res => {
        let data = res.data
        if (data.returnCode === '000000') {
          console.log(data.response)
          let payOffAmtStr = data.response.payOffAmt.toString()
          this.payOffAmt = data.response.payOffAmt
          this.payOffAmtInt = payOffAmtStr.substring(0, payOffAmtStr.length - 2)
          this.payOffAmtFlo = payOffAmtStr.substring(payOffAmtStr.length - 2)
          this.transTime = data.response.transTime
          this.payAmt = data.response.payAmt
          this.intTot = data.response.intTot
          this.paygateOrderId = data.response.payGateOrderId
          this.realInstalPeriod = data.response.realInstalPeriod
        }
      })
    },
    methods: {
      back() {
        this.goback()
      },
      showRepayPlan() {
        let commonParams = this.$store.state.common.commonParams
        let ua = commonParams.ua
        let call = 'Loan.repayPlan'
        let timestamp = new Date().getTime()
        let sign = this.sign(ua, call, timestamp)
        let paramString = JSON.stringify({
          ua: ua,
          call: call,
          args: {
            customerId: commonParams.args.customerId,
            mobileNo: commonParams.args.mobileNo,
            token: commonParams.args.token,
            acctNo: commonParams.args.loanAcctNo,
            queryBegNum: 1,
            queryCnt: this.realInstalPeriod,
            dealFlg: 'B',
            paymentAmount: this.payOffAmt,
            installPeriod: this.realInstalPeriod,
            paygateOrderId: this.paygateOrderId
          },
          sign: sign,
          timestamp: timestamp
        })

        this.loading()
        this.$http.post('/khw/c/h', paramString).then(res => {
          this.closeLoading()
          let data = res.data
          if (data.returnCode === '000000') {
            this.popupVisible = true
            this.loanPlanList = data.response.list.splice(0, this.realInstalPeriod)
          }
        })
      },
      ensure() {
        this.popupVisible = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'
  @import '../../assets/css/loanRepay.styl'

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

  .loan-plan-nav
    display: flex
    justify-content: flex-end
    padding: 5px 15px 5px 0
    font-size: 14px
    .ensure-btn
      padding: 4px
      color: #fff
      border-radius: 4px
      background-color: main-color
</style>
