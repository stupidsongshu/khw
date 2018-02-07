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
        <div class="value">{{payAmt / 100}}元</div>
      </div>
      <div class="item">
        <div class="name">当前欠款</div>
        <div class="value">{{totalLoanAmt / 100}}元 <router-link to="/rate" class="calc-rate"></router-link></div>
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
      <mt-button class="btn" @click="inAdvanceRepayBtn" :disabled="disabledBtn">立即还款</mt-button>
    </div>

    <ul class="hint">
      <li>特别提示：</li>
      <li>1.提前还款请保证还款卡内余额充足</li>
      <li>2.还款日自动还款，请注意还款卡内的余额是否足额</li>
      <li>3.扣款一旦成功，不可申请撤销</li>
    </ul>
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
        // 当前欠款
        totalLoanAmt: 0,
        // 借记卡卡号
        debitCardNo: '',
        // 开户行
        decardOpenBank: '',
        // 全额结清实际应还违约金（提前还款手续费）
        realLiquidatedDamages: 0,
        disabledBtn: false
      }
    },
    created() {
      this.transTime = this.$store.state.loan.loan_applyTime

      let summaryInfo = this.$store.state.common.summaryInfo
      this.payAmt = summaryInfo.baseUsedCreLine
      this.totalLoanAmt = summaryInfo.totalLoanAmt
      this.debitCardNo = summaryInfo.debitCardNo.substring(summaryInfo.debitCardNo.length - 4)
      this.decardOpenBank = summaryInfo.decardOpenBank
      this.realLiquidatedDamages = summaryInfo.realLiquidatedDamages
      // 当前应还 = 本金 + 当前欠款 + 提前还款违约金 (注意:若逾期还需加上滞纳费)
      let realTotalAmount = summaryInfo.realTotalAmount.toString()
      this.realTotalAmountInt = realTotalAmount.substring(0, realTotalAmount.length - 2)
      this.realTotalAmountFlo = realTotalAmount.substring(realTotalAmount.length - 2)
    },
    methods: {
      back() {
        this.goback()
      },
      inAdvanceRepayBtn() {
        let that = this

        this.disabledBtn = true

        let summaryInfo = this.$store.state.common.summaryInfo
        let commonParams = this.$store.state.common.commonParams
        let ua = commonParams.ua
        let call = 'Loan.cashRepay'
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
              // 还款类别 1单笔结清还款 2逾期转正常还款 3提前还当期还款 4全部结清还款
              returnType: 4,
              // 还款金额
              amount: summaryInfo.realTotalAmount
            },
            sign: sign,
            timestamp: timestamp
          })

          that.loading()
          that.$http.post(that.$store.state.common.api, paramString).then(res => {
            let data = res.data
            if (data.returnCode === '000000') {
              // 更新汇总信息
              that.$store.commit('summaryInfoSave', data.response.loanAcctInfo)
              that.$store.commit('cashRepaySave', data.response.cashRepay)
              that.checkSummaryInfo()
            } else {
              that.disabledBtn = false
              that.toast(data.returnMsg)

              // 重新获取账户汇总信息
              that.reGetLoanAcctInfo()
            }
          }).catch(err => {
            that.disabledBtn = false
            console.log(err)

            // 重新获取账户汇总信息
            that.reGetLoanAcctInfo()
          })
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/loanRepay.styl'
</style>
