<template>
  <div class="banner-container">
    <van-swipe :autoplay="6000" :show-indicators="false">
      <van-swipe-item v-for="(banner, index) in banners" :key="index">
        <img :src="banner.imgUrl"  @click="visitBanner(banner.imgDetailUrl)"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      banners: []
    }
  },
  mounted() {
    let base = 'http://www.kahuanwang.com/khw/c/b'
    const getBannerUrls = params => { return axios.post(`${base}`) }
    getBannerUrls().then((res) => {
      if (res.status === 200) {
        this.banners = res.data
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    visitBanner(url) {
      if (url !== '') {
        window.location.href = url
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.banner-container{
	width: 100%
	height: 100%
	.van-swipe{
		width: 100%
		height: 100%
		img{
			width: 100%
			height: 100%
			border-radius: 30px
		}
	}
	
}
</style>