<template>
  <view>
    <view></view>
    <view>
      <view class="shop_view" v-for="(item,idx) in nearByArr" :key="idx">
        <view class="shop_left_logo">
          <image :src="item.logo"></image>
        </view>
        <view class="shop_right_desc">
          <!-- 店铺名称 -->
          <view class="shop_title">
            <view v-if="item.shop">{{item.shop}}</view>
            <view>...</view>
          </view>
          <!-- 评分  月售  时长  距离 -->
          <view class="shop_time_distance">
            <!-- <view>
              <text>☆4.9</text>
              <text>月售 9999+</text>
            </view> -->
            <view>
              <text v-if="item.duration">{{item.duration}}min</text>
              <!-- <text>1.5km</text> -->
            </view>
          </view>
          <!-- 起送x元  人均价格 -->
          <view class="shop_price">
            <view>
              <text>起送 ￥{{item.delivering}}</text>
              <text v-if="item.physical">{{item.physical}}</text>
              <text v-else>免费配送</text>
              <text>人均￥{{item.delivering}}</text>
            </view>
            <!-- <view>美团专送</view> -->
          </view>
          <!-- 店铺名气 标语 -->
          <view v-if="item.types">{{item.types}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default{
    data(){
      return{
        msg:'11111'
      }
    },
    props:{
      nearByArr:Array
    }
  }
</script>

<style scoped>
  .shop_view{
    background-color: #f5f5f5;
    border-radius: 10rpx;
    width: 100%;
    display: flex;
    margin-bottom: 20px;
  }
  .shop_left_logo{
    width: 160rpx;
  }
  .shop_left_logo image{
    width: 100%;
    height: 80rpx;
  }
  .shop_right_desc{
    font-size: 24rpx;
  }
  .shop_title,.shop_time_distance,.shop_price{
    display: flex;
    justify-content: space-between;
  }
  .shop_time_distance{

  }
</style>
