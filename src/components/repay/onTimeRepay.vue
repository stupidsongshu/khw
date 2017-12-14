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
        <span class="icon-money"></span> 691.<span class="decimals">14</span>
      </div>
      <div class="time">最近还款日：2017/07/28</div>
    </div>

    <div class="desc">
      <div class="title">明细</div>
      <div class="item">
        <div class="name">本金</div>
        <div class="value">2000.00</div>
      </div>
      <div class="item">
        <div class="name">当前利息</div>
        <div class="value">0.69元 <span class="calc-rate"></span></div>
      </div>
      <div class="item">
        <div class="name">还款借记卡</div>
        <div class="value">中国建设银行（尾号3225）</div>
      </div>
      <div class="item">
        <div class="name">开卡银行</div>
        <div class="value">招商银行</div>
      </div>
      <div class="item">
        <div class="loan-plan" @click="showRepayPlan">
          <span class="icon-plan"></span>还款计划
        </div>
      </div>
    </div>

    <ul class="hint">
      <li>特别提示：</li>
      <li>1,还款日自动还款，请注意还款卡内的余额是否足额；</li>
      <li>2,扣款一旦成功，不可申请撤诉；</li>
    </ul>

    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom"
      modal="false"
      closeOnClickModal="false">
      <!--<div class="picker-nav">
        <div>请选择用途</div>
        <div @click="ensure">确定</div>
      </div>-->

      <loan-plan :overflowScroll="true"></loan-plan>
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
        popupVisible: false
      }
    },
    created() {
      // let that = this
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
      //   console.log(data.response)
      //   if (data.returnCode === '000000') {
      //     let payOffAmtStr = data.response.payOffAmt.toString()
      //     this.payOffAmtInt = payOffAmtStr.substring(0, payOffAmtStr.length - 2)
      //     this.payOffAmtFlo = payOffAmtStr.substring(payOffAmtStr.length - 2)
      //     this.transTime = data.response.transTime
      //   }
      // })
    },
    methods: {
      back() {
        this.goback()
      },
      showRepayPlan() {
        this.popupVisible = true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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

</style>
