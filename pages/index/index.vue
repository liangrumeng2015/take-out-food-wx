<template>
	<view class="content">
    <!-- 定位 -->
		<Location :location="location" />
    
    <!-- 搜索 -->
    <Search :searchVal="searchVal" />
    
    <!-- 轮播 -->
    <Lb :lbData="lbData" />
    
    <!-- title -->
    <Title title="为你优选" />
    <!-- 商品推荐  横向滚动的-->
    <Recommend :recommendArr="recommendArr" />
    
    <!-- title -->
    <Title title="附近商家" bb="bbbbbbbbb" />
    <!-- 附近商家 -->
    <NearByShop :nearByArr="nearByArr" aa='5555' />
    
	</view>
</template>

<script>
  import Location from './components/location.vue'
  import Search from './components/search.vue'
  import Title from './components/title.vue'
  import Recommend from './components/recommend.vue'
  import Lb from './components/lb.vue'
  import NearByShop from './components/nearByShop.vue'
  import {lbData} from '../../config/constant.js'   // 轮播的数据
  
  import {request} from '../../config/request.js'
  import {recommendApi,nearbyShopApi,searchApi} from '../../config/api.js'
	export default {
    components:{
      Location,
      Search,
      Title,
      Recommend,
      Lb,
      NearByShop
    },
		data() {
			return {
        lbData,
				title: 'Hello',
        location:'北京啊',
        searchVal:'麻辣烫',
        recommendArr:[],   // 推荐的商品
        nearByArr:[]  // 附近商家的商品
			}
		},
		mounted(){
       this.getRecommendData() 
       this.getNearByShopData()
    },
		methods: {
      // 为你优选
      getRecommendData(){
        request(recommendApi,'','get').then(res=>{
          this.recommendArr = res
        })
      },
      // 附近商家
      getNearByShopData(){
        request(nearbyShopApi,'','get').then(res=>{
          this.nearByArr = res
        })
      }
		}
	}
</script>

<style scoped>
	.content{
    padding:20rpx
  }
</style>
