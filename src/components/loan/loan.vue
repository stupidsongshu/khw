<template>
  <div class="loan">
    <mt-header fixed class="header" title="立即借款">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="banner-wrapper">
      <div class="banner-container">
        <div class="title"><i class="icon-rate"></i><span>借款金额</span></div>
        <div>
          <span class="icon-money"></span><span class="loan-amount">{{loanLimit}}</span>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="loan-purpose-wrapper">
        <span class="loan-purpose-name color999">贷款用途：</span>
        <div class="loan-purpose-select" @click="selectPurpose">
          <input type="text" placeholder="请选择" readonly v-model="purpose">
          <i class="fa fa-angle-right color999"></i>
        </div>
      </div>

      <div class="loan-item">
        <div class="item-l">
          <span class="name">贷款期数：</span>
          <span class="value">{{loanDuration}}期</span>
        </div>
        <div class="item-r">
          <span class="name">月利率：</span>
          <span class="value">{{dayRate}}%</span>
        </div>
      </div>

      <div class="loan-item">
        <span class="name">收款银行：</span>
        <span class="value">
          {{openBank}}（尾号{{creditcardNo}}）
        </span>
        <div class="calc-rate-wrapper">
          <router-link to="/rate" class="calc-rate"></router-link>
        </div>
      </div>

      <div class="loan-code">
        <span class="code-name">验&nbsp;证&nbsp;码：</span>
        <!--<input class="code-input" type="number" placeholder="请输入短信验证码" v-model="vcode" oninput=" if(value.length>6){value = value.slice(0,6)}">-->
        <input class="code-input" type="text" placeholder="请输入短信验证码" v-model="vcode" :keyup="write(vcode)">
        <!--<input class="code-input" type="text" placeholder="请输入短信验证码" v-model="vcode" @keyup="write1($event, vcode)">-->
        <button class="code-btn" v-show="!hasGetCode" @click="getCode">发送验证码</button>
        <button class="code-btn" v-show="hasGetCode">{{time}}s后重新获取</button>
      </div>

      <!--<div class="form">
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
      </div>-->

      <div class="loan-item">
        <div class="agreement-wrapper">
          <input type="checkbox" id="agreementInput" :checked="checked" @click="toggleAgree">
          <label class="agreement-label" for="agreementInput">我同意并知晓</label><router-link class="agreement" to="">《借款补充协议》</router-link>
        </div>
      </div>
    </div>

    <!--<div class="repayment-title">还款攻略</div>-->
    <div class="loan-btn" style="margin: 30px 0;">
      <mt-button class="btn" @click="loanBtn" :disabled="!checked">立即借款</mt-button>
    </div>

    <loan-plan :overflowScroll="false" :loanPlanList="loanPlanList"></loan-plan>

    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom"
      modal="false"
      closeOnClickModal="false"
      id="loanPlanPopup">
      <div class="picker-nav">
        <div>请选择用途</div>
        <div @click="ensure">确定</div>
      </div>
      <mt-picker :slots="loanPurposeSlot" @change="onChange" :visible-item-count="5" value-key="loanPurpose"></mt-picker>
    </mt-popup>

  </div>
</template>

