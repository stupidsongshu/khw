<template>
  <div class="form">
    <div class="form-item">
      <label class="icon icon-phone"></label>
      <input type="number" placeholder="请输入手机号">
    </div>
    <div class="form-item">
      <label class="icon icon-msg"></label>
      <input type="text" placeholder="请输入短信验证码">
      <label class="form-item-right code" @click="getCode">发送验证码</label>
    </div>

    <div class="loan-btn form-btn">
      <mt-button class="btn" @click="nextStep">下一步</mt-button>
    </div>

    <div class="hint">
      如原手机号丢失或停机<br>
      请联系中银客服 <span>95137</span> 进行修改
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      getCode() {},
      nextStep() {
        this.$router.push('/modifyPhone/new')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
