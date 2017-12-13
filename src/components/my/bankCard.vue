<template>
  <div class="bankCard">
    <mt-header fixed class="header" title="银行卡">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="bank-card-wrapper">
      <div class="title">还款借记卡</div>
      <div class="card">
        <div class="card-info">
          <div class="bank-logo">
            <img src="../../assets/img/bank-logo.png" alt="">
          </div>
          <div>
            <div class="bank-name">建设银行</div>
            <div class="bank-type">借记卡</div>
          </div>
        </div>
        <div class="card-edit"></div>
        <div class="card-num">**** **** **** 5391</div>
      </div>
      <div class="title">代还信用卡（最多可绑定5张）</div>
      <ul>
        <li class="card">
          <div class="card-info">
            <div class="bank-logo">
              <img src="../../assets/img/bank-logo.png" alt="">
            </div>
            <div>
              <div class="bank-name">建设银行</div>
              <div class="bank-type">信用卡</div>
            </div>
          </div>
          <div class="card-edit"></div>
          <div class="card-num">**** **** **** 5391</div>
        </li>
      </ul>
      <div class="add-credit-card">
        <img src="../../assets/img/icon_card_add.png" width="40" height="30" alt=""><span>添加信用卡</span>
      </div>
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
  .bank-card-wrapper
    margin-top: 12px
    padding: 0 15px 19px 15px
    background-color: #fff
    .title
      width: 100%
      height: 37px
      line-height: 37px
      color: #999
      font-size: 14px
    .card
      position: relative
      display: flex
      align-items: center
      width: 100%
      height: 106px
      padding: 0 13px
      border-radius: 5px
      background-color: #dfc391
      .card-info
        display: flex
        align-items: center
        line-height: 24px
        color: #fff
        .bank-logo
          width: 49px
          height: 49px
          margin-right: 12px
          border-radius: 50%
          background-color: #fff
          img
            width: 100%
            height: 100%
        .bank-name
          font-size: 15px
        .bank-type
          font-size: 14px
      .card-edit
        position: absolute
        right: 13px
        bottom: 50%
        width: 19px
        height: 18px
        background-size: 19px 18px
        background-image: url('../../assets/img/icon_edit.png')
      .card-num
        position: absolute
        right: 13px
        bottom: 20px
        color: #fff
        font-size: 14px
    .add-credit-card
      display: flex
      justify-content: center
      align-items: center
      width: 100%
      height: 106px
      margin-top: 17px
      color: #999
      font-size: 15px
      border-radius: 5px
      border: 1px dotted #c2c2c2
      background-color: #f1f1f1
      img
        margin-right: 10px
</style>
