<!-- 商品推荐，横向滑动 -->
<template>
   <view class="recommend_part">
       <scroll-view 
       class="scroll-view_H" 
       scroll-x="true" 
       :scroll-with-animation="true" 
       @scroll="scroll" scroll-left="0">
           <view  class="scroll-view-item" v-for="(item,idx) in recommendArr" :key="idx">
             <image :src="item.image"></image>
             <view class="title_level1">{{item.title}}</view>
             <view class="title_level2">{{item.lable}}</view>
           </view>
       </scroll-view>
   </view>
</template>

<script>
  export default{
    data(){
      return{
        msg:'',
        old: {
            scrollTop: 0
        }
      }
    },
    props:{
      recommendArr:Array
    },
    methods:{
      // 横向滚动条滚动的距离
      scroll: function(e) {
          console.log(e)
          this.old.scrollTop = e.detail.scrollTop
      }
    }
  }
</script>

<style scoped>
.recommend_part{
  width: 100%;
  height: 202rpx;
}
scroll-view ::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
.scroll-view_H{
  white-space: nowrap;
  overflow: hidden;
}
.scroll-view-item{
  width: 240rpx;
  height: 160rpx;
  display: inline-block;
  margin-right: 40rpx;
}
.scroll-view-item:last-child{
  margin-right: 0;
}
.scroll-view-item image{
  width: 100%;
  height: 120rpx;
  border-radius: 10rpx;
}
.title_level1{
  font-size: 26rpx;
}
.title_level2{
  font-size: 24rpx;
  color: #C8C7CC;
}
</style>
