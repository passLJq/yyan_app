<template>
<section style="display: none;" :style="{display: isDone ? 'block' : 'none'}">
    <div class="navbox" ref='navbox' v-if="data && data.length>0">
                 <div class="baise" :style="{width:beijin}"></div>
        <div v-for="(item,index) in data" :key="index" class="navboxli" @click="qiehuan(index)">
            <p>{{item.groupbuydate|timedata}}</p>
            <p class="p2">{{item.mindate}}</p>
            <p>{{item.groupbuydate|timeopen}}</p>
        </div>
        <div class="beijieban" :style="{left:leftindex}">
            <div class="triangle-downbox">
                <div class="triangle-down"></div>
            </div>
        </div>
    </div>
    <div v-if="data && data[clikindex]">
        <div class="probox" v-for="(item,index) in data[clikindex].rushbuylist" :key="index" @click="gopid(item.pid)">
            <img :src="item.src" alt="" class="proimg">
                <div class="proboxmain">
                    <p class="protitle">{{item.title}}</p>
                    <div class="proprice">
                        <p>&yen;{{item.price|toFixeds}}</p>
                        <p>原价:{{item.salePrice|toFixeds}}</p>
                    </div>
                        <p class="prozuan" v-show="fxshopid&&item.commPrice">赚{{item.commPrice|toFixeds}}</p>
                    <div class="profoot">
                        <div class="profppyt">
                        <div class="loading">
                             <div class="loadingback"  v-if="item.activestart" :style="{width:((item.chenjiaoNum/(item.stocks+item.chenjiaoNum)*100)|toFixedone)+'%'}"></div>
                             <div class="loadingback"  v-else :style="{width:'0%'}"></div>
                             </div>
                             <p class='pros' v-if="item.activestart">已抢{{(item.chenjiaoNum/(item.stocks+item.chenjiaoNum)*100)|toFixedone}}%</p>
                             <p class='pros' v-else>已抢0%</p>
                            </div>
                            <div class='nowbuy'>
                                <img src="../../img/main/wwouu.png" alt="">
                                <p>立即抢</p>
                            </div>
                        </div>
                <div>
         </div>
     </div>
        </div>
    </div>
    <div class='nodedata' v-if="data==null||data.length==0">
            <img src="../../img/notime.png">
            <div class='wenzi'>
              <p>抱歉，还没有相关的活动～</p>
            </div>
    </div>
