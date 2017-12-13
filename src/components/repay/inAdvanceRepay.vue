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
        <div class="name">提前还款违约金</div>
        <div class="value">10.00元</div>
      </div>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="inAdvanceRepayBtn">立即还款</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      back() {
        this.goback()
      },
      inAdvanceRepayBtn() {
        this.$router.push('/repay/repayCode')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/loanRepay.styl'
</style>
