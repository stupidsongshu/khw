<template>
  <div>
    <mt-header fixed class="header" title="安全设置">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="form">
      <router-link class="form-item" to="/modifyLoginPsw">
        <label class="icon icon-password"></label>
        <input type="text" placeholder="修改登录密码" readonly>
        <i class="fa fa-angle-right arrow"></i>
      </router-link>
      <!--<router-link class="form-item" to="/modifyPhone">
        <label class="icon icon-phone"></label>
        <input type="text" placeholder="修改手机号" readonly>
        <i class="fa fa-angle-right arrow"></i>
      </router-link>-->
      <div class="loan-btn form-btn" v-if="isLogin">
        <mt-button class="btn" @click="loginOUt">退出登录</mt-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Toast} from 'mint-ui'

  export default {
    methods: {
      back() {
        this.goback()
      },
      loginOUt() {
        let that = this
        this.app.logon()
        this.app.logonCallBack = function(json) {
          json = JSON.parse(json)
          if (json.Step === 31 && json.Result === 0) {
            // this.$store.commit('loginInfoSave', {
            //   isLogin: false,
            //   mobile: ''
            // })
            Toast({
              message: '退出登录成功',
              duration: 2000
            })
            console.log(window.sessionStorage)
            window.sessionStorage.clear()
            console.log(window.sessionStorage)
            that.$router.push('/')
            that.$store.commit('tabBarActiveIndexSave', 0)
          } else {
            Toast({
              message: '退出登录失败',
              duration: 2000
            })
          }
        }
      }
    },
    computed: {
      isLogin() {
        let loginInfo = JSON.parse(this.app.isLogin())
        if (loginInfo.Step === 0 && loginInfo.Result === 0) { // 已登录
          return true
        } else if (loginInfo.Step === 0 && loginInfo.Result !== 0) { // 未登录
          return false
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'
  @import '../../assets/css/form.styl'
</style>