<script type="text/ecmascript-6">
  import loanPlan from './../common/loanPlan'

  export default {
    components: {
      loanPlan
    },
    data() {
      return {
        popupVisible: false,
        purpose: '',
        loanPurposeSlot: [{
          flex: 1,
          values: [],
          className: 'slot'
        }],
        dayRate: 0,
        openBank: '',
        creditcardNo: '',
        vcode: '',
        loanUseId: '',
        hasGetCode: false,
        time: 60,
        loanPlanList: [],
        checked: true
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
      // 本金
      let loanLimit = this.loanLimit
      // 分期数
      let loanDuration = this.loanDuration
      // 月分期费率
      let monthRate
      if (loanDuration === 6) {
        // monthRate = 1.35 / 100
        monthRate = 0.0135
        this.dayRate = 1.35
      } else if (loanDuration === 12) {
        // monthRate = 1.25 / 100
        monthRate = 0.0125
        this.dayRate = 1.25
      }

      /**
       * @desc 获取当前日期的下一个月下一天
       * @param date 格式: '2017-12-18'
       * @returns 格式: '20180119'
       */
      function getNextMonthAndNextDate(date) {
        var arr = date.split('-')
        var year = arr[0] // 获取当前日期的年份
        var month = arr[1] // 获取当前日期的月份
        var day = arr[2] // 获取当前日期的日

        var year1 = year
        var month1 = parseInt(month) + 1
        if (month1 === 13) {
          year1 = parseInt(year1) + 1
          month1 = 1
        }
        var day1 = parseInt(day) + 1
        // 当第三个参数为0返回上一个月的最后一天(也是天数)
        var days1 = new Date(year1, month1, 0).getDate()
        if (day1 > days1) {
          day1 = days1
        }
        if (month1 < 10) {
          month1 = '0' + month1
        }

        return year1 + '' + month1 + '' + day1
      }

      let year = new Date().getFullYear()
      let month = new Date().getMonth()
      let date = new Date().getDate()
      for (var i = 0; i < loanDuration; i++) {
        // 分期本金
        let prePrin = (loanLimit * 100) / loanDuration
        // 分期利息
        let preInt = prePrin * monthRate
        // 还款时间
        if (parseInt(month) > 12) {
          year = parseInt(year) + 1
          month = 1
        }
        month++
        if (parseInt(month) > 12) {
          year = parseInt(year) + 1
          month = 1
        }
        let dateFormat = year + '-' + month + '-' + date
        let prePayDay = getNextMonthAndNextDate(dateFormat)

        this.loanPlanList.push({
          // 分期数
          paymentPeriod: i + 1,
          prePayDay: prePayDay,
          prePrin: prePrin,
          preInt: preInt,
          // 还款金额
          preAmt: prePrin + preInt
        })
      }

      // 收款银行
      let that = this
      let commonParams = this.$store.state.common.commonParams
      let ua = commonParams.ua
      let call = 'Loan.creditCard'
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
        that.closeLoading()
        let data = res.data
        if (data.returnCode === '000000') {
          let dataS = data.response
          if (dataS.creditcardNo) {
            this.creditcardNo = dataS.creditcardNo.substring(dataS.creditcardNo.length - 4)
          }
          this.openBank = dataS.openBank
        }
      }).catch(err => {
        that.toast(err.returnMsg)
      })
    },
    methods: {
      toggleAgree() {
        this.checked = !this.checked
      },
      write(val) {
        if (val.length > 6) {
          this.vcode = this.vcode.substr(0, 6)
        }

        // 1
        // let bool = this.onlyNumber(val)
        // if (!bool) {
        //   this.vcode = ''
        // }

        // 2
        if (!/^\d+$/g.test(val)) {
          this.vcode = ''
        }
      },
      write1(e, val) {
        // console.log(val.length)
        if (val.length > 6) {
          console.log(this.vcode)
          this.vcode = this.vcode.substr(0, 6)
        }
        // let keyCode = e.keyCode
        // console.log(keyCode)
        // if ((keyCode >= 48 && keyCode <= 57) || keyCode === ) {}

        // console.log(e.key)
        // let keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'backsapce', 'enter']
        // let bool = keys.some(val => {
        //   return e.key.toLowerCase() === val
        // })
        // if (!bool) {
        // }
      },
      back() {
        this.goback()
      },
      selectPurpose() {
        this.popupVisible = true

        // fix 弹窗滑动的时候底层页面跟随滚动
        document.getElementById('loanPlanPopup').addEventListener('touchmove', function(event) {
          event.preventDefault()
        }, false)

        // fix 不打开popup默认无值,打开后必须选值
        this.loanPurposeSlot[0].values = [
          // {
          //   id: '0',
          //   loanPurpose: ' '
          // },
          {
            id: '1',
            loanPurpose: '装修'
          },
          {
            id: '2',
            loanPurpose: '婚庆'
          },
          {
            id: '3',
            loanPurpose: '旅游'
          },
          {
            id: '4',
            loanPurpose: '教育'
          },
          {
            id: '5',
            loanPurpose: '租房'
          },
          {
            id: '6',
            loanPurpose: '汽车周边'
          },
          {
            id: '7',
            loanPurpose: '电子数码产品'
          },
          {
            id: '8',
            loanPurpose: '医疗'
          },
          {
            id: 'A',
            loanPurpose: '家用电器'
          },
          {
            id: 'B',
            loanPurpose: '家具家居'
          }
        ]
      },
      ensure() {
        this.popupVisible = false
      },
      // change 事件有两个参数，分别为当前 picker 的 vue 实例和各 slot 被选中的值组成的数组
      onChange(picker, values) {
        let info = values[0]
        if (info !== undefined) {
          this.purpose = info.loanPurpose
          this.loanUseId = info.id
          if (info.loanPurpose === ' ') {
            this.purpose = ''
          }
        }
      },
      // 获取验证码
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
        if (this.purpose === '') {
          this.toast('请选择贷款用途')
          return
        }
        if (this.vcode.trim() === '') {
          this.toast('请先获取验证码')
          return
        }

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
            console.log(data.response)
            // 更新缓存
            that.$store.commit('summaryInfoSave', data.response.loanAcctInfo)
            that.$store.commit('cashExtractSave', data.response.cashExtract)
            that.checkSummaryInfo()
          }
        }).catch(err => {
          that.toast(err.returnMsg)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/css/base.styl'

  #agreementInput
    display: none
  .agreement-label:before
    content: ''
    display: inline-block
    position: relative
    top: 1px
    margin-right: 4px
    width: 12px
    height: 12px
    border: 1px solid #ccc
  #agreementInput:checked + .agreement-label:before
    background: url('../../assets/img/icon_checked.png') no-repeat center / 12px 12px

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
            font-size: 15px
            vertical-align: 2px
        .icon-money
          display: inline-block
          width: 19px
          height: 25px
          background-image: url('../../assets/img/icon_money.png')
          background-size: 19px 25px
        .loan-amount
          font-size: 42px


    .content-wrapper
      font-size: 14px
      background-color: #fff
      .loan-purpose-wrapper
        display: flex
        height: 54px
        padding: 0 15px
        border-bottom: 1px solid #e3e3e3
        .loan-purpose-name
          flex-basis: 80px
          width: 80px
          display: flex
          align-items: center
          padding-top: 2px // fix 相对右边偏高
        .loan-purpose-select
          flex: 1
          display: flex
          justify-content: space-between
          align-items: center
          height: 100%
          input
            flex-grow: 2
            height: 100%
            color: color999
            border: none
            background-color: transparent
          i
            flex-grow: 1
            text-align: right
            font-size: 30px

      .loan-item
        display: flex
        padding: 0 15px
        line-height: 40px
        .item-l
          display: flex
          width: 50%
        .item-r
          display: flex
          width: 50%

        .name
          width: 80px
          flex-basis: 80px
          color: #999
        .value
          color: #333
        .calc-rate-wrapper
          flex: 1
          text-align: center
          .calc-rate
            display: inline-block
            width: 14px
            height: 16px
            margin-left: 4px
            vertical-align: -3px
            background-image: url("../../assets/img/icon_rate.png")
            background-size: 100% 100%
        .agreement-wrapper
          font-size: 13px
          input
            width: 14px
            height: 14px
            outline: none
            border: 1px solid main-color
          .agreement
            color: main-color

      .loan-code
        display: flex
        padding: 0 15px
        line-height: 40px
        .code-name
          flex-basis: 80px
          width: 80px
          color: #999
        .code-input
          flex: 2
          border: none
        .code-btn
          flex: 1
          padding-left: 6px
          white-space: nowrap
          font-size: 13px
          border: none
          border-left: 1px solid main-color
          background-color: transparent

    .repayment-title
      line-height: 44px
      text-align: center
      color: main-color

    .picker-nav
      display: flex
      justify-content: space-between
      padding: 5px 15px
      font-size: 14px
</style>
