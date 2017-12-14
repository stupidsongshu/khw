<template>
  <div class="loan">
    <mt-header fixed class="header" title="立即借款">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="banner-wrapper" @click="back">
      <div class="banner-container">
        <div class="title"><i class="icon-rate"></i><span>借款金额</span></div>
        <div>
          <span class="icon-money"></span><span class="loan-amount">{{loanLimit}}</span>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="loan-purpose">
        <span>贷款用途</span>
        <input type="text" placeholder="请选择" readonly v-model="purpose" @click="selectPurpose">
        <i class="fa fa-angle-right"></i>
      </div>
      <div class="item">
        <div>
          <span class="name">贷款期数</span>
          <span class="value">{{loanDuration}}期</span>
        </div>
        <div>
          <span class="name">日利率</span>
          <span class="value">0.58%</span>
        </div>
      </div>
      <div class="item">
        <div>
          <span class="name">收款银行</span>
          <span class="value">建设银行（8871）</span>
        </div>
      </div>

      <div class="form">
        <div class="item">
          <div class="name">验证码</div>
          <div class="code-input">
            <input type="number" placeholder="请输入短信验证码" v-model="vcode" oninput=" if(value.length>6){value = value.slice(0,6)}">
          </div>
          <div class="code-get">
            <button class="code-btn" v-if="!hasGetCode" @click="getCode">发送验证码</button>
            <button class="code-btn" v-if="hasGetCode">{{time}}s后重新获取</button>
          </div>
        </div>
      </div>

      <div class="item">
        <div class="agreement-wrapper">
          <input type="checkbox" id="agreementInput" checked>
          <label for="agreementInput">我同意并知晓</label><router-link class="agreement" to="">《借款补充协议》</router-link>
        </div>
      </div>
    </div>

    <div class="repayment-title">还款攻略</div>
    <div class="loan-btn">
      <mt-button class="btn" @click="loanBtn">立即借款</mt-button>
    </div>

    <loan-plan :overflowScroll="false" :loanPlanList="loanPlanList"></loan-plan>

    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom"
      modal="false"
      closeOnClickModal="false">
      <div class="picker-nav">
        <div>请选择用途</div>
        <div @click="ensure">确定</div>
      </div>
      <mt-picker :slots="yearSlot" @change="onChange" :visible-item-count="3" value-key="val"></mt-picker>
    </mt-popup>

  </div>
</template>

