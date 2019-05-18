<template>
<section class="mainbox" ref="mainbox" id="mabox">
  <van-swipe :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(image, index) in urllist.AdsList" :key="index">
       <img :src="image.Source" @click="Ana(image.LinkContent)" ref='touurl'/>
    </van-swipe-item>
  </van-swipe>
  <!-- 公告 -->
  <div class="noctie" :style="noticeshow?'left:0;top:'+noticeheight+'px':'left:-58%;top:'+noticeheight+'px'"  v-if="noticedata&&noticedata.length>0">
    <div class="notciebox">
     <img src="../../img/main/laba.png" alt="" >
     <div class="noticeul">
       <div class="noticeli" :style="{top:'-'+top+'px'}" :class="{marquee_top:top}">
        <p v-for="(item,index) in noticedata" :key="index">
          <span v-if="item.isshop">恭喜{{item.Name|name}}成为{{item.value}}店主</span>
          <span v-else>恭喜{{item.Name|name}}赚得{{item.value}}元</span>
        </p>
       </div>
     </div>
    </div>
  </div>
<!-- 导航栏 -->
  <div class="navlist">
    <div class="navli" v-for="(item,index) in data.navimgdata" :key="index" @click="AnalysisAdsUrl(item.content.type,item.content.title,item.content.ref)"> 
      <img :src="item.imgUrl" alt="">
      <p>{{data.navtitle[index]}}</p>
    </div>
  </div>
  <!-- 累计店主 -->
    <!-- <div class='dianzhu'>
      <img :src="data.vipbackground?data.vipbackground[0].imgUrl:''" alt="" v-cloak>
      <div class="dian1">
        <p>累计店主</p>
        <p><span>{{allvipnum}}</span>名</p>
      </div>
       <div class="dian2">
        <p>共赚取</p>
        <p><span>{{zuannum}}</span>元</p>
      </div>
    </div> -->
  <!-- 广告位 -->
  <div class="advbox">
    <div class="adv1" @click="AnalysisAdsUrl(data.smalladvimg[0].content.type,data.smalladvimg[0].content.title,data.smalladvimg[0].content.ref)">
      <img v-lazy="data.smalladvimg?data.smalladvimg[0].imgUrl:''" alt="" v-cloak>
    </div>
    <div class="adv2" @click="gotime()">
      <img v-lazy="data.smalladvimg?data.smalladvimg[1].imgUrl:''" alt="" v-cloak class="item-pic">
        <!-- <div class="timeout" v-if="!timeCount.isDone">
          <div class='timenumber'>{{timeCount.hour}}</div>
          <div class="timedian">:</div>
          <div class='timenumber'>{{timeCount.minute}}</div>
          <div class="timedian">:</div>
          <div class='timenumber'>{{timeCount.second}}</div>
        </div> -->
        <!-- <div class="timetext">{{timeCount.timetext}}</div> -->
        <!-- <img v-if="rushbuyImg ? true : false" :src="rushbuyImg" alt="" class="pro">
        <img v-else src="../../img/main/rushbuyimg.png" alt="" class="pro"> -->
    </div>
  </div>
  <!-- 高佣区 -->
  <div class="gaoimg" v-if="data.commissionshow">
      <img :src="item.imgUrl" alt="" v-for="(item,index) in data.commissionimg" :key="index" @click="gogaoyong(index)">
  </div>
  <div class="bigtitle">
    <p>本月新品</p>
  </div>
  <van-swipe :height='110' :show-indicators="false" :width='240' :loop='false'>
    <van-swipe-item v-for="(image, index) in data.bigcardsdata" :key="index" style="padding-right:20px;box-sizing: border-box;">
       <img :src="image.backgrounds"  @click="AnalysisAdsUrl(image.type,image.title,image.ref)" style="box-shadow:0px 1px 10px 0px rgba(216,216,216,0.2);"/>
    </van-swipe-item>
  </van-swipe>
  <div class="bigtitle">
    <p>优惠套装</p>
  </div>
  <van-swipe  :show-indicators="false" :loop='false' :width="cliwidth">
    <van-swipe-item v-for="(image, index) in data.groupdata" :key="index">
       <img v-lazy="image.backgrounds" @click="AnalysisAdsUrl(image.type,image.title,image.ref)" class="item-pic"/>
    </van-swipe-item>
  </van-swipe>
