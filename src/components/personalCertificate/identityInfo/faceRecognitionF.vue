<template>
  <div>
    <mt-header fixed class="header" title="人脸识别">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="faceRecognition">
      <h1 class="title">很遗憾，您的人脸识别未通过！</h1>
      <div class="shot-frame">
        <div class="shot-fail"></div>
      </div>
      <h1 class="title">请重新进行人脸识别</h1>
      <div class="conditions">
        <div>1.请将脸放在指定范围内</div>
        <div>2.请保持正对手机，保证光线明亮</div>
      </div>
      <div class="conditions">
        <div>3.请按照系统提示标准作出动作</div>
        <div>4.请保证良好的网络环境</div>
      </div>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="nextStep">点击重新拍摄</mt-button>
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
