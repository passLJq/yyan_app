<template>
<!-- <div style="display: none;" :style="{display: isDone ? 'block' : 'none'}"> -->
<div>
<!-- 头部 -->
  <header class="header" id="header">
    <div class="headtap" id="headtap"></div>
    <div class="icon">
      <a href="javascript:;" @click.prevent="openShezhi"></a>
      <a href="javascript:;" :class="{hasMess: hasMsg}" @click.prevent="openMessage"></a>
    </div>
    <!-- 用户信息 -->
        <div class="msg">
          <div class="imgbox">
            <img v-if="userData.pic" :src="userData.pic" alt="" @click="OpenUserdata">
            <img v-else src="../../img/man.jpg" alt="" @click="OpenUserdata">
          </div>
          <div class="user">
            <p v-cloak @click="OpenUserdata" v-if="userData.name">{{userData.name}}</p>
            <p v-cloak @click="OpenUserdata" v-else>请点击登录</p>
            <p v-cloak @click="openyaoqing" v-if="!fxshopid">{{tuijian ? '推荐人 ' + tuijian : '填写推荐人'}}</p>
          </div>
        </div>
        <!-- 积分余额优惠券 -->
        <div class="jif">
          <div @click="openwailian(2)"><p v-cloak>{{userData.collectcount || 0}}</p><p>我的收藏</p></div>
          <div @click="openwailian(1)"><p v-cloak>{{userData.blance || 0}}</p><p>钱包余额</p></div>
          <div @click="opencoupon"><p v-cloak>{{userData.couponcount || 0}}</p><p>优惠券</p></div>
        </div>
  </header>
  <div class="item">
    <div class="title">
      <span>我的订单</span>
      <span @click="OpenOrder(0,false)">查看全部</span>
    </div>
    <div class="line"></div>
    <div class="content">
      <div class="blo" @click="OpenOrder(1,false)">
        <img src="../../img/mycenter/dfk.png" alt="">
        <p>待付款</p>
        <span class="num" v-cloak v-show="hasFukuan">{{hasFukuan ? hasFukuan : ''}}</span>
      </div>
      <div class="blo" @click="OpenOrder(2,false)">
        <img src="../../img/mycenter/dfh.png" alt="">
        <p>待发货</p>
        <span class="num" v-cloak v-show="hasFahuo">{{hasFahuo ? hasFahuo : ''}}</span>
      </div>
      <div class="blo" @click="OpenOrder(3,false)">
        <img src="../../img/mycenter/dsh.png" alt="">
        <p>待收货</p>
        <span class="num" v-cloak v-show="hasShouhuo">{{hasShouhuo ? hasShouhuo : ''}}</span>
      </div>
       <div class="blo" @click="ofoAssess(1)">
        <img src="../../img/mycenter/dpj.png" alt="">
        <p>待评价</p>
        <span class="num" v-cloak v-show="hasPingJia">{{hasPingJia ? hasPingJia : ''}}</span>
      </div>
       <div class="blo" @click="OpenOrderlist(0)">
        <img src="../../img/mycenter/sh.png" alt="">
        <p>售后</p>
      </div>
    </div>
  </div>
  <div class="item">
    <div class="title">
      <span>我的福利</span>
      <span> </span>
    </div>
    <div class="line"></div>
    <div class="content">
      <div class="blo" @click="openwailian(1)">
        <img src="../../img/mycenter/wdqb.png" alt="">
        <p>我的钱包</p>
      </div>
      <div class="blo" @click="openMyGroups">
        <img src="../../img/mycenter/wdpt.png" alt="">
        <p>我的拼团</p>
      </div>
      <div class="blo" @click="openMylndiana">
        <img src="../../img/mycenter/wdcj.png" alt="">
        <p>我的抽奖</p>
      </div>
    </div>
  </div>
  <div class="item">
    <div class="title">
      <span>我的服务</span>
      <span> </span>
    </div>
    <div class="line"></div>
    <div class="content">
      <div class="blo" @click="openwailian(2)">
        <img src="../../img/mycenter/wdsc.png" alt="">
        <p>我的收藏</p>
      </div>
      <div class="blo" @click="openwailian(3)">
        <img src="../../img/mycenter/shdz.png" alt="">
        <p>收货地址</p>
      </div>
      <div class="blo" @click="openyijian">
        <img src="../../img/mycenter/yjfk.png" alt="">
        <p>意见反馈</p>
      </div>
    </div>
    <div class="content">
      <div class="blo" @click="openwe">
        <img src="../../img/mycenter/gywm.png" alt="">
        <p>关于我们</p>
      </div>
      <div class="blo" @click="openphone">
        <img src="../../img/mycenter/gfkf.png" alt="">
        <p>官方客服</p>
      </div>
      <div class="blo" @click="OpenUser">
        <img src="../../img/mycenter/zhsz.png" alt="">
        <p>账号设置</p>
      </div>
    </div>
  </div>
  <div class="item" v-if="installwx" style="display:none">
    <div class="title">
      <span>小程序矩阵</span>
      <span> </span>
    </div>
    <div class="line"></div>
    <div class="content">
      <div class="blo" @click="openXcx(1)">
        <img src="../../img/mycenter/yy.png" alt="">
        <p>攸妍VIP</p>
      </div>
      <div class="blo" @click="openXcx(2)">
        <img src="../../img/mycenter/yypt.png" alt="">
        <p>攸妍拼团</p>
      </div>
      <div class="blo"></div>
    </div>
  </div>
  <statuserr :scode="statusCode" @reload="bindData"></statuserr>
