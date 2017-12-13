<template>
  <div>
    <div class="residence" ref="residence">
      <div class="input-item" @click="showHome">
        <div class="input-item-l">
          <div class="name">
            <span class="required">居住地</span>
          </div>
          <input class="input" type="text" placeholder="请选择居住地所在城市" readonly v-model="homeCity">
          <!--<span class="color999">{{homeCity || '请选择居住地所在城市'}}</span>-->
        </div>
        <div class="input-item-r">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="input-item">
        <div class="input-item-l">
          <div class="name">
            <span class="required">详细地址</span>
          </div>
          <input class="input" type="text" placeholder="详细居住地址（精确到门牌号）" v-model="homeAddr4" v-on:blur="saveHomeJobInfo">
        </div>
      </div>
    </div>


    <div ref="wordAddress">
      <div class="input-item" @click="showWork">
        <div class="input-item-l">
          <div class="name">
            <span class="required">工作地址</span>
          </div>
          <input class="input" type="text" placeholder="请选择工作城市" readonly v-model="workCity">
          <!--<span class="color999">{{workCity || '请选择工作城市'}}</span>-->
        </div>
        <div class="input-item-r">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
      <div class="input-item">
        <div class="input-item-l">
          <div class="name">
            <span class="required">详细地址</span>
          </div>
          <input class="input" type="text" placeholder="详细单位地址（精确到门牌号）" v-model="unitAddr4" v-on:focus="hideResidence" v-on:blur="saveHomeJobInfo">
        </div>
      </div>
    </div>


    <div class="input-item">
      <div class="input-item-l">
        <div class="name">
          <span class="required">单位名称</span>
        </div>
        <input class="input" type="text" placeholder="填写工作单位（公司、实体店铺等）" v-model="jobUnit" v-on:focus="hideResidence" v-on:blur="saveHomeJobInfo">
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <div class="name">
          <span class="required">电话区号</span>
        </div>
        <input class="input" type="number" placeholder="填写单位电话区号" v-model="unitTelArea" v-on:focus="hideResidenceAndWordAddress" v-on:blur="saveHomeJobInfo" oninput=" if(value.length>4)
        {value = value.slice(0,4)}">
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <div class="name">
          <span class="required">座机号</span>
        </div>
        <input class="input" type="number" placeholder="填写单位电话座机号" v-model="unitTelNo" v-on:focus="hideResidenceAndWordAddress" v-on:blur="saveHomeJobInfo" oninput=" if(value.length>8)
        {value = value.slice(0,8)}">
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <div class="name">
          <span>分机号</span>
        </div>
        <input class="input" type="number" placeholder="填写单位电话分机号(选填)" v-model="unitTelExt" v-on:focus="hideResidenceAndWordAddress" v-on:blur="saveHomeJobInfo" oninput=" if(value.length>4)
        {value = value.slice(0,4)}">
      </div>
    </div>

    <div class="input-item-hint">
      <div class="caution-wrapper">
        <span class="icon-caution"></span><span>详细、真实的信息可加快审核，提高额度</span>
      </div>
      <div class="arrow-wrapper">
        <router-link to="/personalCertificate/writeStandard" class="main-color">填写规范</router-link> <span class="fa fa-angle-right arrow-right"></span>
      </div>
    </div>

    <div class="loan-btn" style="margin-top: 42px;">
      <mt-button class="btn" @click="homeJobInfo">提交</mt-button>
    </div>

    <vue-city-picker ref="pickerHome" @select="selectHome" :title="titleHome" :cancel-txt="cancelTxtHome" :confirm-txt="confirmTxtHome"></vue-city-picker>
    <vue-city-picker ref="pickerWork" @select="selectWork" :title="titleWork" :cancel-txt="cancelTxtWork" :confirm-txt="confirmTxtWork"></vue-city-picker>
  </div>
</template>

