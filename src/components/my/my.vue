<template>
  <div class="my no-header">
    <div class="banner">
      <mt-header class="title" title="我的"></mt-header>

      <div class="user">
        <div class="user-avatar">
          <img src="./../../assets/img/head.png" alt="">
        </div>
        <div class="user-phone" v-if="loginInfo.Step === 0 && loginInfo.Result === 0">
          <div>您好！</div>
          <div>{{loginInfo.Mobile | filter}}</div>
        </div>
        <div class="user-phone" v-if="loginInfo.Step === 0 && loginInfo.Result !== 0" @click="login">
          <div>您好！</div>
          <div>点击登录</div>
        </div>
      </div>
    </div>

    <div class="nav">
      <router-link to="/loanRecord">
        <div class="icon icon-loan"></div>
        <div class="name">借款记录</div>
      </router-link>
      <router-link to="/repayRecord">
        <div class="icon icon-repay"></div>
        <div class="name">还款记录</div>
      </router-link>
      <router-link to="/bankCard">
        <div class="icon icon-card"></div>
        <div class="name">银行卡</div>
      </router-link>
    </div>
    <div class="menu">
      <!--<router-link to="/newsCenter">
        <span class="icon icon-msg"></span>
        <span>我的消息</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </router-link>-->
      <router-link to="/help">
        <span class="icon icon-help"></span>
        <span>帮助中心</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </router-link>
      <router-link to="/setting">
        <span class="icon icon-setting"></span>
        <span>安全设置</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </router-link>
      <router-link to="/aboutUs">
        <span class="icon icon-us"></span>
        <span>关于我们</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    computed: {
      loginInfo() {
        // return this.$store.state.common.loginInfo
        return JSON.parse(this.app.isLogin())
      }
    },
    filters: {
      filter(value) {
        return value.toString().substring(0, 3) +
                value.toString().substring(3, 9).replace(/\S/g, '*') +
                value.toString().substring(9)
      }
    },
    methods: {
      login() {
        this.$router.push('/login')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'

  .my
    position: relative
    .banner
      position: relative
      width: 100%
      height: 172px
      background-size: 100%
      background-repeat: no-repeat
      background-image: url("../../assets/img/bg-header.png")
      .user
        position: absolute
        left: 20px
        bottom: 27px
        height: 58px
        font-size: 0
        .user-avatar
          display: inline-flex
          width: 58px
          height: 58px
          border-radius: 50%
          img
            width: 100%
            height: 100%
        .user-phone
          display: inline-flex
          flex-direction: column
          justify-content: center
          vertical-align: top
          height: 100%
          margin-left: 18px
          line-height: 24px
          color: main-color
          font-size: 15px
    .nav
      display: flex
      padding: 13px 0
      background-color: #fff
      a
        flex: 1
        text-align: center
        color: #666
        border-right: 1px solid #d9d9d9
        font-size: 14px
        &:last-child
          border: none
        .icon
          height: 22px
          margin-bottom: 4px
          background-size: 22px 22px
          background-position: center
          background-repeat: no-repeat
          &.icon-loan
            background-image: url('../../assets/img/icon_my_loan.png')
          &.icon-repay
            background-image: url('../../assets/img/icon_my_repay.png')
          &.icon-card
            background-image: url('../../assets/img/icon_my_card.png');

    .menu
      width: 100%
      margin-top: 11px
      a
        position: relative
        display: flex
        align-items center
        height: 50px
        line-height: 50px
        padding: 0 15px
        color: #333
        font-size: 14px
        border-bottom: 1px solid #d9d9d9
        background-color: #fff
        .icon
          display: block
          width: 24px
          height: 24px
          margin-right: 9px
          background-size: 24px 24px
          &.icon-msg
            background-image: url('../../assets/img/icon_my_msg.png')
          &.icon-us
            background-image: url('../../assets/img/icon_my_us.png')
          &.icon-help
            background-image: url('../../assets/img/icon_my_help.png')
          &.icon-setting
            background-image: url('../../assets/img/icon_my_setting.png')
        .fa-angle-right
          position: absolute
          right: 15px
          color: #999
          font-size: 30px
</style>
