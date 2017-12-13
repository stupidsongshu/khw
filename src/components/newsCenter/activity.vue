<template>
  <div class="activity">
    <div class="item">
      <div class="img"><img src="../../assets/img/activity_1.png" width="100" height="63" alt=""></div>
      <div class="content">
        <div class="title">乐贷款 “邀好友赚翻天” 活动</div>
        <div class="desc">活动大升级，分享立得200元返现金 <i class="fa fa-angle-double-right"></i></div>
        <div class="time">2017/10/30 10:30</div>
      </div>
    </div>
    <div class="item has-read">
      <div class="img"><img src="../../assets/img/activity_2.png" width="100" height="63" alt=""></div>
      <div class="content">
        <div class="title">乐贷款 “邀好友赚翻天” 活动</div>
        <div class="desc">活动大升级，分享立得200元返现金 <i class="fa fa-angle-double-right"></i></div>
        <div class="time">2017/10/30 10:30</div>
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
  .activity
    .item
      display: flex
      width: 100%
      height: 100px
      margin-top: 12px
      padding: 18px 15px
      border-bottom: 1px solid #e8e8e8
      background-color: #fff
      .img
        margin-right: 8px
      .content
        display: flex
        flex-direction: column
        justify-content: space-between
        .title
          color: #333
          font-size: 15px
        .desc
          color: #666
          font-size: 12px
        .time
          color: #999
          font-size: 10px
      &.has-read
        .title,.desc,.time
          color: #999
    .empty-content
      margin-top: 140px
      text-align: center
      color: #999
      font-size: 14px
      .txt
        margin-top: 20px
</style>
