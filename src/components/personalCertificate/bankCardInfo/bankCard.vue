<template>
  <div class="bankCard">
    <!--<mt-header fixed class="header" title="个人认证">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>-->

    <!--<pc-nav-header :curProgress="2"></pc-nav-header>-->

    <div class="bank-card-wrapper">
      <div class="title">还款借记卡</div>
      <div class="card" v-if="hasDebitCard">
        <div class="card-info">
          <div class="bank-logo">
            <img src="../../../assets/img/bank-logo.png" alt="">
          </div>
          <div>
            <div class="bank-name">建设银行</div>
            <div class="bank-type">借记卡</div>
          </div>
        </div>
        <div class="card-edit"></div>
        <div class="card-num">**** **** **** 5391</div>
      </div>
      <router-link to="/personalCertificate/addDebitCard" class="add-credit-card" v-if="!hasDebitCard">
        <img src="../../../assets/img/icon_card_add.png" style="display: block;" width="40" height="30" alt=""><span>添加借记卡</span>
      </router-link>

      <!--<div class="title">代还信用卡</div>
      <ul v-if="hasReplaceRepayCard">
        <li class="card">
          <div class="card-info">
            <div class="bank-logo">
              <img src="../../../assets/img/bank-logo.png" alt="">
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
      <router-link v-if="!hasReplaceRepayCard" to="/addCreditCard" class="add-credit-card">
        <img src="../../../assets/img/icon_card_add.png" width="40" height="30" alt=""><span>添加信用卡</span>
      </router-link>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import pcNavHeader from '../../common/pcNavHeader'

  export default {
    data() {
      return {
        /* 还款借记卡 */
        hasDebitCard: false,
        /* 代还信用卡 */
        hasReplaceRepayCard: false
      }
    },
    components: {
      pcNavHeader
    },
    methods: {
      back() {
        this.goback()
      },
      submit() {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/identity/bankCard.styl'
</style>
