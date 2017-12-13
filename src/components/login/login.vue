<template>
  <div class="login">
    <mt-header fixed class="header" title="登录">
      <router-link to="/my" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="form">
      <div class="login-type">
        <button class="border-1px" @click="selectLoginType(0)" :class="{active: loginIndex === 0}">密码登录</button>
        <button class="border-1px" @click="selectLoginType(2)" :class="{active: loginIndex === 2}">验证码登录</button>
      </div>

      <div v-if="loginIndex === 0">
        <div class="form-item">
          <label class="icon icon-phone"></label>
          <input class="border-1px" type="number" placeholder="请输入手机号" v-model="mobileNo1" oninput=" if(value.length>11)
        {value = value.slice(0,11)}">
        </div>
        <div class="form-item">
          <label class="icon icon-password"></label>
          <input type="password" placeholder="请输入密码" v-model="psw">
          <router-link class="form-item-right" to="/forgetPsw">忘记密码？</router-link>
        </div>
        <div class="loan-btn form-btn">
          <mt-button class="btn" @click="login(mobileNo1, psw, 0)">登录</mt-button>
        </div>
      </div>

      <div v-if="loginIndex === 2">
        <div class="form-item">
          <label class="icon icon-phone"></label>
          <input type="number" placeholder="请输入手机号" v-model="mobileNo2" oninput=" if(value.length>11)
        {value = value.slice(0,11)}">
        </div>
        <div class="form-item">
          <label class="icon icon-msg"></label>
          <input type="number" placeholder="请输入短信验证码" v-model="code" oninput=" if(value.length>4)
        {value = value.slice(0,4)}">
          <label class="form-item-right code" @click="getCode(mobileNo2)" v-if="!hasGetCode">发送验证码</label>
          <label class="form-item-right code" v-if="hasGetCode">{{time}}s后重新获取</label>
        </div>
        <div class="loan-btn form-btn">
          <mt-button class="btn" @click="login(mobileNo2, code, 2)">登录</mt-button>
        </div>
      </div>

      <div class="hint">
        没有账号？<router-link to="/register">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        loginIndex: 0,
        mobileNo1: '',
        mobileNo2: '',
        psw: '',
        code: '',
        hasGetCode: false,
        time: 60
      }
    },
    created() {
      console.log(sessionStorage)
    },
    methods: {
      selectLoginType(index) {
        this.loginIndex = index
      },
      getCode(mobileNo2) {
        var that = this
        this.loading()
        this.app.Vcode(mobileNo2)
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
      /**
       * 登录
       * @param mobileNo: 手机号
       * @param num: 密码或验证码
       * @param loginType: 0密码登录 2验证码登录
       */
      login(mobileNo, num, loginType) {
        let that = this
        that.loading()
        this.app.login(mobileNo, num, loginType)
        this.app.LoginCallBack = function(json) {
          that.closeLoading()
          console.log(json)
          json = JSON.parse(json)
          console.log(json)
          Toast({
            message: json.Msg,
            duration: 3000
          })
          if (json.Result === 0 && json.Step === 3) {
            // let loginInfo = JSON.parse(that.app.isLogin())
            // that.$store.commit('loginInfoSave', {
            //   isLogin: true,
            //   mobile: loginInfo.Mobile
            // })
            that.$store.commit('tabBarActiveIndexSave', 0)
            that.$router.push('/')
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'
  @import '../../assets/css/form.styl'
</style>
