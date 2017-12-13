<template>
  <div>
    <!--<mt-header fixed class="header" title="视频认证">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>-->

    <div class="faceRecognition" v-if="videoAuthStep === 0">
      <h1 class="title">请按照界面提示，读一段文字，完成认证视频录制</h1>
      <div class="shot-video" @click="showPopup"></div>
      <p>点击图标进行视频认证</p>
    </div>
    <div class="faceRecognition" v-if="videoAuthStep === 1">
      <h1 class="title">完成认证视频录制</h1>
      <div class="shot-video-success" @click="showPopup">
        <img :src="videoImg" alt="">
      </div>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="submit">提交</mt-button>
    </div>

    <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="true">
      <div class="title color333">常见错误</div>
      <ul class="sup-wrapper color666">
        <li class="sup-item">
          <div class="sup-item-title">1.文字读不全或读错：</div>
          <ul class="sub-wrapper">
            <li class="sub-item">1) “中银消费金融”误读成“中银金融”</li>
            <li class="sub-item">2) “中银消费金融”误读成“中信消费金融”</li>
          </ul>
        </li>
        <li class="sup-item">2.五官不全、衣冠不整（如：赤膊等）</li>
        <li class="sup-item">3.视频模糊（如：环境光线暗、反光）</li>
      </ul>

      <div class="to-shoot" @click="toShoot">前往拍摄>></div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'
  import pcNavHeader from '../../common/pcNavHeader'

  export default {
    data() {
      return {
        popupVisible: false,
        videoImg: this.app.getVOW() ? 'data:image/png;base64,' + this.app.getVOW() : ''
      }
    },
    components: {
      pcNavHeader
    },
    created() {
      if (this.app.getVOW()) {
        this.$store.commit('videoAuthStepSave', 1)
      }
    },
    computed: {
      videoAuthStep() {
        return this.$store.state.identity.videoAuthStep
      }
    },
    methods: {
      back() {
        this.goback()
      },
      showPopup() {
        this.popupVisible = true
      },
      toShoot() {
        let that = this
        this.popupVisible = false
        this.app.vedio()
        this.app.CheckCallBack = function(json) {
          json = JSON.parse(json)
          console.log(json)
          if (json.Step === 8) {
            Toast({
              message: json.Msg,
              duration: 3000
            })
            that.$store.commit('videoAuthStepSave', 1)
            that.videoImg = 'data:image/png;base64,' + json.Img
          }
        }
      },
      submit() {
        let that = this
        this.loading()
        this.app.updateVideo()
        this.app.updateVideoCallBack = function(json) {
          that.closeLoading()
          json = JSON.parse(json)
          console.log(json)
          Toast({
            message: json.Msg,
            duration: 3000
          })
          if (json.Step === 826 && json.Result === 0) {
            // that.$router.push('/personalCertificate/agreeAuth')

            // that.$emit('checkApplyStatus')
            that.applystatus()
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/base.styl'
  @import '../../../assets/css/identity/faceRecognition.styl'

  .mint-popup
    width: 88.8%
    padding: 10px 20px
    border-radius: 10px
    .title
      margin: 22px 0 11px 0
      text-align: center
      font-size: 17px
    .sup-wrapper
      padding-left: 18px
      line-height: 20px
      font-size: 13px
      .sub-wrapper
        padding-left: 1em

    .to-shoot
      display: block
      margin: 38px 0 30px 0
      text-align: center
      color: main-color
      font-size: 17px
</style>
