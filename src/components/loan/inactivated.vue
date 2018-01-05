<template>
  <div class="inactivated no-header">
    <div class="banner">
      <mt-header class="title" title="卡还王">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>

      <div>
        <div class="icon-audit-inactivated"></div>
      </div>
      <div class="audit-hint">
        <span>对不起，您的账户已注销</span>
      </div>
    </div>

    <div class="audit-content">
      <p class="audit-inactivated">
          亲爱的用户，<br>
          由于您超过3个月没有进行消费用款，<br>
          以致于您的账户被系统注销，<br>
          对此我们感到十分抱歉
      </p>
    </div>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .inactivated
    .banner
      width: 100%
      height: 238px
      font-size: 20px
      background-image: url("../../assets/img/bg-header.png")
      background-repeat: no-repeat
      background-size: 100% 238px
      .icon-audit-inactivated
        height: 61px
        margin: 48px 0 23px 0
        background-image: url("../../assets/img/icon_inactivated.png")
        background-repeat: no-repeat
        background-position: center
        background-size: 56px 61px
      .audit-hint
        color: #fff
        font-size: 15px
        text-align: center
    .audit-content
      margin-top: 72px
      text-align: center
      .audit-inactivated
        line-height: 20px
        font-size: 13px
        .title
          margin-bottom: 34px
          font-size: 13px
</style>
