<template>
  <div class="repayment-table" :class="{overflow: overflowScroll}">
    <p class="title">还款计划表：</p>
    <p class="hint color999">期限内提前还款，按实际借款天数收取利息</p>

    <div class="plan-nav">
      <div class="plan-periods">期数</div>
      <div class="plan-detail">详情</div>
      <div class="plan-amount">还款金额</div>
    </div>
    <div class="plan-item" v-for="loanPlanItem of loanPlanList">
      <div class="plan-periods">{{loanPlanItem.paymentPeriod}}期</div>
      <div class="plan-detail">
        <div>时间：{{loanPlanItem.prePayDay | date}}</div>
        <div>本金：{{(loanPlanItem.prePrin / 100).toFixed(2)}}</div>
        <div>月利率费：{{(loanPlanItem.preFee / 100).toFixed(2)}}</div>
      </div>
      <div class="plan-amount">{{(loanPlanItem.preAmt / 100).toFixed(2)}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      overflowScroll: {
        type: Boolean
      },
      loanPlanList: {
        type: Array
      }
    },
    filters: {
      date: function(val) {
        let tmp = val.toString().substr(0, 8)
        let year = tmp.substr(0, 4)
        let month = tmp.substr(4, 2)
        let day = tmp.substr(6, 2)
        return year + '/' + month + '/' + day
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .mint-popup
    width: 100%
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base'

  .repayment-table
    padding-top: 14px
    background-color: #fff
    &.overflow
      height: 300px
      overflow: scroll
    .title
      padding: 0 15px
      color: main-color
      font-size: 15px
    .hint
      margin: 6px 0
      padding: 0 15px
      font-size: 13px
    .plan-nav
      display: flex
      align-items: center
      height: 25px
      line-height: 25px
      color: #333
      background-color: #d9d9d9
      .plan-periods, .plan-detail, .plan-amount
        font-size: 14px
    .plan-item
      display: flex
      align-items: center
      color: #333
      border-bottom: 1px solid #d9d9d9; /*no*/
      &:last-child
        border: none
      .plan-detail
        line-height: 24px
        font-size: 12px; /*no*/
      .plan-amount
        color: main-color

    .plan-periods
      width: 25%
      flex-grow: 0
      flex-shrink: 0
      text-align: center
      font-size: 17px
    .plan-detail
      width: 45%
      flex-grow: 0
      flex-shrink: 0
      font-size: 12px
    .plan-amount
      width: 30%
      flex-grow: 0
      flex-shrink: 0
      text-align: center
      font-size: 17px
</style>