<!-- 楼层 -->
<div class="lou">
  <div class="loubox" v-for="(image, index) in data.classiftimgdata" :key="index">
  <div v-if="data.louhide[index]">
  <img :src="image.imgUrl" alt="" @click="AnalysisAdsUrl(image.content.type,image.content.title,image.content.ref)" style="box-shadow:0px 1px 10px 0px rgba(216,216,216,0.2);">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, inds) in classallprodata[index]" :key="inds">
          <div class="probox" @click="gopid(item.pid)">
          <img v-lazy="item.src" class="proimg item-pic"/>
          <div class="proboxxia">
            <p class="protitle">{{item.title}}</p>
            <div class="propice">
              <p style="white-space: nowrap;">&yen;{{item.salePrice|toFixed}}<span class="small">{{item.salePrice|getSmall}}</span><span class="yuanj">&yen;{{item.marketPrice|toFixed}}<span class="smalls">{{item.marketPrice|getSmall}}</span></span></p>
              <img src="../../img/main/buy_icon@3x.png" alt="">
            </div>
          </div>
          </div>
        </swiper-slide>
    </swiper>
    </div>
  </div>
</div>
<div class="gotop" v-if="gotopshow" @click="gotop">
  <i class="iconfont icon-huidaodingbu"></i>
</div>

<statuserr :scode="statusCode" @reload="bindata"></statuserr>

</section>
</template>