<script type="text/ecmascript-6">
  import loanPlan from './../common/loanPlan'

  export default {
    data() {
      return {
        popupVisible: false,
        purpose: '',
        yearSlot: [{
          flex: 1,
          values: [
            {
              id: '1',
              val: '装修'
            },
            {
              id: '2',
              val: '婚庆'
            },
            {
              id: '3',
              val: '旅游'
            },
            {
              id: '4',
              val: '教育'
            },
            {
              id: '5',
              val: '租房'
            },
            {
              id: '6',
              val: '汽车周边'
            },
            {
              id: '7',
              val: '电子数码产品'
            },
            {
              id: '8',
              val: '医疗'
            },
            {
              id: 'A',
              val: '家用电器'
            },
            {
              id: 'B',
              val: '家具家居'
            }
          ],
          className: 'slot1'
        }],
        vcode: '',
        loanUseId: '',
        hasGetCode: false,
        time: 60,
        loanPlanList: []
      }
    },
    computed: {
      loanLimit() {
        return this.$store.state.loan.loan_limit / 100
      },
      loanDuration() {
        return this.$store.state.loan.loan_duration
      }
    },
    created() {
      let that = this
      let commonParams = this.$store.state.common.commonParams
      console.log(commonParams)
      let ua = commonParams.ua
      let call = 'Loan.repayPlan'
      let timestamp = new Date().getTime()
      let sign = this.sign(ua, call, timestamp)
      let paramString = JSON.stringify({
        ua: ua,
        call: call,
        args: {
          customerId: commonParams.args.customerId,
          mobileNo: commonParams.args.mobileNo,
          token: commonParams.args.token,
          acctNo: commonParams.args.loanAcctNo,
          queryBegNum: 1,
          queryCnt: this.$store.state.loan.loan_duration,
          dealFlg: 'A',
          paymentAmount: this.$store.state.loan.loan_limit,
          installPeriod: this.$store.state.loan.loan_duration,
          paygateOrderId: ''
        },
        sign: sign,
        timestamp: timestamp
      })
      this.$http.post('/khw/c/h', paramString).then(res => {
        let data = res.data
        console.log(data)
        if (data.returnCode === '000000') {
          let dataS = data.response
          that.loanPlanList = dataS.list.splice(0, that.loanDuration)
        }
      })
    },
    methods: {
      back() {
        this.goback()
      },
      selectPurpose() {
        this.popupVisible = true
      },
      ensure() {
        this.popupVisible = false
      },
      // change 事件有两个参数，分别为当前 picker 的 vue 实例和各 slot 被选中的值组成的数组
      onChange(picker, values) {
        let info = values[0]
        if (info !== undefined) {
          console.log(info.id)
          this.loanUseId = info.id
        }
      },
      getCode() {
        let that = this
        this.loading()

        let commonParams = this.$store.state.common.commonParams
        let ua = commonParams.ua
        let call = 'Boccfc.dyanmicPwd'
        let timestamp = new Date().getTime()
        let sign = this.sign(ua, call, timestamp)
        let paramString = JSON.stringify({
          ua: ua,
          call: call,
          args: {
            customerId: commonParams.args.customerId,
            mobileNo: commonParams.args.mobileNo,
            token: commonParams.args.token,
            acctNo: commonParams.args.loanAcctNo
          },
          sign: sign,
          timestamp: timestamp
        })
        this.$http.post('/khw/c/h', paramString).then(res => {
          that.closeLoading()
          console.log(res.data)
          that.toast(res.data.returnMsg)
          if (res.data.response === '000000') {
            that.hasGetCode = true
            let timer = setInterval(() => {
              that.time --
              if (that.time === 0) {
                that.hasGetCode = false
                that.time = 60
                clearInterval(timer)
              }
            }, 1000)
          }
        }).catch(err => {
          that.closeLoading()
          console.log(err)
          that.toast(err.data.returnMsg)
        })
      },
      // 借款
      loanBtn() {
        let that = this
        let commonParams = this.$store.state.common.commonParams
        let ua = commonParams.ua
        let call = 'Loan.cashExtract'
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
            amount: this.$store.state.loan.loan_limit,
            instalPeriod: this.$store.state.loan.loan_duration,
            comUseType: this.loanUseId,
            dynamicPwd: this.vcode
          },
          sign: sign,
          timestamp: timestamp
        })
        this.$http.post('/khw/c/h', paramString).then(res => {
          that.closeLoading()
          that.toast(res.data.returnMsg)
          let data = res.data
          console.log(data)
          if (data.returnCode === '000000') {
            let loanAcctInfo = data.response.loanAcctInfo
            // let cashExtract = data.response.cashExtract
            // 更新缓存
            that.$store.commit('summaryInfoSave', loanAcctInfo)

            // if (loanAcctInfo.tempFrozenAmt > 0) {
            //   // 处理中
            //   that.$router.push('/loanDeal')
            // }
          }
        })
      }
    },
    components: {
      loanPlan
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'

  .loan
    .banner-wrapper
      width: 100%
      height: 132px
      padding: 12px 15px
      .banner-container
        display: flex
        flex-direction: column
        justify-content: center
        width: 100%
        height: 108px
        padding-right: 15px
        text-align: right
        color: #fff
        background-image: url("../../assets/img/loan-banner.png")
        background-size: 100% 100%
        .title
          .icon-rate
            display: inline-block
            width: 14px
            height: 16px
            margin-right: 8px
            background-image: url("../../assets/img/icon_rate_white.png")
            background-size: 100% 100%
          span
            vertical-align: 2px
        .icon-money
          display: inline-block
          width: 19px
          height: 25px
          background-image: url('../../assets/img/icon_money.png')
          background-size: 19px 25px
        .loan-amount
          font-size: 45px


    .content-wrapper
      background-color: #fff
      .loan-purpose
        display: flex
        align-items: center
        height: 54px
        padding: 0 15px
        border-bottom: 1px solid #e3e3e3
        span
          flex-grow: 1
          color: color333
        input
          flex-grow: 2
          height: 100%
          color: color999
          border: none
          background-color: transparent
        i
          flex-grow: 1
          text-align: right
          color: color999
          font-size: 30px

      .item
        display: flex
        justify-content: space-between
        padding: 0 15px
        line-height: 40px
        .name
          margin-right: 20px
          color: #999
        .value
          color: #333
        .agreement-wrapper
          font-size: 13px
          input
            width: 14px
            height: 14px
            outline: none
            border: 1px solid main-color
          .agreement
            color: main-color

    .repayment-title
      line-height: 44px
      text-align: center
      color: main-color
    .loan-btn
      margin: 0 0 16px 0

    .picker-nav
      display: flex
      justify-content: space-between
      padding: 5px 15px
      font-size: 14px
</style>