</section>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        leftindex:'0',
        data:'',
        beijin:'',
        clikindex:0,
        fxshopid: '',
        isDone: false,
        loadTimer: null
    }
  },
    filters: {
       toFixedone:function(value) {
       value = Number(value)
       return value.toFixed(0)
    },
    toFixeds:function(value){
     value = Number(value)
    return value.toFixed(2)
    },
    timedata:function(value){
        var data=value.substr(5,2)
        var mou=value.substr(8,2)
        return data+'月'+mou+'日'
    },
    timeopen:function(value){
        var mou=value.substr(8,2)
        var datari=value.substr(5,2)
        var nowri=new Date().getMonth()+1;
        var data=new Date().getDate()
         if(datari>nowri){
          return '预热中' 
        }else if(datari<nowri){
          return '抢购中' 
        }
        if(data==mou){
            return '抢购中'
        }else if(data>mou){
            return '已开抢'
        }else{
            return '预热中' 
        }
    }
  },
  watch:{},
  computed:{},
  methods:{
      qiehuan(index){
          var ase=index*33.3+'%'
        // this.$refs.navbox.scrollLeft=((100 * index) - (this.$refs.navbox.clientWidth / 2))
          this.leftindex=ase
          this.clikindex=index
      },
          gopid:function(pid){
        openWin({
            name:'productDetail'+pid,
            url:'./productDetail.html',
            pageParam:{
                pid:pid
            }
        })
    },
    bindata(){
        var that=this
     https({
      url:siteUrl + 'marketing/rushbuy/GetRushBuyListJsonYY',
      data:{
           userid: window.api?api.getPrefs({sync: true,key: 'SessionUserID'}):$api.getStorage('SessionUserID'),
           fxshopid: window.api?api.getPrefs({sync: true,key: 'SessionShopID'}):$api.getStorage('SessionShopID')
      },
      successBack:function(ret){
          if (that.loadTimer != null) {
              hideLoading()
              clearTimeout(that.loadTimer)
              that.loadTimer = null
          }
          if(ret.status==1&&ret.success){
              if(ret.Data!=null){
                  var data=ret.Data
                  //添加一个字段看开始没有 没开始就默认进度条为0
                  data.forEach(function(item,index){
                      item.rushbuylist.forEach(function(list,idx){
                            var mou=list.begindate.substr(8,2)
                            var datari=list.begindate.substr(5,2)
                            var datayear=list.begindate.substr(0,4)
                            var nowri=new Date().getMonth()+1;
                            var daynow=new Date().getDate()
                            var nowhourse=new Date().getHours()
                            var nowyear=new Date().getFullYear()
                            var datahourse=0
                            //获取开始时间的小时
                            if(item.mindate.substr(0,2)>=10){
                                datahourse=item.mindate.substr(0,2)
                            }else{
                               datahourse=item.mindate.substr(1,1)
                            }
                            //年份大于规定的
                            if(datayear<nowyear){
                              data[index].rushbuylist[idx].activestart=true
                            }else{
                                //月份大于规定
                                if(datari<nowri){
                                    console.log(5)
                                    data[index].rushbuylist[idx].activestart=true
                                    //月份和日期到当天
                                }else if(datari==nowri&&mou==daynow){
                                    //判断时间是否到了
                                   if(datahourse<=nowhourse){
                                   data[index].rushbuylist[idx].activestart=true
                                   }else{
                                   data[index].rushbuylist[idx].activestart=false
                                   }    
                                   //月份相等,日期到了
                                }else if(datari<=nowri&&mou<=daynow){
                                   data[index].rushbuylist[idx].activestart=true
                                }else{
                                    data[index].rushbuylist[idx].activestart=false
                                }                            
                            }
                      })
                  })
              that.data=data
              Vue.nextTick(function () {
                    if(data && data.length>3){
                        that.beijin=that.$refs.navbox.scrollWidth+'px'
                    }else{
                        that.beijin='100%'
                    }
                })
            }
          }else{
             promptMsg(ret.err)
          }
        that.isDone = true
              if(window.api)
        api.refreshHeaderLoadDone();   
      }
    })
    }
  },
  created(){
      this.fxshopid = getname('SessionShopID')
           if(window.api){
        //下拉刷新
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
          setTimeout(function(){
               that.bindata()
          },1000)
        }); 
        }
  },
  mounted(){
      var that=this
      this.loadTimer = setTimeout(function () {
          showLoading()
      }, 1000)
      this.bindata()
  }
}
</script>
<style lang="scss">
.navbox{
    @include item;
   background:rgba(250,166,150,1); 
   color:#fff;
   font-size: rems(28);
   overflow-x: auto;
   position: relative;
   .navboxli{
       position: relative;
       width: 33.3%;
       text-align: center;
       flex-shrink: 0;
       padding: rems(30) 0 rems(19) 0;
       background: rgba(0,0,0,0);
       z-index: 999
   }
   .p2{
       margin-bottom: rems(10)
   }
   padding-bottom: rems(12)
}
.beijieban{
    position: absolute;
    background-color: #F36549;
    width: 33.3%;
    top: 0;
    bottom: 6px;
    z-index: 99;
    transition: left 0.5s;
    left: 0;
}
.triangle-downbox{
    position: absolute;
    width: 100%;
        bottom: -6px;
}
.triangle-down {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #F36549;
    margin: 0 auto;
}
.baise{
    position: absolute;
    height: 6px;
    background: #fff;
    bottom: 0;
        z-index: 9;
        left:0;
        right: 0;
}
.probox{
    @include item;
    padding: rems(46) rems(30);
    .proimg{
        width: rems(250);
        height: rems(250);
        flex-shrink: 0;
        margin-right: rems(20);
    }
    .proboxmain{
        width: rems(420);
        .protitle{
         @include font2;
         font-size: rems(26);
         color: #666464;
        }
        .proprice{
          @include item;
          margin-top: rems(20);
          margin-bottom: rems(10);
          p:nth-child(1){
              color: #FC8B76;
              font-size: rems(32);

          }
           p:nth-child(2){
           color: #B2B2B2;
           font-size: rems(26); 
           margin-left: rems(10);
           text-decoration:line-through;  
          }
        }
        .prozuan{
            color: #B2B2B2;
            font-size: rems(26)
        }
    }
}
.loading{
    background: #F2F2F2;
    height: rems(18);
    border-radius: 30px;
    width: 50%;
    overflow: hidden;
    .loadingback{
    background: #FAA696;
    border-radius: 30px;
    height: rems(18);
}
}
.profoot{
     @include item;
     font-size: rems(20);
     color: #B2B2B2;
     justify-content: space-between;
     margin-top:rems(20);
     .profppyt{
         @include item;
         width: 60%;
     }
     .pros{
     margin-left: rems(8)
     }
     .nowbuy{
              @include item;
              font-size: rems(26);
              color:#fff;
              padding: rems(13) rems(18);
              background:rgba(252,139,118,1);
              border-radius: 30px;
         img{
             width:rems(34);
             height: rems(34);
             margin-right: rems(10)
         }
     }
}
           .nodedata{
  margin: 0 auto;
  margin-top: 15%;
  text-align: center;
  font-size: rems(24);
  padding-top: rems(80);
  img{
    width: 50%;
    margin: 0 auto;
  }
  .wenzi{
    margin-top: -20px;
    color: #999;
  }
           }
</style>