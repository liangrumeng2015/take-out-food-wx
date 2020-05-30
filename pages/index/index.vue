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
    <Title title="附近商家" />
    
    
	</view>
</template>

<script>
  import Location from './components/location.vue'
  import Search from './components/search.vue'
  import Title from './components/title.vue'
  import Recommend from './components/recommend.vue'
  import Lb from './components/lb.vue'
  import {lbData} from '../../config/constant.js'   // 轮播的数据
  import {request} from '../../config/request.js'
  import {recommendApi,searchApi} from '../../config/api.js'
	export default {
    components:{
      Location,
      Search,
      Title,
      Recommend,
      Lb
    },
		data() {
			return {
        lbData,
				title: 'Hello',
        location:'北京啊',
        searchVal:'麻辣烫',
        recommendArr:[]   // 推荐的商品
			}
		},
		mounted(){
       this.getRecommendData()  
    },
		methods: {
      // 为你优选
      getRecommendData(){
        request(recommendApi,'','get').then(res=>{
          console.log(res)
          this.recommendArr = res
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
