<template>
  <div class="repayment-table" :class="{overflow: overflowScroll}">
    <p class="title">还款计划表</p>
    <p class="hint">期限内提前还款，按实际借款天数收取利息</p>

    <div class="plan-nav">
      <div class="plan-periods">期数</div>
      <div class="plan-detail">详情</div>
      <div class="plan-amount">还款金额</div>
    </div>
    <div class="plan-item">
      <div class="plan-periods">1期</div>
      <div class="plan-detail">
        <div>时间：2017/10/20</div>
        <div>本金：3000</div>
        <div>利息：0.06</div>
      </div>
      <div class="plan-amount">691.14</div>
    </div>
    <div class="plan-item">
      <div class="plan-periods">2期</div>
      <div class="plan-detail">
        <div>时间：2017/10/20</div>
        <div>本金：3000</div>
        <div>利息：0.06</div>
      </div>
      <div class="plan-amount">691.14</div>
    </div>
    <div class="plan-item">
      <div class="plan-periods">3期</div>
      <div class="plan-detail">
        <div>时间：2017/10/20</div>
        <div>本金：3000</div>
        <div>利息：0.06</div>
      </div>
      <div class="plan-amount">691.14</div>
    </div>
    <div class="plan-item">
      <div class="plan-periods">4期</div>
      <div class="plan-detail">
        <div>时间：2017/10/20</div>
        <div>本金：3000</div>
        <div>利息：0.06</div>
      </div>
      <div class="plan-amount">691.14</div>
    </div>
    <div class="plan-item">
      <div class="plan-periods">5期</div>
      <div class="plan-detail">
        <div>时间：2017/10/20</div>
        <div>本金：3000</div>
        <div>利息：0.06</div>
      </div>
      <div class="plan-amount">691.14</div>
    </div>
    <div class="plan-item">
      <div class="plan-periods">6期</div>
      <div class="plan-detail">
        <div>时间：2017/10/20</div>
        <div>本金：3000</div>
        <div>利息：0.06</div>
      </div>
      <div class="plan-amount">691.14</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      overflowScroll: {
        type: Boolean
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
      color: #666
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
      border-bottom: 1px solid #d9d9d9
      &:last-child
        border: none
      .plan-detail
        line-height: 24px
        font-size: 14px
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

  .mint-popup
    width: 100%
</style>
