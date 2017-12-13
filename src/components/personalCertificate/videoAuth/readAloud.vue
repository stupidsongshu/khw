<template>
  <div class="readAloud no-header">
    <div class="text-wrapper">
      <div class="text-top">
        <span class="main-color">请大声朗读以下文字</span>
        <mt-button class="startReadBtn">开始朗读</mt-button>
      </div>
      <div class="txt-block-wrapper color333">
        <span class="txt-block">本</span>
        <span class="txt-block">人</span>
        <span class="txt-block">自</span>
        <span class="txt-block">愿</span>
        <span class="txt-block">向</span>
        <span class="txt-block">中</span>
        <span class="txt-block">银</span>
        <span class="txt-block">消</span>
        <span class="txt-block">费</span>
        <span class="txt-block">金</span>
        <span class="txt-block">融</span>
        <span class="txt-block">申</span>
        <span class="txt-block">请</span>
        <span class="txt-block">贷</span>
        <span class="txt-block">款</span>
        <span class="txt-block">，</span>
        <span class="txt-block">提</span>
        <span class="txt-block">供</span>
        <span class="txt-block">真</span>
        <span class="txt-block">实</span>
        <span class="txt-block">资</span>
        <span class="txt-block">料</span>
        <span class="txt-block">，</span>
        <span class="txt-block">遵</span>
        <span class="txt-block">守</span>
        <span class="txt-block">合</span>
        <span class="txt-block">约</span>
        <span class="txt-block">，</span>
        <span class="txt-block">同</span>
        <span class="txt-block">意</span>
        <span class="txt-block">上</span>
        <span class="txt-block">报</span>
        <span class="txt-block">征</span>
        <span class="txt-block">信</span>
        <span class="txt-block">。</span>
      </div>

      <div class="input-item-hint">
        <div>
          <span class="icon-caution"></span><span>文字读错，画面不清晰，将导致贷款申请失败</span>
        </div>
      </div>
    </div>

    <div class="face">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/base.styl'
  @import '../../../assets/css/identity/personalCertificate.styl'

  .readAloud
    display: flex
    flex-direction: column
    width: 100%
    height: 100%
    .text-wrapper
      width: 100%
      height: 207px
      flex-basis: 207px
      padding: 24px 15px 0 15px
      font-size: 15px
      background-color: #fff
      .text-top
        display: flex
        justify-content: space-between
        margin-bottom: 20px
        .startReadBtn
          width: 85px
          height: 25px
          font-size: 14px
          color: #fff
          outline: none
          background-color: main-bgColor
      .txt-block-wrapper
        font-size: 0
        .txt-block
          display: inline-block
          width: 26px
          height: 27px
          margin-bottom: 11px
          margin-right: 3px
          text-align: center
          line-height: 27px
          font-size: 15px
          background: url("../../../assets/img/matt.png") no-repeat
          background-size: 26px 27px
          &:nth-child(12n)
            margin-right: 0
      .input-item-hint
        height: auto
        padding: 0

    .face
      flex-grow: 1
      width: 100%
      height: 100%
      background-color: #4f4f4f
</style>
