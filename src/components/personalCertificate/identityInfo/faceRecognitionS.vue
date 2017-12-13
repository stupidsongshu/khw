<template>
  <div>
    <mt-header fixed class="header" title="人脸识别">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="faceRecognition">
      <h1 class="title">恭喜您，您的人脸识别已通过！</h1>
      <div class="shot-frame">
        <div class="shot-success">
          <img src="../../../assets/img/shot_success.png" alt="">
        </div>
      </div>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="nextStep">下一步</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      back() {
        this.goback()
      },
      nextStep() {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/identity/faceRecognition.styl'
</style>
