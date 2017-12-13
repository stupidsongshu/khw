<template>
  <div>
    <mt-header fixed class="header" title="人脸识别">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div v-if="faceRecognitionStep === 0">
      <div class="faceRecognition">
        <h1 class="title">为确保本人操作，来刷个脸吧！</h1>
        <div class="shot-frame" @click="shot">
          <div class="shot"></div>
        </div>
        <p>点击图标进行人脸识别</p>
        <p>请正面对准手机，确保光线充足！</p>
      </div>
    </div>

    <!-- 人脸识别成功 -->
    <div v-if="faceRecognitionStep === 1">
      <div class="faceRecognition">
        <h1 class="title">恭喜您，您的人脸识别已通过！</h1>
        <div class="shot-frame" @click="shot">
          <div class="shot-success">
            <img :src="faceRecognitionImg" alt="">
          </div>
        </div>
      </div>

      <div class="loan-btn">
        <mt-button class="btn" @click="nextStep">下一步</mt-button>
      </div>
    </div>

    <!-- 人脸识别失败 -->
    <div v-if="faceRecognitionStep === 2">
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
        <mt-button class="btn" @click="shot">点击重新拍摄</mt-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        faceRecognitionImg: this.app.getLive() ? 'data:image/png;base64,' + this.app.getLive() : ''
      }
    },
    computed: {
      faceRecognitionStep() {
        return this.$store.state.identity.faceRecognitionStep
      }
    },
    created() {
      if (this.app.getLive()) {
        this.$store.commit('faceRecognitionStepSave', 1)
      }
    },
    methods: {
      back() {
        this.goback()
      },
      nextStep() {
        this.$router.push('/personalCertificate')
      },
      shot() {
        let that = this
        this.app.livingCheck()
        this.app.CheckCallBack = function(json) {
          json = JSON.parse(json)
          console.log(json)
          if (json.Step === 4 && json.Result === 0) {
            that.loading(json.Msg)
          } else if (json.Step === 4 && json.Result !== 0) {
            Toast({
              message: json.Msg,
              duration: 3000
            })
            that.$store.commit('faceRecognitionStepSave', 2)
          }
          if (json.Step === 5 && json.Result === 0) {
            that.closeLoading()
            Toast({
              message: json.Msg,
              duration: 3000
            })
            that.$store.commit('faceRecognitionStepSave', 1)
            that.faceRecognitionImg = 'data:image/png;base64,' + json.Img
          } else if (json.Step === 5 && json.Result !== 0) {
            that.closeLoading()
            Toast({
              message: json.Msg,
              duration: 3000
            })
            that.$store.commit('faceRecognitionStepSave', 2)
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/identity/faceRecognition.styl'
</style>
