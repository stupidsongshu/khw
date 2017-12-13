<template>
  <div class="forgetPsw">
    <mt-header fixed class="header" title="忘记密码">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="form">
      <div class="form-item">
        <label class="icon icon-phone"></label>
        <input type="number" placeholder="请输入手机号" v-model="mobileNo" oninput=" if(value.length>11)
        {value = value.slice(0,11)}">
      </div>
      <div class="form-item">
        <label class="icon icon-msg"></label>
        <input type="number" placeholder="请输入短信验证码" v-model="vcode" oninput=" if(value.length>4)
        {value = value.slice(0,4)}">
        <label class="form-item-right code" @click="getCode(mobileNo)">发送验证码</label>
      </div>
      <div class="reset-psw-title">请重新设置密码</div>
      <div class="form-item">
        <label class="icon icon-password"></label>
        <input type="password" placeholder="请设置密码" ref="forgetPassword" v-model="pwd">
        <label class="icon-password-show" v-show="showPassword" @click="toggle"></label>
        <label class="icon-password-hide" v-show="!showPassword" @click="toggle"></label>
      </div>

      <div class="loan-btn form-btn">
        <mt-button class="btn" @click="resetPsw">提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        showPassword: false,
        mobileNo: '',
        vcode: '',
        pwd: ''
      }
    },
    methods: {
      back() {
        this.goback()
      },
      toggle() {
        this.$refs['forgetPassword'].focus()
        this.showPassword = !this.showPassword
        if (this.showPassword) {
          this.$refs.forgetPassword.type = 'text'
        } else {
          this.$refs.forgetPassword.type = 'password'
        }
      },
      getCode(mobileNo) {
        this.app.Vcode(mobileNo)
        this.app.VcodeCallBack = function(json) {
          json = JSON.parse(json)
          console.log(json)
          Toast({
            message: json.Msg,
            duration: 3000
          })
        }
      },
      resetPsw() {
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'
  @import '../../assets/css/form.styl'
</style>
