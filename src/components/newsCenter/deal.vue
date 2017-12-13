<template>
  <div class="deal">
    <div class="item">
      <div class="deal-content">
        <div class="deal-desc">2000元|自动还款</div>
        <div class="deal-time">2017-10-30 12:00</div>
      </div>
      <div class="deal-status">成功扣款</div>
    </div>
    <div class="item has-read">
      <div class="deal-content">
        <div class="deal-desc">2000元|自动还款</div>
        <div class="deal-time">2017-10-30 12:00</div>
      </div>
      <div class="deal-status">成功扣款</div>
    </div>
    <div class="item has-read">
      <div class="deal-content">
        <div class="deal-desc">2000元|自动还款</div>
        <div class="deal-time">2017-10-30 12:00</div>
      </div>
      <div class="deal-status">成功扣款</div>
    </div>

    <div class="empty-content" v-if="false">
      <img src="../../assets/img/no-message.png" width="127" height="88" alt="">
      <div class="txt">这里还是空的哦</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .deal
    padding-top: 12px
    .item
      display: flex
      justify-content: space-between
      align-items: center
      width: 100%
      height: 66px
      padding: 0 15px
      border-bottom: 1px solid #ededed
      background-color: #fff
      .deal-desc
        color: #333
        font-size: 16px
      .deal-time
        margin-top: 10px
        color: #999
        font-size: 12px
      .deal-status
        color: #f00
      &.has-read
        .deal-desc,.deal-time,.deal-status
          color: #999
    .empty-content
      margin-top: 140px
      text-align: center
      color: #999
      font-size: 14px
      .txt
        margin-top: 20px
</style>
