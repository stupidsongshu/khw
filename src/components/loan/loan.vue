<template>
  <div class="loan">
    <mt-header fixed class="header" title="立即借款">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="banner-wrapper" @click="back">
      <div class="banner-container">
        <div class="title"><i class="icon-rate"></i><span>借款金额</span></div>
        <div>
          <span class="icon-money"></span><span class="loan-amount">{{loanLimit}}</span>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="loan-purpose">
        <span>贷款用途</span>
        <input type="text" placeholder="请选择" readonly v-model="purpose" @click="selectPurpose">
        <i class="fa fa-angle-right"></i>
      </div>
      <div class="item">
        <div>
          <span class="name">贷款期数</span>
          <span class="value">3期</span>
        </div>
        <div>
          <span class="name">日利率</span>
          <span class="value">0.58%</span>
        </div>
      </div>
      <div class="item">
        <div>
          <span class="name">收款银行</span>
          <span class="value">建设银行（8871）</span>
        </div>
      </div>
      <div class="item">
        <div class="agreement-wrapper">
          <input type="checkbox" id="agreementInput" checked>
          <label for="agreementInput">我同意并知晓</label><router-link class="agreement" to="">《借款补充协议》</router-link>
        </div>
      </div>
    </div>

    <div class="repayment-title">还款攻略</div>
    <div class="loan-btn">
      <mt-button class="btn" @click="loanBtn">立即借款</mt-button>
    </div>

    <loan-plan :overflowScroll="false"></loan-plan>

    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom"
      modal="false"
      closeOnClickModal="false">
      <div class="picker-nav">
        <div>请选择用途</div>
        <div @click="ensure">确定</div>
      </div>
      <mt-picker :slots="yearSlot" @change="onChange" :visible-item-count="3"></mt-picker>
    </mt-popup>

  </div>
</template>

<script type="text/ecmascript-6">
  import loanPlan from './../common/loanPlan'

  export default {
    data() {
      return {
        popupVisible: false,
        purpose: '',
        yearSlot: [{
          flex: 1,
          values: ['', '家装', '婚庆', '旅游', '教育', '汽车周边', '电子数码产品', '医疗', '家用电器', '家具家居', '其他'],
          className: 'slot1'
        }]
      }
    },
    computed: {
      loanLimit() {
        // getter
        // get: function() {
        //   return this.$store.state.loan.loan_limit
        // },
        // setter
        // set: function(newValue) {
        //   this.$store.commit('loan_limit_save', newValue)
        // }
        return this.$store.state.loan.loan_limit
      }
    },
    methods: {
      back() {
        this.goback()
      },
      selectPurpose() {
        this.popupVisible = true
      },
      ensure() {
        this.popupVisible = false
      },
      // change 事件有两个参数，分别为当前 picker 的 vue 实例和各 slot 被选中的值组成的数组
      onChange(picker, values) {
        this.purpose = values[0]
      },
      loanBtn() {
        this.$router.push('loanCode')
      }
    },
    components: {
      loanPlan
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'

  .loan
    .banner-wrapper
      width: 100%
      height: 132px
      padding: 12px 15px
      .banner-container
        display: flex
        flex-direction: column
        justify-content: center
        width: 100%
        height: 108px
        padding-right: 15px
        text-align: right
        color: #fff
        background-image: url("../../assets/img/loan-banner.png")
        background-size: 100% 100%
        .title
          .icon-rate
            display: inline-block
            width: 14px
            height: 16px
            margin-right: 8px
            background-image: url("../../assets/img/icon_rate_white.png")
            background-size: 100% 100%
          span
            vertical-align: 2px
        .icon-money
          display: inline-block
          width: 19px
          height: 25px
          background-image: url('../../assets/img/icon_money.png')
          background-size: 19px 25px
        .loan-amount
          font-size: 45px


    .content-wrapper
      background-color: #fff
      .loan-purpose
        display: flex
        align-items: center
        height: 54px
        padding: 0 15px
        border-bottom: 1px solid #e3e3e3
        span
          flex-grow: 1
          color: color333
        input
          flex-grow: 2
          height: 100%
          color: color999
          border: none
          background-color: transparent
        i
          flex-grow: 1
          text-align: right
          color: color999
          font-size: 30px

      .item
        display: flex
        justify-content: space-between
        padding: 0 15px
        line-height: 40px
        .name
          margin-right: 20px
          color: #999
        .value
          color: #333
        .agreement-wrapper
          font-size: 13px
          input
            width: 14px
            height: 14px
            outline: none
            border: 1px solid main-color
          .agreement
            color: main-color

    .repayment-title
      line-height: 44px
      text-align: center
      color: main-color
    .loan-btn
      margin: 0 0 16px 0

    .picker-nav
      display: flex
      justify-content: space-between
      padding: 5px 15px
      font-size: 14px
</style>
