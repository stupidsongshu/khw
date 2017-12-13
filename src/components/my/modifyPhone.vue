<template>
  <div class="modifyPhone">
    <mt-header fixed class="header" title="修改手机号">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      back() {
        this.goback()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'
  @import '../../assets/css/form.styl'

  .modifyPhone
    .hint
      font-size: 12px
</style>
