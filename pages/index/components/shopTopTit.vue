<template>
  <!-- 附近商家 -->
  <view>
    <view class="shop_top_tit">
      <view class="nearBy_top">
        <view @click="totalSortHandler()">
         {{totalSortTxt}}<text></text>
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
        <view v-for="(item,idx) in totalSortData" :key="idx" :class="totalSortNum == idx? 'total_sort_active':''" @click="selectCurrentHandler(idx,item)">{{item.name}}</view>
      </view>
      <!-- 筛选的 -->
      <view class="select_part" v-if="isShowSelectSort">
        <!-- 多选 -->
        <view class="select_item_part" v-for="(item,idx) in screendata" :key="idx">
          <view>{{item.title}}</view>
          <view class="select_item"> 
            <view v-for="(innerItem,innerIdx) in item.datas" :key="innerIdx" @click="multipleSelectHandler(innerIdx,innerItem)" :class="innerItem.id == 2?'multiple_single_active':''">{{innerItem.name}}</view>
          </view>
        </view>
        <!-- 单选 -->
        <view class="select_item_part" v-for="(item,idx) in person" :key="idx">
          <view>{{item.title}}</view>
          <view class="select_item"> 
            <view v-for="(innerItem,innerIdx) in item.datas" :key="innerIdx" :class="singleNum == innerIdx?'multiple_single_active':''" @click="singleSelect(innerIdx,innerItem)">{{innerItem.name}}</view>
          </view>
        </view>
        <!-- 清除、完成按钮 -->
        <view class="select_finish">
          <view @click="clearHandler">清除</view>
          <view @click="finishHandler">完成</view>
        </view>
      </view>
    </view>
    <!--  背景遮罩 -->
    <view class="bg_black" v-if="isShowBg" @click="bgHandler"></view>
  </view>
</template>

<script>
  import {request} from '../../../config/request.js'
  import {startingAPi,selectMultiple} from '../../../config/api.js'
  export default{
    data(){
      return{
        msg:'',
        totalSortNum:0,
        totalSortTxt:'',
        isShowTotalSort:false,   // 综合排序 弹框
        isShowSelectSort:false,   // 筛选 弹框
        totalSortData: [  // 综合排序里面的数据
        	{
        		"name":"综合排序",
        		"screen":"_id",
        		"nums":1
        	},
        	{
        		"name":"起送价最低",
        		"screen":"delivering",
        		"nums":1
        	},
        	{
        		"name":"配送费最低",
        		"screen":"physical",
        		"nums":1
        	},
        	{
        		"name":"人均高到低",
        		"screen":"capita",
        		"nums":-1
        	},
        	{
        		"name":"人均低到高",
        		"screen":"capita",
        		"nums":1
        	}
        ],
        screendata:[   // 多选
        	{
        		"title":"商家特色(可多选)",
        		"datas":[
        			{
        				"id":1,
        				"sign":'duration',
        				"name":'配送最快'
        			},
        			{
        				"id":1,
        				"sign":'deliver',
        				"name":'0元起送'
        			},
        			{
        				"id":1,
        				"sign":'physi',
        				"name":'免配送费'
        			}
        		],
        	}		
        ],
        person:[   // 人均价筛选
        	{
        		"title":"人均价",
        		"datas":[
        			{
        			"name":"20元以下",
        			"per":{
        				"$lte":20
        				},
        			},
        			{
        			"name":"20-40元",
        			"per":{
        				"$lte":40,
        				"$gte":20
        				},
        			},
        			{
        			"name":"40元以上",
        			"per":{
        				"$gt":40
        				},
        			},
        		]
        	}
        ],
        isShowBg:false,
        multipleSelectData:{}, 
        singleNum: -1
      }
    },
    created(){
      this.totalSortTxt = this.totalSortData[0].name
    },
    methods:{
      // 多选
      multipleSelectHandler(idx,item){
        if(item.id == 2){   // 选中
          item.id = 1
          this.$delete(this.multipleSelectData,item.sign,item.sign)
        }else if(item.id == 1){   // 未选中
          item.id = 2
          this.$set(this.multipleSelectData,item.sign,item.sign)
        }
      },
      // 单选
      singleSelect(idx,item){
        this.singleNum = idx
        if(this.singleNum == idx){
          this.$set(this.multipleSelectData,'capita',item.per)
        }
      },
      // 清除按钮
      clearHandler(){
        // 多选清空
        this.screendata[0].datas.forEach(item=> item.id = 1)
        // 单选清空
        this.singleNum = -1  
        this.multipleSelectData = {}
        this.bgHandler()
      },
      
      // 筛选确定按钮
      finishHandler(){
          console.log(this.multipleSelectData)
          this.bgHandler()
          if(Object.keys(this.multipleSelectData).length){
            request(selectMultiple,this.multipleSelectData,'post').then(res=>{
              this.$store.commit('screenStoreFn',res)
            })
          }
      },
      
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
      
      // 选中综合排序的内容
      selectCurrentHandler(idx,item){
        this.totalSortNum = idx
        this.totalSortTxt = item.name
        this.isShowTotalSort = false
        this.isShowBg = false
        this.sortHandler(item)
      },
      
      // 异步获取数据
      sortHandler(item){
        let data ={
          screen: item.screen,
          nums: item.nums
        }
        request(startingAPi,data,'post').then(res=>{
          this.$store.commit('screenStoreFn',res)
        })
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
    background-color: #fcfbfd;
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
  .multiple_single_active{
    background-color:#fefae7!important ;
    color: #f3ca78!important;
  }
</style>
