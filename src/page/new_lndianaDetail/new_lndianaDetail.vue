<template>
  <div id="main" :style="{display: isDone ? 'block' : 'none'}">
      <!-- 分享按钮 -->
      <!-- <div class="share iconfont icon-share_icon flex flex_pack_center flex_align_center"></div> -->
      <!-- 轮播区域 -->
      <div class="swiper">
        <van-swipe :autoplay="3000" style="width:100%;height:100%" @change="onChange">
          <van-swipe-item v-for="(image, index) in imgUrl" :key="index">
            <img v-lazy="image" />
          </van-swipe-item>
        </van-swipe>
          <div class="swiper-pagination">
            {{ current + 1 }}/{{imgUrl.length}}
          </div>
        <!-- 价格区域 -->
        <div class="priceGroup flex flex_align_center">
          <span class="pp" v-if="isduobao">抽奖价</span>
          <span class="pp" v-else>{{gbnum}}人团</span>
          <span class="nowprice">￥{{price|toFixed}}</span>
          <span class="oldprice">￥{{oldPrice|toFixed}}</span>
        </div>
      </div>
      <!-- 商品信息 -->
      <div class="proDetails flex flex_v">
        <div class="p1 mt_5">
          {{msg.proname || msg.name}}    
        </div>
        <p><span class="xn"><span v-show="msg.headfree">团长免单</span><span v-show="msg.buyonegetone">买一送一</span></span></p>
      </div>
      <!-- 优惠券 -->
      <div class="coupons hide" id="coupon" @click="openCoupon"  style="margin-top: 3%;" v-if="showCoupon==1">
        <div>
          <span>{{unGet ? '领券' : '已领券'}}</span>
          <span class="t1">{{unGet[0] ? unGet[0].companyname : hasGet[0] ? hasGet[0].companyname : ''}}</span>
          <span class="t2" v-if="unGet && index<2" v-for="(item, index) in unGet" :key="index">{{'满' + item.uselimit + '减' + item.facevalue + '元' }}</span>
          <span class="t2" v-if="!unGet && hasGet && index<2" v-for="(item, index) in hasGet" :key="index">{{'满' + item.uselimit + '减' + item.facevalue + '元' }}</span>
        </div>
        <div class="r icon-right iconfont"></div>
      </div>
      <!-- 没登录优惠券 -->
      <div class="coupons" style="margin-top: 3%;" @click="openCoupon" v-if="showCoupon==0">
        <div>
          <img class="mon" src="../../img/money.png">
          <span style="color: #333">注册就送100元购物礼包</span>
        </div>
        <div class="log" style="">立即注册</div>
        <div class="r icon-gengduo iconfont"></div>
      </div>

      <!-- 横条 -->
       <div class="flex flex_pack_center hengtiao" v-if="isduobao">
         <div style="width: 90%;height: 1px;background-color: #f6f6fa"></div>
       </div>
       <!-- 参团进度条 -->
       <div class="progress flex flex_v flex_align_center" v-if="isduobao">
         <div class="line">
           <div :style="{width: (msg.amout / msg.totalamout) * 100 + '%'}"></div>
         </div>
         <div class="attend flex flex_pack_justify_between">
           <span v-cloak>{{msg.amout+'人已参加'}}</span>
           <span v-cloak>{{'剩余'+msg.remainingamout}}</span>
         </div>
       </div>
       <!-- 保障 -->
       <div class="ensure flex" @click="openEnsure">
           <div class="flex flex flex_align_center flex_pack_center" v-for="(item, index) in msg.commitmentlist" :key="index">
             <img :src="item.logoimg" />
             <span style="margin-left: 6px;" v-cloak>{{item.name}}</span>
           </div>
       </div>
       <!-- 玩法说明 -->
        <div class="explain" v-if="!isduobao">
          <div class="title">玩法说明</div>
          <div class="content">
            <div class="progress flex flex_v flex_pack_center">
              <img src="../../img/wanfashuoming@3x.png" />
            </div>
            <div style="width: 100%;">
              <div class="c-item" style="color:#9B9B9B;">选择商品参加活动</div>
              <div class="c-item" style="color:#9B9B9B;">支付开团或拼团</div>
              <div class="c-item" style="color:#9B9B9B;">邀请好友参团支付</div>
              <div class="c-item" style="color:#9B9B9B;">人满成功失败退款</div>
            </div>
          </div>
        </div>
        <div class="searchm" v-if="!isduobao">
          <div>
            <input type="text" placeholder="搜索团长昵称/邀请码/手机号" v-model="gbsearch" @focus="onfocus" @blur="onfocus(1)">
            <span class="iconfont icon-fangdajing" @click="goSearch"></span>
          </div>
        </div>
        <!-- 拼团成员 -->
        <div class="member" v-if="!isduobao&&gblist&&gblist.length>0">
          <div class="member-item flex" v-for="(item, index) in gblist" :key="index" v-if="item&&item!=''&&item!=null">
            <img :src="item.imgphoto" @error="imgErr(index)">
            <div class="flex flex_v flex_pack_justify_between flex_1">
              <span class="line_over_1" style="color:#427161" v-cloak>{{item.realname}}</span>
              <span v-cloak>还差{{item.num}}人，还剩{{countDownTime[index]}}</span>
            </div>
            <div class="btn gradient" @click="openGroup(item.isingroup, index)" v-cloak>{{item.isingroup ? '已参团' : '与他拼团'}}</div>
          </div>
          <div class="bindmore" @click="bindMore">{{gbHasMore ? '点击加载更多' : '没有更多了~'}}</div>
        </div>
       <!-- 商品详情 -->
       <div class="productMsg" id="productMsg">
         <div class="title">商品详情</div>
         <!-- 没有商品详情内容 -->
          <div v-show="!productDetail" class="flex flex_v flex_align_center flex_pack_center" style="width: 100%;height: 300rpx;background-color: #f6f6fa">
            <img class="nodata" src="../../img/nodata2.png">
            <span class="color_999" style="font-size: 13px;margin-top: -5%;color:#9b9b9b;">暂无商品介绍</span>
          </div>
         <div class="content" id="pd">
            
         </div>
         <!-- 工商资历 -->
         <div>
           <div class='gongshang' @click="gogongshang()" id="gs">
             <p>工商资质</p>
             <img src="../../img/gongshang.png" alt="">
           </div>
         </div>
       </div>
       <!-- 底部栏 -->
       <div class="footerBar flex flex_pack_center" id="footer">
         <!-- 立即夺宝按钮 -->
         <div style="background: #999;" class="dbBuy flex flex_align_center flex_pack_center" v-if="isduobao&&outTime">
           <span>{{hasJoin ? '已参加' : '已结束'}}</span>
         </div>
         <div class="dbBuy flex flex_align_center flex_pack_center gradient" @click="showLndiana(0)" v-if="isduobao&&!outTime">
           <span v-cloak>立即抽奖 ￥{{price}}</span>
         </div>
         <!-- 直接买 -->
          <div class="buyNow flex flex_align_center flex_pack_center" @click='buyNow' v-if="!isduobao">
            <span>直接买￥{{oldPrice|toFixed}}{{fxshopid?'/赚'+proearn.toFixed(2) : ''}}</span>
            <!-- <span>直接买￥999.00/赚￥120.00</span> -->
          </div>
          <!-- 拼团购 -->
          <div class="ptBuy flex flex_align_center flex_pack_center gradient" @click='groupbuy()' v-if="!isduobao">
            <!-- <span>直接买￥999.00/赚￥120.00</span> -->
            <span>拼团购 ￥{{price|toFixed}}{{fxshopid?'/赚'+gbearn.toFixed(2) : ''}}</span>
          </div>
       </div>
       <!-- 数量弹窗 -->
       <div class="count flex flex_v flex_align_center flex_pack_justify_between transition_ease_in_out"  id="count" :style="{bottom: showNum ? '0px' : '-100%'}">
          <div class="numBox flex flex_align_center flex_pack_justify_between">
            <div tapmode class="icon flex flex_align_center flex_pack_center iconfont icon-offline" :class="lndianaNum > 1 ? '' : 'color_9b'" @touchstart="lndianaCount(0)"></div>
            <span v-if="!msg.patern || msg.remainingamout==1">{{lndianaNum}}</span>
            <input v-else type="tel" :value="lndianaNum" ref="input" @input="inputHandle">
            <div tapmode class="icon flex flex_align_center flex_pack_center  iconfont icon-addition"
            :class="lndianaNum == msg.remainingamout ? 'color_9b' : lndianaNum == msg.max ? 'color_9b' : ''" @touchstart="lndianaCount('add')"></div>
          </div>
          <div class="btn gradient flex flex_align_center flex_pack_center" @click="confirmLogin">确定数量</div>
        </div>
       <!-- 遮罩 -->
       <div class="mark" v-show="showMark" @click="showLndiana(1)"></div>
       <!-- 保障弹窗 -->
        <div class="popup-content transition_ease_in_out" v-if="showEnsure" :style="{bottom: showEnsure? '0px':'-100%'}">
          <!-- <div class="popup-title text_center " style="color:;">服务承诺</div> -->
            <div class="popup-item" v-if="msg.commitmentlist" v-for="(item, index) in msg.commitmentlist" :key="index">
              <div class="flex flex_align_center">
                <img :src="item.logoimg">
                <span v-cloak>{{item.name}}</span>
              </div>
              <div class="popup-text" v-cloak>{{item.content}}</div>
            </div>
        </div>
        <!-- 拼团弹窗 -->
        <div class="ptPop flex flex_v flex_align_center flex_pack_justify_between clear" v-if="showPt" :style="{top: showPt ? '50%' : '-999%'}">
          <span v-cloak>还差{{ptDetailData.count}}人，快来拼团吧</span>
          <div class="avatar flex" id="avatar" :class="{tomore: ptAvatar}">
            <div class="box">
              <img v-lazy="ptData.imgphoto">
              <div class="gradient name">团长</div>
            </div>
            <div class="box boxx" v-for="(item, index) in resobj" v-if="resobj.length > 0" :key="index">
              <img :src="item.userimg || './image/man.jpg'">
            </div>
            <div class="box boxx" v-for="(item, index) in ptCount" v-if="ptCount" :key="index">
              <img src="../../img/hui.png" style="border: 1px solid #d8d8d8;">
            </div>
          </div>
          <div class="btn gradient flex flex_align_center flex_pack_center" @click="goGroupDetail(ptDetailData.orderid, ptData.isingroup)" v-cloak>
            {{ptData.isingroup ? '已参团' : '与他拼团'}}
          </div>
        </div>
        <specpop @changeData="changMsg" :pid="msg.productid" :orderid="orderid" :gbskuid_prop="groupBuyList.gbskuid" :gbPrice="groupBuyList.gbprice" :gbid="gbid" :openGroupbuy="openGroupbuy" v-show="showSpec"></specpop>
        <coupon v-show="showCou" @closeCou="showLndiana(1)" :bindData="showCou" :pid="msg.productid" :gbid="gbid"></coupon>
        <statuserr :scode="statusCode" @reload="errReload"></statuserr>
    </div>
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
    data() {
      return {
        imgUrl: [
          '../../img/bkg_cover.jpg'
        ],
        current: 0,
        gbnum: 0,                // x人团
        price: 0.00,             // 现价
        oldPrice: 0.00,          // 原价
        proearn: 0,            // 直接买赚多少
        gbearn: 0,            // 拼团赚多少
        msg: {},                 // 商品数据
        groupBuyList: {},        // 商品拼团信息
        timer: [],               // 拼团计时器
        countDownTime: [],       // 拼团倒计时
        productDetail: '',       // 商品详情图片
        showNum: false,          // 显示夺宝数量选择
        showMark: false,         // 显示遮罩
        showEnsure: false,       // 显示保障信息
        showPt: false,           // 显示拼团弹窗
        ptData: {},              // 拼团数据
        ptDetailData: {},        // 拼团详细信息
        resobj: '',              // 拼团成员头像数组
        ptCount: null,           // 为参团填充数组
        shareNum: 1,             // 需要分享的次数
        lndianaNum: 1,           // 夺宝购买数量
        isduobao: false,         // 是否分享抽奖
        hasJoin: false,          // 分享抽奖并且已参加了活动
        isDone: false,           // 是否加载完毕
        uid: '',                 // 用户uid
        fxshopid: '',            // 用户fxid
        openGroupbuy: 0,     // 是否显示拼团规格数据
        hasGet: '',              // 已领取优惠券
        unGet: '',               // 未领取优惠券
        spec: '',                 // 规格数据
        showSpec: false,
        showCou: false,
        gbid: '',
        orderid: '',
        statusCode: '1',
        gbsearch: '',            // 拼团搜索    
        gblist: '',
        currentPage: 1,
        gbHasMore: true
      }
    },
    created() {
      var that = this

      if (pageParam('cloudid')) {
        this.isduobao = true
      }
      this.gbid = pageParam('gbid') ? pageParam('gbid') : ''

      if (window.api) {
        api.addEventListener({
          name: api.winName + 'onshare'
        }, function(ret, err){
          that.onshare()
        });
        if (!this.isduobao) {
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
              that.gbsearch = ''
              that.clearTimer()
              that.getProductMsg()
              refreshDone()
            },1000)
          })
        }
      }
      this.uid = getname()
      this.fxshopid = getname('SessionShopID')
    },
    mounted() {
      var that = this
      // 分享抽奖
      if (that.isduobao) {
        that.getlndianaProMsg()
        that.isJoin()
      }
      // 劲爆拼团
      if (!that.isduobao) {
        that.getProductMsg()
      }
      if (window.api) {
        api.setFrameAttr({
          bgColor: '#f6f6fa'
        })
      }
      document.getElementById('footer').style.paddingBottom = getname('safeAreaBottom') + 'px'
      document.getElementById('count').style.paddingBottom = getname('safeAreaBottom') + 'px'
      let gs = document.getElementById('gs')
      document.getElementById('main').style.paddingBottom = getname('safeAreaBottom') + 'px'

      window.onshow = function () {
        that.uid = getname()
        if (!that.isduobao) {
          that.getGroupBuyList(1)
        }
      }
      // if (window.api) {
      //   api.addEventListener({
      //     name: 'loginSuccess'
      //   }, function(ret, err){
      //     that.uid = getname()
      //   });
      // }
    },
    computed: {
      // 抽奖商品状态 state  1 正常  2 禁用  3 已过期  4 已完成  5 未开始
      outTime: function () {
        if (!this.isduobao) return false
        var bool = false
        if (this.msg.state == 3 || this.msg.state == 4) {
          bool = true
        }
        if (this.hasJoin) {
          bool = true
        }
        return bool
      },
      // 拼团弹窗头像是否过多
      ptAvatar() {
        return this.resobj.length + this.ptCount.length > 3 ? true : false
      },
      // 是否显示优惠券入口
      showCoupon() {
        if (!this.uid) return '0'
        if (this.uid && (this.hasGet || this.unGet)) {
          return '1'
        } else {
          return '2'
        }
      }
    },
    filters: {
      toFixed: function(value) {
        value = Number(value)
        return value.toFixed(2)
      }
    },
    methods: {
      changMsg(value) {
        var sku = this.spec.sku
        var gbsku = this.spec.gbsku
        sku.forEach((item, i) => {
          if (item.skuid == value.skuid) {
            this.price = gbsku[i].gbskuPrice
            this.oldPrice = item.saleprice
            this.proearn = this.msg.skuobj[i].savemoney
            this.gbearn = gbsku[i].gbearn
          }
          
        })
      },
      onChange(index) {
        this.current = index
      },
      // 获取商品详情
      getlndianaProMsg() {
        showLoading()
         https({
           url: siteUrl + 'Marketing/Cloudbuy/GetOneCloudShoppingSet',
           method: 'get',
           data: {
             cloudid: pageParam('cloudid'),
             userid: getname()
           },
           successBack: this.lndianaSuccessBack,
           errorBack: err => {
              hideLoading()
              this.statusCode = err.statusCode
              this.isDone = true
              promptMsg(err.msg)
           }
         })
     },
     // 夺宝商品信息成功回调函数
     lndianaSuccessBack(ret) {
       hideLoading()
      //  console.log(JSON.stringify(ret))
      var that=this
        if (ret.success && ret.status == 1) {
          const data = ret.Data[0]
          let imgUrls = []
          if (data.imglist.length > 0) {
           data.imglist.forEach(item => imgUrls.push(item.imgvalue))
          } else {
           imgUrls.push(data.proimg)
          }
          this.productDetail = data.details
          document.getElementById('pd').innerHTML = data.details
         //图片放大
          if(data.details){
          var listimg=$api.domAll($api.byId('pd'), 'img')
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
          console.log(!this.productDetail)
          this.msg = data
          // console.log(JSON.stringify(this.msg))
          this.price =  data.cloudPrice
          this.oldPrice =  data.proprice
          this.imgUrl = imgUrls.length ? imgUrls : this.imgUrl
        } else {
         promptMsg(ret.err)
       }
       this.isDone = true
       this.statusCode = '1'
     },
    //  请求判断是否已参加活动
     isJoin() {
       if (getname() && getname('loginStatus') == "loginSuccess") {
         https({
           url: siteUrl + 'Marketing/Cloudbuy/IsPayCloud?uid=' + getname(),
           method: 'post',
           data: {
             uid: getname(),
             cloudid: pageParam('cloudid'),
             buycount: 0
           },
           headers: 1,
           successBack: ret => {
            //  console.log(JSON.stringify(ret))
            if (ret.success && ret.status == 20) {
              this.hasJoin = true
            }
           }
         })
       }
     },
     //  确定数量窗口
     showLndiana (num) {
       if (num == 1) {
         this.showNum = false
         this.showMark = false
         this.showEnsure = false
         this.showSpec = false
         this.showCou = false
         this.showPt = false
         this.orderid = ''
         this.ptDetailData = {}
         this.resobj = []
         this.lndianaNum = this.lndianaNum == '' ? 1 : this.lndianaNum == 0 ? 1 : this.lndianaNum
         return
       }
       this.showNum = !this.showNum
       this.showMark = !this.showMark
     },
    //  数量输入事件
     inputHandle(e) {
       var val = e.target.value
       var exp = /^[1-9]\d*|0$/
       if (exp.exec(val) != null) {
         if (val > this.msg.max) {
           promptMsg('购买数量不能大于' + this.msg.max)
           this.lndianaNum = this.msg.max
           return
         }
         if (val > this.msg.remainingamout) {
           promptMsg('购买数量不能大于' + this.msg.remainingamout)
           this.lndianaNum = this.msg.remainingamout
           return
         }
         this.lndianaNum = val
       }
     },
    //  点击加减按钮
     lndianaCount(str) {
       if (!this.msg.patern) return
       if (str == 'add') {
         this.lndianaNum = parseInt(this.lndianaNum) + 1
         this.lndianaNum = this.lndianaNum > this.msg.remainingamout ? this.msg.remainingamout : this.lndianaNum
         this.lndianaNum = this.lndianaNum > this.msg.max ? this.msg.max : this.lndianaNum
       } else {
         this.lndianaNum  = parseInt(this.lndianaNum) - 1
         this.lndianaNum = this.lndianaNum < 1 ? 1 : this.lndianaNum
       }
       console.log(this.lndianaNum)
       console.log(this.msg.max)
       console.log(this.msg.remainingamout)
     },
      //  确定数量
      confirmLogin() {
        this.showNum = false
        this.showMark = false
        // patern为false表示一次只能购买一件
        if (!checkLoginStatus()) return
        if (this.lndianaNum <= 0) return promptMsg('购买数量不能小于1')
        if (!this.msg.patern) {
          if (this.lndianaNum > 1) {
            return promptMsg('购买数量不能大于1')
          }
        }
        // console.log(this.lndianaNum)
        https({
          url: siteUrl +'Marketing/Cloudbuy/IsPayCloud?uid='+getname(),
          method: 'post',
          data: {
            uid: getname(),
            cloudid: pageParam('cloudid'),
            buycount: this.lndianaNum
          },
          headers: 1,
          successBack: (ret) => {
            // console.log(JSON.stringify(ret))
             this.showNum = false
            if (ret.success && ret.status == 1) {
              if (this.lndianaNum > ret.Data.max) return promptMsg('购买数量不能大于' + ret.Data.max)
              if (this.lndianaNum > ret.Data.remainingamout) return promptMsg('购买数量不能大于' + ret.Data.remainingamout)
              this.toShare()
            } else {
              promptMsg(ret.err)
            }
          }
        })
      },
      //  分享
      toShare() {
        // 暂时改为先付款后分享
        var that = this
        openWin({
            name: 'lndianaPay',
            url: './lndianaPay.html',
            pageParam: {
                cid: pageParam('cloudid'),
                num: that.lndianaNum,
                pName: that.msg.proname
            }
        })
        // 以下是先分享后付款 (暂时保留)

        // 不需要分享或剩余分享次数为0 直接跳转支付
        // if (!this.msg.isshare || this.shareNum <= 0) {
        //   var that = this
        //   //lndianaRouter.push('/lndianaPay/'+counts+'/'+that.$route.params.cid)
        //   api.openWin({
        //       name: 'lndianaPay',
        //       url: './lndianaPay.html',
        //       pageParam: {
        //           cid: api.pageParam.cloudid,
        //           num: that.lndianaNum,
        //           pName: that.msg.proname
        //       }
        //   })
        // }
        // // 需要分享
        // if (this.msg.isshare && this.shareNum > 0) {
        //   tollhead({
        //     name: 'lndianaShare',
        //     // useWKWebView: true,
        //     pageParam: {
        //       title: '分享抽奖',
        //       url: '/html/lndiana/new_lndianaShare.html',
        //       cloudid: this.msg.cloudid,
        //       buycount: this.lndianaNum,
        //       bgColor: '#fff',
        //       hScrollBarEnabled: false,
        //       vScrollBarEnabled: false
        //     }
        //   })
        // }
      },

      //  =========================  以下是拼团函数 =========================

      // 获取拼团商品信息
      getProductMsg () {
        https({
          url: siteUrl + 'Main/Main/GetProductDetailJson',
          data: {
            productId: pageParam('pid'),
            gbid: pageParam('gbid'),
            fxshopid: getname('SessionShopID'),
            userid: getname()
          },
          // header: 1,
          successBack: this.msgSuccessBack,
          errorBack: err => {
            hideLoading()
            that.statusCode = err.statusCode
            that.isDone = true
            promptMsg(err.msg)
          }
        })
      },
      // 拼团商品信息成功回调函数
      msgSuccessBack (ret) {
        console.log(ret)
        var that=this
        if (ret.success && ret.status ==1) {
          const data = ret.Data
          this.msg = data
          this.oldPrice = data.saleprice
          this.proearn = data.commPrice
          console.log(data.commPrice)
          console.log(data)
          this.productDetail = data.description
          document.getElementById('pd').innerHTML = data.description
          //图片放大
          if(data.description){
          var listimg=$api.domAll($api.byId('pd'), 'img')
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
          var imgArr = JSON.parse(data.album).piclist || [data.pic]
          this.imgUrl = imgArr
          this.getGroupBuyList() // 获取商品拼团信息+倒计时
        } else {
          promptMsg(ret.err)
        }
        this.isDone = true
        this.statusCode = '1'
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
      // 保障信息弹窗
      openEnsure() {
        this.showMark = true
        this.showEnsure = true
      },
      // 清空计时器
      clearTimer() {
        var that = this
        if (that.timer && that.timer.length > 0) {
          for (let i=0;i<that.timer.length;i++) {
            clearInterval(that.timer[i])
            that.timer[i] = null
            that.countDownTime[i] = ''
          }
        }
      },
      goSearch() {
        this.currentPage = 1
        this.gbHasMore = this.gbsearch == '' ? true : false

        var that = this
        https({
          url: siteUrl + 'Main/Main/GetGroupBuyProJson',
          data: {
            gbid: pageParam('gbid'),
            uid: getname() || '',
            ogid: '',
            fxshopid: getname('SessionShopID'),
            gbsearch: that.gbsearch,

          },
          successBack: ret => {
            if (ret.success && ret.status == 1) {
              this.clearTimer()
              this.gblist = ret.Data.gblist
              for (let i = 0; i < ret.Data.gblist.length; i++) {
                let time = ret.Data.gblist[i].ts - ret.Data.gblist[i].tpgap
                if (time < 0) continue
                ret.Data.gblist[i].countDownTime = null
                that.countLastTimes(time, i)
              }
            }
          }
        })
      },
      // 获取商品拼团信息
      getGroupBuyList (viewappear) {
        var that = this
        https({
          url: siteUrl + 'Main/Main/GetGroupBuyProJson',
          data: {
            gbid: pageParam('gbid'),
            uid: getname() || '',
            ogid: '',
            fxshopid: getname('SessionShopID'),
            gbsearch: '',
            pageindex: this.currentPage
          },
          successBack: (ret) => {
            // return console.log(JSON.stringify(ret))
            if (ret.success && ret.status == 1) {
              if (this.currentPage != 1 && ret.Data.gblist.length == 0 ) {
                this.gbHasMore = false
                promptMsg('已加载全部~')
              }
              if (this.currentPage == 1) {
                this.gblist = ret.Data.gblist
              } else {
                var gbl = this.gblist
                gbl.filter(function (s) {
                  return s && s != null
                })
                this.gblist = [...gbl, ...ret.Data.gblist]
              }
              this.gbearn = ret.Data.gbearn
              // viewappear即回到页面, 不用重新跑这里面的代码
              if (!viewappear) {
                this.price = ret.Data.gbprice.toFixed(2)
                this.gbnum = ret.Data.gbnum
                // console.log(JSON.stringify(this.groupBuyList.gblist))
                this.getCouMsg()  // 读取优惠券
                // 读取规格
                // console.log(this.msg.openspec)
                if (this.msg && this.msg.openspec) {
                  this.getSpec()
                }
              }
              // 清空计时器
              if (viewappear) {
                if (that.timer && that.timer.length > 0) {
                  for(let i=0;i<that.timer.length;i++) {
                    clearInterval(that.timer[i])
                    that.$set(that.countDownTime, i, '')
                  }
                }
              }
              this.groupBuyList = ret.Data
              for (let i = 0; i < this.gblist.length; i++) {
                let time = this.gblist[i].ts - this.gblist[i].tpgap
                if (time < 0) continue
                this.gblist[i].countDownTime = null
                that.countLastTimes(time, i)
              }
            } else {
              promptMsg(ret.err)
            }
          },
        })
      },
      // 点击加载更多
      bindMore() {
        if (this.gbHasMore) {
          this.currentPage += 1
          this.getGroupBuyList(1)
        }
      },
      // 读取规格 设置原价
      getSpec () {
        https({
          url: siteUrl + 'Main/Main/GetProductSkuJson',
          data: {
            productId: pageParam('pid'),
            gbid: pageParam('gbid'),
            fxshopid: getname('SessionShopID')
          },
          successBack: (ret) => {
            // console.log(this.groupBuyList.gbskuid)
            console.log(ret)
            if (ret) {
              if (ret.success && ret.status == 1) {
                let data = ret.Data
                // this.oldPrice = data.sku[0].saleprice
                this.price = data.gbsku[0].gbskuPrice
                this.oldPrice = data.sku[0].saleprice
                this.proearn = this.msg.skuobj[0].savemoney
                this.gbearn = data.gbsku[0].gbearn
                this.spec = data
              } else {
                promptMsg(ret.err)
              }
            } else {
              promptMsg(err.Msg)
            }
          }
        })
      },
      // 计算剩余时间
      countLastTimes (time, index) {
        let t = time
        let idx = index
        var that = this
        that.timer[index] = setInterval(() => {
          t -= 1
          if (t < 0) {
            this.gblist[idx] = null
            clearInterval(that.timer[idx])
          }
          let days = Math.floor(t / 60 / 60 / 24)
          let hours = Math.floor(t / 60 / 60 % 24)
          let minutes = Math.floor(t / 60 % 60)
          let seconds = Math.floor(t % 60)

          hours = hours < 10 ? '0' + hours : hours
          minutes = minutes < 10 ? '0' + minutes : minutes
          seconds = seconds < 10 ? '0' + seconds : seconds
          // 将计算得出的剩余时间塞入countDownTime数组 在wx-for中通过index获取对应的剩余时间
          let str = ''
          if (days) {
            str += days + '天'
          }
          if (hours) {
            str += hours + ':'
          }
          if (minutes) {
            str += minutes + ':'
          }
          str += seconds
          // that.countDownTime[idx] =  str
          // that.$forceUpdate()
          that.$set(that.countDownTime, idx, str)
        }, 1000)
      },
      // 打开参团详情
      openGroup(isingroup, index) {
        var that = this
        if (isingroup) {
          // 跳转拼团详情页
            // console.log(JSON.stringify(that.groupBuyList.gblist[index]))
            openWin({
              name:'groupbuyDetail',
                url:'./group_detail.html',
              useWKWebView:true,
              pageParam:{
                title:'拼团详情',
                orderid: that.gblist[index].orderidlist[0].orderid,
              }
            }, 1)
        } else {
          this.ptDetailData = {}
          this.ptData = this.gblist[index]
          https({
            url: siteUrl + 'Marketing/Groupbuy/GetMyGroupbuyDetails',
            data: {
              ogid: this.ptData.opengroupid,
              uid: getname()
            },
            successBack: (ret) => {
              // console.log(JSON.stringify(ret))
              if (ret.success && ret.status == 1) {
              let data = ret.Data[0]
              data.orderid = this.gblist[index].opengroupid
              this.ptDetailData = data
              if (data.resobj.length > 1) {
                var that = this
                this.resobj = []
                var res = data.resobj
                // console.log(JSON.stringify(res))
                for(let i = 1; i < res.length; i++) {
                  that.resobj.push(res[i])
                }
              }
              this.showMark = true
              this.showPt = true
              this.ptCount = []
              var that = this
              for (let i=0; i<data.count; i++) {
                that.ptCount.push(i)
              }
              } else {
                promptMsg(ret.err)
              }
            }
          })
        }
      },
      // 拼团弹窗点击
      goGroupDetail(orderid, isingroup) {
        let bool = false
        // 已有拼团 不能继续参团
        if (!isingroup) {
          let gblist = this.groupBuyList.gblist
          gblist.forEach((item) => {
            if (item.isingroup) {
              bool = true
            }
          })
        }
        if (bool) {
          return promptMsg('您有尚未结束的拼团活动')
        }

        if (checkLoginStatus()) {
          // 跳转购买
          this.groupbuy(this.ptDetailData.orderid)
        }
        this.showPt = false
        console.log(11)
      },
      // 直接买
      buyNow() {
        var that = this
        if (this.groupBuyList.gbproid = '') {
          return promptMsg("商品不存在")
        }
        this.openGroupbuy = 0
        this.showSpec = true
        this.showMark = true
       
      },
      // 发起拼团购
      groupbuy (ogid) {
        if (checkLoginStatus()) {
          if (this.groupBuyList.gbproid = '') {
            return promptMsg("商品不存在")
          }
          if (this.groupBuyList.gbid == '') {
            return promptMsg('团购已不存在')
          }
          var that = this
          // 有opengroupid表示参团
          var opengroupid = ''
          if (ogid && ogid != '') {
            opengroupid = ogid
          }
          this.openGroupbuy = 1
          this.showSpec = true
          this.showMark = true
          this.orderid = ogid
          // api.openFrame({
          //     name: 'spec_popup',
          //     url: '../tool/spec_popup.html',
          //     rect: {
          //         x: 0,
          //         y: 0,
          //         w: 'auto',
          //         h: 'auto'
          //     },
          //     pageParam: {
          //       hassku: this.spec ? 1 : 0,
          //       msg: that.msg,
          //       pid: that.msg.productid,
          //       gbid: this.groupBuyList.gbid,
          //       groupBuyList: this.groupBuyList,
          //       ogid: opengroupid,
          //       way: 'groupbuy'
          //     },
          //     // bounces: true,
          //     bgColor: 'rgba(0,0,0,0)',
          // });

          // 有规格数据就打开规格页
          // if (this.spec) {
          //   api.openFrame({
          //       name: 'spec_popup',
          //       url: '../tool/spec_popup.html',
          //       rect: {
          //           x: 0,
          //           y: 0,
          //           w: 'auto',
          //           h: 'auto'
          //       },
          //       pageParam: {
          //         msg: that.msg,
          //         pid: that.msg.productid,
          //         gbid: this.groupBuyList.gbid,
          //         ogid: opengroupid,
          //         way: 'groupbuy'
          //       },
          //       // bounces: true,
          //       bgColor: 'rgba(0,0,0,0)',
          //   });
          //   return
          // }
          // // 没有规格就直接拼团购
          // https({
          //   url: siteUrl +'Main/Shopping/CheckGroupBuyStatus',
          //   method: 'get',
          //   data: {
          //     uid: api.getPrefs({sync: true,key: 'SessionUserID'}),
          //     gbid: this.groupBuyList.gbid
          //   },
          //   headers: 1,
          //   successBack: (ret) => {
          //     // console.log(JSON.stringify(ret))
          //     if (ret.status == 1 && ret.success) {
          //       api.openWin({
          //         name: 'ordercomfirm',
          //         url: '../shopping/ordercomfirm.html',
          //         pageParam: {
          //             way : 'groupbuynow',
          //             qty : 1,
          //             skutext: this.groupBuyList.gbskutext,
          //             skuid: this.groupBuyList.gbskuid,
          //             gbprice: this.groupBuyList.gbprice,
          //             pid : this.msg.productid,
          //             gbid: this.groupBuyList.gbid,
          //             opengroupid : opengroupid
          //         }
          //       })
          //     } else {
          //       promptMsg(ret.err)
          //     }
          //   }
          // })
        }
      },
      // 图片加载错误时 显示默认头像
      imgErr(index) {
        this.gblist[index].imgphoto = '../../img/man.jpg'
      },
      // 分享
      onshare() {
        var that = this
        if (this.isduobao) {
          api.openFrame({
              name: 'marketing_shaerdiv',
              url: './marketing_shaerdiv.html',
              rect: {
                  x: 0,
                  y: 0,
                  w: 'auto',
                  h: 'auto'
              },
              pageParam: {
                  data: that.msg,
                  // userData: that.userData,
                  way: 'lndiana',
                  cloudid: pageParam('cloudid'),
                  buycount: pageParam('buycount'),
                  detail: 1
              },
              bounces: false,
              bgColor: 'rgba(0,0,0,0)'
          })
        } else {
          this.msg.gbprice = this.spec ? this.price : this.groupBuyList.gbprice
          this.msg.productprice = this.spec ? this.oldPrice : this.groupBuyList.proprice
          console.log(1111)
          api.openFrame({
              name: 'marketing_shaerdiv',
              url: './marketing_shaerdiv.html',
              rect: {
                  x: 0,
                  y: 0,
                  w: 'auto',
                  h: 'auto'
              },
              pageParam: {
                  data: that.msg,
                  gbid: pageParam('gbid'),
                  detail: 1
              },
              bounces: false,
              bgColor: 'rgba(0,0,0,0)'
          });
        }
      },
      onfocus(onblur) {
        if (onblur == 1) {
          $api.byId('footer').style.opacity = '1'
        } else {
          $api.byId('footer').style.opacity = '0'
        }
      },
      /*================== 优惠券函数 ===================*/
      // 打开优惠券列表
      openCoupon() {
        console.log(this.groupBuyList.gbid)
        var that = this
        if(checkLoginStatus()) {
         that.showCou = true
        }
      },
      // 获取拼团优惠券
      getCouMsg() {
        https({
        url: siteUrl + 'Marketing/Coupon/GetCouponListJson',
        data: {
          uid: getname(),
          ispaltform: 3,
          gbid: pageParam('gbid'),
          comid: this.msg.companyid,
          // gbid: '181114111402677383'
          isgb:'true'
        },
        successBack: ret => {
          console.log(ret)
          if (ret.success && ret.status == 1) {
            let arr = []
            let data = ret.Data
            if (data.length) {
              var hasGet = []
              var unGet = []
              data.forEach(item => {
                // isover 表示总数领取完了 或领取次数剩余0了 就加入已领取列表
                if (!item.isover && (item.eachamount - item.getnum) > 0) {
                  unGet.push(item)
                } else {
                  hasGet.push(item)
                }
              })
              if (!hasGet.length) hasGet = ''
              if (!unGet.length) unGet = ''
              this.hasGet = hasGet
              this.unGet = unGet
              this.$forceUpdate()
            }
          }
        }
      })
    },
      //查看资历图片
      gogongshang(){
        var that=this
        openWin({
          name:'commerce',
            url:'./commerce.html',
          pageParam:{
            img:that.msg.blurl,
            title:'工商资历'
          }
        }, 1)
      },
      errReload() {
        var that = this
        // 分享抽奖
        if (that.isduobao) {
          that.getlndianaProMsg()
          that.isJoin()
        }
        // 劲爆拼团
        if (!that.isduobao) {
          that.getProductMsg()
        }
      }
    } 
  }
</script>
<style lang="scss">
  @import "new_lndianaDetail.scss";
</style>