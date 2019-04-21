<template>
    <div :style="{display: isDone ? 'block' : 'none'}">
        <div ref='tuan_banner'>
            <van-swipe :autoplay="3000" indicator-color="white" class="banbox">
              <van-swipe-item v-for="(image, index) in headlunbo" :key="index" class="banboxs">
                <img :src="image.soure" @click="GroupBuy(image.pid,image.gbid)"/>
              </van-swipe-item>
            </van-swipe>
        </div>
      <!-- 活动规则 -->
      <div class="rule" style="background-color: #EB6100;" @click="showRule">活动规则</div>
        <!-- 抽奖说明 -->
        <div id="shuoming">
          <div class="explain">
            <div class="step">
              <div style="display: flex;justify-content: center;align-items: center;">1</div>
            </div>
            <span>发起拼团</span>
            <div class="right"></div>
            <div class="step">
              <div style="display: flex;justify-content: center;align-items: center;">2</div>
            </div>
            <span>邀请好友参与拼团</span>
            <div class="right"></div>
            <div class="step">
              <div style="display: flex;justify-content: center;align-items: center;">3</div>
            </div>
            <span>完成拼团</span>
          </div>
        </div>
        <section class="gun_waibox">
          <div class="gun_box" :class="fixed?'fixed':''">
            <div class="gun_ul" @click="qiehuan(0,'')">
              <p>全部</p>
            </div>
            <div class="gun_ul"  v-for="(item, index) in classidlist" @click="qiehuan(index+1,item.classid)" :key="item.name">
              <p :class="checkindex" v-cloak>{{item.name}}</p>
            </div>
            <div class="line" ref="line" :style="{left:redlinewhere}">
              <div class='redline'></div>
            </div>
          </div>
        </section>
        <section style="background:#F6F6FA;width:100%;overflow:hidden">
          <div v-if="listdata.length>0&&once">
            <div class="pro_box" v-for="(item, index) in listdata"  :key="item.pid"  @click="GroupBuy(item.pid,item.gbid)">
              <img :src="item.propic" alt="" class="pro_img">
              <div class='pro_right'>
                <div class="pro_title" v-cloak><p><span  v-cloak>{{item.gbuynum}}人团</span>{{item.title}}</p></div>
                <div class="pro_main">
                  <div class="listuer" style="display: flex;">
                    <div v-for="(useritem, indexs) in item.userimglist" :style="indexs > 4 ? 'display: none;' : ''" :key="indexs">
                      <img v-if="useritem!=''" :src="useritem" alt="" >
                      <img v-else src="../../img/man.jpg" alt="">
                    </div>
                  </div>
                  <p  v-cloak>共{{item.userimglist.length||0}}人参加</p>
                </div>
                <div class="pro_foot">
                  <div>
                    <span class="p1"  v-cloak>&yen;{{item.gbprice|toFixed}}</span>
                    <span class="p2" :class="listdata[index].proprice > 999 ? 'fs_10' : ''"  v-cloak>原价&yen;<del>{{item.proprice|toFixed}}</del></span>
                  </div>
                  <div class="p3">立即开团</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
        <div class="noRec" id="noRec" style="display: block;">
            <div class="square">
            <img src="../../image/noaddress.png" alt="目前没有活动" style="width:100%;">
            </div>
          <div class="ic_text">抱歉，目前没有活动~</div>
          </div>
          </div>
        </section>
    </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
           once:false,//第一次加载完在显示
          checkindex:0,
          redlinewhere:'',
          imgdata:'',
          classidlist:'',//分类列表
          listdata:'',//列表数据
          fixed:false,
          stopload:false,
           currpage:1,
           classid:'',
           headlunbo:[],
           isDone: false,
           loadTimer: null
    }
  },
  watch:{},
  computed:{
      checkindex(){
          return "active"
        }
  },
    filters: {
          toFixed: function(value) {
              value = Number(value)
              return value.toFixed(2)
          }
    },
  methods:{
      headeimg(){
        var that=this
        https({
          url: siteUrl + 'Marketing/Groupbuy/GetGroupbuyBoot',
          successBack: function(ret) {
            console.log(ret)
            if (ret.success) {
              var shtml = "";
              if (ret.status == 1 && ret.Data != null && JSON.stringify(ret.Data) != "[]") {
                that.headlunbo=ret.Data
              }
            } else {
                promptMsg(ret.err)
            }
          }
        })
      },
        // 重置
        reset() {
          this.checkindex = 0
          this.currpage = 1
        },
        qiehuan(index,classids){
          let a = this.$refs.line.clientWidth
          this.currpage=1
          this.stopload=false
          this.classid=classids
          this.prolistdata()
          this.checkindex=index
          this.redlinewhere=(a*index)+'px'
        },
      classiddata(){
        var that=this
        https({
          url: siteUrl + 'Marketing/Groupbuy/GetGroupbuyClass',
          successBack: function(ret) {
            if(ret.success&&ret.status==1){
              that.classidlist=ret.Data
              that.once=true
              that.qiehuan(0,'')
            }else{
              promptMsg(ret.err)
            }
          }
        })
      },
      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var imgheight=this.$refs.tuan_banner.offsetHeight
        if(scrollTop>imgheight){
          this.fixed=true
        }else{
          this.fixed=false
        }
      },
      prolistdata(){
        var that=this
        https({
            url: siteUrl + 'Main/Main/GetGroupBuyProListJson',
            data:{
              currpage:that.currpage,
              pageSize:6,
              classid:that.classid
            },
            successBack: function(ret) {
              if (that.loadTimer != null) {
                hideLoading()
                clearTimeout(that.loadTimer)
                that.loadTimer = null
              }
                if(window.api)
              refreshDone()
              if(ret.success&&ret.status==1){
                var data = ret.Data

                if(that.currpage==1){
                  that.listdata=''
                  that.listdata=data
                }else{
                  that.listdata=that.listdata.concat(data)
                }
                that.$forceUpdate()
                console.log(that.listdata)
              }else if(ret.success&&ret.status==0){
                if (that.currpage==1) {
                    that.listdata=[]
                } else {
                  promptMsg('已经加载全部了')
                }
                  that.stopload=true
                  
              }else{
                promptMsg(ret.err)
              }
              that.isDone = true
            }
          })
      },
      GroupBuy(pid,gbid){
    if(pid == "" || gbid == "") return;
        openWin({
            url:'./new_lndianaDetail.html',
            name:'groupbuy',
            useWKWebView:true,
            pageParam:{
              title:'拼团详情',
              share: true,
              gbid,
              pid,
              onshow: 1,
            }
        },1)
      },
      showRule() {
        var content = ''
        if (api.systemType == "ios") {
          content = `1、选择心仪商品开团或者参团，在有效期内达到拼团要求，则拼团成功；
                    <br><br>2、多人同时支付开团/参团，支付完成最早的人获得开团/参团资格；
                    <br><br>3、在拼团有效期内为未邀请到足够人数参团级拼团失败，已支付的金额原路退还至支付账号；
                    <br><br>4、拼团有效期内，已支付订单不允许申请退款；
                    <br><br>5: 本活动与美国苹果公司（Apple.Lnc)无关。`
        } else {
          content = `1、选择心仪商品开团或者参团，在有效期内达到拼团要求，则拼团成功；
                    <br><br>2、多人同时支付开团/参团，支付完成最早的人获得开团/参团资格；
                    <br><br>3、在拼团有效期内为未邀请到足够人数参团级拼团失败，已支付的金额原路退还至支付账号；
                    <br><br>4、拼团有效期内，已支付订单不允许申请退款；`
        }
        api.openFrame({
            name: 'rule',
            url: './showRule.html',
            rect: {
                x: 0,
                y: 0,
                w:'auto',
                h: 'auto'
            },
            pageParam: {
                content,
            },
            bounces: false,
            bgColor: 'rgba(0,0,0,0)',
            vScrollBarEnabled: false,
            hScrollBarEnabled: false
        })
      },
  },
  created(){
      var that=this
      if(window.api){
        api.addEventListener({
          name: 'scrolltobottom'
        }, function(ret, err) {
            if (!that.stopload) {
                that.currpage = that.currpage + 1;
                that.prolistdata()
            }
        });
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
          setTimeout(function () {
            that.reset()
            that.headeimg()
            that.classiddata()
          }, 500)
        })
      }
  },
  mounted(){
        window.addEventListener('scroll', this.handleScroll)
        this.headeimg()
        this.classiddata()
        this.loadTimer = setTimeout(function () {
          showLoading()
        }, 1000)
        
  }
}
</script>
<style lang="scss">
.van-swipe-item{
  img{
    width: 100%;
  }
}
@mixin item {
  display: flex;
  align-items: center;
}
@mixin font1 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
@mixin font2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
img{display: block;}
/*头部轮播*/
.tuan_wrap {
  width: 100%;
}
.tuan_banner .banner_img {
    display: block;
    width: 100%;
    overflow: hidden;
}
img {
    border: 0;
    vertical-align: middle;
}

