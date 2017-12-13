<template>
  <div class="step">
    <ul class="step-progress">
      <li class="step-content active" :class="{loanDeal: componentInfo.route === 'loanDeal',repayDeal: componentInfo.route === 'repayDeal'}">
        <div class="step-icon" ref="iconStep1" :style="backgroundImage"></div>
        <div class="step-line"></div>
        <div class="step-desc">提交成功</div>
      </li>
      <li class="step-content active" :class="{loanDeal: componentInfo.route === 'loanDeal',repayDeal: componentInfo.route === 'repayDeal'}">
        <div class="step-icon" ref="iconStep2"></div>
        <div class="step-line"></div>
        <div class="step-desc">银行处理中</div>
      </li>
      <li class="step-content" :class="{loanDeal: componentInfo.route === 'loanDeal',repayDeal: componentInfo.route === 'repayDeal'}">
        <div class="step-icon" ref="iconStep3"></div>
        <div class="step-line"></div>
        <div class="step-desc">还款成功</div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      componentInfo: Object
    },
    mounted() {
      let path = '/assets/img/'
      let iconStep1 = this.$refs.iconStep1
      let iconStep2 = this.$refs.iconStep2
      let iconStep3 = this.$refs.iconStep3
      if (this.componentInfo.route === 'loanDeal') {
        console.log(iconStep1)
        iconStep1.style.backgroundImage = `url(${path + this.componentInfo.defaultBgStep1})`
        iconStep2.style.backgroundImage = `url(${path + this.componentInfo.defaultBgStep2})`
        iconStep3.style.backgroundImage = `url(${path + this.componentInfo.defaultBgStep3})`
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
        &.loanDeal
          .icon1
            background-image: url('../../assets/img/icon_loan_submit_nor.png')
          .icon2
            background-image: url('../../assets/img/icon_loan_handle_nor.png')
          .icon3
            background-image: url('../../assets/img/icon_loan_success_nor.png')
          &.active
            .icon1
              background-image: url('../../assets/img/icon_loan_submit_show.png')
            .icon2
              background-image: url('../../assets/img/icon_loan_handle_show.png')
            .icon3
              background-image: url('../../assets/img/icon_loan_success_show.png')
            .step-desc
              color: #fff
          &:before
            border-top-color: #fff

        &.repayDeal
          .icon1
            background-image: url('../../assets/img/icon_repay_submit_nor.png')
          .icon2
            background-image: url('../../assets/img/icon_repay_handle_nor.png')
          .icon3
            background-image: url('../../assets/img/icon_repay_success_nor.png')
          &.active
            .icon1
              background-image: url('../../assets/img/icon_repay_submit_show.png')
            .icon2
              background-image: url('../../assets/img/icon_repay_handle_show.png')
            .icon3
              background-image: url('../../assets/img/icon_repay_success_show.png')
            .step-desc
              color: #fff
          &:before
            border-top-color: #fff

        .step-desc
          margin-top: 11px
          color: #ffe1ab
        &:before
          position: absolute
          content: ''
          top: 20px
          left: -30px
          width: 50%
          border-top: 4px dotted #ffe1ab
        &:first-child:before
          border: none
</style>
