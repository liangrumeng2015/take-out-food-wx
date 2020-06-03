<!-- 手写实现一个promise -->
<script>
  // 定义promise的状态
  const PENDING = 1;
  const FULFILLED = 2;
  const REJECTED = 3;
  
  
  
  class Jpromise{
    constructor(executor){
      let _this = this;
      _this.status = PENDING
      _this.value = null;
      _this.error = null;
      
      function resolve(val){
          if(_this.status == PENDING){
            _this.status = FULFILLED;
            _this.value = val;
          }
      }
      function rejected(val){
        if(_this.status == PENDING){
          _this.status = REJECTED
          _this.error = val;
        }
      }
      try{
        executor(resolve,reject)
      }catch(error){
        console.log(error)
      }
    }
    
    then(onResolve,onReject){
      let _this = this;
      if(_this.status == FULFILLED){
        onResolve(_this.value)
      }
      if(_this.status == REJECTED){
        onReject(_this.error)
      }
    }
  }
  
  // 执行测试代码
  new Jpromise((resolve)=>{
    resolve(1)
  }).then(res=>{
    console.log(res)
  })
  
</script>