<template>
  <div>
    <!--<mt-header fixed class="header" title="个人认证">
      <router-link slot="left" to="/">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>-->

    <!--<pc-nav-header :curProgress="1"></pc-nav-header>-->

    <div class="identity-nav" v-if="!applyQualificationAuthStatus">
      <div class="identity-slide">
        <span class="active">身份信息</span>
      </div>
      <div class="identity-slide">
        <span>银行卡信息</span>
      </div>
      <div class="identity-slide">
        <span>基本信息</span>
      </div>
    </div>

    <transition name="slide">
      <div class="id-card" ref="idCard">
        <h1 class="title">拍摄身份证</h1>
        <ul class="shot-wrapper">
          <li class="shot-item" @click="showExampleL">
            <div class="idCard-outer">
              <!--<img v-show="idFrontApplyQualificationAuthStep === 0 " src="../../../assets/img/shot_face.png" alt="">
              <img v-show="idFrontApplyQualificationAuthStep === 60 || idFrontApplyQualificationAuthStep === 70 || idFrontApplyQualificationAuthStep === 8110 || idFrontApplyQualificationAuthStep === 8111" :src="idcardFrontImg" alt="">-->
              <img ref="idcardFront_img" src="../../../assets/img/shot_face.png" alt="">
              <div class="idCard-inner">
                <img v-show="idFrontShow === 1" src="../../../assets/img/icon_idCard_return.png" alt="">
                <img v-show="idFrontShow === 2" src="../../../assets/img/icon_idCard_change.png" alt="">
                <img v-show="idFrontShow === 3" src="../../../assets/img/icon_idCard_pass.png" alt="">
              </div>
            </div>

            <span class="explain">身份证正面{{idFrontShow}}</span>
          </li>
          <li class="shot-item" @click="showExampleR">
            <div class="idCard-outer">
              <!--<img v-show="idBackApplyQualificationAuthStep === 0" src="../../../assets/img/shot_back.png" alt="">
              <img v-show="idBackApplyQualificationAuthStep === 60 || idBackApplyQualificationAuthStep === 70 || idBackApplyQualificationAuthStep === 8110 || idBackApplyQualificationAuthStep === 8111" :src="idcardBackImg" alt="">
              -->
              <img ref="idcardBack_img" src="../../../assets/img/shot_back.png" alt="">
              <div class="idCard-inner">
                <img v-show="idBackShow === 1" src="../../../assets/img/icon_idCard_return.png" alt="">
                <img v-show="idBackShow === 2" src="../../../assets/img/icon_idCard_change.png" alt="">
                <img v-show="idBackShow === 3" src="../../../assets/img/icon_idCard_pass.png" alt="">
              </div>
            </div>
            <span class="explain">身份证反面{{idBackShow}}</span>
          </li>
        </ul>
      </div>
    </transition>

    <div class="input-item-hint">
      <div class="caution-wrapper">
        <span class="icon-caution"></span><span>请确保身份证和登录手机号码实名认证一致</span>
      </div>
      <!--<div class="arrow-wrapper">
        <router-link to="/modifyPhone" class="main-color">修改手机号</router-link>
        <span class="fa fa-angle-right arrow-right"></span>
      </div>-->
    </div>

    <div class="input-item">
      <div class="input-item-l">
        <span class="name">姓名</span>
        <input class="input" type="text" placeholder="真实姓名" v-model="idcardFrontName" readonly>
      </div>
      <div class="input-item-r" v-if="idcardFrontIdentifyStatus">
        <i class="icon-shoot-success"></i>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">身份证号</span>
        <input class="input" type="text" placeholder="身份证号码" v-model="idcardFrontId" readonly>
      </div>
      <div class="input-item-r" v-if="idcardFrontIdentifyStatus">
        <i class="icon-shoot-success"></i>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">身份证号</span>
        <input class="input" type="text" placeholder="仅供测试用，一定要先填写后拍照" v-model="idcardFrontIdTest" v-on:focus="focus" v-on:blur="blur">
      </div>
    </div>

    <router-link class="input-item" to="/personalCertificate/faceRecognition" style="margin-top: 17px;">
      <div class="input-item-l">
        <span class="name">活体识别</span>
        <input class="input" type="text" placeholder="前往拍摄" readonly>
      </div>
      <div class="input-item-r">
        <i class="fa fa-angle-right" v-if="faceRecognitionStep !== 1"></i>
        <i class="icon-shoot-success" v-if="faceRecognitionStep === 1"></i>
      </div>
    </router-link>

    <div class="loan-btn" style="margin-top: 42px;">
      <mt-button class="btn" @click="submit" :disabled="!applyQualificationAuthStatus">提交</mt-button>
      <!--<mt-button class="btn" @click="submit">提交</mt-button>-->
    </div>

    <mt-popup v-model="popupVisibleL" popup-transition="popup-fade" closeOnClickModal="true">
      <div class="sample-correct">
        <span class="title">正确示例</span>
        <img class="correct-img" src="../../../assets/img/sample_face_correct.png" alt="">
      </div>
      <div class="sample-error">
        <span class="title">错误示例</span>
        <div class="error-img-wrapper">
          <div class="error-img-wrapper-l">
            <img class="error-img" src="../../../assets/img/sample_face_wrong_1.png" alt="">
            <div class="txt">图像模糊</div>
          </div>
          <div class="error-img-wrapper-r">
            <img class="error-img" src="../../../assets/img/sample_face_wrong_2.png" alt="">
            <div class="txt">图像不全</div>
          </div>
        </div>
      </div>
      <div class="to-shoot" @click="idcardFront">前往拍摄>></div>
    </mt-popup>
    <mt-popup v-model="popupVisibleR" popup-transition="popup-fade" closeOnClickModal="true">
      <div class="sample-correct">
        <span class="title">正确示例</span>
        <img class="correct-img" src="../../../assets/img/sample_back_correct.png" alt="">
      </div>
      <div class="sample-error">
        <span class="title">错误示例</span>
        <div class="error-img-wrapper">
          <div class="error-img-wrapper-l">
            <img class="error-img" src="../../../assets/img/sample_back_wrong_1.png" alt="">
            <div class="txt">图像模糊</div>
          </div>
          <div class="error-img-wrapper-r">
            <img class="error-img" src="../../../assets/img/sample_back_wrong_2.png" alt="">
            <div class="txt">图像不全</div>
          </div>
        </div>
      </div>
      <div class="to-shoot" @click="idcardBack">前往拍摄>></div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'
  import pcNavHeader from '../../common/pcNavHeader'

  export default {
    components: {
      pcNavHeader
    },
    data() {
      return {
        popupVisibleL: false,
        popupVisibleR: false,
        idcardFrontImg: '',
        idcardBackImg: '',
        // idcardFrontName: this.storageTextData.idCard ? this.storageTextData.idCard.customerName : '',
        // idcardFrontId: this.storageTextData.idCard ? this.storageTextData.idCard.idNo : '',
        idcardFrontName: '',
        idcardFrontId: '',
        idcardFrontIdTest: ''
      }
    },
    // props: {
    //   storageTextData: {
    //     type: Object
    //   }
    // },
    mounted() {
      this.storageTextData = this.$emit('storageTextData')
      console.log(this.storageTextData)
      if (this.storageTextData.idCard) {
        this.idcardFrontName = this.storageTextData.idCard.customerName
        this.idcardFrontId = this.storageTextData.idCard.idNo
      }

      let that = this
      let isshow = true
      if (that.storageTextData.errorid && that.storageTextData.idCard && that.storageTextData.idCard.idNo) {
        if (that.storageTextData.errorid === that.storageTextData.idCard.idNo) {
          that.$store.commit('idFrontShowSave', 2)
          that.$store.commit('idBackShowSave', 2)
          isshow = false
        }
      }

      // let idFile = that.app.getIdFile()
      // let idBackFile = that.app.getIdBackFile()

      let idFile = that.app.idf
      let idBackFile = that.app.idb
      // alert(idFile.length + '     ' + idBackFile.length)
      if (that.storageTextData.idCard && !that.storageTextData.idCard.idNo) {
        if (idFile) {
          that.$store.commit('idFrontShowSave', 1)
        }
        if (idBackFile) {
          that.$store.commit('idBackShowSave', 1)
        }
      }

      if (that.$store.state.identity.idFrontApplyQualificationAuthStep === 8110) {
        that.$store.commit('idFrontShowSave', 3)
        that.$store.commit('idBackShowSave', 3)
      }

      if (that.sign > 822) {
        that.$store.commit('idFrontShowSave', 3)
        that.$store.commit('idBackShowSave', 3)
      }

      // 身份证正面
      if (idFile) {
        that.$refs.idcardFront_img.src = 'data:image/png;base64,' + idFile
        if (isshow && that.sign === 822) {
          that.$store.commit('idFrontShowSave', 1)
        }
      }
      // 身份证反面
      if (idBackFile) {
        that.$refs.idcardBack_img.src = 'data:image/png;base64,' + idBackFile
        if (isshow && that.sign === 822) {
          that.$store.commit('idBackShowSave', 1)
        }
      }
      // 活体识别
      if (that.app.getLive()) {
        that.$store.commit('faceRecognitionStepSave', 1)
      }
    },
    computed: {
      idFrontShow() {
        return this.$store.state.identity.idFrontShow
      },
      idBackShow() {
        return this.$store.state.identity.idBackShow
      },
      sign() {
        return this.$store.state.identity.sign
      },
      applyQualificationAuthStatus() {
        return this.$store.state.identity.applyQualificationAuthStatus
        // return true
      },
      idFrontApplyQualificationAuthStep() {
        return this.$store.state.identity.idFront_applyQualificationAuthStep
      },
      idBackApplyQualificationAuthStep() {
        return this.$store.state.identity.idBack_applyQualificationAuthStep
      },

      // 正面拍摄完成返回本地图片状态
      idcardFrontShotStatus() {
        return this.$store.state.identity.idcardFront_shotStatus
      },
      // 服务器识别状态
      idcardFrontIdentifyStatus() {
        return this.$store.state.identity.idcardFront_identifyStatus
      },

      // 反面拍摄完成返回本地图片状态
      idcardBackShotStatus() {
        return this.$store.state.identity.idcardBack_shotStatus
      },
      // 服务器识别状态
      idcardBackIdentifyStatus() {
        return this.$store.state.identity.idcardBack_identifyStatus
      },
      // idcardBackImg: {
      //   // return this.$store.state.identity.idcardBack_img
      //   get: function() {
      //     let idCard = this.app.getIdBackFile()
      //     if (idCard !== '') {
      //       this.$store.commit('idcardBackShotStatusSave', true)
      //       return 'data:image/png;base64,' + idCard
      //     }
      //   },
      //   set: function() {}
      // },
      faceRecognitionStep() {
        return this.$store.state.identity.faceRecognitionStep
      }
    },
    methods: {
      focus() {
        // let that = this
        // setTimeout(function() {
        //   let pannel = that.$refs.idcardFrontInfoName
        //   pannel.scrollIntoView(true)
        //   pannel.scrollIntoViewIfNeeded()
        // }, 200)
        let el = this.$refs.idCard
        el.style.display = 'none'
        this.$store.commit('toggleViewSave', {
          status: true,
          target: [el]
        })
      },
      blur() {
        // 仅供测试改身份证号用
        this.app.updateIdCard('', this.idcardFrontIdTest)
        // 仅供测试改身份证号用
      },
      showExampleL() {
        this.popupVisibleL = true
      },
      showExampleR() {
        this.popupVisibleR = true
      },
      idcardFront() {
        this.$store.commit('idFrontIsOpetateSave', true)
        let that = this
        this.popupVisibleL = false
        this.app.idcardFront()
        this.app.IdcardFrontCallBack = function(json) {
          json = JSON.parse(json)
          console.log(json)
          if (json.Step === 6 && json.Result === 0 && json.IdCardType === 0) {
            that.loading(json.Msg)
            // 正面拍摄完成返回本地图片状态
            that.$store.commit('idFrontApplyQualificationAuthStepSave', 60)
            that.$refs.idcardFront_img.src = 'data:image/png;base64,' + json.Img
            that.$store.commit('idFrontShowSave', 0)
          }
          if (json.Step === 7 && json.Result === 0 && json.IdCardType === 0) {
            that.closeLoading()
            that.idcardFrontName = json.Name
            that.idcardFrontId = json.Id
            // 服务器识别状态
            that.$store.commit('idcardFrontIdentifyStatusSave', true)
            that.$store.commit('idFrontApplyQualificationAuthStepSave', 70)
          } else if (json.Step === 7 && json.Result !== 0 && json.IdCardType === 0) {
            that.closeLoading()
            that.$store.commit('idcardFrontIdentifyStatusSave', false)
            // that.$store.commit('idFrontApplyQualificationAuthStepSave', 71)
            that.$store.commit('idFrontShowSave', 1)
            Toast({
              message: json.Msg,
              duration: 3000
            })
          }
        }
      },
      idcardBack() {
        let that = this
        this.popupVisibleR = false
        this.app.idcardBack()
        this.app.IdcardBackCallBack = function(json) {
          json = JSON.parse(json)
          console.log(json)
          if (json.Step === 6 && json.Result === 0 && json.IdCardType === 1) {
            that.loading(json.Msg)
            // 反面拍摄完成返回本地图片状态
            that.$store.commit('idBackApplyQualificationAuthStepSave', 60)
            that.$refs.idcardBack_img.src = 'data:image/png;base64,' + json.Img
            that.$store.commit('idBackShowSave', 0)
          }
          if (json.Step === 7 && json.Result === 0 && json.IdCardType === 1) {
            that.closeLoading()
            // 服务器识别状态
            that.$store.commit('idcardBackIdentifyStatusSave', true)
            that.$store.commit('idBackApplyQualificationAuthStepSave', 70)
          } else if (json.Step === 7 && json.Result !== 0 && json.IdCardType === 1) {
            that.closeLoading()
            that.$store.commit('idcardBackIdentifyStatusSave', true)
            // that.$store.commit('idBackApplyQualificationAuthStepSave', 71)
            that.$store.commit('idBackShowSave', 1)
            Toast({
              message: json.Msg,
              duration: 3000
            })
          }
        }
      },
      submit() {
        let that = this
        this.loading()
        this.app.updateIdCard()
        this.app.UpdateIdCardCallBack = function(json) {
          that.closeLoading()
          json = JSON.parse(json)
          console.log(json)
          if (json.Step === 811 && json.Result === 0) {
            // that.$router.push('/personalCertificate/bankCardInfo')
            // that.$store.commit('personalCertificateSwiperProgressSave', 2)

            // that.$emit('checkapplystatus')
            that.applystatus()
          } else if (json.Step === 811 && json.Result !== 0) {
            Toast({
              message: json.Msg,
              duration: 3000
            })
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/base.styl'
  @import '../../../assets/css/identity/personalCertificate.styl'

  .identity-nav
    display: flex
    align-items: center
    width: 100%
    height: 42px
    color: #999
    font-size: 13px
    background-color: #fff
    .identity-slide
      flex: 1
      height: 100%
      text-align: center
      span
        display: inline-block
        height: 100%
        line-height: 42px
        padding: 0 2px
        &.active
          color: main-color
          border-bottom: 1px solid main-color

  .id-card
    margin-top: 13px
    padding: 0 15px
    background-color: #fff
    .title
      line-height: 37px
      color: #666
      font-size: 14px
    .shot-wrapper
      display: flex
      .shot-item
        position: relative
        flex: 1
        display:flex
        flex-direction: column
        width: 167px
        /*height: 106px*/
        margin-right: 12px
        text-align: center
        &:last-child
          margin: 0
        img
          width: 100%
          height: 100%
        .idCard-outer
          position: relative
          width: 100%
          height: 100%
          .idCard-inner
            position: absolute
            top: 50%
            left: 50%
            width: 82px
            height: 68px
            transform: translate(-50%, -50%)
            z-index: 99
        .explain
          display: inline-block
          margin: 10px 0 15px 0
          color: #999
          font-size: 13px

  .mint-popup
    width: 88.8%
    padding: 10px 20px
    text-align: center
    border-radius: 10px
    .title
      position: relative
      display: inline-block
      margin: 22px 0 11px 0
      text-align: center
      color: #333
      font-size: 14px
      &:before
        position: absolute
        content: ''
        left: -20px
        top: 50%
        width: 10px
        border-bottom: 1px solid #666
      &:after
        position: absolute
        content: ''
        right: -20px
        top: 50%
        width: 10px
        border-bottom: 1px solid #666
    .sample-correct
      .correct-img
        display: block
        width: 180px
        height: 115px
        margin: 0 auto
    .sample-error
      .error-img-wrapper
        display: flex
        justify-content: space-between
        .error-img
          width: 139px
          height: 88px
        .txt
          margin-top: 9px
          color: #999
          font-size: 11px
    .to-shoot
      margin: 50px 0 30px 0
      color: main-color
      font-size: 17px
</style>
