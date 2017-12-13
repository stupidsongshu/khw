<template>
  <div class="loan-code">
    <mt-header fixed class="header" title="立即借款">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="form">
      <div class="item">
        <div class="name">身份证后6位</div>
        <div class="code-input">
          <input type="password" placeholder="请输入身份证后6位">
        </div>
      </div>
      <div class="item">
        <div class="name">验证码</div>
        <div class="code-input">
          <input type="text" placeholder="请输入短信验证码">
        </div>
        <div class="code-get">
          <button class="code-btn">发送验证码</button>
          <!--<mt-button class="code-btn">发送验证码</mt-button>-->
        </div>
      </div>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="loanConfirm">确认借款</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      loanConfirm() {
        this.$router.push('loanDeal')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'

  .loan-code
    .form
      .item
        display: flex
        align-items: center
        height: 54px
        padding: 8px 0 8px 15px
        font-size: 15px
        border-bottom: 1px solid #e6e6e6
        background-color: #fff
        .name
          width: 90px
          flex-basis: 90px
        .code-input
          display: inline-flex
          flex-grow: 2
          height: 100%
          input
            width: 100%
            border: none
            outline: none
        .code-get
          display: inline-flex
          flex-grow: 1
          height: 100%
          .code-btn
            width: 100%
            border: none
            outline: none
            color: main-color
            border-left: 1px solid main-color
            background-color: transparent
    .loan-btn
      margin-top: 77px
</style>
