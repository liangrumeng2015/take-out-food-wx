<template>
  <view>
    <view class="shop_top_tit">
      <view class="nearBy_top">
        <view @click="totalSortHandler()">
         {{totalSortTxt}}<text>></text>
        </view>
        <view @click="otherHandler()">销量高</view>
        <view @click="otherHandler()">速度快</view>
        <view @click="otherHandler()">津贴联盟</view>
        <view @click="selectSortHandler()">
          筛选<text>></text>
        </view>
      </view>
      <!-- 综合排序的 -->
      <view class="total_sort" v-if="isShowTotalSort">
        <view v-for="(item,idx) in totalSortData" :key="idx" :class="totalSortNum == idx? 'total_sort_active':''" @click="selectCurrentHandler(idx,item)">{{item}}</view>
      </view>
      <!-- 筛选的 -->
      <view class="select_part" v-if="isShowSelectSort">
        <view class="select_item_part" v-for="(item,idx) in selectData" :key="idx">
          <view>{{item.selectTit}}</view>
          <view class="select_item"> 
            <view v-for="(innerItem,innerIdx) in item.data" :key="innerIdx">{{innerItem}}</view>
          </view>
        </view>
        <!-- 清除、完成按钮 -->
        <view class="select_finish">
          <view>清除</view>
          <view>完成</view>
        </view>
      </view>
    </view>
    <!--  背景遮罩 -->
    <view class="bg_black" v-if="isShowBg" @click="bgHandler"></view>
  </view>
</template>

<script>
  export default{
    data(){
      return{
        msg:'',
        totalSortNum:0,
        totalSortTxt:'',
        isShowTotalSort:false,   // 综合排序 弹框
        isShowSelectSort:false,   // 筛选 弹框
        totalSortData:[   // 综合排序里面的数据
          '综合排序',
          '时间最低1',
          '销量最高1',
          '销量最高2'
        ],
        selectData:[   // 筛选条件数据（按理说应该后端返回）
          {
            selectTit:'商家特色（可多选）',
            data:['配送最快','0元起送','免配送费']
          },
          {
            selectTit:'人均价',
            data:['20元以下','20-40元','40元以上']
          }
        ],
        isShowBg:false
      }
    },
    created(){
      this.totalSortTxt = this.totalSortData[0]
    },
    methods:{
      // 综合排序
      totalSortHandler(){
        this.isShowTotalSort = !this.isShowTotalSort   // 综合排序
        this.isShowSelectSort = false
        if(this.isShowTotalSort){
            this.isShowBg = true
        } else {
          this.isShowBg = false
        }
      },
      // 筛选
      selectSortHandler(){
        this.isShowSelectSort = !this.isShowSelectSort   // 筛选
        this.isShowTotalSort = false
        this.isShowBg = true
        if(this.isShowSelectSort){
            this.isShowBg = true
        } else {
          this.isShowBg = false
        }
      },
      // 销量高、速度快、津贴
      otherHandler(){
        this.isShowSelectSort = false
        this.isShowTotalSort = false
        this.isShowBg = false
      },
      // 选中综合排序的内容
      selectCurrentHandler(idx,txt){
        this.totalSortNum = idx
        this.totalSortTxt = txt
        this.isShowTotalSort = false
        this.isShowBg = false
      },
      // bg事件
      bgHandler(){
        this.isShowSelectSort = false
        this.isShowTotalSort = false
        this.isShowBg = false
      }
    }
  }
</script>

<style scoped>
  .shop_top_tit{
    width: 100%;
    position: relative;
    background-color: #FFFFFF;
    z-index: 2;
  }
  .nearBy_top{
    width: 100%;
    display: flex;
    font-size: 26rpx;
    height: 60rpx;
    align-items: center;
  }
  .nearBy_top>view{
    width: 100%;
  }
  .nearBy_top>view:nth-child(2),.nearBy_top>view:nth-child(3),.nearBy_top>view:nth-child(4){
    text-align: center;
  }
  .nearBy_top>view:last-child{
    text-align: right;
  }
  .total_sort{
    width: 100%;
    position: absolute;
    left: 0;
    top: 60rpx;
    right: 0;
    z-index: 2;
    font-size: 26rpx;
    background-color: #FFFFFF;
  }
  .total_sort>view{
    height: 60rpx;
    line-height: 60rpx;
  }
  .select_part{
    width: 100%;
    position: absolute;
    left: 0;
    top: 60rpx;
    right: 0;
    font-size: 26rpx;
    background-color: #fff;
  }
  .select_item{
    display: flex;
    flex-wrap: wrap;
  }
  .select_item>view{
    width: 26%;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 10rpx;
    margin:20rpx;
    text-align: center;
    background-color: pink;
  }
  .select_finish{
    width:100%;
    height: 80rpx;
    line-height: 80rpx;
    display: flex;
    margin-top: 80rpx;
  }
  .select_finish>view{
    width: 50%;
    height: 100%;
    text-align: center;
  }
  .select_finish>view:first-child{
    border-right: 1px solid #808080;
  }
  .select_finish>view:last-child{
    background-color: #f7da6a;
  }
  .total_sort_active{
    color:#f7da6a !important;
  }
  .bg_black{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 1;
  }
</style>
