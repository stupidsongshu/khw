<template>
  <div class="survey no-header">
    <div class="logo"></div>

    <div class="survey-triangle">
      <p>
        您还需要完成一份调查问卷哦<br>
        请您认真如实填写<br>
        否则将会影响您的借款结果
      </p>
    </div>

    <div class="survey-start" @click="surveyStart"></div>

    <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="true">
      <div class="survey-popup-title">温馨提示</div>
      <div class="survey-popup-content"></div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        popupVisible: false
      }
    },
    methods: {
      surveyStart() {
        this.popupVisible = true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'

  .survey
    position: relative
    width: 100%
    /*min-height: 667px*/
    /*min-height: 666px*/
    min-height: 666px
    padding-top: 66px
    background: url('../../assets/img/survey_bg.png') no-repeat
    background-size: contain
    .logo
      width: 82px
      height: 62px
      margin: 0 auto
      background: url('../../assets/img/survey_logo.png') no-repeat
      background-size: 100%
    .survey-triangle
      display: flex
      justify-content: center
      align-items: center
      width: 286px
      height: 238px
      margin: 78px auto 0 auto
      background: url('../../assets/img/survey_title.png') no-repeat
      background-size: 100%
      p
        line-height: 24px
        text-align: center
        color: #fff
        font-size: 14px
    .survey-start
      width: 106px
      height: 20px
      margin: 88px auto 0 auto
      background: url('../../assets/img/survey_button.png') no-repeat
      background-size: 100%
    .mint-popup
      width: 240px
      height: 246px
      top: 198px
      text-align: center
      background-color: #fff
      .survey-popup-title
        display: flex
        justify-content: center
        align-items: center
        width: 100%
        height: 54px
        color: #fff
        font-size: 22px
        background-color: main-color;
      .survey-popup-content
        background-color: #f00
</style>
