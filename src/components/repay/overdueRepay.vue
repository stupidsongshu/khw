<template>
  <div class="loanRepayDesc">
    <mt-header fixed class="header" title="逾期还款">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="banner">
      <div class="title">逾期应还</div>
      <div class="amount">
        <span class="icon-money"></span> {{minReturnAmountInt}}.<span class="decimals">{{minReturnAmountFlo}}</span>
        <!-- <span class="icon-money"></span> {{minReturnAmount}} -->
      </div>
      <div class="overdue-time">已逾期{{ovdDayCnt}}天</div>
    </div>

    <div class="desc">
      <div class="title">明细</div>
      <div class="item">
        <div class="name">本金</div>
        <div class="value">{{baseUsedCreLine}}</div>
      </div>
      <div class="item">
        <div class="name">当前利息</div>
        <div class="value">{{curInterest}}元 <span class="calc-rate"></span></div>
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
        <div class="name">逾期滞纳金</div>
        <div class="value">{{ovdFine}}元（3天内还款可免除）</div>
      </div>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" :disabled="disabledBtn" @click="overdueRepayConfirm">立即还款</mt-button>
    </div>

    <ul class="hint">
      <li>特别提示：</li>
      <li>1.还款日自动还款，请注意还款卡内的余额是否足额</li>
      <li>2.扣款一旦成功，不可申请撤诉</li>
      <li>3.在逾期的宽限期3天内还款可免除滞纳费</li>
    </ul>

    <mt-popup
      v-model="hasPopup"
      popup-transition="popup-fade"
      position="center"
      :modal="true"
      :closeOnClickModal="false">
      <div class="popup-self-container">
        <div class="popup-self-wrapper">
          <h2 class="popup-self-title">请确保卡内余额充足！</h2>
          <div class="popup-self-btn-group">
            <span @click="cancel">取消</span>
            <span @click="confirm">确定</span>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        // 解除逾期状态所需偿还金额
        minReturnAmount: 0,
        minReturnAmountInt: 0,
        minReturnAmountFlo: 0,
        // 逾期天数
        ovdDayCnt: 0,
        // 本金
        baseUsedCreLine: 0,
        // 当前利息
        curInterest: 0,
        // 借记卡卡号
        debitCardNo: '',
        // 开户行
        decardOpenBank: '',
        // 逾期滞纳金
        ovdFine: 0,
        disabledBtn: false
      }
    },
    created() {
      let summaryInfo = this.$store.state.common.summaryInfo
      this.minReturnAmount = summaryInfo.minReturnAmount
      let minReturnAmountStr = this.minReturnAmount.toString()
      if (minReturnAmountStr.length >= 3) {
        this.minReturnAmountInt = minReturnAmountStr.substring(0, minReturnAmountStr.length - 2)
        this.minReturnAmountFlo = minReturnAmountStr.substring(minReturnAmountStr.length - 2)
      } else {
        this.minReturnAmountInt = 0
        this.minReturnAmountFlo = this.minReturnAmount
      }
      this.ovdDayCnt = summaryInfo.ovdDayCnt
      this.baseUsedCreLine = summaryInfo.baseUsedCreLine / 100
      this.debitCardNo = summaryInfo.debitCardNo.substring(summaryInfo.debitCardNo.length - 4)
      this.decardOpenBank = summaryInfo.decardOpenBank

      // 当前利息
      // 分期数
      let loanDuration = this.$store.state.loan.loan_duration
      // 月分期费率
      let monthRate
      // if (loanDuration === 6) {
      //   // monthRate = 1.35 / 100
      //   monthRate = 0.0135
      // } else if (loanDuration === 12) {
      //   // monthRate = 1.25 / 100
      //   monthRate = 0.0125
      // }

      if (loanDuration === 3) {
        monthRate = 0.0198
      } else if (loanDuration === 6) {
        // monthRate = 1.35 / 100
        monthRate = 0.0175
      } else if (loanDuration === 12) {
        // monthRate = 1.25 / 100
        monthRate = 0.0162
      }
      // fix 精度 显示过长(0.0175*1800 = 31.500000000000004)
      // let curInterestTmp = this.baseUsedCreLine * monthRate
      // if (curInterestTmp.toString().indexOf('.') !== -1) {
      //   let flo = curInterestTmp.toString().split('.')[1]
      //   if (flo.length > 2) {
      //   }
      // }
      this.curInterest = (this.baseUsedCreLine * monthRate).toFixed(2)

      // 逾期滞纳金
      if (this.baseUsedCreLine >= 0 && this.baseUsedCreLine <= 5000) {
        this.ovdFine = 5
      } else if (this.baseUsedCreLine > 5000 && this.baseUsedCreLine <= 10000) {
        this.ovdFine = 10
      } else if (this.baseUsedCreLine > 10000 && this.baseUsedCreLine <= 15000) {
        this.ovdFine = 15
      } else if (this.baseUsedCreLine > 15000 && this.baseUsedCreLine <= 20000) {
        this.ovdFine = 20
      } else if (this.baseUsedCreLine > 20000 && this.baseUsedCreLine <= 25000) {
        this.ovdFine = 25
      } else if (this.baseUsedCreLine > 25000 && this.baseUsedCreLine <= 30000) {
        this.ovdFine = 30
      } else if (this.baseUsedCreLine > 30000 && this.baseUsedCreLine <= 35000) {
        this.ovdFine = 35
      } else if (this.baseUsedCreLine > 35000 && this.baseUsedCreLine <= 40000) {
        this.ovdFine = 40
      } else if (this.baseUsedCreLine > 40000 && this.baseUsedCreLine <= 45000) {
        this.ovdFine = 45
      } else if (this.baseUsedCreLine > 45000 && this.baseUsedCreLine <= 50000) {
        this.ovdFine = 50
      }
    },
    computed: {
      hasPopup: {
        get() {
          return this.$store.state.common.hasPopup
        },
        set() {}
      }
    },
    methods: {
      back() {
        // this.goback()
        this.$router.push({name: 'repay'})
      },
      overdueRepayConfirm() {
        this.$store.commit('hasPopupSave', true)
      },
      cancel() {
        this.$store.commit('hasPopupSave', false)
      },
      confirm() {
        this.$store.commit('hasPopupSave', false)
        this.overdueRepay()
      },
      overdueRepay() {
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
              returnType: 2,
              // 解除逾期状态所需偿还金额(客户逾期后欲解除逾期状时所需偿还的金额。还款金额为上期未还足的最低还款额其所剩余应还金额与余其其间所产生的滞纳费总和)
              amount: summaryInfo.minReturnAmount
            },
            sign: sign,
            timestamp: timestamp
          })

          that.loading()
          that.$http.post(this.$store.state.common.api, paramString).then(res => {
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
