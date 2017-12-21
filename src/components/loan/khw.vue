<template>
  <div class="index no-header">
    <div class="bg-header">
      <!--<div class="title">
        <div></div>
        <div>卡还王</div>
        <router-link class="icon-news" to="/newsCenter"></router-link>
      </div>-->

      <mt-header class="title" title="卡还王">
        <!--<router-link class="icon-news" to="/newsCenter" slot="right"></router-link>-->
      </mt-header>

      <div class="card-wrapper">
        <div class="card">
          <div class="loan-amount">
            <div class="loan-amount-num"><span class="icon-money"></span><span>{{loanLimit}}</span></div>
            <div class="loan-amount-title">申请金额</div>
          </div>
        </div>
      </div>
      <div class="notice-wrapper">
        <div class="notice">
          <div class="icon"></div>
          <notice-swiper></notice-swiper>
        </div>
      </div>
    </div>

    <div class="range">
      <mt-range v-model="loanLimit" :min="loanMin" :max="loanMax" :step="100" :bar-height="3"></mt-range>

      <div class="clearfix range-num">
        <span class="pull-left">{{loanMin}}</span>
        <span class="pull-right">{{loanMax}}</span>
      </div>

      <div class="select-month">
        <mt-button :class="{active: loanDuration === 6}" @click="selectLoanDuration(6)">6个月</mt-button>
        <mt-button :class="{active: loanDuration === 12}" @click="selectLoanDuration(12)">12个月</mt-button>
      </div>
    </div>

    <div class="loan-btn">
      <!--<router-link to="/loan" class="btn">立即借款</router-link>-->
      <mt-button class="btn" @click="loan">立即借款</mt-button>
    </div>

    <div class="footer-txt">"卡还王"由麦广互娱与中银消费金融联合打造</div>

    <mt-tabbar fixed v-if="deviceType === 'android'">
      <mt-tab-item id="loan">
        <div class="self-tab-item">
          <img slot="icon" src="../../assets/img/bottom_icon_01_click.png">
          <span class="isSelected">借款</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="my">
        <div class="self-tab-item">
          <img slot="icon" src="../../assets/img/bottom_icon_03_nor.png">
          <span>我的</span>
        </div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import noticeSwiper from './../common/noticeSwiper'

  export default {
    name: 'home',
    data() {
      return {
        loanMin: 1000
      }
    },
    components: {
      noticeSwiper
    },
    methods: {
      selectLoanDuration(time) {
        this.$store.commit('loan_duration_save', time)
      },
      loan() {
        this.$router.push('/loan')
      }
    },
    computed: {
      // 设备类型
      deviceType() {
        return this.$store.state.common.deviceType
      },
      // 最大额度
      loanMax() {
        return this.$store.state.loan.loan_max / 100
      },
      // 申请额度
      loanLimit: {
        // getter
        get: function() {
          return this.$store.state.loan.loan_limit / 100
        },
        // setter
        set: function(newValue) {
          this.$store.commit('loan_limit_save', newValue * 100)
        }
      },
      loanDuration() {
        return this.$store.state.loan.loan_duration
      },
      activeTabIndex() {
        return this.$store.state.common.activeTabIndex
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {})
    }
  }
</script>

<style lang="stylus">
  .mt-range-runway
    border: 3px solid #d9d9d9 !important
    border-radius: 3px

  .mt-range-progress
    border: 3px solid #4e433d
    border-top-left-radius: 3px
    border-bottom-left-radius: 3px

  .mt-range-thumb
    width: 33px !important
    height: 33px !important
    background-image: url("../../assets/img/slider_money.png")
    background-size: 33px 33px
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .bg-header
    position: relative
    width: 100%
    height: 238px
    font-size: 20px
    background-image: url("../../assets/img/bg-header.png")
    background-repeat: no-repeat
    background-size: 100% 238px
    .icon-news
      display: inline-block
      width: 22px
      height: 45px
      background-image: url("../../assets/img/icon_news.png")
      background-repeat: no-repeat
      background-position: center
      background-size: 22px 23px
    .card-wrapper
      position: absolute
      top: 80px
      left: 0
      width: 100%
      height: 200px
      padding: 0 15px
      .card
        display: table
        width: 100%
        height: 100%
        padding-right: 22px
        text-align: right
        color: #fff
        border-radius: 10px
        background: url("../../assets/img/card.png") no-repeat
        background-size: 100% 200px
        .loan-amount
          display: table-cell
          vertical-align: middle
          .loan-amount-num
            .icon-money
              display: inline-block
              width: 19px
              height: 25px
              background-image: url('../../assets/img/icon_money.png')
              background-size: 19px 25px
            span
              font-size: 45px
          .loan-amount-title
            margin-top: 10px
            font-size: 14px

  .range
    width: 100%
    margin-top: 55px
    padding: 0 15px
    .range-num
      width: 100%
      color: #999
      font-size: 13px
    .select-month
      display: flex
      justify-content: space-between
      width: 100%
      margin: 55px 0 46px 0
      button
        width: 88px
        height: 30px
        color: #999
        font-size: 15px
        border: 1px solid #999
        background-color: #fff
        &.active
          color: #fff
          border: none
          background-color: #daab5b

  .footer-txt
    line-height: 44px
    text-align: center
    color: #999
    font-size: 12px

  .mint-tabbar
    height: 54px
    color: #d2d1d1
    background-color: #fff !important
    background-image: none
    border-top: 1px solid #d9d9d9
    .mint-tab-item
      &.is-selected
        color: #d2d1d1
        background-color: #fff !important
    .self-tab-item
      display: flex
      flex-direction: column
      color: #d2d1d1
      .isSelected
        color: #daab5b !important
      img
        width: 24px
        height: 24px
        margin: 0 auto 5px auto
</style>
