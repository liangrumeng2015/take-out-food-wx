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
    
    <view id="shopTopFixed" :class="isNeedTop?'is_fixed':''" @click="toPullTop">
      <ShopTopTit   />
    </view>
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
        rectTop:'',
        isNeedTop:false
			}
		},
		mounted(){
       this.getRecommendData() 
       this.getNearByShopData()
    },
    // 计算属性(时刻监听)
    computed:{
      // 监听筛选组件置顶和不置顶
      monitorFn(){
        if(this.rectTop > this.shopTopTitDistanceTop){
          this.isNeedTop = true
        }else{
          this.isNeedTop = false
        }
      }
    },
    onLoad(){
      // 监听元素距离顶部的距离
      const query = uni.createSelectorQuery().in(this);
      query.select('#shopTopFixed').boundingClientRect(data => {
        console.log("节点离页面顶部的距离为" + data.top);
        this.shopTopTitDistanceTop = data.top
      }).exec();
    },
    // 距离顶部的距离
    onPageScroll(res) {
        this.rectTop = res.scrollTop
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
      },
      // 点击 综合排序、筛选那一栏的事件
      toPullTop(){
        console.log('单击到顶部')
        uni.pageScrollTo({
          scrollTop:this.shopTopTitDistanceTop,
          duration:300  
        })
      }
		}
	}
</script>

<style scoped>
	.content{
    padding:20rpx
  }
  .is_fixed{
    width: 100%;
    padding:20rpx;
    box-sizing: border-box;
    background-color: #FFFFFF;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 5;
  }
</style>