.tuan_btn_ctn {
    height: 40px;
    font-size: 15px;
    margin-bottom: 2px;
    background-color: #fff;
}
.tuan_btn_ctn .tuan_btn_active {
    color: #f44836;
    border-bottom: 2px solid #f44836;
}
.tuan_btn_ctn .tuan_btn {
    display: block;
    float: left;
    width: 50%;
    height: 100%;
    color: #666;
    text-align: center;
    line-height: 40px;
}
.gun_waibox{
  overflow:hidden;
  width: 100%;
}
.gun_box{
  @include item;
  overflow-x: scroll;
  position: relative;
}
.gun_ul{
  position: relative;
  width: rem(88);
  flex-shrink: 0;
  text-align: center;
  p{
    color: #9B9B9B;
    font-size: rem(14);
    padding: rem(8) 0;
  }
}
.line{
  position: absolute;
  width: rem(88);
  bottom:0;
  height: rem(5);
  transition: left .5s;
  left: 0px;
  .redline{
    width: 40%;
    height: rem(5);
    border-radius: 30px;
    margin: 0 auto;
    background-color: #FAAFA0
  }
}
.active{
  color: #FF5541;
}
.pro_box{
  @include  item;
  font-size: rem(15);
  padding: rem(22) 0;
  margin-bottom: rem(6);
  background: #fff;
  .pro_img{
    width: rem(100);
    height: rem(100);
    flex-shrink: 0;
    padding: 0 rem(10) 0 rem(19);
  }
  .pro_right{
    padding-right:rem(20)
  }
  .listuer{
    @include item;
    div {
      width:rems(64);
      height:rems(64);
      img {
      border: rem(2) solid #fff;
      }
    }
    div + div {
        margin-left: rem(-11);
      }
  }
  .pro_title{
    span{
      flex-shrink: 0;
      font-size: rem(10);
      color: #fff;
      background:linear-gradient(270deg,rgba(232,55,74,1) 0%,rgba(253,94,67,1) 100%);
      padding: 0 rem(5);
      border-radius: 30px;
      margin-right: rem(8);
    }
    p{
      @include font2;
      color:#666464;
    }
  }
  .pro_main{
    @include item;
    height: rem(35);
    margin-bottom: rem(15);
    justify-content: space-between;
    img{
      width: rem(32);
      height: rem(32);
      border-radius: 50%
    }
    p{
      font-size: rem(12);
      color: #999;
    }
  }
}
.pro_foot{
@include item;
width: rem(227);
justify-content: space-between;
   .p1{
     font-size: rem(18);
     color: #FF5541;
   }
   .p2{
     font-size: rem(12);
     color: #999;
   }
   .p3{
     font-size: rem(12);
     color: #fff;
     padding: rem(8) rem(15);
     border-radius: 30px;
     background:#427161;
   }
}
.fs_10 {
  font-size: rem(10) !important;
}
.noRec{
  background-color: #fff;
}
.fixed{
  position: fixed;
  top:0;
  width: 100%;
  z-index: 9999;
  background-color: #fff;
}
/* 活动规则 */
.rule {
  width:rem(70);
  height:rem(24);
  background-color: #B70000;
  border-radius:rem(12) 0 0 rem(12);
  text-align: center;
  line-height: rem(24);
  font-size: rem(12);
  color: #fff;
  position: absolute;
  top: rem(26);
  right: 0;
  z-index: 99;
}

/* 拼团说明 */
#shuoming {
  background-color:rgba(66,113,97,1);
  display: flex;
  justify-content: center;
}

.explain {
  height: rem(48);
  padding: 0 rem(15);
  display: flex;
  align-items: center;
}

.explain .step {
  width: rem(22);
  height: rem(22);
  display: flex;
  justify-content: center;
  align-items: center;
}

.explain .step + .step {
  margin-left: rem(7);
}

.explain .step div {
  font-size: rem(11);
  display: block;
  background-color: rgba(232, 55, 74, 1);
  width: rem(16);
  height: rem(16);
  line-height: rem(16);
  color: #fff;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.explain span {
  color: #fff;
  font-size: rem(12);
  margin-left: rem(5);
}

.explain .right {
  width: rem(22);
  height: rem(22);
  margin-left: rem(10);
  background: url('../../image/right@3x.png') no-repeat;
  background-position: center;
  background-size: contain;
}

.explain .right img {
  width: 100%;
  height: 100%;
}
#shuoming {
  margin-bottom: rem(10);
}

.banbox {
  width: 100% !important;
  .banboxs {
    width: 100% !important;
  }
}
.van-swipe__track {
  width: 100% !important;
}
</style>