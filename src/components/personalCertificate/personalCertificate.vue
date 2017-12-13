<template>
  <div>
    <mt-header fixed class="header" title="个人认证">
      <!--<router-link to="/" slot="left">-->
        <!--<mt-button icon="back"></mt-button>-->
      <!--</router-link>-->
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <pc-nav-header v-if="progressShow" :curProgress="curProgress"></pc-nav-header>

    <router-view @storageTextData="storageTextData"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import pcNavHeader from '../common/pcNavHeader'

  export default {
    components: {
      pcNavHeader
    },
    computed: {
      progressShow() {
        // 个人认证 swiper 显示 且 申请资格认证资格通过
        return this.$store.state.identity.personalCertificateSwiperShow && this.$store.state.identity.applyQualificationAuthStatus
      },
      curProgress() {
        return this.$store.state.identity.personalCertificateSwiperProgress
      }
    },
    methods: {
      back() {
        this.goback()
      },
      storageTextData() {
        let data = this.app.getData()
        if (data !== '') {
          data = JSON.parse(data)
          return data
        } else {
          // console.log('没有缓存')
          return {}
        }
      },
      progressStatus(curPath) {
        let filterPathPersonalCertificate = [
          '/personalCertificate',
          '/personalCertificate/bankCardInfo',
          '/personalCertificate/baseInfo',
          '/personalCertificate/linkman',
          '/personalCertificate/videoAuth'
        ]
        let boolCertificate = filterPathPersonalCertificate.some((path) => {
          return curPath === path
        })
        if (boolCertificate) {
          /**
           * 个人认证 swiper 是否显示
           */
          this.$store.commit('personalCertificateSwiperShowSave', true)
        } else {
          this.$store.commit('personalCertificateSwiperShowSave', false)
        }
      }
    },
    mounted() {
      // 修复从personalCertificate组件以外的页面直接进入personalCertificate组件及其子组件后,个人认证资料swiper会显示的问题
      this.progressStatus(this.$route.path)
    },
    watch: {
      /**
       * 个人认证资料swiper是否显示
       */
      '$route'(to, from) {
        this.progressStatus(to.path)
      }
    }
  }
</script>
