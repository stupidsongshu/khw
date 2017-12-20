<template>
  <div class="repay">
    <mt-header fixed class="header" title="还款"></mt-header>

    <div v-if="hasRepay">
      <div class="banner">
        <div class="title">未还本金</div>
        <div class="amount">
          <span class="icon-money"></span> {{remainAmtInt}}.<span class="decimals">{{remainAmtFlo}}</span>
        </div>
        <div class="time">申请时间：{{transTime | dateformat}}</div>
      </div>

      <div class="card" v-if="!overdue" @click="onTimeRepay">
        <div class="card-l">
          <div class="card-l-t">按期还款</div>
          <div class="card-l-b">还款日将自动还款</div>
        </div>
        <!--<div class="card-m">
          <div class="card-m-t">691.14元</div>
          <div class="card-m-b">2017年08月27日</div>
        </div>-->
        <div class="card-r">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="card" v-if="overdue" @click="overdueTimeRepay">
        <div class="card-l">
          <div class="card-l-t">按期还款</div>
          <div class="card-l-b">还款日将自动还款</div>
        </div>
        <div class="card-m">
          <div class="card-m-t">691.14元</div>
          <div class="overdue">已逾期</div>
        </div>
        <div class="card-r">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="card" @click="inAdvanceRepay">
        <div class="card-l">
          <div class="card-l-t">提前还款</div>
          <div class="card-l-b">可提前结清所有借款</div>
        </div>
        <div class="card-r">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>

      <div class="friendly-reminder">
        友情提示：请您在到期还款日前还款，逾期不还将依法报送人民银行征信系统，未来可能会对您找工作，办理签证、车贷、房贷造成影响。
      </div>
    </div>

    <div class="no-repay" v-if="!hasRepay">
      <img class="no-repay-img" src="../../assets/img/no-repay.png" alt="">
      <div class="no-repay-txt">暂无账单</div>
    </div>


    <!--<mt-tabbar fixed>
      <mt-tab-item id="loan">
        <router-link to="/repay">
          <div class="self-tab-item">
            <img slot="icon" src="../../assets/img/bottom_icon_02_click.png">
            <span class="isSelected">还款</span>
          </div>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="my">
        <router-link to="">
          <div class="self-tab-item">
            <img slot="icon" src="../../assets/img/bottom_icon_03_nor.png">
            <span>我的</span>
          </div>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        // 是否有贷款
        hasRepay: true,
        // 还款是否逾期
        overdue: false,
        transTime: '',
        // 未还本金整数部分
        remainAmtInt: 0,
        // 未还本金小数部分
        remainAmtFlo: 0
      }
    },
    created() {
      let summaryInfo = this.$store.state.common.summaryInfo
      if (summaryInfo) {
        if (summaryInfo.overdueStatus === 1) {
          this.overdue = true
        } else if (summaryInfo.overdueStatus === 2) {
          this.overdue = false
        }
      }

      // 单笔用款明细查询
      let commonParams = this.$store.state.common.commonParams
      let ua = commonParams.ua
      let call = 'Loan.cashExtractDetail'
      let timestamp = new Date().getTime()
      let sign = this.sign(ua, call, timestamp)
      let paramString = JSON.stringify({
        ua: ua,
        call: call,
        args: {
          customerId: commonParams.args.customerId,
          mobileNo: commonParams.args.mobileNo,
          token: commonParams.args.token,
          loanAcctNo: commonParams.args.loanAcctNo
        },
        sign: sign,
        timestamp: timestamp
      })

      this.loading()
      this.$http.post('/khw/c/h', paramString).then(res => {
        this.closeLoading()
        let data = res.data
        if (data.returnCode === '000000') {
          // 未还本金
          let remainAmt = data.response.remainAmt.toString()
          this.remainAmtInt = remainAmt.substring(0, remainAmt.length - 2)
          this.remainAmtFlo = remainAmt.substring(remainAmt.length - 2)
          // 申请时间
          this.transTime = data.response.transTime
        }
      }).catch(err => {
        this.closeLoading()
        console.log(err)
      })
    },
    methods: {
      onTimeRepay() {
        this.$router.push('/repay/onTimeRepay')
      },
      overdueTimeRepay() {
        this.$router.push('/repay/overdueRepay')
      },
      inAdvanceRepay() {
        this.$router.push('/repay/inAdvanceRepay')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'

  .repay
    padding: 17px 15px 0 15px
    .banner
      display: flex
      flex-direction: column
      justify-content: space-around
      align-items: center
      width: 100%
      height: 166px
      padding: 10px 0
      color: #fff
      border-radius: 5px
      background-image: url("../../assets/img/repay-bg.png")
      background-size: 100% 166px
      .title
        font-size: 17px
      .amount
        font-size: 48px
        .icon-money
          display: inline-block
          width: 19px
          height: 25px
          background-image: url('../../assets/img/icon_money.png')
          background-size: 19px 25px
        .decimals
          font-size: 31px
      .time
        font-size: 13px

    .card
      display: flex
      justify-content: space-between
      align-items: center
      width: 100%
      margin-top: 15px
      height: 79px
      padding-left: 23px
      padding-right: 21px
      border-radius: 5px
      background-color: #fff
      .card-l
        flex-grow: 2
        .card-l-t
          margin-bottom: 13px
          color: #333
          font-size: 17px
        .card-l-b
          color: #999
          font-size: 13px
      .card-m
        flex-grow: 2
        text-align: right
        .card-m-t
          margin-bottom: 13px
          color: main-color
          font-size: 17px
        .card-m-b
          color: #999
          font-size: 11px
        .overdue
          color: #f00
          font-size: 11px
      .card-r
        text-align: right
        flex-grow: 1
        color: #999
        font-size: 30px

    .friendly-reminder
      margin-top: 62px
      padding: 0 15px
      line-height 20px
      color: #999
      font-size: 11px

    .no-repay
      text-align: center
      .no-repay-img
        width: 73px
        height: 90px
        margin-top: 186px
      .no-repay-txt
        margin-top: 21px
        color: #999
        font-size: 15px
</style>
