<template>
  <div class="loanRepayDesc">
    <mt-header fixed class="header" title="还款详情">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="banner">
      <div class="title">成功还款</div>
      <div class="amount">
        <span class="icon-money"></span> 691.<span class="decimals">14</span>
      </div>
      <div class="time">还款日：2017/07/28</div>
    </div>

    <div class="desc">
      <div class="title">明细</div>
      <div class="item">
        <div class="name">本金</div>
        <div class="value">2000.00</div>
      </div>
      <div class="item">
        <div class="name">利息</div>
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
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      back() {
        this.goback()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
