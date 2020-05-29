<template>
  <view>
    <!-- 轮播模块 -->
    <swiper class="swiper" :autoplay="option.autoplay" :interval="option.interval" :duration="option.duration" @change="changeSwiperHandler">
        <block v-for="(item,idx) in lbData" :key="idx">
           <swiper-item class="swiper-item-page" >
              <view v-for="(innerItem,innerIdx) in item" :key="innerIdx">
                <image :src="innerItem.img"></image>
                <view class="item-title">{{innerItem.title}}</view>
              </view>
           </swiper-item>
           
        </block>
    </swiper>
    <!--  面板指示点模块 -->
    <view class="indicator-part">
      <block v-for="(item,idx) in indicatorArr" :key="idx">
        <view class="indicator-dots" :class="currentIdx == idx?'active':''"></view>
      </block>
    </view>
    
    </view>
  </view>
</template>

<script>
  import {lbData} from '../../../static/config/constant.js'
  export default{
    data(){
      return{
        msg:'',
        lbData,   // lb数据
        option:{   // swiper的相关配置
          interval:4000,
          duration:400,
          autoplay:false
        },
        currentIdx:0,   // 当前的索引
        indicatorArr:[]   // 面板指示的个数
      }
    },
    mounted(){
      for(let i = 0;i<this.lbData.length;i++){
        this.indicatorArr.push('')
      }
    },
    methods:{
      changeSwiperHandler(e){
        this.currentIdx = e.detail.current    // 当前高亮的索引值
      }
    }
  }
</script>

<style scoped>
  .swiper-item-page{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content:left;
    text-align: center;
    align-items: center;
  }
  .swiper-item-page image{
    width: 70rpx;
    height: 70rpx;
  }
  .swiper-item-page>view{
    width: 20%;
  }
  .item-title{
    font-size: 24rpx;
    padding-top: 10rpx;
  }
  /* 面板指示点 */
  .indicator-part{
    display: flex;
    justify-content: center;
    margin-top: 20rpx;
  }
  .indicator-dots{
    width: 40rpx;
    height: 14rpx;
    background-color: #e8e8e8;
    border-radius: 6rpx;
    margin: 0 10rpx;
  }
  /* 高亮的指示点 */
  .active{
    background-color: #e7b648;
  }
  
</style>
