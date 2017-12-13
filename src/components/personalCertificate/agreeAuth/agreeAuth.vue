<template>
  <div class="agreeAuth">
    <mt-header fixed class="header" title="卡还王">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <img class="icon-card" src="../../../assets/img/icon_card.png" alt="">
    <div class="warm-hint color666">
      <span class="title">温馨提示：</span>
      <p>您即将通过卡还王申请最高20000元的贷款额度，额度审批过后您可一次或多次将有效额度提现至您的银行卡中。请确保您在申请过程中提交的资料真实、有效。</p>
      <p>卡还王祝你生活愉快！</p>
    </div>
    <div class="a">
      <input type="checkbox" id="agreeCheckbox" :checked="checked" @click="toggleAgree"> <label for="agreeCheckbox">我同意并知晓</label><router-link to="">《中银消费新易贷-卡还王贷款合同》</router-link><router-link to="">《个人金融信息查询授权书》</router-link><router-link to="">《个人信息查询及使用授权书》</router-link>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="submit" :disabled="!checked">立即申请</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        checked: true
      }
    },
    methods: {
      back() {
        this.goback()
      },
      toggleAgree() {
        this.checked = !this.checked
      },
      submit() {
        let that = this
        this.loading()
        this.app.ApplyAccount(1)
        this.app.ApplyAccountCallBack = function(json) {
          that.closeLoading()
          json = JSON.parse(json)
          console.log(json)
          Toast({
            message: json.Msg,
            duration: 3000
          })
          if (json.Step === 14 && json.Result === 0) {
            that.$store.commit('waitAuditStatusSave', 0)
            that.$router.push('/personalCertificate/waitAudit')
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/base.styl'

  .agreeAuth
    .icon-card
      display: block
      width: 70px
      height: 70px
      margin: 45px auto 38px auto
    .warm-hint
      margin-bottom: 68px
      padding: 0 15px
      line-height: 20px
      font-size: 14px
      .title
        color: main-color
      p
        text-indent: 2em
    .a
      margin-bottom: 108px
      padding: 0 15px
      line-height: 20px
      font-size: 14px
      a
        color: main-color
</style>
