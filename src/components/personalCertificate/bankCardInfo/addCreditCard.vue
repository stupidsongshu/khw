<template>
  <div>
    <mt-header fixed class="header" title="添加信用卡">
      <router-link to="" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="input-item" style="margin-top: 17px;">
      <div class="input-item-l">
        <span class="name">卡片类型</span>
        <span>信用卡</span>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">借记卡号</span>
        <input class="input" type="number" placeholder="借记卡号">
      </div>
      <!--<div class="input-item-r">
        <i class="fa fa-angle-right"></i>
      </div>-->
    </div>
    <div class="input-item" @click="selectDepositBank">
      <div class="input-item-l">
        <span class="name">开户银行</span>
        <input class="input" type="text" placeholder="请选择" readonly v-model="purpose">
        <!--<span class="color999">请选择</span>-->
      </div>
      <div class="input-item-r">
        <i class="fa fa-angle-right"></i>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">有效期</span>
        <!--<input class="input" type="number" placeholder="请选择">-->
        <span class="color999">选择信用卡有效期</span>
      </div>
      <div class="input-item-r">
        <i class="fa fa-angle-right"></i>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">还款日</span>
        <!--<input class="input" type="number" placeholder="请选择">-->
        <span class="color999">选择还款日期</span>
      </div>
      <div class="input-item-r">
        <i class="fa fa-angle-right"></i>
      </div>
    </div>

    <div class="input-item-hint">
      <span class="icon-caution"></span><span>请绑定常用的信用卡，用于借款</span>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="addCreditCard">添加信用卡</mt-button>
    </div>

    <div class="warm-prompt">
      <span class="title">温馨提示：当前仅支持以下银行，请勿绑定其他银行，以免导致借款不成功，<router-link to="" style="color: #f00;">查看全部银行列表>></router-link></span>
    </div>
    <ul class="bank-support-list">
      <li class="item">1、中国银行</li>
      <li class="item">2、农业银行</li>
      <li class="item">3、工商银行</li>
      <li class="item">4、建设银行</li>
      <li class="item">5、中信银行</li>
      <li class="item">6、光大银行</li>
      <li class="item">7、兴业银行</li>
      <li class="item">8、平安银行</li>
      <li class="item">9、招商银行</li>
    </ul>

    <mt-popup
      class="popupContainer"
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom"
      modal="false"
      closeOnClickModal="false">
      <div class="picker-nav">
        <div class="cancel-btn" @click="ensure">取消</div>
        <div>选择开户银行</div>
        <div class="ensure-btn" @click="ensure">确定</div>
        <!--<mt-button @click="ensure">确定</mt-button>-->
      </div>
      <mt-picker :slots="bankSlot" @change="onChange" :visible-item-count="3"></mt-picker>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        popupVisible: false,
        purpose: '',
        bankSlot: [{
          flex: 1,
          values: ['', '中国银行', '农业银行', '工商银行', '建设银行', '中信银行', '光大银行', '兴业银行', '平安银行', '招商银行'],
          className: 'slot1'
        }]
      }
    },
    methods: {
      addCreditCard() {
      },
      selectDepositBank() {
        this.popupVisible = true
      },
      // change 事件有两个参数，分别为当前 picker 的 vue 实例和各 slot 被选中的值组成的数组
      onChange(picker, values) {
        this.purpose = values[0]
        console.log(this.purpose)
      },
      ensure() {
        this.popupVisible = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/base.styl'
  @import '../../../assets/css/identity/personalCertificate.styl'

  .warm-prompt
    display: flex
    padding: 0 15px
    color: #999
    font-size: 12px
    .title
      display: block
      padding: 13px 0
      line-height: 20px
      border-bottom: 1px solid #d9d9d9
  .bank-support-list
    display: flex
    flex-wrap: wrap
    width: 100%
    padding: 6px 15px 0 15px
    color: #999
    font-size: 12px
    .item
      flex-grow: 1
      flex-shrink: 0
      flex-basis: 33.33%
      width: 33.33%
      line-height: 26px

  .mint-popup
    width: 100%
  .popupContainer
    background-color: #f1f1f1
    .picker-nav
      display: flex
      justify-content: space-between
      align-items: center
      width: 100%
      height: 45px
      padding: 5px 15px
      font-size: 14px
      color: #333
      background-color: #fff
      .cancel-btn
        width: 56px
        height: 25px
        line-height: 25px
        text-align: center
        border: 1px solid #999
        border-radius: 4px
        font-size: 12px
      .ensure-btn
        width: 56px
        height: 25px
        line-height: 25px
        text-align: center
        border-radius: 4px
        color: #fff
        font-size: 12px
        background-color: main-color
</style>
