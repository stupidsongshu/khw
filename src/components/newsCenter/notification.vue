<template>
  <div class="notification">
    <div class="item">
      <div class="time-wrapper">
        <span class="time">10-30 12:00</span>
      </div>
      <div class="card">
        <div class="content">
          <h1>卡还王升级啦！</h1>
          <p>尊敬的卡还王用户，感谢您一直以来对我们的支持，为了给您更好的体验我们将于2017年10月30日24:00:00-11月1日24:00:00对系统进行升级，给您带来的不便我们深感歉意！</p>
        </div>
        <div class="look-detail">
          <span>查看详情</span>
          <i class="fa fa-angle-right arrow-right"></i>
        </div>
      </div>
    </div>
    <div class="item has-read">
      <div class="time-wrapper">
        <span class="time">10-30 12:00</span>
      </div>
      <div class="card">
        <div class="content">
          <h1>卡还王升级啦！</h1>
          <p>尊敬的卡还王用户，感谢您一直以来对我们的支持，为了给您更好的体验我们将于2017年10月30日24:00:00-11月1日24:00:00对系统进行升级，给您带来的不便我们深感歉意！</p>
        </div>
        <div class="look-detail">
          <span>查看详情</span>
          <i class="fa fa-angle-right arrow-right"></i>
        </div>
      </div>
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
  .notification
    .item
      .time-wrapper
        margin-top: 13px
        margin-bottom: 11px
        text-align: center
        .time
          display: inline-block
          padding: 6px 10px
          font-size: 12px
          color: #fff
          background-color: #666
          border-radius: 3px
      .card
        color: #333
        font-size: 14px
        background-color: #fff
        .content
          padding: 15px
          line-height: 24px
          h1
            font-weight: normal
            font-size: 14px
          p
            text-indent: 2em
        .look-detail
          display: flex
          justify-content: space-between
          align-items: center
          padding: 0 15px
          height: 44px
          border-top: 1px solid #e2e2e2
          border-bottom: 1px solid #d9d9d9
          .arrow-right
            font-size: 30px
      &.has-read
        .time
          background-color: #999
        .card
          color: #999
    .empty-content
      margin-top: 140px
      text-align: center
      color: #999
      font-size: 14px
      .txt
        margin-top: 20px
</style>