</div>
</template>

<script>
import statuserr from '../../components/statuserr/statuserr.vue'
  export default {
    components:{
      statuserr
    },
    data() {
      return {
        userData: '',           // 会员信息数据
        tuijian: '',            // 推荐人
        hasMsg: false,          // 是否有消息 消息红点
        hasPingJia: false,      // 是否有待评价 数字角标
        hasFukuan: false,       // 是否有待付款 数字角标
        hasFahuo: false,        // 是否有待发货 数字角标
        hasShouhuo: false,      // 是否有待收货 数字角标
        isDone: false,           // 用户数据是否加载完毕
        statustop:getname('statustop'),
        installwx:true,
        fxshopid: getname('SessionShopID') || '',
        statusCode: '1'
      }
    },
    created() {
      var that = this
      if (openapp) {
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
                if(checkLoginStatus()){
                  that.bindData()
                }else{
                  refreshDone()
                }
              },1000)
          })
          //返回到这个页面刷新
          api.addEventListener({
            name:'viewappear'
          }, function(ret, err){
            console.log('返回到页面')
            if(api.getPrefs({sync: true,key: 'loginStatus'}) == "loginSuccess"){
              that.bindData()
              that.getTuijian()
            } else {
              that.reset()
              that.isDone = true
            }
          })
          // 监听是否登录成功
          api.addEventListener({
            name: 'loginSuccess'
          }, function(ret, err){
            if( ret ){
              that.bindData()
            }
          })
          // 检测是否已登录
          if (api.getPrefs({sync: true,key: 'loginStatus'}) == "loginSuccess") {
            console.log('已登录')
            that.bindData()
          } else {
            // 未登录操作
            console.log('没登录')
            that.reset()
            that.isDone = true
          }
          // 检测是否退出登录
          api.addEventListener({
              name : 'loginout'
          }, function(ret) {
              that.reset()
              that.isDone = true
          })

          window.onscroll = function () {
            refreshDone()
          }
        var wx = api.require('wx');
        wx.isInstalled(function(ret, err) {
            if (ret.installed) {
               that.installwx=true
            } else {
              that.installwx=false
            }
        });
      } else {
        that.bindData()
      }

    },
    mounted() {
      var statustop = getname('statustop')
      var ht = $api.byId('headtap')
      var hd = $api.byId('header')
      ht.style.height = statustop + 'px'
      hd.style.paddingTop = statustop + 'px'
      window.onscroll = function () {
        var t = document.documentElement.scrollTop||document.body.scrollTop;
        var op = t / hd.offsetHeight
        op = op > 1 ? 1 : op
        $api.css(ht,"opacity:"+op)
      }
      
    },
    methods: {
      // 获取信息数据
      bindData() {
        this.getMessageNum()  // 获取消息数据
        this.getUserData()    // 获取会员信息
        this.ofoAssess(0)     // 获取待评价数据
        this.getOrderMsg()    // 获取订单数据
        this.fxshopid = getname('SessionShopID')
      },
      // 重置数据
      reset() {
        this.hasMsg = false
        this.userData = {}
        this.hasPingJia = false
        this.hasFukuan = false
        this.hasFahuo = false
        this.hasShouhuo = false
        this.tuijian = ''
        this.isDone = false
        this.fxshopid = ''
      },
      // 消息红点
      getMessageNum() {
        https({
          url: siteUrl + 'Main/Member/GetMessageCount',
          data: {
            uid: window.api ? api.getPrefs({sync: true,key: 'SessionUserID'}) : $api.getStorage('SessionUserID')
          },
          headers: 1,
          successBack: (ret) => {
            // console.log(JSON.stringify(ret))
            // {"success":true,"Data":97,"status":1,"err":""}
            if (ret.success) {
              if (ret.Data > 0) {
                this.hasMsg = true
              } else {
                this.hasMsg = false
              }
            }
          }
        })
      },
      // 获取会员数据 383
      getUserData() {
        https({
          url: siteUrl +'Main/Member/GetMemberJson',
          data: {
            uid: window.api ? api.getPrefs({sync: true,key: 'SessionUserID'}) : $api.getStorage('SessionUserID')
          },
          headers: 1,
          successBack: (ret) => {
            console.log(1)
            console.log(ret)
            refreshDone()
            hideLoading()
            if (ret) {
              if (ret.success) {
                if (ret.status==1 && ret.Data!=null) {
                  let data = ret.Data
                  if (!data.name || data.name == '') {
                    data.name = '请设置名字'
                  }
                  
                  // 余额
                  if (data.blance != null) {
                    data.blance = data.blance.toFixed(2)
                  }
                  // 优惠券
                  if (!data.couponcount || data.couponcount == '') {
                    data.couponcount = 0
                  }
                  this.userData = data
                  this.isDone = true
                  // 查询推荐人
                  this.getTuijian()
                } else {
                  promptMsg("找不到会员")
                }
              } else {
                promptMsg(ret.err)
              }
            } else {
              promptMsg(err.msg);
              if(err.statusCode=='403' && window.api){
                api.removePrefs({ key:'SessionUserID'});
                api.removePrefs({ key:'SessionName'});
                api.removePrefs({ key:'SessionKey'});
                api.removePrefs({ key:'SessionShopID'});
                api.setPrefs({ key:'loginStatus',value:'loginFail'});  //过期清除信息
                api.openWin({
                  name: 'login',
                  url: api.wgtRootDir+'/html/login.html'
                })
              }
            }
            this.statusCode = '1'
          },
          errorBack: err => {
            hideLoading()
            this.statusCode = err.statusCode
            promptMsg(err.msg)
          }
        })
      },
      // 查询推荐人
      getTuijian() {
        https({
          url: siteUrl +'Main/Member/GetInvitationCode',
          data: {
            uid: window.api ? api.getPrefs({sync: true,key: 'SessionUserID'}) : $api.getStorage('SessionUserID')
          },
          headers: 1,
          successBack: (ret) => {
            // console.log(JSON.stringify(ret))
            if (!ret) return promptMsg(err.msg)
            if (!ret.success) return promptMsg(ret.err)
            if (ret.status != 1 || ret.reobj == null) return
            var data = ret.reobj
            this.tuijian = data.code
          }
        })
      },
      // 查询待评价
      ofoAssess(isClicked) {
        https({
          url: siteUrl+"Main/Shopping/GetNoCommentCount",
          data: {
            uid:window.api ? api.getPrefs({sync: true,key: 'SessionUserID'}) : $api.getStorage('SessionUserID')
          },
          headers: 1,
          successBack: (ret) => {
            // console.log(JSON.stringify(ret))
            // {"success":true,"Data":0,"status":0,"err":"","isopencomment":true}
            if (ret.isopencomment) {
              if (ret.success) {
                if (ret.Data && ret.Data > 0) {
                  this.hasPingJia = ret.Data
                } else {
                  this.hasPingJia = false
                }
              }
            } else {
              this.hasPingJia = false
            }
            // 1是固定传的参 表示来自点击待评价事件
            if (isClicked == 1) {
              if(!ret.isopencomment) {
                promptMsg("暂未开启评价")
                return
              } else {
                openWin({
                  name: 'to_be_evaluated',
                  url: './to_be_evaluated.html',
                  pageParam: {
                    title: '评价中心'
                  }
                },1)
              }
            }
          }
        })
      },
      // 查询订单详情 角标
      getOrderMsg() {
        var that = this
        https({
          url: siteUrl +'Main/Member/GetOrderCountJson',
          method: 'get',
          data:{
            uid: window.api ? api.getPrefs({sync: true,key: 'SessionUserID'}) : $api.getStorage('SessionUserID')
          },
          headers:1,
          successBack: (ret) => {
            console.log(ret)
            if (ret.success) {
              if (ret.status == 1 && ret.Data != null) {
  // 10-待付款 11-待处理 20-待发货 30-待收货 39-买家已签收(货到付款专用，未用) 40-已完成 50-已退货 60-已退款 70-已关闭
                let data = ret.Data
                this.hasFukuan = false
                this.hasFahuo = false
                this.hasShouhuo = false
                data.forEach(item => {
                  switch(item.state) {
                    case 10:
                      this.hasFukuan = item.count
                      break;
                    case 20:
                      this.hasFahuo = item.count
                      break;
                    case 30:
                      this.hasShouhuo = item.count
                      break;
                    default: break;
                  }
                  that.$forceUpdate()
                })
              } else {
                // 空
              }
            } else {
              promptMsg(ret.err)
            }
          }
        })
      },
      // 打开消息
      openMessage() {
        if(checkLoginStatus()){
          toMessagePage()
        }
      },
      // 打开设置
      openShezhi() {
        if(checkLoginStatus()){
          openWin({
              name: 'mydata',
              url: './mydata.html',
              bounces: false,
              bgColor: '#fff'
          });
        }
      },
      // 点击头像 个人资料
      OpenUserdata() {
        if(checkLoginStatus()){
          openWin({
              name: 'userdata',
              url: './userdata.html',
              bounces: false,
              bgColor: '#fff'
          });
        }
      },
      // 打开邀请人
      openyaoqing() {
      if (checkLoginStatus()) {
        openWin({
            name: 'invite_code',
            url: './invite_code.html',
            bgColor:'#fcfc'
        })
      }
      },
      // 打开订单详情
      OpenOrder(selectindex,isgroupby){
        if(checkLoginStatus()){
          openWin({
              name: 'orderwin',
              url: './order.html',
              pageParam:{selectindex:selectindex,isgroupby:isgroupby,title:'我的订单'}
          },1)
        }
      },
      // 打开优惠券
      opencoupon() {
        if(checkLoginStatus()){
          // api.openWin({
          //     name: 'coupon',
          //     url: './coupon/coupon_order_top.html',
          //     bgColor:'#fcfcfc'
          // })
          // 这是调到领券中心
          // openWin({
          //   name: 'coupon',
          //   url: './coupon_center.html',
          //   bgColor:'#f5f5f5',
          //   title: '领券中心'
          // }, 1)
          openWin({
            name: 'coupon',
            url: './my_coupon.html',
            bgColor:'#f5f5f5',
            pageParam: {
              title: '我的优惠券',
            }
          }, 1)
        }
      },
      // 售后
      OpenOrderlist(selectindex) {
        if(checkLoginStatus()){
          openWin({
              name: 'orderrefund',
              url: './orderrefundlist_top.html',
              pageParam:{
                selectindex:selectindex
                // biaoji: 'shouhou'
              }
          })
        }
      },
      // 点击钱包 或收藏
      openwailian(index) {
        if(checkLoginStatus()){
          switch (index) {
            case 1:
              openWin({
                  name: 'myincome',
                  url: './myincome.html'
              })
              break;
            case 2:
              openWin({
                  name: 'collect',
                  url: './collect.html',
                  bgColor: '#f5f5f5',
                  pageParam:{
                    title:'我的收藏'
                  }
              },1)
              break;
            case 3:
              openWin({
                name: 'addressList',
                url: './addressList.html',
                pageParam: {
                  isPayPage: 'ordercomfirm',
                  title: '收货地址'
                }
              },1)
              break;
            case 4:
              openWin({
                  name: 'myintegrate',
                  url: './myintegrate.html'
              })
              break;
            default:
          }
        }
      },
      // 我的拼团
      openMyGroups() {
        if(checkLoginStatus()){
          openWin({
            name:'myGroups',
            useWKWebView:true,
            url:'./mygroup_order.html',
            pageParam:{
              title:'我的拼团'
            }
          },1)
        }
      },
      // 我的抽奖
      openMylndiana() {
        if(checkLoginStatus()){
          openWin({
            name:'mylndiaya',
            url:'./new_my_lndiana.html',
            useWKWebView:true,
            pageParam:{
              title:'我的抽奖',
              bgColor: '#f6f6fa',
              vScrollBarEnabled: false,
              hScrollBarEnabled: false
            }
          }, 1)
        }
      },
      // 意见反馈
      openyijian() {
        openWin({
            name: 'feedback',
            url: './feedback.html'
        })
      },
      // 关于我们
      openwe() {
        openWin({
            name: 'aboutour',
            url: './aboutour.html',
            bgColor: '#f6f6fa'
        });
      },
      // 账号设置
      OpenUser() {
        if(checkLoginStatus()){
          // api.openWin({
          //     name: 'mydata',
          //     url: 'member/mydata.html',
          //     bounces: false,
          //     bgColor: '#fff'
          // })
          openWin({
            name: 'mydata',
            url: './mydata.html',
            bounces: false,
            bgColor: '#f5f5f5'
          })
        }
      },
      // 官方客服
      openphone() {
        // openWin({
        //   name: 'callphone',
        //   url: './callphone.html',
        //   bgColor:"#F7C3B3",
        //   pageParam:{
        //     title:'官方客服'
        //   }
        // },1)
        
        var qiyuSdk = api.require('qiyuSdk');
        var params = {
          source:{
            sourceTitle:'个人中心客服',
            sourceUrl:'http://www.qiyukf.com',
            sourceCustomInfo:'我是来自自定义的信息'
          },
          commodityInfo:{
            commodityInfoTitle:'APICloud网易七鱼商品',
            commodityInfoDesc:'这是来自七鱼APICloud的商品描述',
            pictureUrl:'http://qiyukf.com/res/img/companyLogo/blmn.png',
            commodityInfoUrl:'http://www.qiyukf.com',
            note:'￥1000',
            show:false
          },
          sessionTitle:'在线客服',
          groupId:0,
          staffId:0
        }
        qiyuSdk.openServiceWindow(params);
      },
      // 打开小程序
      openXcx(index) {
        var wx = api.require('wx')
        var userName = ''
        var path = ''
        switch (index) {
          case 1: // vip
            userName = 'gh_bbe69506855a'
            var fxshopid = api.getPrefs({sync: true,key: 'SessionShopID'});
            var scene = ''
            if(fxshopid!=''&&fxshopid!=null){
              scene = api.getPrefs({sync: true,key: 'SessionUserID'})
              path = 'pages/index/index?ruid=' + scene
            }else{
              // scene = '111111111111111111'
              //没开店的跳转开店页面
              path = 'pages/yshopapply/yshopapply'
            }
            // path = 'pages/index/index?ruid=' + scene
            break;
          case 2: // 拼团
            userName = 'gh_5d27fcedb427'
            break;
          default:
        }
        wx.launchMiniProgram({
            apiKey: '',
            miniProgramType: 'release',
            userName,
            path,
        }, function(ret, err) {
            if (ret.status) {

            } else {
                promptMsg('打开小程序失败')
            }
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "my_center.scss";
</style>