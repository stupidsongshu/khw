<template>
  <div class="waitAudit no-header">
    <div class="banner">
      <mt-header class="title" title="卡还王">
        <div slot="left" @click="back">
          <mt-button icon="back"></mt-button>
        </div>
      </mt-header>

      <div>
        <div :class="{'icon-audit-pending': status === 0}"></div>
        <div :class="{'icon-audit-fail': status === 1}"></div>
        <div :class="{'icon-audit-success': status === 2}"></div>
      </div>
      <div class="audit-hint">
        <span v-if="status === 0">资料已提交，请等待审核</span>
        <span v-if="status === 1">很遗憾，您的资料没有通过审核</span>
        <!--<span v-if="status === 2">恭喜您！获得 20000 元额度</span>-->
        <span v-if="status === 2">恭喜您！已通过审核</span>
      </div>
    </div>

    <div class="audit-content">
      <div v-if="status === 0" class="audit-pending">
        <p class="color666 title">您的资料已经被加密保存，审核期间暂时不可修改</p>
        <p class="color999">
          一经审核通过，我们将会立即通知您，<br>
          敬请留意手机短信通知，<br>
          或者登录卡还王APP查看审核结果
        </p>
      </div>
      <!--<div v-if="status === 1" class="audit-fail">再次申请>></div>-->
    </div>

    <div class="loan-btn" style="margin-top: 110px;">
      <router-link to="/" class="btn">返回首页</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      back() {
        this.goback()
      }
    },
    computed: {
      status() {
        return this.$store.state.identity.waitAuditStatus
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .waitAudit
    .banner
      width: 100%
      height: 238px
      font-size: 20px
      background-image: url("../../../assets/img/bg-header.png")
      background-repeat: no-repeat
      background-size: 100% 238px
      .icon-audit-pending
        height: 61px
        margin: 48px 0 23px 0
        background-image: url("../../../assets/img/icon_refer.png")
        background-repeat: no-repeat
        background-position: center
        background-size: 56px 61px
      .icon-audit-fail
        height: 61px
        margin: 48px 0 23px 0
        background-image: url("../../../assets/img/icon_fail.png")
        background-repeat: no-repeat
        background-position: center
        background-size: 65px 61px
      .icon-audit-success
        height: 61px
        margin: 48px 0 23px 0
        background-image: url("../../../assets/img/icon_success_big.png")
        background-repeat: no-repeat
        background-position: center
        background-size: 65px 61px
      .audit-hint
        color: #fff
        font-size: 15px
        text-align: center
    .audit-content
      margin-top: 72px
      text-align: center
      .audit-pending
        line-height: 20px
        font-size: 13px
        .title
          margin-bottom: 34px
          font-size: 13px
</style>
