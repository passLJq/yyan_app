<template>
<div ref='app'>
    <div class="tou">
        <p>开店礼包专区</p>
        <p>购买以下任意礼包</p>
        <div class="p3"></div>
        <p>即可成为攸妍店主</p>
    </div>
    <div class="probinbox" v-for="(item,index) in listdata" :key='index' @click="toyshopBagDetail(item[0].packageid,item[0].packageitems[0].productid,item[0].packageitems[0].quantity)">
        <img :src="item[0].packageitems[0].image" alt="">
        <div class='probox'>
            <p class='p1'>{{item[0].packageitems[0].productname}}</p>
            <p class="p2">零售价：{{item[0].packageitems[0].priceMarket}}元</p>
            <div class="proboxfoot">
                <p class="p3">礼包价:<span>{{item[0].packageitems[0].propackageprice}}元</span></p>
                <div class='anniu'>立即购买</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        listdata:'',
        currentPage:1,
        stops:false
    }
  },
  watch:{},
  computed:{},
  methods:{
      binddata(){
          var that=this
          https({
            url: siteUrl +'Main/PackageShopping/GetPackageProJson?uid='+getname(),
            method: 'post',
            data: {
                currpage:that.currentPage,
                pagesize:8,
                type:1
            },
            headers:1,
            successBack:function(ret){
                console.log(ret)
                if(ret.status==1&&ret.success&& ret.Data!=null){
                    if(that.currentPage==1){
                       that.listdata=ret.Data
                        that.stops=false
                    }else{
                    that.listdata=that.listdata.concat(ret.Data)
                    }
                }else if(ret.success&& ret.Data==null){
                  that.stops=true
                    if(that.currentPage==1){
                       that.listdata=[]
                    }
                }else{
                    promptMsg(ret.err)
                }
                 if(window.api){
                    api.refreshHeaderLoadDone();     
                }
            }
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
                //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
                if (innerHeight <= (outerHeight + scrollTop)) {
                    //加载更多操作
                    if(!that.stops){
                        console.log(that.currentPage++)
                        that.currentPage=that.currentPage++
                        that.binddata()
                    }
            }
      },
      toyshopBagDetail(packageid,pid,quantity){
         openWin({
          name: 'product_'+pid,
          url: './productDetail.html',
          bgColor:"#fff",
          pageParam: {
              pid : pid,
              packageid : packageid,
              quantity:quantity
          },
          useWKWebView:true
        });
      }
  },
  created(){
        
      
  },
  mounted(){
       window.addEventListener('scroll', this.onScroll);
      this.binddata()
      if(window.api){
          var that=this
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
            that.currentPage=1,
            that.stops=false
          setTimeout(function(){
              that.binddata()
          },1000)
        }); 
      }
  }
}
</script>
<style lang="scss">
img{
    display: block;
}
    body{
        background: rgb(251,236,229)
    }
    .tou{
        text-align: center;
        margin-bottom: rems(30);
       p:nth-child(1){
        font-size:rems(38);
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(80,131,114,1);
        margin-top:rems(40)
       }
        p:nth-child(2){
        font-size:rems(56);
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(80,131,114,1);
        margin-top:rems(50)
       } 

       p:nth-child(4){
        font-size:rems(40);
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(80,131,114,1);
       }  
       .p3{
           height: 1px;
           width: 20%;
           margin: rems(30) auto;
           border-top:1px solid #508372;
       }
    }
    .probinbox{
        @include item;
        background: #fff;
        padding: rems(20) rems(20);
        margin: 0 rems(30);
        border-radius: 8px;
        margin-bottom: rems(20);
        img{
           width: rems(280);
           height: rems(280); 
           flex-shrink: 0;
           margin-right: rems(10);
        }
        .probox{
            width: 100%;
            .p1{
                @include font2;
                color: #666464;
                font-size: rems(26)
            }
            .p2{
               color: #666464;
                font-size: rems(26);
                text-decoration: line-through;  
                margin-top:rems(50);
            }
        }
        .proboxfoot{
           @include item;
           justify-content: space-between;
            .p3{
                color: #F5AC9E;
                font-size: rems(28);
            }
            .anniu{
                color: #fff;
                background:rgba(245,172,158,1);
                border-radius:30px;
                padding: rems(10) rems(20);
                font-size: rems(24)
            }
        }
    }
</style>