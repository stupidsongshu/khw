<template>
  <div class="loanRepayDesc">
    <mt-header fixed class="header" title="提前还款">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="banner">
      <div class="title">当期应还</div>
      <div class="amount">
        <span class="icon-money"></span> {{returnAmtInt}}.<span class="decimals">{{returnAmtFlo}}</span>
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
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="inAdvanceRepayconfirm" :disabled="disabledBtn">立即还款</mt-button>
      <p v-if="returnAmt === 0" style="color: #f00;font-size: 14px;text-align: center;padding: 4px;">当期已结清</p>
    </div>

    <ul class="hint">
      <li>特别提示：</li>
      <li>1.提前还款请保证还款卡内余额充足</li>
      <li>2.还款日自动还款，请注意还款卡内的余额是否足额</li>
      <li>3.扣款一旦成功，不可申请撤销</li>
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
// import { MessageBox } from 'mint-ui'

export default {
  data() {
    return {
      // 当期提前还款金额
      returnAmt: -1,
      returnAmtInt: 0,
      returnAmtFlo: 0,
      transTime: '',
      // 本金
      payAmt: 0,
      // 当前欠款
      totalLoanAmt: 0,
      // 借记卡卡号
      debitCardNo: '',
      // 开户行
      decardOpenBank: '',
      disabledBtn: false
    }
  },
  created() {
    this.transTime = this.$store.state.loan.loan_applyTime

    let summaryInfo = this.$store.state.common.summaryInfo
    this.payAmt = summaryInfo.baseUsedCreLine
    this.totalLoanAmt = summaryInfo.totalLoanAmt
    this.debitCardNo = summaryInfo.debitCardNo.substring(
      summaryInfo.debitCardNo.length - 4
    )
    this.decardOpenBank = summaryInfo.decardOpenBank

    // 当期提前还款金额
    let returnAmt = summaryInfo.returnAmt.toString()
    if (returnAmt.length >= 3) {
      this.returnAmtInt = returnAmt.substring(0, returnAmt.length - 2)
      this.returnAmtFlo = returnAmt.substring(returnAmt.length - 2)
    } else {
      this.returnAmtInt = 0
      this.returnAmtFlo = returnAmt
    }

    // 当期已还清
    this.returnAmt = summaryInfo.returnAmt
    if (this.returnAmt === 0) {
      this.disabledBtn = true
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
      this.goback()
    },
    inAdvanceRepayconfirm() {
      // MessageBox.confirm('请确保卡内余额充足').then(confirm => {
      //   if (confirm === 'confirm') {
      //     this.inAdvanceRepayBtn()
      //   }
      // }, cancel => {
      //   if (cancel === 'cancel') {}
      // })

      // setTimeout(() => {
      //   MessageBox.close()
      // }, 2000)

      this.$store.commit('hasPopupSave', true)
    },
    cancel() {
      this.$store.commit('hasPopupSave', false)
    },
    confirm() {
      this.$store.commit('hasPopupSave', false)
      this.inAdvanceRepayBtn()
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
            // 还款类别 1单笔结清还款 2逾期转正常还款(minReturnAmount) 3提前还当期还款(returnAmt) 4全部结清还款(realTotalAmount)
            returnType: 3,
            // 本期应还款额(即客户本月(最低)应还的金额。未逾期时为本月应还款额；逾期时为本月应还款额及欲解除逾期状态时所需偿还的金额总和)
            amount: summaryInfo.returnAmt
          },
          sign: sign,
          timestamp: timestamp
        })

        that.loading()
        that.$http
          .post(that.$store.state.common.api, paramString)
          .then(res => {
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
          })
          .catch(err => {
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

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../assets/css/loanRepay.styl'

.mint-popup
  width: 60%
  border-radius: 4px
.popup-self-container
  .popup-self-wrapper
    .popup-self-title
      padding: 20px 0
      font-size: 16px
      text-align: center
    .popup-self-btn-group
      display: flex
      border-top: 1px solid #999
      span
        flex: 1
        padding: 10px
        font-size: 14px
        text-align: center
        &:first-child
          margin-right: 4px
          border-right: 1px solid #999
</style>
