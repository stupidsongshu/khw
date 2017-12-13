<template>
  <div class="loan-code">
    <mt-header fixed class="header" title="按期还款">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
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



    <!--<div class="form">
      <div class="form-item">
        <label class="icon icon-phone"></label>
        <input type="number" placeholder="请输入手机号" v-model="mobileno">
      </div>
      <div class="form-item">
        <label class="icon icon-password"></label>
        <input type="password" placeholder="密码为6-12位数字和字母组合" ref="psw" v-model="pwd">
        <label class="icon-password-show" v-show="showPassword" @click="toggle"></label>
        <label class="icon-password-hide" v-show="!showPassword" @click="toggle"></label>
      </div>
      <div class="form-item">
        <label class="icon icon-msg"></label>
        <input type="text" placeholder="请输入短信验证码" v-model="vcode">
        <label class="form-item-right code" @click="getCode" v-if="!hasGetCode">发送验证码</label>
        <label class="form-item-right code" v-if="hasGetCode">{{time}}s后重新获取</label>
      </div>
    </div>-->




    <div class="loan-btn">
      <mt-button class="btn" @click="loanConfirm">立即还款</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      back() {
        this.goback()
      },
      loanConfirm() {
        this.$router.push('/repay/repayDeal')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'
  @import '../../assets/css/form.styl'

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
