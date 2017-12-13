<template>
  <div class="step">
    <ul class="step-progress">
      <li class="step-content active">
        <div class="step-icon icon1"></div>
        <div class="step-line"></div>
        <div class="step-desc">提交成功</div>
      </li>
      <li class="step-content active">
        <div class="step-icon icon2"></div>
        <div class="step-line"></div>
        <div class="step-desc">银行处理中</div>
      </li>
      <li class="step-content">
        <div class="step-icon icon3"></div>
        <div class="step-line"></div>
        <div class="step-desc">还款成功</div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">

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
          &.icon1
            background-image: url('../../assets/img/icon_loan_submit_nor.png')
          &.icon2
            background-image: url('../../assets/img/icon_loan_handle_nor.png')
          &.icon3
            background-image: url('../../assets/img/icon_loan_success_nor.png')
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
</style>
