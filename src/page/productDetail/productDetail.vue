<template>
<section style="opacity: 0;width:100%;overflow:hidden" :style="{opacity: isDone || statusCode != '1'?'1':'0'}" id="sec">
    <!-- 遮罩 -->
    <div class="mark" v-show="showMark" @click="close" id="mark"></div>
    <!-- 轮播 -->
    <header class="banner" id="header">
      <van-swipe class="ssip" :autoplay="3000" @change="ssipChange">
        <van-swipe-item v-for="(item, index) in imgs" :key="index">
          <img v-lazy="item"  @click="bigtu(index)"/>
        </van-swipe-item>
      </van-swipe>
      <div class="mess" v-if="msg.isrushbuy&&timetext">
          <span class="tt">限时特卖<img src="../../img/shandian.png" alt=""></span>
          <span class="time">{{timetext}}</span>
      </div> 
      <span class="zsq">{{swipIdx + '/' + imgs.length}}</span>   
    </header>
    <div id="backicon" class="back" onclick="closeWin()"><img src="../../img/icon-back.png" alt=""></div>
    <div class="headtap" id="headtap">
      <div class="itm">
        <div @click="goplace(0)" class="item">商品</div>
        <div @click="goplace(1)" class="item">评论</div>
        <div @click="goplace(2)" class="item">详情</div>
        <div class="rline" id="rl" :style="{left: (linewidth*curridx)+'px'}" ref="rline"></div>
      </div>
    </div>
    <div id="shareicon" class="share" @click="onshare" v-if="installwx"><img src="../../img/share_black.png" alt=""></div>
    <div class="explain">
      <div class="p" :style="!packageid?'':'border:none;width:92%'">
        <p>{{msg.name}}</p>
      </div>
      <!-- 套餐订单不收藏 -->
      <div class="zan" v-if="!packageid"> 
        <img v-if="msg.islike" src="../../img/stars.png" alt="">
        <img @click="onlike" v-else src="../../img/star.png" alt="">
        <p>{{msg.likecount}}</p>
      </div>
    </div>
    <div class="shuom">{{msg.secondname}}</div>

    <div class="pr">
      <div class="l">
        <p class="price">￥{{price | toFixed}}<span v-if="fxshopid">/赚￥{{msg.commPrice | toFixed}}</span></p>
        <p style="text-decoration: line-through;">￥{{oldPrice | toFixed}}</p>
      </div>
      <p class="buyn">{{msg.chenjiaonum}}人购买</p>
    </div>
    <!-- 上架按钮 -->
    <div v-if="fxshopid&&!msg.propackageprice" class="up" :style="{left: upmove ? ' -12%' : '0'}" @click="uppro">
      {{msg.isup ? '已上架': '上架'}}
    </div>
    <!-- 优惠券 -->
    <div class="coup">
      <div class="cnnn" v-if="!uid" @click="gologin">
        <div class="cn_n">
          <img src="../../img/qianbao_comfirm.png" alt="">
          <p>注册就送100元购物礼包</p>
        </div>
        <div>
          <p class="ljzc">立即注册</p>
          <img class="enter" src="../../img/enter.png" alt="">
        </div>
      </div>
      <!-- 必须已登录，且有已领或未领的优惠券，以及不是开店礼包 -->
      <div class="h" v-if="uid&&(unGet.length || hasGet.length)&&!msg.propackageprice" @click="showCouponpop">
        <span>{{unGet ? '领券' : '已领券'}}</span>
        <span>{{unGet[0] ? unGet[0].companyname : hasGet[0] ? hasGet[0].companyname : ''}}</span>
        <span class="co" v-for="(item, index) in unGet" :key="index" v-if="unGet&&index<2">{{'满' + item.uselimit + '减' + item.facevalue + '元' }}</span>
        <span class="co" v-for="(item, index) in hasGet" :key="index" v-if="!unGet&&hasGet&&index<2">{{'满' + item.uselimit + '减' + item.facevalue + '元' }}</span>
      </div>
    </div>

    <div class="ensure" v-if="msg.commitmentlist ? msg.commitmentlist.length > 0 ? true : false : false" @click="showsure" >
      <div v-for="(item, index) in msg.commitmentlist" :key="index">
        <img v-lazy="item.logoimg" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>

    <div class="choose" v-if="spec" @click="showSpec" :style="{display:fxshopid&&msg.propackageprice!=0 ? 'none' : 'flex'}">
      <div>
        <!-- <span>已选</span> -->
        <span rel="skuu">已选 数量 X {{buyCount}}、{{skutext}}</span>
      </div>
      <img src="../../img/enter.png" alt="">
    </div>
    <!-- 评论 -->
    <div class="pl" id="pl">
      <div class="plall" @click="toAssessDetaill">
        <div class="t">
        <span class="l">商品评论</span>
        <span>更多评论<img src="../../img/enter.png" alt=""></span>
      </div>
      <div class="plcontent" v-if="plMsg">
        <div class="item" v-for="(item, index) in plMsg" :key="index"> 
          <div class="l">
            <img :src="item.photo.Value" alt="">
          </div>
          <div class="r">
            <p class="name">{{item.name}}</p>
            <p>{{item.content}}</p>
          </div>
        </div>
      </div>
      <p v-else class="nopll">暂无评价与问答</p>
      </div>
    </div>

    <!-- 商品详情5 -->
    <div class="detail" id="detail">
      
    </div>
     <!-- 工商资历 -->
     <div>
       <div class='gongshang' @click="gogongshang()" id="gs">
         <p>工商资质</p>
         <img src="../../img/gongshang.png" alt="">
       </div>
     </div>

     <div class="h_96" style="width:100%;"></div>
     
    <footer id="footer">
      <div class="l">
        <div @click="gomain">
          <img src="../../img/fz.png" alt="">
          <p>首页</p>
        </div>
        <div @click="goshoppingcar">
          <img src="../../img/gwc.png" alt="">
          <p>购物车</p>
          <span class="cnum" v-if="shopCarNum">{{shopCarNum > 99 ? '99+' : shopCarNum}}</span>
        </div>
      </div>
      <div class="r" v-if="fxshopid">
        <div @click="showSpec" :style="{display:fxshopid&&msg.propackageprice!=0 ? 'none' : 'flex'}">
        <!-- <div @click="showSpec"> -->
          <p>省钱购</p>
          <p>立省{{saveMoney | toFixed}}</p>
        </div>
        <div @click="onshare" :class="{hasShopid: fxshopid&&msg.propackageprice!=0 ? true : false}">
          <p>分享赚</p>
          <p>立赚{{msg.commPrice | toFixed}}</p>
        </div>
      </div>
      <div class="r" v-else>
        <div class="ljgm" @click="showSpec">
          <p>立即购买</p>
        </div>
      </div>
    </footer>
    <div class="enPop" id="enPop" @click="showsure" style="bottom: -100%" :style="{bottom: showEnsure ? '0px' : '-100%'}">
      <ul v-if="msg&&msg.commitmentlist&&msg.commitmentlist.length>0">
        <li v-for="(item, index) in msg.commitmentlist" :key="index">
          <div><img :src="item.logoimg" alt=""><span>{{item.name}}</span></div>
          <p>{{item.content}}</p>
        </li>
      </ul>
    </div>
    <specpop @changeData="changMsg" @shopcarNum="getshopcarNum" :packageid="packageid" :pid="msg.productid" :isopenshop="isopenshop" v-show="showspec"></specpop>
    <coupon v-show="showCoupon" @closeCou="showCouponpop" :cid="msg.companyid" :bindData="showCoupon" :pid="msg.productid" :rbid="msg.isrushbuy ? msg.rushbuy.rushbuyid : ''"></coupon>
    <statuserr :scode="statusCode" @reload="errReload"></statuserr>
  </section>
