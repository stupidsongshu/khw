<template>
  <div class="register">
    <mt-header fixed class="header" title="注册">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="form">
      <div class="form-item">
        <label class="icon icon-phone"></label>
        <input type="number" placeholder="请输入手机号" v-model="mobileno" oninput=" if(value.length>11)
        {value = value.slice(0,11)}">
      </div>
      <div class="form-item">
        <label class="icon icon-password"></label>
        <input type="password" placeholder="密码为6-12位数字和字母组合" ref="psw" v-model="pwd">
        <label class="icon-password-show" v-show="showPassword" @click="toggle"></label>
        <label class="icon-password-hide" v-show="!showPassword" @click="toggle"></label>
      </div>
      <div class="form-item">
        <label class="icon icon-msg"></label>
        <input type="text" placeholder="请输入短信验证码" v-model="vcode" oninput=" if(value.length>4)
        {value = value.slice(0,4)}">
        <label class="form-item-right code" @click="getCode" v-if="!hasGetCode">发送验证码</label>
        <label class="form-item-right code" v-if="hasGetCode">{{time}}s后重新获取</label>
      </div>

      <div class="loan-btn form-btn">
        <mt-button class="btn" @click="register">注册</mt-button>
      </div>

      <div class="hint">
        已有账号？<router-link to="/login">登录</router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//  import axios from 'axios'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        showPassword: false,
        mobileno: '',
        pwd: '',
        vcode: '',
        channel: 'maimob',
        invitorMobileNo: '',
        hasGetCode: false,
        time: 60
      }
    },
    created() {
      console.log(sessionStorage)
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
      getCode() {
        var that = this
        this.loading()
        this.app.Vcode(this.mobileno)
        this.app.VcodeCallBack = function(json) {
          that.closeLoading()
          json = JSON.parse(json)
          console.log(json)
          Toast({
            message: json.Msg,
            duration: 3000
          })
          if (json.Step === 1 && json.Result === 0) {
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
      register() {
        let that = this
        this.loading()
        this.app.register(this.mobileno, this.pwd, this.vcode, this.channel, this.invitorMobileNo)
        this.app.RegisterCallBack = function(json) {
          that.closeLoading()
          json = JSON.parse(json)
          console.log(json)
          Toast({
            message: json.Msg,
            duration: 3000
          })
          if (json.Step === 2 && json.Result === 0) {
            that.$router.push('/login')
          }
        }

       // axios.post('http://xfjr.ledaikuan.cn:9191/khw/c/a', {
       //   mobileNo: this.mobileno,
       //   password: this.pwd,
       //   yzm: this.vcode,
       //   channel: 'maimob'
       // }).then(function(response) {
       //   console.log(response)
       // }).catch(function(error) {
       //   console.log(error)
       // })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'
  @import '../../assets/css/form.styl'
</style>
