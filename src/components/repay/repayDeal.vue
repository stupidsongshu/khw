<template>
  <div class="repay-deal">
    <mt-header fixed class="header" title="还款">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="repay-deal-progress">
      <div class="step">
        <ul class="step-progress">
          <li class="step-content active">
            <div class="step-icon icon1"></div>
            <div class="step-line"></div>
            <div class="step-desc">提交成功</div>
            <div class="step-time">2017.10.09</div>
          </li>
          <li class="step-content active">
            <div class="step-icon icon2"></div>
            <div class="step-line"></div>
            <div class="step-desc">银行处理中</div>
            <div class="step-time">2017.10.09</div>
          </li>
          <li class="step-content">
            <div class="step-icon icon3"></div>
            <div class="step-line"></div>
            <div class="step-desc">还款成功</div>
            <div class="step-time">2017.10.09</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="banner-wrapper">
      <div class="banner">
        <div class="title">银行处理中</div>
        <div class="amount">
          <span class="icon-money"></span> 691.<span class="decimals">14</span>
        </div>
        <div class="time">最近还款日：2017/07/28</div>
      </div>
    </div>

    <div class="desc">
      <div class="item">
        <div class="name">利息</div>
        <div class="value">0.0元 <span class="calc-rate"></span></div>
      </div>
      <div class="item">
        <div class="name">逾期滞纳金</div>
        <div class="value">0.0元 </div>
      </div>
      <div class="item">
        <div class="name">需还总额</div>
        <div class="value">2000.0元</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import step from './../common/step'

  export default {
    methods: {
      back() {
        this.goback()
      }
    },
    components: {
      step
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .repay-deal
    .repay-deal-progress
      width: 100%
      padding: 15px 0
      background-color: #fff
      .step
        .step-progress
          display: flex
          .step-content
            position: relative
            flex-grow: 1
            text-align: center
            font-size: 14px
            .step-icon
              width: 40px
              height: 40px
              margin: 0 auto
              background-size: 100% 100%
              &.icon1
                background-image: url('../../assets/img/icon_repay_submit_nor.png')
              &.icon2
                background-image: url('../../assets/img/icon_repay_handle_nor.png')
              &.icon3
                background-image: url('../../assets/img/icon_repay_success_nor.png')
            .step-desc
              margin-top: 11px
              color: #999
            .step-time
              margin-top: 8px
              color: #999
              font-size: 10px
            &:before
              position: absolute
              content: ''
              top: 20px
              left: -30px
              width: 50%
              border-top: 4px dotted #999
            &:first-child:before
              border: none
            &.active
              .icon1
                background-image: url('../../assets/img/icon_repay_submit_show.png')
              .icon2
                background-image: url('../../assets/img/icon_repay_handle_show.png')
              .icon3
                background-image: url('../../assets/img/icon_repay_success_show.png')
              .step-desc
                color: #daab5b
              &:before
                border-top-color: #daab5b

    .banner-wrapper
      margin-top: 19px
      padding: 0 15px
      .banner
        display: flex
        flex-direction: column
        justify-content: space-around
        align-items: center
        width: 100%
        height: 166px
        padding: 10px 0
        color: #fff
        border-radius: 5px
        background-image: url("../../assets/img/repay-bg.png")
        background-size: 100% 166px
        .title
          font-size: 17px
        .amount
          font-size: 48px
          .icon-money
            display: inline-block
            width: 19px
            height: 25px
            background-image: url('../../assets/img/icon_money.png')
            background-size: 19px 25px
          .decimals
            font-size: 31px
        .time
          font-size: 13px

    .desc
      width: 100%
      padding: 25px 0 23px 29px
      font-size: 14px
      border-radius: 5px
      .title
        margin-bottom: 14px
        font-size: 17px
        font-weight: 600
      .item
        display: flex
        line-height: 26px
        .name
          flex-basis: 118px
          width: 118px
          color: #666
        .value
          color: #333
          .calc-rate
            display: inline-block
            width: 14px
            height: 16px
            margin-left: 4px
            vertical-align: -3px
            background-image: url("../../assets/img/icon_rate.png")
            background-size: 100% 100%
</style>
