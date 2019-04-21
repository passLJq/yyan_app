<template>
<div>
    <div class="xuanfu">{{time}}秒后关闭</div>
    <van-swipe :show-indicators='show' :loop="false">
        <van-swipe-item>
            <img :src="imgdata[0]" alt="">
        </van-swipe-item>
        <van-swipe-item>
            <img :src="imgdata[1]" alt="">
        </van-swipe-item>       
         <van-swipe-item>
            <img :src="imgdata[2]" alt="">
        </van-swipe-item>    
        <van-swipe-item>
            <img :src="imgdata[3]" alt="" @click="goindex">
        </van-swipe-item>
</van-swipe>
</div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        show:false,
        imgdata:[
            './image/kai1.png',
            './image/kai2.png',
            './image/kai3.png',
            './image/kai4.png'
        ],
        time:5,
        daojishi:''
    }
  },
  watch:{},
  computed:{},
  methods:{
      goindex(){
           var nows=new Date().getDate()
           $api.setStorage('oneopen',nows);
            api.setPrefs({ key:'oneopen',value:nows});
           api.execScript({
               name:'root',
               script:'indexfromgroud();'
           });
          ReturnToIndex(0)
      }
  },
  created(){},
  mounted(){
      var that=this
      if(window.api){
          api.addEventListener({
            name: 'keyback'
        }, function(ret, err) {
            console.log(1)
        });
        var winHeight = api.winHeight;
        //iponex兼容
        if(winHeight>800){
            that.imgdata=[
            './image/xkai1.jpg',
            './image/xkai2.jpg',
            './image/xkai3.jpg',
            './image/xkai4.jpg' 
            ]
        }
      }
      that.daojishi=setInterval(function(){
       that.time=Number(that.time)-1
      if(that.time==0){
           that.time=5
          clearInterval(that.daojishi)
           that.goindex()
      }
      }, 1000)
  }
}
</script>
<style lang="scss">
.van-swipe-item{
    img{
        width: 100%;
        display: block;
    }
}
.xuanfu{
    font-size: rems(30);
    position: fixed;
    top:4%;
    right: 5%;
    z-index: 99999;
    background: rgba(0,0,0,0.6);
    padding:5px;
    border-radius: 8px;
    color: #fff
}
</style>