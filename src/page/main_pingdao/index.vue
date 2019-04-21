<template>
    <div style="padding-top:20px;" ref='app'>
        <div class="probox" v-for="item in listdata" :key="item.protBigImg" @click='gopid(item.pid)'>
            <img v-lazy="item.protBigImg" alt="">
            <div class="profoot">
                <p class="p1">{{item.name}}</p>
                <p class="p2">{{item.secondname}}</p>
                <div class="footbox">
                    <p>&yen;{{item.salePrice|toFixed}} <span class="zuannum" v-if="fxshopid">/ 赚&yen;{{item.commPrice|toFixed}}</span></p>
                    <p>立即购买</p>
                </div>
            </div>
        </div>
            <div class="gotop" v-if="gotopshow" @click="gotop">
                <i class="iconfont icon-huidaodingbu"></i>
            </div>       
        <statuserr :scode="statusCode" @reload="errReload"></statuserr> 
    </div>
</template>

<script>
import statuserr from '../../components/statuserr/statuserr.vue'
export default {
    components:{
        statuserr
    },
  props:{},
  data(){
    return {
        listdata:[],
        currentPage:1,
        stops:false,
        gotopshow:false,
        fxshopid:'',
        statusCode: '1',
        times:null,
        clickone:false
    }
  },
  filters:{
      toFixed:function(ret){
          return Number(ret).toFixed(2)
      }
  },
  watch:{},
  computed:{},
  methods:{
     gotop(){
          document.documentElement.scrollTop = document.body.scrollTop = 0;
      },
      binddata(){
          console.log(pageParam('classid'))
          var that=this
          that.clickone=true
          that.times=setTimeout(function(){
                 showLoading()
          },2000)
          https({
                url: siteUrl +'Main/Main/GetProductCategoryList',
                data:{
                    currpage:that.currentPage,
                    pageSize:8,
                    clsid:pageParam('classid'),
                    fxshopid:getname('SessionShopID'),
                    userid:getname()
                    // sort:sort
                },
                timeout:10,
                successBack:function(ret){
                    clearTimeout(that.times)
                    that.clickone=false
                    if(ret.status==1&&ret.success&&ret.Data.length>0){
                        var data=ret.Data
                        data.forEach(function(item,index){
                            if(item.rushbuy!=null){
                                var specjson=JSON.parse(data[index].rushbuy.specjson)
                                specjson.forEach(function(ins,lis){
                                    if(lis==0){
                                     data[index].salePrice=ins.Price
                                    }
                                })
                            }
                        })
                        if(that.currentPage==1){
                            that.listdata=data
                            that.stops=false
                        }else{
                        that.listdata=that.listdata.concat(data)
                        }
                    }else if(ret.status==0&&ret.success){
                        if(that.currentPage==1){
                            that.listdata=[]
                        }
                         that.stops=true
                    } else{
                        promptMsg(ret.err)
                    }
                  refreshDone() 
                //   that.showErr = false
                    that.statusCode = '1'
                 hideLoading()
                },
                errorBack: err => {
                    that.clickone=false
                    that.statusCode = err.statusCode
                    hideLoading()
                    promptMsg(err.msg)
                }
          })
      },
      gopid(pid){
          openWin({
              name:'productDetail'+pid,
              url:'./productDetail.html',
              pageParam:{
                  pid:pid
              },
              useWKWebView:true
          })
      },
            onScroll() {
          var that=this
                //可滚动容器的高度
                let innerHeight = that.$refs.app.clientHeight;
                //屏幕尺寸高度
                let outerHeight = document.documentElement.clientHeight;
                //可滚动容器超出当前窗口显示范围的高度
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if(scrollTop>200){
                    that.gotopshow=true
                }else{
                    that.gotopshow=false
                }
                //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
                if (innerHeight <= (outerHeight + scrollTop)) {
                    //加载更多操作
                    if(!that.stops&& !that.clickone){
                        console.log(that.currentPage++)
                        that.currentPage=that.currentPage++
                        that.binddata()
                    }
            }
      },
      errReload() {
        var that = this
        that.fxshopid=getname('SessionShopID')
        that.currentPage=1
        that.stops=false
        that.binddata()
      }
  },
  created(){
          if(window.api){
          var that=this
        //下拉刷新
        api.setCustomRefreshHeaderInfo({
    bgColor: '#fff',
    images: [
        'widget://image/suaxin1.png',
        'widget://image/suaxin2.png',
        'widget://image/suaxin3.png',
        'widget://image/suaxin4.png',
        'widget://image/suaxin5.png',
        'widget://image/suaxin6.png',
        'widget://image/suaxin7.png'
    ],
    tips: {
        pull: '下拉刷新',
        threshold: '松开立即刷新',
        load: '正在刷新'
    }
}, function() {
  setTimeout(function(){
    that.fxshopid=getname('SessionShopID')
      that.currentPage=1
     that.stops=false
      that.binddata()
  },1000)
});          
      }
  },
  mounted(){
      this.fxshopid=getname('SessionShopID')
      console.log(this.fxshopid)
      window.addEventListener('scroll', this.onScroll);
      this.binddata()
  }
}
</script>
<style lang="scss">
img{display: block;}
.probox{
    img{
        width: 100%;
        border-radius: 8px;
    }
    margin:0 rems(30);
    margin-bottom: rems(30);
    border-bottom: 1px solid #DEDEE1;
     .profoot{
      .p1{
          @include font2;
          color: #427161;
          font-size: rems(32);
          margin-top:rems(10);
      }  
      .p2{
          color: #9FA0A0;
          font-size: rems(24);
      }
    }
    .footbox{
        @include item;
        justify-content: space-between;
        padding: rems(10) 0;
        margin-bottom: rems(20);
        p:nth-child(1){
            color: #E69888;
            font-size: rems(40);
        }
        p:nth-child(2){
            color: #fff;
            font-size: rems(24);
            background:rgba(245,172,158,1);
            padding: rems(6) rems(10);
            border-radius: 30px;
        }
    }
    .zuannum {
        font-size: rems(26);
        color: #E69888;
        line-height: rems(24);
    }
}
      .gotop{
    position: fixed;
    right: 3%;
    bottom: 5%;
    background: #fff;
    border-radius: 50%;
    i{
    font-size: rems(60);
    color: #666464;
    display: block;
    }
    z-index: 999999
  }
</style>