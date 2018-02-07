<template>
  <div class="loanRepayDesc">
    <mt-header fixed class="header" title="按期还款">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <loan-plan v-if="loanPlanListStatus" :overflowScroll="false" :loanPlanList="loanPlanList"></loan-plan>

    <div v-if="!loanPlanListStatus" class="get-data-fail" @click="reGetLoanPlan">获取数据失败，点击重试</div>

    <ul class="hint">
      <li>特别提示：</li>
      <li>1.还款日自动还款，请注意还款卡内的余额是否足额</li>
      <li>2.扣款一旦成功，不可申请撤销</li>
    </ul>
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
        // 还款计划
        loanPlanList: [],
        // 获取还款计划数据是否成功(默认成功)
        loanPlanListStatus: true
      }
    },
    created() {
      this.getRepayPlan()
    },
    methods: {
      back() {
        this.goback()
      },
      getRepayPlan() {
        let that = this
        let commonParams = this.$store.state.common.commonParams

        // 单笔用款明细查询
        function cashExtractDetail() {
          return new Promise((resolve, reject) => {
            let ua = commonParams.ua
            let call = 'Loan.cashExtractDetail'
            let timestamp = new Date().getTime()
            that.getSign(call, timestamp).then(sign => {
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

              that.loading()
              that.$http.post(that.$store.state.common.api, paramString).then(res => {
                let data = res.data
                if (data.returnCode === '000000') {
                  resolve(data.response)
                } else {
                  that.toast(data.returnMsg)
                  reject(data)
                }
              }).catch(err => {
                console.log(err)
                reject(err)
              })
            })
          })
        }

        // 还款计划查询
        function getrepayPlan(cashExtractDetailData) {
          return new Promise((resolve, reject) => {
            let ua = commonParams.ua
            let call = 'Loan.repayPlan'
            let timestamp = new Date().getTime()
            that.getSign(call, timestamp).then(sign => {
              let paramString = JSON.stringify({
                ua: ua,
                call: call,
                args: {
                  customerId: commonParams.args.customerId,
                  mobileNo: commonParams.args.mobileNo,
                  token: commonParams.args.token,
                  acctNo: commonParams.args.loanAcctNo,
                  queryBegNum: 1,
                  queryCnt: cashExtractDetailData.realInstalPeriod,
                  dealFlg: 'B',
                  paymentAmount: cashExtractDetailData.payOffAmt,
                  installPeriod: cashExtractDetailData.realInstalPeriod,
                  paygateOrderId: cashExtractDetailData.payGateOrderId
                },
                sign: sign,
                timestamp: timestamp
              })

              that.loading()
              that.$http.post(that.$store.state.common.api, paramString).then(res => {
                let data = res.data
                if (data.returnCode === '000000') {
                  // that.loanPlanList = data.response.list.splice(0, cashExtractDetailData.realInstalPeriod)
                  console.log(data.response.list)
                  var tmpArr = []
                  for (var i = 0; i < data.response.list.length; i++) {
                    var item = data.response.list[i]
                    if (item.detailFlg === '1') {
                      tmpArr.push(item)
                    }
                    if (item.detailFlg === '9') {
                      tmpArr.push(item)
                      break
                    }
                  }
                  that.loanPlanList = tmpArr
                  console.log(that.loanPlanList)
                  resolve(data.response)
                } else {
                  that.toast(data.returnMsg)
                  reject(data)
                }
              }).catch(err => {
                console.log(err)
                reject(err)
              })
            })
          })
        }

        cashExtractDetail().then(data => {
          return getrepayPlan(data)
        }).then(data => {
          that.loanPlanListStatus = true
        }).catch(err => {
          console.log(err)
          that.loanPlanListStatus = false
        })
      },
      reGetLoanPlan() {
        this.loanPlanListStatus = true
        this.getRepayPlan()
      }
    }
  }
</script>

<!--<style scoped lang="stylus" rel="stylesheet/stylus">
  .hint
    padding: 0 15px
    line-height: 20px
    text-align: left
    color: #999
    font-size: 11px
</style>-->
