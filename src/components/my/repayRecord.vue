<template>
  <div class="loanRepayRecord">
    <mt-header fixed class="header" title="还款记录">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="record-list" v-if="true">
      <router-link class="record-item" to="/repayDesc">
        <div class="desc">
          <div class="name">还款成功</div>
          <div class="time">2017-10-30 12:00</div>
        </div>
        <div class="amount">2000元</div>
      </router-link>
      <router-link class="record-item" to="/repayDesc">
        <div class="desc">
          <div class="name">还款成功</div>
          <div class="time">2017-10-30 12:00</div>
        </div>
        <div class="amount">2000元</div>
      </router-link>
    </div>

    <div class="empty-content" v-if="false">
      <img src="../../assets/img/no-repay.png" width="73" height="88" alt="">
      <div class="txt">暂无记录</div>
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
  @import '../../assets/css/loanRepay.styl'
</style>
