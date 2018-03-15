<template>
  <div class="index no-header" :class="{'has-footer': footer}">
    <div class="bg-header">
      <!--<div class="title">
        <div></div>
        <div>卡还王</div>
        <router-link class="icon-news" to="/newsCenter"></router-link>
      </div>-->

      <mt-header class="title" title="卡还王">
        <!-- <router-link class="icon-news" to="/newsCenter" slot="right"></router-link> -->
        <a class="icon-kefu" :href="kefu" slot="right"></a>
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
        <mt-button :class="{active: loanDuration === 3}" @click="selectLoanDuration(3)">3个月</mt-button>
        <mt-button :class="{active: loanDuration === 6}" @click="selectLoanDuration(6)">6个月</mt-button>
        <mt-button :class="{active: loanDuration === 12}" @click="selectLoanDuration(12)">12个月</mt-button>
      </div>
    </div>

    <div class="index-btn-group-wrapper">
      <div class="loan-btn">
        <mt-button class="btn" @click="loan">立即消费用款</mt-button>
      </div>

      <div class="footer-txt">"卡还王"由麦广互娱与中银消费金融联合打造</div>
    </div>

    <keep-alive>
      <div class="banner-wrapper">
        <adbanner></adbanner>
      </div>
    </keep-alive>

    <mt-tabbar fixed v-if="deviceType === 'android'">
      <mt-tab-item id="loan">
        <div class="self-tab-item">
          <img slot="icon" src="../../assets/img/bottom_icon_01_click.png">
          <span class="isSelected">借款</span>
        </div>
      </mt-tab-item>
      <mt-tab-item id="my">
        <div class="self-tab-item" @click="toMy">
          <img slot="icon" src="../../assets/img/bottom_icon_03_nor.png">
          <span>我的</span>
        </div>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import noticeSwiper from './../common/noticeSwiper'
  import adbanner from '../common/adbanner'
  import config from '../../config'

  export default {
    name: 'home',
    data() {
      return {
        loanMin: 1000
      }
    },
    components: {
      noticeSwiper,
      adbanner
    },
    methods: {
      selectLoanDuration(time) {
        this.$store.commit('loan_duration_save', time)
      },
      loan() {
        let loanAcctInfo = this.$store.state.common.summaryInfo

        // 判断应用初始化获取账户汇总信息是否成功(通过中银贷款账号是否存在进行判断)，获取失败后点击按钮重新获取账户汇总信息
        if (loanAcctInfo.loanAcctNo) {
          if (loanAcctInfo.creLineStus === '90') {
            this.$router.push('/inactivated')
          } else {
            this.$router.push('/loan')
          }
        } else {
          // 重新获取账户汇总信息
          this.reGetLoanAcctInfo()
        }
      },
      // 进入贷前'我的'
      toMy() {
        /* eslint-disable no-undef */
        app.setLoanStatus(0)
        this.app.toMy1()
      }
    },
    computed: {
      kefu() {
        return config.kefu
      },
      // 设备类型
      deviceType() {
        return this.$store.state.common.deviceType
      },
      footer() {
        // return this.$store.state.common.hasFooter
        return this.$store.state.common.deviceType === 'android'
      },
      // 最大额度
      loanMax() {
        return this.$store.state.loan.loan_max / 100
      },
      // 申请额度(默认显示最大额度)
      loanLimit: {
        // getter
        get: function() {
          return this.$store.state.loan.loan_limit / 100
          // return this.$store.state.loan.loan_max / 100
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
  .index
    width: 100%
    height: 100%
  .bg-header
    position: relative
    width: 100%
    height: 238px
    font-size: 18px
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
    margin-top: 60px
    padding: 0 15px
    .range-num
      width: 100%
      margin-top: 14px
      color: #999
      font-size: 13px
    .select-month
      display: flex
      justify-content: space-between
      width: 100%
      padding: 0 15px
      // margin: 40px 0 46px 0
      margin: 20px 0
      button
        width: 30%
        height: 30px
        color: #999
        font-size: 15px
        border: 1px solid #999
        background-color: #fff
        &.active
          color: #fff
          border: none
          background-color: #daab5b

  .index-btn-group-wrapper
    // position: absolute
    // left: 0
    // bottom: 54px
    width: 100%

    .footer-txt
      line-height: 44px
      text-align: center
      color: #999
      font-size: 12px

  .banner-wrapper
    width: 92%
    padding-bottom: 4px
    position: fixed
    left: 4%
    bottom: 54px
    height: 60px
    border-radius: 30px
    overflow: hidden

  .mint-tabbar
    height: 54px
    color: #d2d1d1
    background-color: #fff !important
    background-image: none
    border-top: 1px solid #d9d9d9; /*no*/
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
