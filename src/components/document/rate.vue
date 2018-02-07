<template>
  <div class="rate">
    <mt-header fixed class="header" title="费用说明">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="">
      <h1 class="rate-title color333">一、贷款费用说明</h1>
      <p class="indent color666">卡还王的到账金额即是申请金额，不收取信审费、管理费、平台费等额外费用。贷款期限可分为3个月、6个月和12个月，本消费贷款产品年化费率根据客户资质差异化核定，产品年化费率为35.64%-36.00%，最终费率以中银消费金融核定为准！本产品只支持当期提前还款，不支持客户其他部分提前还款与提前结清。提前还款不收取提前还款违约金。</p>
      <table class="rate-table" border="1" cellspacing="0" cellpadding="10">
        <tbody>
            <tr>
                <td>期限/月</td>
                <td>月分期手续费率</td>
                <td>年化手续费率</td>
            </tr>
            <tr>
                <td>3</td>
                <td>1.98%</td>
                <td>35.64%</td>
            </tr>
            <tr>
                <td>6</td>
                <td>1.75%</td>
                <td>36.00%</td>
            </tr>
            <tr>
                <td>12</td>
                <td>1.62%</td>
                <td>35.89%</td>
            </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h1 class="rate-title color333">二、逾期费用说明</h1>
      <p class="indent color666">当您贷款未按期还款时，我们将根据贷款金额的不同，按日收取逾期综合费用。收取规则如下：</p>
      <ul class="overdue-fee-list color666">
        <li>
          <div class="color333">本金金额</div>
          <div class="color333">逾期综合费用</div>
        </li>
        <li>
          <div>0~5000元（含）</div>
          <div>5元</div>
        </li>
        <li>
          <div>5000元~10000元（含）</div>
          <div>10元</div>
        </li>
        <li>
          <div>10000元~15000元（含）</div>
          <div>15元</div>
        </li>
        <li>
          <div>15000元~20000元（含）</div>
          <div>20元</div>
        </li>
        <li>
          <div>20000元~25000元（含）</div>
          <div>25元</div>
        </li>
        <li>
          <div>25000元~30000元（含）</div>
          <div>30元</div>
        </li>
        <li>
          <div>30000元~35000元（含）</div>
          <div>35元</div>
        </li>
        <li>
          <div>35000元~40000元（含）</div>
          <div>40元</div>
        </li>
        <li>
          <div>40000元~45000元（含）</div>
          <div>45元</div>
        </li>
        <li>
          <div>45000元~50000元（含）</div>
          <div>50元</div>
        </li>
      </ul>
      <div class="color666">逾期后，应还金额为：</div>
      <h1 class="overdue-total-fee color333">贷款金额+利息(借款期数*月分期手续费率)+逾期综合费用</h1>
    </div>

    <div class="">
      <h1 class="rate-title color333">三、友情提示</h1>
      <p class="indent color666">请保持良好的还款习惯，否则将影响您在卡还王的信用额度、贷款申请通过率及人行征信的信用评分。</p>
    </div>
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

<style lang="stylus" rel="stylesheet/stylus">
  .rate
    padding: 0 15px
    padding-bottom: 15px
    font-size: 12px
    .rate-title
      line-height: 50px
      font-size: 14px
      font-weight: bold
    .indent
      text-indent: 2em
      font-size: 12px
      line-height: 20px
    .rate-table
      width: 100%
      margin: 0 auto
      text-align: center
      background-color: #fff
      td
        padding: 5px
    .overdue-fee-list
      width: 100%
      margin: 20px 0
      padding: 10px 0
      line-height: 24px
      border: 1px solid #d9d9d9
      background-color: #fff
      li
        display: flex
        justify-content: space-around
        div
          width: 100%
          text-align: center
    .overdue-total-fee
      margin-top: 10px
      font-size: 12px
      font-weight: bold
</style>
