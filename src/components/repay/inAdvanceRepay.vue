<template>
  <div class="loanRepayDesc">
    <mt-header fixed class="header" title="提前还款">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="banner">
      <div class="title">当前应还</div>
      <div class="amount">
        <span class="icon-money"></span> {{realTotalAmountInt}}.<span class="decimals">{{realTotalAmountFlo}}</span>
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
        <div class="value">{{intTot / 100}}元 <router-link to="/rate" class="calc-rate"></router-link></div>
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
        <div class="name">提前还款违约金</div>
        <div class="value">{{realLiquidatedDamages / 100}}元</div>
      </div>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="inAdvanceRepayBtn">立即还款</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        // 单笔结清还款金额
        realTotalAmountInt: 0,
        realTotalAmountFlo: 0,
        transTime: '',
        // 本金
        payAmt: 0,
        // 利息
        intTot: 0,
        // 借记卡卡号
        debitCardNo: '',
        // 开户行
        decardOpenBank: '',
        // 全额结清实际应还违约金（提前还款手续费）
        realLiquidatedDamages: 0
      }
    },
    created() {
      let summaryInfo = this.$store.state.common.summaryInfo
      console.log(summaryInfo)
      this.debitCardNo = summaryInfo.debitCardNo.substring(summaryInfo.debitCardNo.length - 4)
      this.decardOpenBank = summaryInfo.decardOpenBank
      this.realLiquidatedDamages = summaryInfo.realLiquidatedDamages
      // 当前应还 = 本金 + 利息 + 违约金 (注意:若逾期需加上滞纳费)
      let realTotalAmount = summaryInfo.realTotalAmount.toString()
      this.realTotalAmountInt = realTotalAmount.substring(0, realTotalAmount.length - 2)
      this.realTotalAmountFlo = realTotalAmount.substring(realTotalAmount.length - 2)

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
          this.transTime = data.response.transTime
          this.payAmt = data.response.payAmt
          this.intTot = data.response.intTot
        }
      })
    },
    methods: {
      back() {
        this.goback()
      },
      inAdvanceRepayBtn() {
        let summaryInfo = this.$store.state.common.summaryInfo
        let commonParams = this.$store.state.common.commonParams
        let ua = commonParams.ua
        let call = 'Loan.cashRepay'
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
            returnType: 4,
            // 还款金额
            amount: summaryInfo.realTotalAmount
          },
          sign: sign,
          timestamp: timestamp
        })

        // this.loading()
        this.$http.post('/khw/c/h', paramString).then(res => {
          // this.closeLoading()
          let data = res.data
          if (data.returnCode === '000000') {
            console.log(data.response)
            // 缓存汇总信息
            this.$store.commit('summaryInfoSave', data.response.loanAcctInfo)
            this.$store.commit('cashRepaySave', data.response.cashRepay)
            this.checkSummaryInfo()
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/loanRepay.styl'
</style>
