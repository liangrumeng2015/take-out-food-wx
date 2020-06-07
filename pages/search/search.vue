<template>
  <!-- 搜索界面 -->
    <view class="search_wrap">
      <!-- 搜索框部分 -->
      <view class="search_page">
        <input type="text" 
          v-model="searchVal" 
          placeholder="请输入关键字" 
          focus="" 
          confirm-type="搜索"
          @confirm="onKeyPress"/>
        <view class="search_btn" @click="toSearchHandler">搜索</view>
      </view>
      
      <!-- 搜索历史 -->
      <view class="search_history" v-if="searchList.length == 0">
        <view class="search_history_top">
          <view>搜索历史</view>
          <view><image src="../../static/coen/fuwu.png" /></view>
        </view>
        <view class="search_con">
          <view class="search_li" 
          v-for="(item,idx) in historyList" 
          :key="idx" 
          @click="historyItemHandler(item)">{{item}}</view>
        </view>
      </view>
      
      <!-- 没有商品数据 -->
      <view class="search_no_result" v-if="searchResult">
        <image src="../../static/coen/meoyopu.png" mode="widthFix" />
        <view>{{searchResultTit}}</view>
      </view>
      
      <!-- 搜索列表展示  -->
      <view class="search_list">
        <NearByShop :nearByArr="searchList" />
      </view>
    </view>
</template>

<script>
  import {request} from '../../config/request.js'
  import {searchApi} from '../../config/api.js'
  import NearByShop from '../index/components/nearByShop.vue'
  import {Toast} from '../../config/tools.js'
  const {log} = console
  export default{
    components:{
      NearByShop
    },
    data(){
      return{
        searchVal:'',
        historyList:[],
        searchResult:false,   // 搜索无结果展示
        searchResultTit:'',
        searchList:[]
      }
    },
    mounted() {
      this.historyList = uni.getStorageSync('historyList') || []
    },
    methods:{
      // 搜索
      toSearchHandler(){
        if(this.searchVal){
          this.getSearchAsync(this.searchVal)
        }else{
          Toast('关键字不能为空')
        }
      },
      // 键盘按下时触发
      onKeyPress(e){
        if(e.detail.value){
          this.getSearchAsync(e.detail.value)
        }else{
          Toast('关键字不能为空')
        }
      },
      // 点击历史记录
      historyItemHandler(item){
        this.searchVal = item
        this.getSearchAsync(item)
      },
      // 获取接口数据
      getSearchAsync(searchdata){
        // 存储历史记录
        this.historyList.push(searchdata)
        this.historyList = Array.from(new Set(this.historyList))  // 去重
        uni.setStorageSync('historyList',this.historyList)
        
        let data = { searchdata }
        request(searchApi,data,'post').then(res=>{
          log('搜索结果',res)
          if(res == '没有商品数据'){
            this.searchResult = true
            this.searchResultTit = res
            this.searchList = []
          }else{
            this.searchResult = false
            this.searchList = res
          }
        })
      },
    }
  }
</script>

<style scoped>
  .search_wrap{
    padding: 0 20rpx;
    box-sizing: border-box;
    font-size: 28rpx;
  }
  /* 搜索框部分 */
  .search_page{
    display: flex;
  }
  .search_page input{
    width: 80%;
    text-indent: 10rpx;
    padding: 5rpx;
    border-radius: 10rpx;
    background-color: #fcfbfd;
  }
  .search_btn{
    width: 20%;
    text-align: center;
  }
  /* 搜索历史 */
  .search_history{
    margin-top: 40rpx;
  }
  .search_history_top{
    display: flex;
    justify-content: space-between;
    padding:20rpx 0;
  }
  .search_history_top view:first-child{
    font-weight: bold;
  }
  .search_history_top view:last-child image{
    width: 26rpx;
    height: 26rpx;
  }
  .search_con{
    display: flex;
    flex-wrap: wrap;
  }
  .search_li{
    padding: 5rpx 20rpx;
    background-color: pink;
    border-radius: 10rpx;
    margin: 10rpx;
  }
  /* 搜索没结果 */
  .search_no_result{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 300rpx;
    text-align: center;
  }
  .search_no_result image{
    width: 100%;
  }
   /* 列表 */
  .search_list{
    margin-top: 40rpx;
  }
</style>
