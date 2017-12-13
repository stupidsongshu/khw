<template>
  <div class="shot no-header">
    <div class="shot-bg">

    </div>
    <div class="shot-hint">
      <div class="shot-title">
        <span>请闭眼，随后睁眼</span>
        <div class="shot-time">5s</div>
      </div>
      <div class="hint-animation">
        <img src="../../../assets/img/oliveapp_eyeclose.gif" alt="">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shot
    width: 100%
    height: 100%
    background-color: #fff
    .shot-bg
      width: 100%
      height: 418px
      background: url("../../../assets/img/shot_bg.png") no-repeat
      background-size: 100% 418px
      /*background-size: 100% 617px*/
    .shot-hint
      width: 100%
      padding-top: 18px
      .shot-title
        position: relative
        margin-bottom: 37px
        text-align: center
        color: #666
        font-size: 15px
      .shot-time
        position: absolute
        top: 50%
        right: 15px
        width: 48px
        height: 25px
        transform: translateY(-50%)
        line-height: 25px
        text-align: center
        border-radius: 5px
        color: #fff
        background-color: #bcbcbc
      .hint-animation
        width: 132px
        height: 132px
        margin: 0 auto
        border-radius: 50%
        overflow: hidden
        img
          width: 100%
          height: 100%
</style>
