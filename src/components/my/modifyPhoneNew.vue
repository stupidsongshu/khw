<template>
  <div class="form">
    <div class="reset-psw-title">请重新设置手机号</div>
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
      <mt-button class="btn" @click="submit">提交</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      getCode() {},
      submit() {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .form
    padding: 0
</style>
