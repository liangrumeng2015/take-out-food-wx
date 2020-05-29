<!-- 标题组件 -->
<template>
  <view v-if="title" class="title">{{title}}</view>
</template>

<script>
  export default{
    props:{
      title:String
    }
  }
</script>

<style scoped>
  .title{
    padding:20rpx 0;
  }
</style>
