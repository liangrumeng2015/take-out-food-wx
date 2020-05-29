<!-- 定位的组件 -->
<template>
  <view class="location">
    <image src="../../../static/coen/dizhi.png"></image>
    <view class="location_place" v-if="location">{{location}}</view>
    <view>></view>
  </view>
</template>

<script>
  export default{
    props:{
      location:String
    }
  }
</script>

<style scoped>
  .location{
    display: flex;
  }
  .location image{
    width: 40rpx;
    height: 40rpx;
  }
  .location_place{
    padding:0 15rpx;
    font-weight: bold;
  }
</style>
