<template>
  <div>
    <mt-header fixed class="header" title="帮助中心">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="banner-help">
      <img src="../../assets/img/banner-help.png" alt="">
    </div>
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
  .banner-help
    width: 100%
    height: 104px
    img
      width: 100%
      height: 100%
</style>
