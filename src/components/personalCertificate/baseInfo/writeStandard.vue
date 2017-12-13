<template>
  <div>
    <mt-header fixed class="header" title="填写规范">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="standard-title color333">
      <span>地址填写规范</span>
    </div>
    <div class="standard-hint color999">地址作为评估借款额度的重要依据，需精确到门牌号，请按照以下格式填写：</div>
    <div class="standard-item color333">小区类：XX路XX号XX小区XX栋XX室</div>
    <div class="standard-item color333">农村类：XX县XX镇XX村XX组</div>
    <div class="standard-item color333">大厦类：XX路XX号XX大厦XX层XX室</div>
    <div class="standard-hint color999">如果无法精确到门牌号，可以按照以下格式填写：“XX交叉口向东100米”、“XX建筑物对面”等，请尽量精确</div>

    <div class="standard-title color333">
      <span>单位名称填写规范</span>
    </div>
    <div class="standard-hint color999">单位名称需为您所在的公司或实体店铺全称，用来评估您的还款能力，请按照以下格式填写：</div>
    <div class="standard-item color333">公司类：XXXX有限公司</div>
    <div class="standard-item color333">实体店铺类：XXXX综合超市、XXXX餐厅</div>
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
  @import '../../../assets/css/base.styl'

  .standard-title
    padding: 15px
    font-size: 15px
    span
      padding-left: 2px
      border-left: 2px solid main-color
  .standard-hint
    padding: 10px 15px
    line-height: 20px
    font-size: 13px
    border-bottom: 1px solid #d9d9d9
    background-color: #fff
  .standard-item
    padding: 0 15px
    line-height: 45px
    font-size: 13px
    border-bottom: 1px solid #d9d9d9
    background-color: #fff
</style>
