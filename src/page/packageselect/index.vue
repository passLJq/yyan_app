<template>
    <div ref='app'>
        <img src="../../img/gaoyong.jpg" alt="" class="imgbox">
        <div class="ptitle" ref='ptitle'>
            <p @click="chehuan(0)" :style="{color: current == 0 ? '#EB6100' : '#666464'}">分享赚&yen;100</p>
            <p @click="chehuan(1)" :style="{color: current == 1 ? '#EB6100' : '#666464'}">分享赚&yen;200</p>
            <p @click="chehuan(2)" :style="{color: current == 2 ? '#EB6100' : '#666464'}">分享赚&yen;400</p>
        </div>
        <div class="boxwai" ref='boxwai' :style="{height:boxHeight+'px','overflow-y':'auto'}">
                <div class="probox" v-for="(item,index) in listdata" :key="index" @click="gopid(item.pid)">
                    <img :src="item.pic" alt="" class="proimg">
                    <div class="proboxfoot">
                        <p class='p1'>{{item.name}}</p>
                        <div class='div1'></div>
                        <div class='proprice'>
                            <p>&yen;{{item.salePrice|tofixed}}&nbsp;&nbsp;<span v-if="fxshopid">/赚{{item.commPrice|tofixed}}</span></p>
                            <img src="../../img/main/gouwuche.png" alt="">
                        </div>
                    </div>
                </div>
                <!-- 空数据 -->
            <section v-if="listdata.length==0">
            <div class='nodedata'>
                <img src="../../img/nodata2.png">
                <div class='wenzi'>
                    <p>暂时没有数据</p>
                </div>
            </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        currentPage:1,
        stops:false,
        listdata:[],
        userprecommax :100,
        userprecommin :0,
        current: 0,
        fxshopid: getname('SessionShopID')
    }
  },
  filters:{
      tofixed(vaule){
        return vaule.toFixed(2)
      }
  },
  watch:{},
  computed:{},
  methods:{
      chehuan(index){
        var that=this
        that.current = index
        console.log(that.current)
        if(index==0){
          that.userprecommax=100
          that.userprecommin=0
        }else if(index==1){
          that.userprecommax=200
          that.userprecommin=100
        }else if(index==2){
          that.userprecommax=400
          that.userprecommin=200
        }
        that.currentPage=1
        that.bindata()
      },
      bindata(){
        var that=this
        https({
          url:siteUrl +'Main/Main/GetProductListJson',
          data:{
            currpage:that.currentPage,
            pagesize:8,
            userid:getname(),
            isuserpre:'true',
            clsid: '',
            fxshopid: getname('SessionShopID'),
            act:"search",
            skey: '',
            userprecommax:that.userprecommax,
            userprecommin:that.userprecommin
          },
          headers:1,
          successBack:function(ret){
              console.log(ret)
              if(ret.success&&ret.status==1&&ret.Data.length>0){
                if(that.currentPage==1){
                     that.stops=false
                     that.listdata=ret.Data
                }else{
                  that.listdata=that.listdata.concat(ret.Data)
                }
              }else if(ret.success&&ret.status==0){
                    if(that.currentPage==1){
                      that.listdata=[]
                }  
                    that.stops=true
              }
              else{
                  promptMsg(ret.err)
              }
          }
        })
      },
            onScroll() {
          var that=this
                //可滚动容器的高度
                let innerHeight = that.$refs.boxwai.scrollHeight;
                //屏幕尺寸高度
                let outerHeight = that.boxHeight;
                //可滚动容器超出当前窗口显示范围的高度
                let scrollTop = that.$refs.boxwai.scrollTop
                console.log(scrollTop)
                //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
                if (innerHeight <= (outerHeight+scrollTop)) {
                    //加载更多操作
                    if(!that.stops){
                        that.currentPage=Number(that.currentPage)+1
                        that.bindata()
                    }
            }
      },
      gopid(pid){
          openWin({
              name:'productDetail',
              url:'./productDetail.html',
              pageParam:{
                  pid:pid
              },
                   useWKWebView:true
          })
      }
  },
  created(){},
  mounted(){
    this.boxHeight=document.documentElement.clientHeight-this.$refs.ptitle.clientHeight
    this.$refs.boxwai.addEventListener('scroll', this.onScroll);
    if(pageParam('index')){
        var index=pageParam('index')
        this.chehuan(index)
    }else{
      this.bindata()
    }
  }
}
</script>
<style lang="scss">

body{
    background-color: #f5f5f5;
    // background:url('../../img/gaoyong.jpg') no-repeat;
    // background-size: 100%
}
.imgbox{
    position: fixed;
    top:0;
    width: 100%;
    z-index: -9999;
    img{
        width: 100%;
    }
}
img{display: block}
.probox{
    background: #fff;
    margin: rems(0) rems(30);
    padding: rems(20) 0;
    border-radius: 8px;
    margin-bottom:rems(30);
  @include item;
    .proimg{
        width: rems(230);
        height: rems(230);
        flex-shrink: 0;
    }
    .proboxfoot{
        padding: 0 rems(30);
        width: 90%;
        .p1{
            @include font2;
            font-size: rems(24);
        }
        .div1{
            height: 1px;
            width: 100%;
            margin: rems(60) 0;
            border-top:1px solid #DEDEE1;
        }
        .proprice{
              @include item;
              justify-content: space-between;
            p{
                font-size: rems(24);
                color: #E69888;
            }
            img{
                width: rems(30);
                height: rems(30);
            }
        }
    }
}
.ptitle{
 @include item;
 font-size: rems(28);
justify-content: space-around;
    margin: rems(0) rems(30);
    padding-top:rems(120);
    padding-bottom: rems(30)
}
.nodedata{
  background-color: #F6F6FA;
  margin: 0 auto;
  text-align: center;
  font-size: rems(34);
  padding-top: rems(80);
  img{
    width: 50%;
    margin: 0 auto;
  }
  .wenzi{
    margin-top: -20px;
    color: #999;
  }
  .tag_big{
    font-size: rems(28);
    border: 1px solid #F5AC9E;
    padding: rems(14) 0;
    width:rems(230);
    margin: 0 auto;
    border-radius: 30px;
    color: #F5AC9E;
  }
  .fontSize12{
    padding: rems(16) 0;
  }
}
</style>