<script>
import {AnalysisAdsUrl} from '../../assets/js/analysisAdsUrl'
import 'swiper/dist/css/swiper.css'////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import statuserr from '../../components/statuserr/statuserr.vue'
export default {
  components:{
    swiper,
    swiperSlide,
    statuserr
  },
  props:{},
  data(){
    return {
      urllist:{AdsList:[]},
      cliwidth:0,
      louwidth:'',
      data:{bigcardsdata:[],groupdata:[]},
      classallprodata:'',
      swiperOption:{
        slidesPerView : 3,
        slidesPerGroup : 3,
      },
      noticeshow:true,
      rushbuyImg: '',
      // timeCount: {
      //   timetext: '',
      //   day: 0,
      //   hour: 0,
      //   minute: 0,
      //   second: 0,
      //   isDone: false
      // },
      noticeheight:150,
      gotopshow:false,
      tep_allvipnum:'',//模板基数
      tep_zuannum:'',//模板基数
      allvipnum:'',
      zuannum:'',
      noticedata:[],
      top:0,
      statusCode: '1',
      bindataclick:false
    }
  },
  watch:{},
  computed:{},
  filters: {
    getSmall(val) {
      if (!val) {
        return '.00'
      } else {
        var v = Number(val).toFixed(2)
        var s = v.toString().substr(-3)
        // console.log(s)
        return s
      }
    },
    toFixed: function(value) {
      var v = value.toString()
      if (v.indexOf('.') != -1) {
        return v.split('.')[0]
      } else {
        return value
      }
      
    },
    toFixeds: function(value) {
       value = Number(value)
       return value.toFixed(2)
    },
    name:function(name){
    var val = name + ''
    var a = val.split('')
    // 如果是电话号码
    var phone = parseInt(name) + ''
    if (phone && phone.length == 11) {
      var tel = phone.replace(phone.slice(-7, -3), '****');
      return tel
    }
    if (a && a.length >= 3){
      var str = a[0] + '***' + a[a.length-1]
      return str
    } else {
      return name
    }
      // if(value.length>3){
      //    var values=value.toString().substr(0,1)+'*'+value.toString().substr(value.length-1,value.length)
      //   return values
      // }else{
      //   return value
      // }
    }
  },
  methods:{
    AnalysisAdsUrl(type,title,ref){
      AnalysisAdsUrl.clickAds(type,title,ref)
    },
    Ana(link){
      var data=JSON.parse(link)
      var packageid = ''
      if (data && data.PackageID != '' && data.PackageID != null) packageid = data.PackageID
      AnalysisAdsUrl.clickAds(data.type,data.title,data.ref, packageid)
    },
    gogaoyong(index){
          openWin({
              name: 'packageselect',
              url: './packageselect.html',
              bgColor:'#fff',
              useWKWebView:true,
              pageParam:{
                title:'高佣专区',
                index:index
              }
          },1);
    },
    menu(){
        clearTimeout(this.gun);
        this.t1 = document.documentElement.scrollTop || document.body.scrollTop;
        if(this.t1>300){
          this.gotopshow=true
        }else{
          this.gotopshow=false
        }
        this.gun = setTimeout(this.isScrollEnd, 1000);
        this.noticeshow=false
    },
    isScrollEnd() {
      var t2 = document.documentElement.scrollTop || document.body.scrollTop;
      if(t2 === this.t1){
           this.noticeshow=true
      }
    },
    gopid(pid){
      openWin({
        name:'productDetail'+pid,
        url:'./productDetail.html',
        useWKWebView:true,
        pageParam:{
          pid:pid
        }
      })
    },
    gotime(){
      openWin({
        name:'timebuy',
        url:'./timebuy.html',
        pageParam:{
          title:'限时抢购'
        }
      },1)
    },
    // countTime(data) {
    //   let begintimeticks = new Date(data.begindate.replace(/-/g, '/')).getTime()
    //   let nowtimetick = Date.now()
    //   let endtimeticks = new Date(data.enddate.replace(/-/g, '/')).getTime()
    //   // 结束时间小于现在时间 表示已结束则隐藏倒计时
    //   if (endtimeticks < nowtimetick) {
    //     this.timeCount.isDone = true
    //   } else if(begintimeticks>nowtimetick) {
    //     var now=(Number(begintimeticks)-Number(nowtimetick))/1000
    //     this.count(now,1)
    //   } else {
    //     var now=(Number(endtimeticks)-Number(nowtimetick))/1000
    //     this.count(now,2)
    //   }
    // },
    // count(times, index) {
    //   var that = this
    //   var idx = index
    //   var timetick = times
    // window.clearInterval(timer)
    //    let timer = window.setInterval(function(){
    //     var timetext = '',
    //       day = 0,
    //       hour = 0,
    //       minute = 0,
    //       second = 0;//时间默认值
    //     if(timetick > 0){
    //       day = Math.floor(timetick / (60 * 60 * 24))
    //       hour = Math.floor(timetick / (60 * 60)) - (day * 24)
    //       minute = Math.floor(timetick / 60) - (day * 24 * 60) - (hour * 60)
    //       second = Math.floor(timetick) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
    //     }
    //     if (day <= 9) day = '0' + day;
    //     if (hour <= 9) hour = '0' + hour;
    //     if (minute <= 9) minute = '0' + minute;
    //     if (second <= 9) second = '0' + second;
    //     //
    //     if(idx == 1){
    //       timetext = "距开始"
    //     }
    //     else {
    //       timetext = "进行中"
    //     }
    //     if(timetick<=0){
    //       if (idx == 1) {
    //         timetext = '进行中'
    //         let nowtimetick = Date.now()
    //         let endtimeticks = new Date(that.rushMsg.enddate.replace(/-/g, '/')).getTime()
    //         timetick = (Number(endtimeticks)-Number(nowtimetick))/1000
    //         idx = 2
    //       } else {
    //         window.clearInterval(timer)
    //         timetext = '已结束'
    //       }
    //     }
    //     if(second == 0 && day == 0 && hour == 0 && minute == 0){
    //       if (idx == 1) {
    //         timetext = '已开抢'
    //         idx = 2
    //       } else {
    //         timetext = '已结束'
    //       }
    //     }
    //     that.timeCount = {
    //       timetext,
    //       day,
    //       hour,
    //       minute,
    //       second
    //     }
    //     timetick--
    //   },1000);
    // },
    bindata(){
      var that=this
      // setTimeout(function() {
      //   that.showErr = true
      // }, 5000)
      //节流 接口成功再接触
      if(that.bindataclick){
       console.log("节流");
        return
      }
      that.bindataclick=true
      https({
        url:siteUrl + 'Main/Main/GetAdsJson',
        successBack:function(ret){
            if(ret.status==1&&ret.success){
              that.urllist=JSON.parse(ret.Data)
              setTimeout(function(){
                  Vue.nextTick(function () {
                    if(that.$refs.touurl[0]){
                      if(that.$refs.touurl[0].clientHeight<150){
                      that.noticeheight=150
                      }else{
                      that.noticeheight=that.$refs.touurl[0].clientHeight-10
                      }
                    }
                })
               },1000)
            }else{
              promptMsg(ret.err)
            }
        }
      })
      https({
        url:siteUrl + 'Main/Main/GetAppTempShopIndexJson',
        data:{
            userid: window.api?api.getPrefs({sync: true,key: 'SessionUserID'}):$api.getStorage('SessionUserID'),
            fxshopid: window.api?api.getPrefs({sync: true,key: 'SessionShopID'}):$api.getStorage('SessionShopID'),
            code:'youyanindex'
        },
        successBack:function(ret){
            that.bindataclick=false
            if(ret.status==1&&ret.success){
                that.data=ret.Data.template
                that.classallprodata=JSON.parse(ret.Data.template.classallprodata)
                that.tep_allvipnum=ret.Data.template.allvipnum
                that.tep_zuannum=ret.Data.template.zuannum
                // that.noticelist()
            }else{
              promptMsg(ret.err)
            }
            that.statusCode = '1'
            
        },
        errorBack: err => {
          that.bindataclick=false
          that.statusCode = err.statusCode
          promptMsg(err.msg)
        }
      })
      // https({
      //   url: siteUrl + 'Marketing/Rushbuy/GetOneRushBuy',
      //   data: {
      //     comid: ''
      //   },
      //   successBack: ret => {
      //     // if (ret.success && ret.status == 1) {
      //     //   that.rushMsg = ret.Data[0]
      //     //   that.countTime(that.rushMsg)
      //     // } else {
      //     //   that.timeCount.isDone = true
      //     // }
      //     if (ret) {
      //       if (ret.img != '' && ret.img != null) {
      //         that.rushbuyImg = ret.img
      //       }
      //     } else {
      //       if (err && err.Msg) promptMsg(err.Msg)
      //     }
      //   },
      // })
      
      if(window.api)
        api.refreshHeaderLoadDone();     
      },
      gotop(){
          document.documentElement.scrollTop = document.body.scrollTop = 0;
      },
      noticelist(){
      var that=this
      https({
       url: siteUrl + 'Main/Main/GetNewFxShopAndVIP',
        successBack: ret => {
          if(ret.status==1&&ret.success){
            // if(!that.onenotice){
              if(ret.Data&&ret.Data.length>0){
                that.noticedata=ret.Data.sort(that.sortBy('_Time',false))
                Vue.nextTick(function () {
                   that.showMarquee()
                })
            // }else{
            //   if(ret!=that.noticedata){
            //  that.noticedata=ret.Data.sort(that.sortBy('_Time',false))
            //  that.allvipnum=Number(that.tep_allvipnum)+Number(ret.allvipnum)
            //  that.zuannum=Number(that.tep_zuannum)+Number(Number(ret.zuannum).toFixed(0))
            //   that.showMarquee()
            //   }
            // }
            }
             that.allvipnum=Number(that.tep_allvipnum)+Number(ret.allvipnum)-50
             that.zuannum=Number(that.tep_zuannum)+Number(Number(ret.zuannum).toFixed(0))-50
              window.clearInterval(sheng)
                var n=0
                let sheng=window.setInterval(()=>{
                  if(n==50){
                    window.clearInterval(sheng)
                    return
                  }
                  n++
                  that.allvipnum=Number(that.allvipnum)+1
                  that.zuannum=Number(that.zuannum)+1
                },100)
          }else{
            promptMsg(ret.err)
          }
        }        
      })
      },
      sortBy: function(attr,rev){
        //第二个参数没有传递 默认升序排列
        if(rev ==  undefined){
            rev = 1;
        }else{
            rev = (rev) ? 1 : -1;
        }
        
        return function(a,b){
            a = a[attr];
            b = b[attr];
            if(a < b){
                return rev * -1;
            }
            if(a > b){
                return rev * 1;
            }
            return 0;
        }
    },
     showMarquee:function () {
        this.noticedata.push(this.noticedata[0]);
        var max = this.noticedata.length;
        var that = this;
        var num =0
        window.clearInterval(that.marqueetimer)
        that.marqueetimer =  window.setInterval(function(){
          num=num+1;
         if(num>=max ){
              num=0;
          }
            that.top=num*15;
       }, 2000);
     },
  },
  
  created(){},
  mounted(){
    var that=this
      if(window.api){
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
              that.bindata()
          },1000)
        }); 
       if (api.getPrefs({sync: true,key: 'loginStatus'}) != "loginSuccess") {
          api.openFrame({
            name: 'newmember',
            url: './newmember.html',
            bounces: false,
            rect: {
              x: 0,
              y: 0,
              w: 'auto',
              h: 'auto'
            }
          });
       }
      //  监听关闭红包广告弹窗
       api.addEventListener({
         name: 'closeNewMember'
       }, function (ret, err) {
         api.closeFrame({
           name: 'newmember'
         });
       })
        // api.addEventListener({
        //     name:'viewdisappear'
        // }, function(ret, err){        
        //   clearInterval(timer)
        // }) 
        // api.addEventListener({
        //     name:'viewappear'
        // }, function(ret, err){        
        //   that.countTime(that.rushMsg)
        // })
      }
    this.bindata()
    window.addEventListener('scroll', this.menu)
    if(window.api){
    Vue.nextTick(function () {
      var winWidth = api.winWidth-30;
      that.cliwidth=(winWidth)/2
      that.louwidth=(winWidth)/3
    })
    }else{
      Vue.nextTick(function () {
        that.cliwidth=(that.$refs.mainbox.clientWidth)/2
        that.louwidth=(that.$refs.mainbox.clientWidth)/3
      })
    }
  }
}
</script>
<style lang="scss">
.swiper-slide{
  img{
    width: 100%;
  }
}
img{display: block}
.mainbox{
  margin:0 15px;
  margin-top: rems(30);
}
.van-swipe{
   border-radius: 8px;
   overflow: hidden;
   img{
     width: 100%;
   }
}
.navlist{
  @include item;
  margin: rems(30) 0;
  .navli{
    text-align: center;
    width: 20%;
    flex-shrink: 0;
    img{
      width: rems(96);
      height: rems(96);
      margin: 0 auto;
    }
    p{
      font-size: rems(24)
    }
  }
}
.dianzhu{
  width: 100%;
  border-radius:8px;
  overflow: hidden;
  position: relative;
  font-size: rems(20);
  text-align: center;
  color: #fff !important;
  img{
    width: 100%;
      height: rems(125);
  }
  .dian1{
    position: absolute;
    width: 50%;
    top:0;
    bottom: 0;
    p:nth-child(1){
      margin-top: rems(20)
    }
    span{
      font-size: rems(46);
      color: #e69888
    }
  }
  .dian2{
    position: absolute;
    width: 50%;
    left: 50%;
    top:0;
    bottom: 0;
   p:nth-child(1){
      margin-top: rems(20)
    }
        span{
      font-size: rems(46);
      color: #e69888
    }
  }
}
  .advbox{
    @include item;
    margin-top: rems(14);
    .adv1{
      box-sizing: border-box;
      padding-right: rems(5);
      width: 50%;
      img{
        width: 100%
      }
    }
    .adv2{
      position: relative;
      box-sizing: border-box;
      padding-left: rems(5);
      width: 50%;
       img{
        width: 100%
      }
      .pro{
        width: rems(140);
        height: rems(190);
        position:absolute;
        right: 0;
        bottom: 0;
      }
    }
  }
  .timeout{
    @include item;
    position: absolute;
    left: 9%;
    top:35%;
  }
  .timetext {
    position: absolute;
    left: 12%;
    top: 60%;
    font-size: rems(20);
    color:#666464;
  }
  .timenumber{
    @include item;
    justify-content: center;
    height: rems(44);
    width: rems(44);
    background: rgb(223,235,255);
    border-radius: 50%;
    color: rgb(202,147,154);
    font-size: rems(24);
  }
  .timedian{
    font-size: rems(28);
  }
  .gaoimg{
    @include item;
    border-radius: 8px;
    margin: rems(26) 0;
    img{
      width: 33.33%;
    }
  }
  .bigtitle{
    color: #1E5543;
    font-size: rems(35);
    font-weight: 700;
    padding: rems(30) 0;
  }
  .lou{
    margin-top:rems(20);
    img{
      width: 100%;
    }
  }
  .probox{
    font-size: rems(22);
    color:#666464;
    .proboxxia{
      padding: 0 rems(18);
    }
    .proimg{
      height: rems(230);
    }
    .protitle{
    @include font2;
    margin: rems(20) 0;
    height: rems(62);
    }
    .propice{
      p{
        color: #E69888;
        font-size: rems(26);
        display: flex;
        align-items: baseline;
        .yuanj {
          text-decoration:line-through;
          display: flex;
          align-items: baseline;
          font-size: rems(20);
          color:#7C7C7C;
          margin-left: rems(6);
        }
        .small {
          color: #E69888;
          font-size: rems(18);
          margin-left: 0;
        } 
        .smalls {
          color:#7C7C7C;
          font-size: rems(18);
          margin-left: 0;
          // text-decoration: line-through;
        }
      }
      img{
        width: rems(40);
        height: rems(40);
      }
      @include item;
      justify-content: space-between;
      margin-bottom: rems(40);
    }
  }
  .loubox{
    margin-bottom: rems(26)
  }
  .noctie{
    background-color: #FFEAE0;
    font-size: rems(22);
    padding: rems(10) 0;
    width: 60%;
    @include font1;
    position: fixed;
    top:190px;
    left: 0;
    border-radius: 0 30px 30px 0;
    z-index: 99999;
    transition: left 0.5s;
    padding-right: rems(30);
    .notciebox{
     @include item;
    img{
      width: rems(26);
      height: rems(26);
      margin-left: rems(20);
      margin-right: rems(24);
      margin-top:rems(4);
    }
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
  .noticeul{
    height: 15px;
    overflow: hidden;
    position: relative;
    width:100%;
  }
  .noticeli{
    height:15px;
    line-height: 15px;
    position: absolute;
    top:0;
    width: 100%;
  }
  .marquee_top{
    transition: top 0.5s ;
  }

  .youhui {
    width: rems(345) !important;
  }
</style>