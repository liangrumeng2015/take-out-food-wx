<!-- 搜索组件 -->
<template>
  <view class="search" @click="searchHandler">
    <input type="text" disabled />
    <view class="search_con">
      <image src="../../../static/coen/sousuo.svg"></image>
      <view class="search_value" v-if="searchVal">{{searchVal}}</view>
    </view>
  </view>
</template>

<script>
  export default{
    props:{
      searchVal:String
    },
    methods:{
        searchHandler(){
          uni.navigateTo({
            url:'/pages/search/search'
          })
        }
    }
  }
</script>

<style scoped>
  .search{
    position: relative;
    margin: 20rpx 0;
  }
  input{
    background-color: #f1f4f5;
    height: 60rpx;
    line-height: 60rpx;
    padding-left: 60rpx;
    box-sizing: border-box;
    border-radius: 10rpx;
  }
  .search image{
    width: 40rpx;
    height: 40rpx;
    padding: 0 20rpx;
  }
  .search_con{
    display: flex;
    height: 60rpx;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
  }
  .search_value{
    color:#b6b9ba ;
  }
</style>
