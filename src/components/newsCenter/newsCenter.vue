<template>
  <div>
    <mt-header fixed class="header" title="消息中心">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="news-nav">
      <router-link class="nav-title" replace to="/newsCenter">活动</router-link>
      <router-link class="nav-title" replace to="/newsCenter/deal">交易</router-link>
      <router-link class="nav-title" replace to="/newsCenter/notification">通知</router-link>
    </div>
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

<style scoped lang="stylus" rel="stylesheet/stylus">
  .news-nav
    display: flex
    height: 42px
    line-height: 42px
    background-color: #fff
    .nav-title
      flex-grow: 1
      height: 100%
      text-align: center
      color: #666
      border-right: 1px solid #e4e4e4
      &:last-child
        border-right: none
    .router-link-exact-active
      color: #daab5b
      border-bottom: 1px solid #daab5b
</style>
