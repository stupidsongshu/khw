<template>
  <div>
    <mt-header fixed class="header" title="修改登录密码">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="form">
      <div class="form-item">
        <label class="icon icon-phone"></label>
        <input type="number" placeholder="请输入手机号" readonly v-model="mobile">
      </div>
      <div class="form-item">
        <label class="icon icon-msg"></label>
        <input type="text" placeholder="请输入短信验证码" v-model="code" oninput=" if(value.length>4)
        {value = value.slice(0,4)}">
        <label class="form-item-right code" @click="getCode(mobile)" v-if="!hasGetCode">发送验证码</label>
        <label class="form-item-right code" v-if="hasGetCode">{{time}}s后重新获取</label>
      </div>
      <div class="reset-psw-title">请重新设置密码</div>
      <div class="form-item">
        <label class="icon icon-password"></label>
        <input type="password" placeholder="密码为6-12位数字和字母组合" ref="psw">
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
        mobile: '',
        code: '',
        hasGetCode: false,
        time: 60
      }
    },
    methods: {
      back() {
        this.goback()
      },
      toggle() {
        this.showPassword = !this.showPassword
        if (this.showPassword) {
          this.$refs.psw.type = 'text'
        } else {
          this.$refs.psw.type = 'password'
        }
      },
      getCode(mobile) {
        var that = this
        this.loading()
        this.app.Vcode(mobile)
        this.app.VcodeCallBack = function(json) {
          that.closeLoading()
          json = JSON.parse(json)
          console.log(json)
          Toast({
            message: json.Msg,
            duration: 3000
          })
          if (json.Step === 3 && json.Result === 0) {
            that.hasGetCode = true
            var timer = setInterval(() => {
              that.time --
              if (that.time === 0) {
                that.hasGetCode = false
                that.time = 60
                clearInterval(timer)
              }
            }, 1000)
          }
        }
      },
      resetPsw() {}
    },
    created() {
      let loginInfo = JSON.parse(this.app.isLogin())
      if (loginInfo.Step === 0 && loginInfo.Result === 0) { // 已登录
        this.mobile = loginInfo.Mobile
      } else if (loginInfo.Step === 0 && loginInfo.Result !== 0) { // 未登录
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'
  @import '../../assets/css/form.styl'
</style>
