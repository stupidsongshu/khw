<template>
  <div class="loan-deal">
    <mt-header fixed class="header" title="卡还王"></mt-header>

    <div class="deal-banner">
      <div class="status">已到账</div>
      <div class="loan-amount">
        <span class="icon-money"></span>10000.<span class="decimals">00</span>
      </div>
      <step></step>
    </div>

    <div class="loan-desc">
      <ul>
        <li class="item clearfix">
          <div class="pull-left name">还款期限</div>
          <div class="pull-left value">3个月</div>
        </li>
        <li class="item clearfix">
          <div class="pull-left name">日利率</div>
          <div class="pull-left value">0.58%<span class="calc-rate"></span></div>
        </li>
        <li class="item clearfix">
          <div class="pull-left name">每月应还</div>
          <div class="pull-left value">109.20元</div>
        </li>
        <li class="item clearfix">
          <div class="pull-left name">共计应还</div>
          <div class="pull-left value">500.00元</div>
        </li>
        <li class="item">
          <div class="loan-plan" @click="showLoanPlan">
            <span class="icon-plan"></span>还款计划
          </div>
        </li>
      </ul>
    </div>

    <div class="hint">
      款项已打至您的建设银行(尾号1949)账户<br>
      具体到账时间以银行为准
    </div>

    <mt-button class="back-btn">返回首页 {{time}}S</mt-button>


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
  import step from './../common/step'
  import loanPlan from './../common/loanPlan'

  export default {
    data() {
      return {
        time: 5,
        popupVisible: false
        /* componentInfo: {
          route: 'loanDeal',
          defaultColor: '#ffe1ab',
          activeColor: '#fff',
          defaultBgStep1: 'icon_loan_submit_nor.png',
          defaultBgStep2: 'icon_loan_handle_nor.png',
          defaultBgStep3: 'icon_loan_success_nor.png',
          activeBgStep1: 'icon_loan_submit_show.png',
          activeBgStep2: 'icon_loan_handle_show.png',
          activeBgStep3: 'icon_loan_success_show.png'
        } */
      }
    },
    components: {
      step,
      loanPlan
    },
    created() {
      setInterval(() => {
        if (this.time === 0) {
          this.time = 6
        }
        this.time--
      }, 1000)
    },
    methods: {
      showLoanPlan() {
        this.popupVisible = true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'

  .loan-deal
    padding: 12px 15px
    .deal-banner
      width: 100%
      height: 202px
      padding-top: 26px
      border-radius: 5px
      background-color: #dfc391
      .status
        text-align: center
        color: #fff
        font-size: 15px
      .loan-amount
        margin: 14px 0 20px 0
        text-align: center
        color: #fff
        font-size: 42px
        .icon-money
          display: inline-block
          width: 19px
          height: 25px
          background-image: url('../../assets/img/icon_money.png')
          background-size: 19px 25px
        .decimals
          font-size: 32px

    .loan-desc
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
      background-color: #999
</style>
