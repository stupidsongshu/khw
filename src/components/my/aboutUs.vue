<template>
  <div class="aboutUs">
    <mt-header fixed class="header" title="关于我们">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div>
      <img class="logo" src="../../assets/img/icon_logo.png" width="88" height="88" alt="">
      <p class="desc">卡还王是麦广互娱与中银消费金融联合推出的信用卡代还互联网金融服务，帮助年轻人维护信用而生的贷款神奇。</p>
      <p class="desc">全程线上完成，超高额度，期限灵活，快速还清信用卡账单，分期手续费最低每期0.3%，卡还王助理信用启航，成就品质生活。</p>
    </div>
    <ul class="list">
      <li class="item">
        <div class="name">版本信息</div>
        <div>V1.0.1</div>
      </li>
      <li class="item">
        <div class="name">官方网站</div>
        <div class="link">www.kahuangwang.com</div>
      </li>
      <li class="item">
        <div class="name">版本信息</div>
        <div>中银消费金融</div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      back() {
        this.goback()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/css/base.styl"

  .aboutUs
    .logo
      display: block
      margin: 30px auto 34px auto
    .desc
      padding: 0 15px
      line-height: 20px
      text-indent: 2em
      color: #666
      font-size: 13px
    .list
      margin-top: 39px
      .item
        width: 100%
        height: 54px
        line-height: 54px
        padding-left: 15px
        color: #333
        font-size: 14px
        border-bottom: 1px solid #e5e5e5
        background-color: #fff
        div
          display: inline-block
          &.name
            margin-right: 25px
          &.link
            color: main-color
</style>
