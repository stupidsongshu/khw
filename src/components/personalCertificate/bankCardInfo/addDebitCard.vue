<template>
  <div>
    <mt-header fixed class="header" title="添加借记卡">
      <div slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>

    <div class="input-item" style="margin-top: 17px;">
      <div class="input-item-l">
        <span class="name">卡片类型</span>
        <span>借记卡</span>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <div class="name">
          <span>手机号码</span>
        </div>
        <input class="input" type="number" placeholder="请输入借记卡绑定手机号(选填)" v-model="phoneNo" v-on:blur="saveDebitCard" oninput=" if(value.length>11){value = value.slice(0,11)}">
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <div class="name">
          <span class="required">借记卡号</span>
        </div>
        <input class="input" type="number" placeholder="借记卡号" v-model="debitCardno" v-on:blur="saveDebitCard" oninput=" if(value.length>19){value = value.slice(0,19)}">
      </div>
      <!--<div class="input-item-r">
        <i class="fa fa-angle-right"></i>
      </div>-->
    </div>
    <div class="input-item" @click="selectDepositBank">
      <div class="input-item-l">
        <div class="name">
          <span class="required">开户银行</span>
        </div>
        <input class="input" type="text" placeholder="请选择" readonly v-model="openBank">
      </div>
      <div class="input-item-r">
        <i class="fa fa-angle-right"></i>
      </div>
    </div>
    <div class="input-item" @click="show">
      <div class="input-item-l">
        <div class="name">
          <span class="required">开户城市</span>
        </div>
        <input class="input" type="text" placeholder="请选择" readonly v-model="selectedCity">
        <!--<span class="color999">{{selectedCity || '请选择'}}</span>-->
      </div>
      <div class="input-item-r">
        <i class="fa fa-angle-right"></i>
      </div>
    </div>

    <div class="input-item-hint" style="margin-bottom: 20px;">
      <div class="caution-wrapper">
        <span class="icon-caution"></span><span>请绑定常用借记卡，用于还款，绑定不会产生费用</span>
      </div>
    </div>

    <div class="loan-btn">
      <mt-button class="btn" @click="addDebitCard">添加借记卡</mt-button>
    </div>
    <!--{{storageTextData.debitCardList[0]}}-->
    <!--{{typeof storageTextData.debitCardList[0]}}-->

    <div class="warm-prompt">
      <span class="title">温馨提示：<span style="color: #f00;">当前仅支持以下银行</span>，请勿绑定其他银行</span>
    </div>
    <ul class="bank-support-list">
      <li class="item">1、中国银行</li>
      <li class="item">2、工商银行</li>
      <li class="item">3、农业银行</li>
      <li class="item">4、建设银行</li>
      <li class="item">5、光大银行</li>
      <li class="item">6、兴业银行</li>
      <li class="item">7、中信银行</li>
      <li class="item">8、平安银行</li>
      <li class="item">9、宁波银行</li>
    </ul>

    <mt-popup
      class="popupContainer"
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom"
      modal="false"
      closeOnClickModal=false>
      <div class="picker-nav">
        <div class="cancel-btn" @click="cancel">取消</div>
        <div>选择开户银行</div>
        <div class="ensure-btn" @click="ensure">确定</div>
      </div>
      <mt-picker :slots="bankListSlot" @change="onChange" :visible-item-count="5" value-key="bankName"></mt-picker>
    </mt-popup>

    <vue-city-picker ref="picker" @select="select" :title="title" :cancel-txt="cancelTxt" :confirm-txt="confirmTxt"></vue-city-picker>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'
  import vueCityPicker from 'vue-city-bspicker'

  export default {
    components: {
      vueCityPicker
    },
    data() {
      return {
        // 借记卡号
        debitCardno: '',
        // 借记卡绑定手机号
        phoneNo: '',
        // 开户行名称
        openBank: '',
        // 开户行编号
        openBankId: '',
        // 开户行所在省
        prov: '',
        // 开户行所在市
        city: '',
        popupVisible: false,
        bankListSlot: [{
          flex: 1,
          // values: ['中国银行', '农业银行', '工商银行', '建设银行', '中信银行', '光大银行', '兴业银行', '平安银行', '招商银行'],
          values: [
            // {
            //   bankId: '0000',
            //   bankName: ' '
            // },
            {
              bankId: '0102',
              bankName: '工商银行'
            },
            {
              bankId: '0103',
              bankName: '农业银行'
            },
            {
              bankId: '0105',
              bankName: '建设银行'
            },
            {
              bankId: '0302',
              bankName: '中信银行'
            },
            {
              bankId: '0303',
              bankName: '光大银行'
            },
            {
              bankId: '0309',
              bankName: '兴业银行'
            },
            {
              bankId: '0410',
              bankName: '平安银行'
            },
            {
              bankId: '0408',
              bankName: '宁波银行'
            },
            {
              bankId: '0104',
              bankName: '中国银行'
            }
          ],
          className: 'slot1'
        }],
        title: '选择居住地',
        cancelTxt: '取消',
        confirmTxt: '确定',
        selectedCity: ''
      }
    },
    mounted() {
      this.storageTextData = this.$emit('storageTextData')
      console.log(this.storageTextData)

      let debitCardList = this.storageTextData.debitCardList
      if (debitCardList) {
        let debitCard = debitCardList[0]
        // Toast({
        //   message: this.storageTextData.debitCardList,
        //   duration: 3000
        // })
        this.debitCardno = debitCard.debitcardNo
        this.phoneNo = debitCard.debitcardPhoneNo
        this.openBank = debitCard.openBank
        this.openBankId = debitCard.openBankId
        this.prov = debitCard.prov
        this.city = debitCard.city
        this.selectedCity = debitCard.prov ? (debitCard.prov + ' ' + debitCard.city) : ''
      }
    },
    methods: {
      back() {
        this.goback()
      },
      selectDepositBank() {
        this.popupVisible = true
      },
      // change 事件有两个参数，分别为当前 picker 的 vue 实例和各 slot 被选中的值组成的数组
      onChange(picker, values) {
        let openBankInfo = values[0]
        console.log(openBankInfo)
        if (openBankInfo !== undefined) {
          this.openBank = openBankInfo.bankName
          this.openBankId = openBankInfo.bankId
          if (openBankInfo.bankName === ' ') {
            this.openBank = ''
          }
        }
      },
      cancel() {
        this.popupVisible = false
      },
      ensure() {
        this.popupVisible = false
        this.saveDebitCard()
      },
      show() {
        this.$refs['picker'].show()
      },
      select() {
        console.log(arguments)
        this.selectedCity = arguments[2][0] + ' ' + arguments[2][1] + ' ' + arguments[2][2]
        this.prov = arguments[2][0]
        this.city = arguments[2][1]
        this.saveDebitCard()
      },
      addDebitCard() {
        let that = this
        this.loading()
        this.app.DebitCard(this.debitCardno, this.phoneNo, this.openBank, this.openBankId, this.prov, this.city)
        this.app.DebitCardCallBack = function(json) {
          that.closeLoading()
          json = JSON.parse(json)
          console.log(json)
          Toast({
            message: json.Msg,
            duration: 3000
          })
          if (json.Step === 9 && json.Result === 0) {
            that.applystatus()
          }
        }
      },
      // 缓存
      saveDebitCard() {
        // let arr = [0, this.debitCardno, this.phoneNo, this.openBank, this.openBankId, this.prov, this.city]
        // Toast({
        //   message: arr,
        //   duration: 3000
        // })
        this.app.SaveDebitCard(0, this.debitCardno, this.phoneNo, this.openBank, this.openBankId, this.prov, this.city)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/base.styl'
  @import '../../../assets/css/identity/personalCertificate.styl'

  .warm-prompt
    display: flex
    padding: 0 15px
    color: #999
    font-size: 12px
    .title
      display: block
      width: 100%
      padding: 13px 0
      border-bottom: 1px solid #d9d9d9
  .bank-support-list
    display: flex
    flex-wrap: wrap
    width: 100%
    padding: 6px 15px 0 15px
    color: #999
    font-size: 12px
    .item
      flex-grow: 1
      flex-shrink: 0
      flex-basis: 33.33%
      width: 33.33%
      line-height: 26px

  .mint-popup
    width: 100%
  .popupContainer
    background-color: #f1f1f1
    .picker-nav
      display: flex
      justify-content: space-between
      align-items: center
      width: 100%
      height: 45px
      padding: 5px 15px
      font-size: 14px
      color: #333
      background-color: #fff
      .cancel-btn
        width: 56px
        height: 25px
        line-height: 25px
        text-align: center
        border: 1px solid #999
        border-radius: 4px
        font-size: 12px
      .ensure-btn
        width: 56px
        height: 25px
        line-height: 25px
        text-align: center
        border-radius: 4px
        color: #fff
        font-size: 12px
        background-color: main-color
</style>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/base.styl'

  .picker
    .picker--panel
      /*background-color: #f1f1f1 !important*/
    .picker--choose
      height: 45px !important
      padding: 0 15px
      /*background-color: #fff !important*/
      .cancel
        padding: 0
        width: 56px
        height: 25px
        line-height: 25px
        text-align: center
        border: 1px solid #999
        border-radius: 4px
        font-size: 12px
      .confirm
        padding: 0
        width: 56px
        height: 25px
        line-height: 25px
        text-align: center
        border-radius: 4px
        color: #fff !important
        font-size: 12px
        background-color: main-color
      h4
        font-size: 15px !important
    .picker--content
      .wheel--wrapper
        .wheel
          font-size: 12px !important
</style>
