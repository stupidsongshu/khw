<template>
  <div class="repay-deal">
    <mt-header fixed class="header" title="还款">
      <!--<div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>-->
    </mt-header>



    <div class="deal-banner">
      <div class="status" v-show="status === 0">提交成功</div>
      <div class="status" v-show="status === 1">银行处理中</div>
      <div class="status" v-show="status === 2">还款成功</div>

      <div class="step">
        <ul class="step-progress">
          <li class="step-content" :class="{active: status >= 0}">
            <div class="step-icon icon1"></div>
            <div class="step-line"></div>
            <div class="step-desc">提交成功</div>
          </li>
          <li class="step-content" :class="{active: status >= 1}">
            <div class="step-icon icon2"></div>
            <div class="step-line"></div>
            <div class="step-desc">银行处理中</div>
          </li>
          <li class="step-content" :class="{active: status >= 2}">
            <div class="step-icon icon3"></div>
            <div class="step-line"></div>
            <div class="step-desc">还款成功</div>
          </li>
        </ul>
      </div>
    </div>



    <!--<div class="repay-deal-progress">
      <div class="step">
        <ul class="step-progress">
          <li class="step-content" :class="{active: status >= 0}">
            <div class="step-icon icon1"></div>
            <div class="step-line"></div>
            <div class="step-desc">提交成功</div>
            <div class="step-time">{{transTime | datepoint}}</div>
          </li>
          <li class="step-content" :class="{active: status >= 1}">
            <div class="step-icon icon2"></div>
            <div class="step-line"></div>
            <div class="step-desc">银行处理中</div>
            <div class="step-time" v-if="status === 1">{{transTime | datepoint}}</div>
          </li>
          <li class="step-content" :class="{active: status >= 2}">
            <div class="step-icon icon3"></div>
            <div class="step-line"></div>
            <div class="step-desc">还款成功</div>
            <div class="step-time" v-if="status === 2">{{transTimeS | datepoint}}</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="banner-wrapper">
      <div class="banner" v-show="status === 0">
        <div class="title">提交成功</div>
        <div class="amount">
          <span class="icon-money"></span> {{payOffAmtInt}}.<span class="decimals">{{payOffAmtFlo}}</span>
        </div>
        <div class="time">申请时间：{{transTime | dateformat}}</div>
      </div>

      <div class="banner" v-show="status === 1">
        <div class="title">银行处理中</div>
        <div class="amount">
          <span class="icon-money"></span> {{payOffAmtInt}}.<span class="decimals">{{payOffAmtFlo}}</span>
        </div>
        <div class="time">申请时间：{{transTime | dateformat}}</div>
      </div>

      <div class="banner" v-show="status === 3">
        <div class="title">还款成功</div>
        <div class="amount">
          <span class="icon-money"></span> {{payOffAmtInt}}.<span class="decimals">{{payOffAmtFlo}}</span>
        </div>
        <div class="time">申请时间：{{transTimeS | dateformat}}</div>
      </div>
    </div>

    <div class="desc">
      <div class="item">
        <div class="name">利息</div>
        <div class="value">{{intTot / 100}}元 <span class="calc-rate"></span></div>
      </div>
      <div class="item">
        <div class="name">违约金</div>
        <div class="value">{{realLiquidatedDamages / 100}}元 </div>
      </div>
      <div class="item">
        <div class="name">需还总额</div>
        <div class="value">{{payOffAmt}}元</div>
      </div>
    </div>-->

    <div class="loan-btn count-down" v-if="status > 1">
      <mt-button class="btn">{{restTime}}s后返回</mt-button>
    </div>

    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      :modal="true"
      :closeOnClickModal="false">
      <div class="deal-success">
        <img class="deal-success-gif" src="../../assets/img/deal-success-repay.gif" alt="">
        <div class="deal-success-txt">您的还款正在处理哦~请耐心等待</div>
      </div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  // import step from './../common/step'

  export default {
    // components: {
    //   step
    // },
    data() {
      return {
        popupVisible: false,
        // 还款处理状态 0提交成功 1银行处理中 2还款成功 3还款失败
        status: 0,
        // 还款提交成功、处理中时间
        // transTime: '',
        // 还款成功时间
        // transTimeS: '',
        // 还款总额
        // payOffAmt: 0,
        // 还款总额整数部分
        // payOffAmtInt: 0,
        // 还款总额小数部分
        // payOffAmtFlo: 0,
        // 利息
        // intTot: 0,
        // 全额结清实际应还违约金（提前还款手续费）
        // realLiquidatedDamages: 0,
        // 是否刷新接口
        isRefresh: true,
        restTime: 5
      }
    },
    created() {
      // let summaryInfo = this.$store.state.common.summaryInfo
      // this.realLiquidatedDamages = summaryInfo.realLiquidatedDamages

      // 单笔用款明细查询
      // let commonParams = this.$store.state.common.commonParams
      // let ua = commonParams.ua
      // let call = 'Loan.cashExtractDetail'
      // let timestamp = new Date().getTime()
      // let sign = this.sign(ua, call, timestamp)
      // let paramString = JSON.stringify({
      //   ua: ua,
      //   call: call,
      //   args: {
      //     customerId: commonParams.args.customerId,
      //     mobileNo: commonParams.args.mobileNo,
      //     token: commonParams.args.token,
      //     loanAcctNo: commonParams.args.loanAcctNo
      //   },
      //   sign: sign,
      //   timestamp: timestamp
      // })
      //
      // this.$http.post('/khw/c/h', paramString).then(res => {
      //   let data = res.data
      //   if (data.returnCode === '000000') {
      //     let dataS = data.response
      //
      //     let payOffAmtStr = dataS.payOffAmt.toString()
      //     this.payOffAmtInt = payOffAmtStr.substring(0, payOffAmtStr.length - 2)
      //     this.payOffAmtFlo = payOffAmtStr.substring(payOffAmtStr.length - 2)
      //     this.intTot = data.response.intTot
      //   }
      // })

      this.checkRepayDeal()

      let that = this
      let timer = setInterval(function() {
        that.checkRepayDeal()

        if (!that.isRefresh) {
          clearInterval(timer)
        }
      }, 3000)
    },
    methods: {
      back() {
        this.goback()
      },
      checkRepayDeal() {
        let that = this

        let cashRepay = this.$store.state.common.cashRepay
        // console.log(cashRepay.amount, cashRepay.merchantOrderId)
        let commonParams = this.$store.state.common.commonParams
        let ua = commonParams.ua
        let call = 'Loan.singleTrans'
        let timestamp = new Date().getTime()
        let sign = this.sign(ua, call, timestamp)
        let paramString = JSON.stringify({
          ua: ua,
          call: call,
          args: {
            customerId: commonParams.args.customerId,
            mobileNo: commonParams.args.mobileNo,
            token: commonParams.args.token,
            loanAcctNo: commonParams.args.loanAcctNo,
            // 单笔交易金额(交易后服务器返回)
            returnAmt: cashRepay.amount,
            // 单笔交易订单号(交易后服务器返回)
            oriMerchantOrderId: cashRepay.merchantOrderId
            // 单笔交易交易时间(交易后服务器返回)
            // oriPayTime:
          },
          sign: sign,
          timestamp: timestamp
        })

        // this.loading()
        this.$http.post('/khw/c/h', paramString).then(res => {
          // this.closeLoading()
          that.popupVisible = true
          let data = res.data
          if (data.returnCode === '000000') {
            let res = data.response
            console.log(res)
            // this.transTime = res.transTime
            // transStus 0成功 1失败 2处理中 9订单不存在
            if (res.transStus === 0) {
              this.status = 2
              this.toast('还款成功')
              // this.transTimeS = res.transTime
            } else if (res.transStus === 1) {
              this.status = 3
              this.toast('还款失败，请稍后重试')
            } else if (res.transStus === 2) {
              this.status = 1
            } else if (res.transStus === 9) {
              this.toast('订单不存在')
            }

            // 返回处理结果后
            if (res.transStus !== 2) {
              that.popupVisible = false
              that.isRefresh = false
              that.updateLoanAcctInfo()
            }
          }
        })
      },
      // 更新账户汇总信息
      updateLoanAcctInfo() {
        let that = this
        // 账户汇总信息查询
        let commonParams = that.$store.state.common.commonParams
        let ua = commonParams.ua
        let call = 'Loan.loanAcctInfo'
        let timestamp = new Date().getTime()
        let sign = that.sign(ua, call, timestamp)
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

        that.$http.post('/khw/c/h', paramString).then(res => {
          let data = res.data
          if (data.returnCode === '000000') {
            let loanAcctInfo = data.response
            // 缓存汇总信息
            that.$store.commit('summaryInfoSave', loanAcctInfo)
            // 5秒倒计时
            let timer = setInterval(function() {
              that.restTime --
              if (that.restTime === 0) {
                clearInterval(timer)
                that.restTime = 5
                that.checkSummaryInfo()
              }
            }, 1000)
          } else {
            // Toast({
            //   message: data.returnMsg,
            //   duration: 3000
            // })
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/loanReapyDeal.styl'

  .repay-deal
    padding: 12px 15px
    /*.repay-deal-progress
      width: 100%
      padding: 15px 0
      background-color: #fff
      .step
        .step-progress
          display: flex
          .step-content
            position: relative
            flex-grow: 1
            text-align: center
            font-size: 14px
            .step-icon
              width: 40px
              height: 40px
              margin: 0 auto
              background-size: 100% 100%
              &.icon1
                background-image: url('../../assets/img/icon_repay_submit_nor.png')
              &.icon2
                background-image: url('../../assets/img/icon_repay_handle_nor.png')
              &.icon3
                background-image: url('../../assets/img/icon_repay_success_nor.png')
            .step-desc
              margin-top: 11px
              color: #999
            .step-time
              margin-top: 8px
              color: #999
              font-size: 10px
            &:before
              position: absolute
              content: ''
              top: 20px
              left: -30px
              width: 50%
              border-top: 4px dotted #999
            &:first-child:before
              border: none
            &.active
              .icon1
                background-image: url('../../assets/img/icon_repay_submit_show.png')
              .icon2
                background-image: url('../../assets/img/icon_repay_handle_show.png')
              .icon3
                background-image: url('../../assets/img/icon_repay_success_show.png')
              .step-desc
                color: #daab5b
              &:before
                border-top-color: #daab5b

    .banner-wrapper
      margin-top: 19px
      padding: 0 15px
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

    .desc
      width: 100%
      padding: 25px 0 23px 29px
      font-size: 14px
      border-radius: 5px
      .title
        margin-bottom: 14px
        font-size: 17px
        font-weight: 600
      .item
        display: flex
        line-height: 26px
        .name
          flex-basis: 118px
          width: 118px
          color: #666
        .value
          color: #333
          .calc-rate
            display: inline-block
            width: 14px
            height: 16px
            margin-left: 4px
            vertical-align: -3px
            background-image: url("../../assets/img/icon_rate.png")
            background-size: 100% 100%*/
</style>
