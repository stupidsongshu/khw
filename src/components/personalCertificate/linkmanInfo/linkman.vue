<template>
  <div>
    <div class="input-item" style="margin-top: 12px;">
      <div class="input-item-l">
        <span class="name">家人</span>
        <!--<span class="color999">{{contactName1 || '请选择联系人'}}</span>-->
        <span class="color999">{{contactName1 ? (contactName1 + ' ' + contactPhone1) : '请选择联系人'}}</span>
      </div>
      <div class="input-item-r" @click="getContacts(4)">
        <i class="icon-linkman"></i>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">朋友</span>
        <span class="color999">{{contactName2 ? (contactName2 + ' ' + contactPhone2) : '请选择联系人'}}</span>
      </div>
      <div class="input-item-r" @click="getContacts(6)">
        <i class="icon-linkman"></i>
      </div>
    </div>
    <div class="input-item">
      <div class="input-item-l">
        <span class="name">同事</span>
        <span class="color999">{{contactName3 ? (contactName3 + ' ' + contactPhone3) : '请选择联系人'}}</span>
      </div>
      <div class="input-item-r" @click="getContacts(7)">
        <i class="icon-linkman"></i>
      </div>
    </div>

    <div class="loan-btn" style="margin-top: 42px;">
      <mt-button class="btn" @click="submit">提交</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import pcNavHeader from '../../common/pcNavHeader'
  import {Toast} from 'mint-ui'

  export default {
    components: {
      pcNavHeader
    },
    data() {
      return {
        /**
         * contactName 联系人姓名
         * contactPhone 联系人电话
         * contactRelation 关系:4家人 6朋友 7同事
         */
        contactName1: '',
        contactPhone1: '',
        contactRelation1: 4,
        contactName2: '',
        contactPhone2: '',
        contactRelation2: 6,
        contactName3: '',
        contactPhone3: '',
        contactRelation3: 7
      }
    },
    created() {
      this.storageTextData = this.$emit('storageTextData')
      console.log(this.storageTextData)

      let linkInfo = this.storageTextData.emContactList
      if (linkInfo && linkInfo.length > 0) {
        this.contactName1 = this.emContactList[0].contactName
        this.contactPhone1 = this.emContactList[0].contactPhone

        this.contactName2 = this.emContactList[1].contactName
        this.contactPhone2 = this.emContactList[1].contactPhone

        this.contactName3 = this.emContactList[2].contactName
        this.contactPhone3 = this.emContactList[2].contactPhone
      }
    },
    methods: {
      back() {
        this.goback()
      },
      getContacts(contactRelation) {
        let that = this
        this.app.getContacts()
        this.app.GetContactsCallBack = function(json) {
          let name = json.split(',')[0]
          let number = json.split(',')[1]
          if (contactRelation === 4) {
            that.contactName1 = name
            that.contactPhone1 = number
          }
          if (contactRelation === 6) {
            that.contactName2 = name
            that.contactPhone2 = number
          }
          if (contactRelation === 7) {
            that.contactName3 = name
            that.contactPhone3 = number
          }
        }
      },
      submit() {
        let that = this
        this.app.EmContact(
          this.contactName1,
          this.contactPhone1,
          this.contactRelation1,
          this.contactName2,
          this.contactPhone2,
          this.contactRelation2,
          this.contactName3,
          this.contactPhone3,
          this.contactRelation3
        )
        this.app.EmContactCallBack = function(json) {
          json = JSON.parse(json)
          console.log(json)
          Toast({
            message: json.Msg,
            duration: 3000
          })
          // 缓存
          that.app.SaveEmContact(
            that.contactName1,
            that.contactPhone1,
            that.contactRelation1,
            that.contactName2,
            that.contactPhone2,
            that.contactRelation2,
            that.contactName3,
            that.contactPhone3,
            that.contactRelation3
          )
          if (json.Step === 13 && json.Result === 0) {
            that.applystatus()
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/css/identity/personalCertificate.styl'

  .icon-linkman
    display: inline-block
    width: 20px
    height: 21px
    background: url("../../../assets/img/icon_linkman.png") no-repeat
    background-size: 20px 21px

  .mint-popup
    width: 88.8%
    max-height: 90%
    padding: 10px
    overflow: scroll
    border-radius: 10px
    .linkman-item
      display: flex
      align-items: center
      width: 100%
      height: 40px
      border-bottom: 1px solid #999
      span
        width: 33.33%
        text-align: center
</style>