</template>

<script>
import specpop from '../../components/specpop/specpop.vue'
import coupon from '../../components/coupon_pop/coupon_pop.vue'
import statuserr from '../../components/statuserr/statuserr.vue'
export default {
  components:{
    specpop,
    coupon,
    statuserr
  },
  props:{},
  data(){
    return {
      swipIdx: 1,       // 轮播图数字
      imgs: [         // 轮播图数据
        '../../img/bkg_cover.jpg'
      ],
      linewidth: 0,       // 横线长度
      curridx: 0,
      upmove: false,      // 上架按钮的滑动
      shopCarNum: 0,      // 购物车数量
      plTop: 0,           // 评论区域高度
      detailTop:0,        // 商品详情区域高度
      bannerTop: 0,       // 头部高度
      showEnsure: false,
      showMark: false,    // 显示遮罩
      isDone: false,      // 是否加载完毕
      msg: '',            // 商品数据
      timetext: '',       // 时间
      price: 0.00,         // 价格
      saveMoney: 0.00,    // 省钱
      oldPrice: 0.00,     // 原价
      isopenshop: false,   //
      fxshopid: window.api ? api.getPrefs({sync: true,key: 'SessionShopID'}) : $api.getStorage('SessionShopID'),
      uid: window.api ? api.getPrefs({sync: true,key: 'SessionUserID'}) : $api.getStorage('SessionUserID'),
      pid: '',
      packageid: '',      // 开店礼包id
      plMsg: '',          // 评论数据
      // 规格相关
      minbuycount: 0,
      maxbuycount: 0,
      showspec: false,
      spec: '',
      skutext: '',
      buyCount: 1,
      // 优惠券
      hasGet: [],
      unGet: [],
      showCoupon: false,   // 优惠券弹窗
      installwx:true,
      statusCode: '1',
    }
  },
  watch:{},
  computed:{},
  created() {
    var that=this
    this.pid = pageParam('pid')
    this.packageid = pageParam('packageid')
    if(window.api){
      var wx = api.require('wx');
      wx.isInstalled(function(ret, err) {
        if (ret.installed) {
           that.installwx=true
        } else {
          that.installwx=false
        }
      });
    }
  },
  filters: {
    toFixed(value) {
      if (!value) return '0.00'
      return Number(value).toFixed(2)
    }
  },
  mounted() {
    this.bindtop()
    this.bindData()
    this.linewidth = this.$refs.rline.offsetWidth
    $api.byId('headtap').style.paddingTop = getname('statustop') + 'px'
    $api.byId('footer').style.paddingBottom = getname('safeAreaBottom') + 'px'
    $api.byId('sec').style.paddingBottom = getname('safeAreaBottom') + 'px'
    $api.byId('backicon').style.top = parseInt($api.cssVal($api.byId('backicon'), 'top')) + Number(getname('statustop')) + 'px'
    $api.byId('shareicon').style.top = parseInt($api.cssVal($api.byId('shareicon'), 'top')) + Number(getname('statustop')) + 'px'
    if (window.api) {
      api.addEventListener({
        name: 'viewappear'
      }, function(ret, err){
        if (getname() != '' && getname() != null) {
          this.uid = getname()
        }
      });
    }
  },
  methods:{
    // 获取数据
    bindData(){
      this.getMsg()
      this.getpl()
      this.getshopcarNum()
    },
    getMsg() {
      var that = this
      https({
        url: siteUrl + 'Main/Main/GetProductDetailJson',
        method: 'get',
        data: {
          productId: that.pid,
          // productId:api.pageParam.pid,
          yshopid: '',
          userid: that.uid,
          fxshopid:that.fxshopid
        },
        successBack: ret => {
          console.log(ret)
          if (ret) {
            if (ret.success && ret.status == 1) {
              var data = ret.Data
              this.msg = data
              if (data.propackageprice>0) {
                this.price = data.propackageprice 
              } else {
                this.price = data.saleprice
              }
              
              this.oldPrice = data.marketingprice
              this.minbuycount = data.minbuycount
              this.maxbuycount = data.maxbuycount
              var album = JSON.parse(data.album)
              if (album.hasPic) {
                this.imgs = JSON.parse(data.album).piclist
              } else {
                this.imgs = ['./img/bk_cover.jpg']
              }
              // 有规格读取规格数据
              if (data.openspec) {
                this.getspec()
              }
              if (data.skuobj && data.skuobj.length > 0) {
                this.price = data.skuobj[0].saleprice
              } 
              if (data.isrushbuy) {
                this.countTime()
                var specjson = JSON.parse(data.rushbuy.specjson)[0]
                this.price = specjson.Price
                this.oldPrice = data.saleprice
              } else if (data.propackageprice) {
                this.isopenshop = true
              }
              //判断数据
              if(that.fxshopid != null && that.fxshopid != ""){
                if(pageParam('packageid') || that.msg.propackageprice != 0){
                  that.packzuan()
                }
              }
              // 是限时购且有规格则替换skuobj中 赚多少的金额
              if (data.isrushbuy && data.openspec) {
                var comm = JSON.parse(data.rushbuy.commPrice)
                comm.map((item, k) => {
                  this.msg.skuobj[k].savemoney = Number(item).toFixed(2)
                })
              }
              // 多规格则显示为规格数据中的赚多少
              if (data.skuobj != null && data.skuobj != '') {
                this.msg.commPrice = this.msg.skuobj[0].savemoney
                this.saveMoney = this.msg.skuobj[0].savemoney
              } else {
                this.saveMoney = this.msg.commPrice
              }
              document.getElementById('detail').innerHTML = data.description
              //图片放大
              if(data.description){
              var listimg=$api.domAll($api.byId('detail'), 'img')
              var imgdata=[]
              if(listimg.length>0){
              for(var i=0;i<listimg.length;i++){
                  imgdata.push(listimg[i].src)
                  $api.attr(listimg[i],'data-index',i)
                  $api.addEvt(listimg[i], 'click', function(e){
                    var index=e.target.dataset.index
                    that.bigimg(imgdata,index)
                  });
              }
              }
              }
              // 获取优惠券数据
              this.getCoupon()
            } else {
              promptMsg(ret.err)
            }
          } else {
            promptMsg(err.Msg)
          }
          this.isDone = true
          this.statusCode = '1'
        },
        errorBack: err => {
          this.statusCode = err.statusCode
          this.isDone = true
          promptMsg(err.msg)
        }
      })
    },
    bigtu(index){
      var p=this.imgs
        showBigImages(p,index)
    },
    bigimg(src,index){
        if(index>=0){
          console.log(src)
          console.log(index)
        showBigImages(src,index)
        }else{
        var p=[]
        p.push(src)
        showBigImages(p,0)
        }
      },
    countTime(refresh) {
      let data = this.msg.rushbuy
      var that=this
      // 有refresh表示倒计时结束，重新刷新
      if (refresh) {
        this.msg.nowtimetick = Date.now()
      }
      if (data.begintimeticks > this.msg.nowtimetick) {
        var now = (Number(data.begintimeticks) - Number(that.msg.nowtimetick)) / 1000
        that.count(now, 1)
      } else if (data.endtimeticks > this.msg.nowtimetick) {
        var now = (Number(data.endtimeticks) - Number(that.msg.nowtimetick)) / 1000
        that.count(now, 2)
      }
    },
    count(times, index) {
      var that = this
      var timer = setInterval(function(){
        var day=0,
          hour=0,
          minute=0,
          second=0;//时间默认值
        if(times > 0){
          day = Math.floor(times / (60 * 60 * 24));
          hour = Math.floor(times / (60 * 60)) - (day * 24);
          minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
          second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if (day <= 9) day = '0' + day;
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        //
        if(index==1){
          that.timetext = "距活动开始还剩:"+day+"天"+hour+"时"+minute+"分"+second+"秒"
        }
        else {
          that.timetext = "距活动结束还剩:"+day+"天"+hour+"时"+minute+"分"+second+"秒"
        }
        if(times<=0){
          clearInterval(timer);
        }
        // console.log(that.timetext)
        if(second==0&&day==0&&hour==0&&minute==0){
          // 未开始的就重新执行一次倒计时
          if (index == 1) {
            that.countTime(1)
          } else {
            that.timetext = ''
          }
        }
        times--;
      },1000);
    },
    getspec() {
      https({
        url:siteUrl + 'Main/Main/GetProductSkuJson',
        data: {
          productId: this.pid
        },
        successBack: ret => {
          console.log(ret)
          if (ret.success && ret.status == 1) {
            var data = ret.Data
            if (this.msg.propackageprice != 0) {
              this.msg.skuobj = data.sku
              this.price = data.sku[0].packageprice
            }
            data.spec.map(item => {
              item.spectext = JSON.parse(item.spectext)
            })
            this.spec = data
            this.skutext = data.sku[0].skutext
          }
        }
      })
    },
    getpl() {
      var that = this
      https({
        url: siteUrl+"Main/Shopping/GetOrderComment",
        data: {
          productid: that.pid,
          currentPage: 1,
          pageSize: 2,
          level: 0
        },
        successBack: ret => {
          if (ret.success && ret.status == 1) {
            var data = ret.Data[0].comment
            if (data && data.length > 0) {
              this.plMsg = []
              data.forEach((item, i) => {
                if (i < 3) {
                  if(!item.photo.Value) {
                    item.photo.Value = './img/man.jpg'
                  }
                  this.plMsg.push(item)
                }
              })
            }
          }
        }
      })
    },
    getCoupon() {
      var that = this
      if (this.msg.isrushbuy) {
        https({
          url: siteUrl + 'Marketing/Coupon/GetCouponListJson',
          data: {
            uid: that.uid,
            ispaltform: 3,
            activityid: that.msg.rushbuy.rushbuyid
          },
          successBack: function (ret) {
            that.couponBack(ret)
          }
        })
      } else {
        // 普通商品
        https({
          url: siteUrl + 'Marketing/Coupon/GetCompanyPlatformCoupon',
          data: {
            CompanyID: that.msg.companyid,
            uid: that.uid,
            proId: that.pid
          },
          successBack: function (ret) {
            that.couponBack(ret)
          }
        })
      }
    },
    couponBack(ret) {
      var that = this
      if (ret.success && ret.status == 1) {
        let arr = []
        // 接口不同 获取数据不同
        if (that.msg.isrushbuy) {
          arr = ret.Data
        } else {
          let CompanyData = ret.CompanyData
          let Platform = ret.Platform
          if (CompanyData.length) {
            CompanyData.forEach(item => {
              if (item.prolimit == 1) {
                arr.push(item)
              }
            })
          }
          if (Platform.length) {
            Platform.forEach(item => {
              if (item.prolimit == 1) {
                arr.push(item)
              }
            })
          }
        }
        if (arr.length) {
          var hasGet = []
          var unGet = []
          arr.forEach(item => {
            // isover 表示总数领取完了 或领取次数剩余0了 就加入已领取列表
            if (!item.isover && (item.eachamount - item.getnum) > 0 && item.couponType != 2 && item.couponType != 3) {
              unGet.push(item)
            } else {
              if (item.isget) {
                hasGet.push(item)
              }
            }
          })
          if (!hasGet.length) hasGet = ''
          if (!unGet.length) unGet = ''
          this.hasGet = hasGet
          this.unGet = unGet
          this.$forceUpdate()
          // console.log(this.unGet)
        }
      }
    },
    // 获取购物车数量 shopCarNum
    getshopcarNum() {
      var that = this
      if (!that.uid) return
      if (that.packageid) {
        https({
          url:siteUrl +'Main/PackageShopping/GetCartProCount?uid='+ that.uid,
          data:{
            uid: that.uid,
          },
          headers:1,
          successBack: ret => {
            if (ret.success && ret.status == 1) {
              that.shopCarNum = ret.Data ? ret.Data : ''
            } else {
              promptMsg(ret.err)
            }
          }
        })
      } else {
        https({
          url:siteUrl +'Main/Shopping/GetCartProCount',
          data:{
            uid: that.uid,
          },
          headers:1,
          successBack: ret => {
            if (ret.success && ret.status == 1) {
              that.shopCarNum = ret.Data ? ret.Data : ''
            } else {
              promptMsg(ret.err)
            }
          }
        })
      }
    },
    // 上架商品
    uppro() {
      var that = this
      var state = that.msg.isup ? '1' : 0
      https({
        url: siteUrl +'Main/Member/UpProduct',
        data: {
          proid:that.msg.productid,
          uid:that.uid,
          state
        },
        successBack: ret => {
          if (ret.success && ret.status == 1) {
            if (state == 0) {
              promptMsg('攸店上架成功')
              that.msg.isup = true
            } else if (state == 1) {
              promptMsg('攸店下架成功')
              that.msg.isup = false
            }
          } else {
            promptMsg(ret.err)
          }
        }
      })
    },
    // 根据规格窗选择改变数据
    changMsg(value) {
      console.log(value)
      var that = this
      this.skutext = value.skutext
      this.buyCount = value.buyCount
      var data = ''
      if (this.msg.isrushbuy) {
        data = JSON.parse(this.msg.rushbuy.specjson)
        data.forEach((item, i) => {
          if (item.Skuid == value.skuid) {
            that.price = item.Price
            that.msg.commPrice = this.msg.skuobj[i].savemoney
            that.saveMoney = this.msg.skuobj[i].savemoney
          }
        })
      } else {
        data = this.msg.skuobj
        data.forEach(item => {
          if (item.skuid == value.skuid) {
            that.price = that.msg.propackageprice != 0 ? item.packageprice : item.saleprice
            that.msg.commPrice = item.savemoney
            that.saveMoney = item.savemoney
          }
        })
      }
      
    },
    showSpec() {
      this.showspec = !this.showspec
      this.showMark = !this.showMark
    },
    showCouponpop() {
      this.showCoupon = !this.showCoupon
    },
    // 收藏
    onlike() {
      var that = this
      if (checkLoginStatus()) {
        if (!that.pid) {
          return promptMsg('商品不存在')
        }
        https({
          url: siteUrl +'Main/Member/InsertCollection?uid='+ that.uid,
          method: 'post',
          data: {
            refid: that.pid,
            uid: that.uid,
          },
          headers: 1,
          successBack: ret => {
            if(ret.success){
              if(ret.status==1){
                promptMsg('收藏成功')
                that.msg.islike = true
                that.msg.likecount += 1
              }
              else{
                promptMsg(ret.err);
              }
            }else{
                if(checkLoginStatus()){
                  promptMsg(err.msg);
                }
            }
          }
        })
      }
    },
    // 查询赚多少
    packzuan() {
      var that = this
      https({
        url:siteUrl +'main/member/GetShopTitleComm',
        data:{
          uid: this.uid,
          yshopid:getname('SessionShopID')
        },
        headers:1,
        successBack:function(ret){
          console.log(ret)
          if(ret.success&&ret.status==1){
            // zuan=ret.Data
            that.saveMoney = ret.Data
            that.msg.commPrice = ret.Data
          }else{
            promptMsg(ret.err)
          }
        }
      })
    },
    // 轮播图触发事件
    ssipChange(idx) {
      this.swipIdx = idx + 1
    },
    showsure() {
      this.showEnsure = !this.showEnsure
      this.showMark = !this.showMark
    },
    close() {
      this.showEnsure = false
      this.showMark = false
      this.showspec = false
      
    },
    closeCou() {
      this.showCoupon = false
    },
    // 点击顶部栏
    goplace(idx,type) {
      this.curridx = idx
      if (idx == 0) {
        window.scrollTo(0,0)
      } else if (idx == 1) {
        window.scrollTo(0, this.plTop+1)
      } else if (idx == 2) {
        window.scrollTo(0, this.detailTop+1)
      }
    },
    moveline(idx) {
      this.curridx = idx
      console.log(1)
    },
    toAssessDetaill() {
      openWin({
          name: 'productdetailreview',
          url: './productdetailreview.html',
          rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto',
            marginBottom: getname('safeAreaBottom')
          },
          animation:{
                type:"fade",                //动画类型（详见动画类型常量）
                subType:"from_bottomt",       //动画子类型（详见动画子类型常量）
                duration:300                //动画过渡时间，默认300毫秒
            },
          pageParam: {
            pid: pageParam('pid')
          },
          bounces: true,
          bgColor: '#fff',
      });
    },
      
    // 绑定页面滑动
    bindtop() {
      var that = this
      var statustop = $api.getStorage('statustop') ? $api.getStorage('statustop') : 0
      this.plTop = $api.offset($api.byId('pl')).t
      this.detailTop = $api.offset($api.byId('detail')).t
      this.bannerTop = $api.offset($api.byId('header')).t-Number(statustop)
      window.onscroll = function () {
        var t = document.documentElement.scrollTop||document.body.scrollTop;
        if (t > that.detailTop) {
          document.getElementById('rl').style.left = (that.linewidth * 2) + 'px'
        } else if (t > that.plTop) {
          document.getElementById('rl').style.left = (that.linewidth * 1) + 'px'
        } else {
          document.getElementById('rl').style.left = 0
        }
        var op = (t-that.bannerTop)/300
        op = op > 1 ? 1 : op
        if (t <= 10) op = 0 // 触顶时，透明度直接为 0
        $api.css($api.byId('headtap'),"opacity:"+op)
        clearTimeout(uptimer)
        var uptimer = null
        that.upmove = true
        uptimer = setTimeout(function () {
          that.upmove = false
        }, 3000)
      }
      var h = document.documentElement.clientHeight || document.body.clientHeight
      $api.css($api.byId('mark'), 'height:' + h + 'px')
    },
    // 分享
    onshare() {
      var that = this
      // console.log(Number(that.msg.commPrice).toFixed(2))
      api.openFrame({
        name: 'pro_sharediv',
        url: './pro_sharediv.html',
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
        },
        pageParam: {
             pid: pageParam('pid'),
             zuan: Number(that.msg.commPrice).toFixed(2),
             packageid:pageParam('packageid')
        },
        bounces: false,
        bgColor: 'rgba(0,0,0,0)'
      });
    },
    goshoppingcar() {
      if (checkLoginStatus()) {
        ReturnToIndex(3)
      }
    },
    gomain() {
      ReturnToIndex(0)
    },
    gologin() {
      checkLoginStatus()
    },
    gogongshang() {
      var that=this
        openWin({
          name:'commerce',
            url:'./commerce.html',
          pageParam:{
            img:that.msg.blurl,
            title:'工商资质'
          }
        }, 1)
    },
    errReload() {
      this.bindData()
    }
  },
}
</script>
<style lang="scss">
.detail{
  font-size: rems(30)
}
  @import "productDetail.scss";
</style>