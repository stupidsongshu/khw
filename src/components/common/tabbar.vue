<template>
  <mt-tabbar fixed v-if="hasFooter">
    <mt-tab-item id="loan">
      <div class="self-tab-item" @click="selectTab(0)">
        <img slot="icon" src="../../assets/img/bottom_icon_01_click.png" v-show="activeTabIndex === 0">
        <img slot="icon" src="../../assets/img/bottom_icon_01_nor.png" v-show="activeTabIndex !== 0">
        <span :class="{'isSelected': activeTabIndex === 0}">借款</span>
      </div>
    </mt-tab-item>
    <mt-tab-item id="repay">
      <div class="self-tab-item" @click="selectTab(1)" :class="{'isSelected': activeTabIndex === 1}">
        <img slot="icon" src="../../assets/img/bottom_icon_02_click.png" v-show="activeTabIndex === 1">
        <img slot="icon" src="../../assets/img/bottom_icon_02_nor.png" v-show="activeTabIndex !== 1">
        <span :class="{'isSelected': activeTabIndex === 1}">还款</span>
      </div>
    </mt-tab-item>
    <mt-tab-item id="my">
      <div class="self-tab-item" @click="selectTab(2)" :class="{'isSelected': activeTabIndex === 2}">
        <img slot="icon" src="../../assets/img/bottom_icon_03_click.png" v-show="activeTabIndex === 2">
        <img slot="icon" src="../../assets/img/bottom_icon_03_nor.png" v-show="activeTabIndex !== 2">
        <span :class="{'isSelected': activeTabIndex === 2}">我的</span>
      </div>
    </mt-tab-item>
  </mt-tabbar>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      hasFooter: {
        type: Boolean
      }
    },
    methods: {
      selectTab(index) {
        this.$store.commit('tabBarActiveIndexSave', index)
        if (index === 0) {
          this.$router.push('/')
        } else if (index === 1) {
          this.$router.push('/repay')
        } else if (index === 2) {
          this.$router.push('/my')
        }
      }
    },
    computed: {
      activeTabIndex() {
        return this.$store.state.common.activeTabIndex
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .mint-tabbar
    height: 54px
    color: #d2d1d1
    background-color: #fff !important
    background-image: none
    border-top: 1px solid #d9d9d9
    .mint-tab-item
      &.is-selected
        color: #d2d1d1
        background-color: #fff !important
    .self-tab-item
      display: flex
      flex-direction: column
      color: #d2d1d1
      .isSelected
        color: #daab5b !important
      img
        width: 24px
        height: 24px
        margin: 0 auto 5px auto
</style>
