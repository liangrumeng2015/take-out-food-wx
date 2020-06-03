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
    
    <!-- 附近商家 -->
    <Title title="附近商家" bb="bbbbbbbbb" />
    <view id="shopTopTit" :class="isNeedTop?'shopTopTit':''">
      <ShopTopTit  />
      <NearByShop :nearByArr="nearByArr" aa='5555' />
    </view>
    
	</view>
</template>

<script>
  import Location from './components/location.vue'
  import Search from './components/search.vue'
  import Title from './components/title.vue'
  import Recommend from './components/recommend.vue'
  import Lb from './components/lb.vue'
  import NearByShop from './components/nearByShop.vue'
  import ShopTopTit from './components/shopTopTit.vue'
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
      NearByShop,ShopTopTit
    },
		data() {
			return {
        lbData,
				title: 'Hello',
        location:'北京啊',
        searchVal:'麻辣烫',
        recommendArr:[],   // 推荐的商品
        nearByArr:[],  // 附近商家的商品
        shopTopTitDistanceTop:'',
        isNeedTop:false
			}
		},
		mounted(){
       this.getRecommendData() 
       this.getNearByShopData()
       const query = uni.createSelectorQuery().in(this);
       query.select('#shopTopTit').boundingClientRect(data => {
         console.log("节点离页面顶部的距离为" + data.top);
         this.shopTopTitDistanceTop = data.top
       }).exec();
    },
    // 距离顶部的距离
    onPageScroll(res) {
        console.log(res.scrollTop)
        if(res.scrollTop >= this.shopTopTitDistanceTop){
          console.log('置顶')
          this.isNeedTop = true
        }else{
          console.log('不置顶')
          this.isNeedTop = false
        }
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
  .shopTopTit{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 5;
    background-color: pink;
  }
</style>
