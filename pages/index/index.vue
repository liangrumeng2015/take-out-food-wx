<template>
	<view class="content">
    <!-- 定位 -->
		<Location :location="location" />
    
    <!-- 搜索 -->
    <Search :searchVal="searchVal" />
    
    <!-- 轮播 -->
    <Lb />
    
    <!-- title -->
    <Title title="为你优选" />
    
    <!-- 推荐  横向滚动的-->
    <Recommend />
    
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
				title: 'Hello',
        location:'北京啊',
        searchVal:'麻辣烫'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped>
	.content{
    padding:20rpx
  }
</style>