<script type="text/ecmascript-6">
  import pcNavHeader from '../../common/pcNavHeader'
  import vueCityPicker from 'vue-city-bspicker'
  import { Toast } from 'mint-ui'

  export default {
    components: {
      pcNavHeader,
      vueCityPicker
    },
    data() {
      return {
        titleHome: '选择居住地',
        cancelTxtHome: '取消',
        confirmTxtHome: '确定',
        // homeCity: this.storageTextData.homeInfo ? (this.storageTextData.homeInfo.homeAddr1 ? (this.storageTextData.homeInfo.homeAddr1 + ' ' + this.storageTextData.homeInfo.homeAddr2 + ' ' + this.storageTextData.homeInfo.homeAddr3) : '') : '',
        homeCity: '',
        titleWork: '选择居住地',
        cancelTxtWork: '取消',
        confirmTxtWork: '确定',
        // workCity: this.storageTextData.jobInfo ? (this.storageTextData.jobInfo.unitAddr1 ? (this.storageTextData.jobInfo.unitAddr1 + ' ' + this.storageTextData.jobInfo.unitAddr2 + ' ' + this.storageTextData.jobInfo.unitAddr3) : '') : '',
        workCity: '',
        /**
         * homeAddr1   居住地直辖市/省
         * homeAddr2   居住地辖区/市
         * homeAddr3   居住地区/市、县
         * homeAddr4   居住地详细地址
         * homeTelArea 家庭电话区号 可以为空
         * jobUnit     单位名称
         * unitAddr1   单位直辖市/省
         * unitAddr2   单位辖区/市
         * unitAddr3   单位区/市、县
         * unitAddr4   单位详细地址
         * unitTelArea 单位电话区号
         * unitTelNo   单位座机号
         * unitTelExt  单位分机号 可以为空
         */
        // homeAddr1: this.storageTextData.homeInfo ? this.storageTextData.homeInfo.homeAddr1 : '',
        // homeAddr2: this.storageTextData.homeInfo ? this.storageTextData.homeInfo.homeAddr2 : '',
        // homeAddr3: this.storageTextData.homeInfo ? this.storageTextData.homeInfo.homeAddr3 : '',
        // homeAddr4: this.storageTextData.homeInfo ? this.storageTextData.homeInfo.homeAddr4 : '',
        // homeTelArea: '',
        // jobUnit: this.storageTextData.jobInfo ? this.storageTextData.jobInfo.jobUnit : '',
        // unitAddr1: this.storageTextData.jobInfo ? this.storageTextData.jobInfo.unitAddr1 : '',
        // unitAddr2: this.storageTextData.jobInfo ? this.storageTextData.jobInfo.unitAddr2 : '',
        // unitAddr3: this.storageTextData.jobInfo ? this.storageTextData.jobInfo.unitAddr3 : '',
        // unitAddr4: this.storageTextData.jobInfo ? this.storageTextData.jobInfo.unitAddr4 : '',
        // unitTelArea: this.storageTextData.jobInfo ? this.storageTextData.jobInfo.unitTelArea : '',
        // unitTelNo: this.storageTextData.jobInfo ? this.storageTextData.jobInfo.unitTelNo : '',
        // unitTelExt: this.storageTextData.jobInfo ? this.storageTextData.jobInfo.unitTelExt : '',
        homeAddr1: '',
        homeAddr2: '',
        homeAddr3: '',
        homeAddr4: '',
        homeTelArea: '',
        jobUnit: '',
        unitAddr1: '',
        unitAddr2: '',
        unitAddr3: '',
        unitAddr4: '',
        unitTelArea: '',
        unitTelNo: '',
        unitTelExt: ''
      }
    },
    created() {
      this.storageTextData = this.$emit('storageTextData')
      console.log(this.storageTextData)

      if (this.storageTextData.homeInfo) {
        this.homeAddr1 = this.storageTextData.homeInfo.homeAddr1
        this.homeAddr2 = this.storageTextData.homeInfo.homeAddr2
        this.homeAddr3 = this.storageTextData.homeInfo.homeAddr3
        this.homeAddr4 = this.storageTextData.homeInfo.homeAddr4
        if (this.storageTextData.homeInfo.homeAddr1) {
          this.homeCity = this.storageTextData.homeInfo.homeAddr1 + ' ' + this.storageTextData.homeInfo.homeAddr2 + ' ' + this.storageTextData.homeInfo.homeAddr3
        }
      }

      if (this.storageTextData.jobInfo) {
        this.jobUnit = this.storageTextData.jobInfo.jobUnit
        this.unitAddr1 = this.storageTextData.jobInfo.unitAddr1
        this.unitAddr2 = this.storageTextData.jobInfo.unitAddr2
        this.unitAddr3 = this.storageTextData.jobInfo.unitAddr3
        this.unitAddr4 = this.storageTextData.jobInfo.unitAddr4
        this.unitTelArea = this.storageTextData.jobInfo.unitTelArea
        this.unitTelNo = this.storageTextData.jobInfo.unitTelNo
        this.unitTelExt = this.storageTextData.jobInfo.unitTelExt
        if (this.storageTextData.jobInfo.unitAddr1) {
          this.workCity = this.storageTextData.jobInfo.unitAddr1 + ' ' + this.storageTextData.jobInfo.unitAddr2 + ' ' + this.storageTextData.jobInfo.unitAddr3
        }
      }
    },
    methods: {
      hideResidence() {
        let el = this.$refs.residence
        el.style.display = 'none'
        this.$store.commit('toggleViewSave', {
          status: true,
          target: [el]
        })
      },
      hideResidenceAndWordAddress() {
        let el1 = this.$refs.residence
        let el2 = this.$refs.wordAddress
        el1.style.display = 'none'
        el2.style.display = 'none'
        this.$store.commit('toggleViewSave', {
          status: true,
          target: [el1, el2]
        })
      },
      back() {
        this.goback()
      },
      showHome() {
        this.$refs['pickerHome'].show()
      },
      selectHome() {
        console.log(arguments)
        this.homeCity = arguments[2][0] + ' ' + arguments[2][1] + ' ' + arguments[2][2]
        this.homeAddr1 = arguments[2][0]
        this.homeAddr2 = arguments[2][1]
        this.homeAddr3 = arguments[2][2]
        this.saveHomeJobInfo()
      },
      showWork() {
        this.$refs['pickerWork'].show()
      },
      selectWork() {
        console.log(arguments)
        this.workCity = arguments[2][0] + ' ' + arguments[2][1] + ' ' + arguments[2][2]
        this.unitAddr1 = arguments[2][0]
        this.unitAddr2 = arguments[2][1]
        this.unitAddr3 = arguments[2][2]
        this.saveHomeJobInfo()
      },
      homeJobInfo() {
        let that = this
        this.loading()
        this.app.HomeJobInfo(
          this.homeAddr1,
          this.homeAddr2,
          this.homeAddr3,
          this.homeAddr4,
          this.homeTelArea,
          this.jobUnit,
          this.unitAddr1,
          this.unitAddr2,
          this.unitAddr3,
          this.unitAddr4,
          this.unitTelArea,
          this.unitTelNo,
          this.unitTelExt
        )
        this.app.HomeJobInfoCallBack = function(json) {
          that.closeLoading()
          json = JSON.parse(json)
          console.log(json)
          Toast({
            message: json.Msg,
            duration: 3000
          })
          if (json.Step === 11 && json.Result === 0) {
            // that.$router.push('/personalCertificate/linkman')
            // that.$store.commit('personalCertificateSwiperProgressSave', 4)

            // that.$emit('checkApplyStatus')
            that.applystatus()
          }
        }
      },
      // 缓存
      saveHomeJobInfo() {
        this.app.SaveHomeJobInfo(
          this.homeAddr1,
          this.homeAddr2,
          this.homeAddr3,
          this.homeAddr4,
          this.homeTelArea,
          this.jobUnit,
          this.unitAddr1,
          this.unitAddr2,
          this.unitAddr3,
          this.unitAddr4,
          this.unitTelArea,
          this.unitTelNo,
          this.unitTelExt
        )
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/identity/personalCertificate.styl'

  .residence
    margin: 12px 0
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
