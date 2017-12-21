<template>
  <!--<div id="app" :class="{'has-footer': footer}">-->
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <router-view class="child-view"></router-view>
    </transition>
    <!--<transition-gruop :name="transitionName" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" v-on:checkApplyStatus="applyStatus"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" v-on:checkApplyStatus="applyStatus"></router-view>
    </transition-gruop>-->

    <!--<tab-bar :hasFooter="footer"></tab-bar>-->
  </div>
</template>

<script>
  // import { MessageBox } from 'mint-ui'
  // import { Toast } from 'mint-ui'
  // import tabBar from './components/common/tabbar.vue'

  export default {
    name: 'app',
    data() {
      return {
        transitionName: 'slide-left'
      }
    },
    // components: {
    //   'tab-bar': tabBar
    // },
    computed: {
      footer() {
        return this.$store.state.common.hasFooter
      }
    },
    // dynamically set transition based on route change
    watch: {
      '$route'(to, from) {
        // let toPath = to.path

        // const toDepth = to.path.split('/').length
        // const fromDepth = from.path.split('/').length
        // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'

        /**
         * fix 点击设备物理返回键 tabBar 显示
         */
        // if (toPath === '/') {
        //   this.$store.commit('tabBarActiveIndexSave', 0)
        // } else if (toPath === '/repay') {
        //   this.$store.commit('tabBarActiveIndexSave', 1)
        // } else if (toPath === '/my') {
        //   this.$store.commit('tabBarActiveIndexSave', 2)
        // }

        /**
         * 需登录的路由配置
         */
        // let loginInfo = JSON.parse(this.app.isLogin())
        // let filterPathsLogin = ['/', '/login', '/register', '/forgetPsw', '/my', '/aboutUs', '/help', '/setting']
        // let boolLogin = filterPathsLogin.some((path) => {
        //   return toPath === path
        // })
        // if (loginInfo.Step === 0 && loginInfo.Result !== 0) {
        //   if (!boolLogin) {
        //     // MessageBox({
        //     //   title: '',
        //     //   message: '点击登录',
        //     //   showCancelButton: true
        //     // }).then(action => {
        //     //   if (action === 'confirm') {
        //     //     this.$router.push('/login')
        //     //   } else if (action === 'cancel') {
        //     //   }
        //     // })
        //     Toast({
        //       message: '请先登录',
        //       duration: 2000
        //     })
        //     this.$router.push('/login')
        //   }
        // }
      }
    }
  }
</script>

<style lang="stylus">
  #app
    /*width: 10rem*/
    /*max-width: 600px*/
    min-height: 100%
    margin: 0 auto
    padding-top: 65px
</style>
