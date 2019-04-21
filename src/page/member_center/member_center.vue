<template>
  <section id="sect">
    <div id="headtap" class="headtap"></div>
    <header class="head" id="header">
      <div class="connt" style="display:flex;justify-content: space-between;">
        <div style="display:flex;">
          <img v-lazy="user.headphoto" alt="" v-if="user.headphoto">
          <img src="../../img/man.jpg" alt="" v-else>
          <div class="memmsg">
            <div class="namee">
              <p>{{user ? user.userrealname ? user.userrealname : user.telephone : '请登录'}}</p>
              <p class="iconfont icon-wujiaoxing-shi" id="isintern_text">{{user ? user.shoptitlename : '普通用户'}}</p>
            </div>
            <p class="yaoq">{{user ? '邀请码：'+user.invatationcode : '请填写邀请码'}}</p>
            <p class="dianpu" v-show="user ? (user.shoplevelname != '' || user.shoptitlename != '') ? true : false :false">{{user ? user.shoplevelname : ''}} | {{user ? user.shoptitlename : ''}}</p>
          </div>
        </div>
        <div class="qured" @click="tgg" style="display:none">
          <img src="../../img/icon_qrcode.png" alt="">
          <p class="icon-gengduo iconfont"></p>
        </div>
      </div>
      <div class="headItembox">
        <div class="headItem" @click="openyshop">
          我的攸店
        </div>
        <div class="headItem" @click="tg">
          邀请店主
        </div>
        <div class="headItem" @click="openwailian(5)">
          开店礼包
        </div>
      </div> 
    </header>

    <div class="shouyi">
      <div class="cont">
        <div>
          <p>￥{{member ? member.todaycommision ? member.todaycommision : '0.00' : '0.00'}}</p>
          <p>今日收益</p>
        </div>
        <div>
          <p>￥{{member ? member.sooncommision ? member.sooncommision : '0.00' : '0.00'}}</p>
          <p>即将到账</p>
        </div>
        <div>
          <p>￥{{member ? member.totalCommision ? member.totalCommision : '0.00' : '0.00'}}</p>
          <p>累计收益</p>
        </div>
      </div>
    </div>

    <div class="iconBox">
      <div class="iconBoxItem">
        <div class="iconc" @click="as('payment')">
          <img src="../../img/xsdd.png" alt="">
          <p>销售订单</p>
        </div>
        <div class="iconc" @click="openAccumulative">
          <img src="../../img/wdsy.png" alt="">
          <p>我的收益</p>
        </div>
        <div class="iconc" @click="OpenPackageWin">
          <img src="../../img/gyzq.png" alt="">
          <p>高佣专区</p>
        </div>
        <div class="iconc" @click="openTixian">
          <img src="../../img/wytx.png" alt="">
          <p>我要提现</p>
        </div>
      </div>
       <div class="iconBoxItem">
        <div class="iconc" @click="openwailian(2)">
          <img src="../../img/khgl.png" alt="">
          <p>团队管理</p>
        </div>
        <div class="iconc" @click="openvistor">
          <img src="../../img/fkgl.png" alt="">
          <p>访客管理</p>
        </div>
        <div class="iconc" @click="openTutor">
          <img src="../../img/cyds.png" alt="">
          <p>创业导师</p>
        </div>
        <div class="iconc">
          
        </div>
      </div>
    </div>

    <div class="xstc">
      <div class="xstc_tit" @click="showxstc">
        <p >销售管理奖</p><p @click.stop="lookMore">查看更多<span class="iconfont icon-gengduo"></span></p>
      </div>
      <div class="xstc_content" v-show="showTc">
        <div>
          <p>￥{{commision[3] ? commision[3] : 0.00}}</p>
          <p>本店销售管理奖</p>
        </div>

         <div>
          <p>￥{{commision[2] ? commision[2] : 0.00}}</p>
          <p>团队销售管理奖</p>
        </div>
      </div>
    </div>

    <!-- <div class="yjjl">
      <div class="tit" @click="showyjjl">
        <p class="p11" >业绩奖励</p>
        <p @click.stop="openwailian(8)">查看制度<span class="iconfont icon-gengduo"></span></p>
      </div>
      <div class="yjjl_content" v-show="showYj">
        <div class="row">
          <div>
            <p>￥{{commision[5] ? commision[5] : 0.00}}</p>
            <p>每天销售精英奖</p>
          </div>
          <div>
            <p>￥{{commision[13] ? commision[13] : 0.00}}</p>
            <p>每天明星购物奖</p>
          </div>
        </div>
        <div class="row">
          <div>
            <p>￥{{commision[7] ? commision[7] : 0.00}}</p>
            <p>每周市场推广奖</p>
          </div>
          <div>
            <p>￥{{commision[10] ? commision[10] : 0.00}}</p>
            <p>每月优秀管理奖</p>
          </div>
        </div>
        <div class="row">
          <div>
            <p>￥{{commision[8] ? commision[8] : 0.00}}</p>
            <p>每月卓越贡献奖</p>
          </div>
          <div class="lookmore" @click="lookMore">
            <img src="../../img/feed_7.png" alt="">
            <p>查看更多</p>
          </div>
        </div>
      </div>
    </div> -->

    <div class="shangxuey">
      <div class="shangxuey_tit">
        <p class="pp1">攸妍商学院</p>
        <p @click="openSchool">查看更多<span class="iconfont icon-gengduo"></span></p>
      </div>
      <div class="cccont">
        <div class="iteme" v-for="(item, index) in business" :key="index" @click="openBusiness_school(item.columnid)">
          {{item.name}}
        </div>
        <!-- <div class="iteme">
          产品知识
        </div> -->
      </div>
    </div>
  <statuserr :scode="statusCode" @reload="errReload"></statuserr>
  </section>
</template>

<script>
  import statuserr from '../../components/statuserr/statuserr.vue'

  export default {
    data() {
      return {
        user: '',             // 用户数据
        business: '',         // 
        commision: {},        // 分销奖之类的
        count: '',            // 收益
        showTc: true,
        showYj: false,
        member: '',
        showlever:false,
        statusCode: '1',
      }
    },
    components:{
      statuserr
    },
    computed:{},
    watch:{},
    filters:{},
    created() {
        
    },
    mounted() {
      var that = this
      if (window.api) {
        if(getname('loginStatus') == "loginSuccess" && getname('SessionShopID') != null && getname('SessionShopID') != "" ){
          this.bindData()
        }else{
          this.reset() //初始化数据
        }
        //监听是否登录成功
        api.addEventListener({
            name: 'loginSuccess'
        }, function(ret, err){
          that.bindData()
        })
        //监听是否退出登录
        api.addEventListener({
            name : 'loginout'
        }, function(ret) {
            that.reset()
        })
        //监听实习店主成功购买开店礼包
        api.addEventListener({
          name : 'jiedongsuccess'
        }, function(ret) {
          that.bindData()
        })

        //返回到这个页面刷新
        api.addEventListener({
          name:'viewappear'
        }, function(ret, err){
          if (api.getPrefs({sync: true,key: 'loginStatus'}) == "loginSuccess") {
            that.bindData()
          }
        })
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
      } else {
        this.bindData()
      }
      var statutap = getname('statustop')
      var ht = document.getElementById('headtap')
      $api.byId('header').style.paddingTop = statutap + 'px'
      ht.style.height = statutap + 'px'
      // $api.byId('header').style.height = $api.byId('header').offsetHeight + statutap + 'px'
      window.onscroll = function () {
        refreshDone()
        var t = document.documentElement.scrollTop||document.body.scrollTop;
        var op = t / $api.byId('header').offsetHeight
        op = op > 1 ? 1 : op
        $api.css(ht,"opacity:"+op)
      }
    },
    filters: {
      toFixed: function(value) {
        value = Number(value)
        return value.toFixed(2)
      }
    },
    methods: {
      errReload() {
        var that = this
        if(checkLoginStatus()){
          that.bindData()
        }else{
          refreshDone()
        }
      },
      bindData() {
        this.getUserData()
        this.getBusinessMsg()
        this.getCommision()
        this.getCountJson()
        
        // if(!this.showlever){
        //   this.showlever=true
        //   if(window.api){
        //     api.openFrame({
        //       name: 'shop_level_prompt',
        //       url: './shop_level_prompt.html',
        //       bounces: false,
        //       rect: {
        //         x: 0,
        //         y: 0,
        //         w: 'auto',
        //         h: 'auto'
        //       },
        //       bgColor:'rgba(0,0,0,0)'
        //     });
        //   }
        // }
      },
      reset() {
        this.user = ''
        this.business = ''
        this.commision = {}
        this.count = ''
        this.showTc = true
        this.showYj = false

        this.$forceUpdate()
      },
      getUserData() {
        if (checkLoginStatus()) {
          https({
            url: siteUrl +'Main/Member/GetUserShopJson',
            data: {
              uid: getname()
            },
            headers: 1,
            successBack: ret => {
              // console.log(ret)
              if (ret.success && ret.status == 1) {
                this.user = ret.Data
              }
              hideLoading()
              refreshDone()
            }
          })
        }
      },
      getBusinessMsg() {
        https({
          url: siteUrl +'Main/Main/GetTopThree',
          successBack: ret => {
            // console.log(ret)
            if (ret.success && ret.status == 1) {
              this.business = ret.Data
            } else if (ret.success && ret.status == 0) {

            } else {
              promptMsg(ret.err)
            }
          }
        })
      },
      getCommision() {
        https({
          url: siteUrl +'Main/Member/GetUserCommission',
          data: {
            uid: getname()
          },
          headers: 1,
          successBack: ret => {
            var that = this
            if (ret.success && ret.status == 1) {
              if (ret.Data && ret.Data.length > 0) {
                ret.Data.map(item => {
                  that.commision[item.commisiontype] = Number(item.commision).toFixed(2)
                })
                // console.log(that.commision)
              }
            } else {
              promptMsg(ret.err)
            }
          }
        })
      },
      // 会员信息
      getCountJson() {
        https({
          url: siteUrl +'Main/Member/GetMemberJson',
          data: {
            uid: getname(),
            yshopid: getname('SessionShopID')
          },
          headers:1,
          successBack: ret => {
            // console.log(ret)
            if (ret.success && ret.status == 1) {
              this.member = ret.Data
              this.$forceUpdate()
            } else {
              promptMsg(ret.err)
            }
            this.statusCode = '1'
          },
          errorBack: err => {
            this.statusCode = err.statusCode
            promptMsg(err.msg)
          }
        })
      },
      showxstc() {
        this.showTc = !this.showTc
      },
      showyjjl() {
        this.showYj = !this.showYj
      },
      lookMore() {
        if(checkLoginStatus()){
          openWin({
              name: 'accumulative_reward',
              url: './accumulative_reward.html',
              bgColor:'#fcfcfc',
          });
        }
      },
      tgg() {
        var fxshopid=api.getPrefs({sync: true,key: 'SessionShopID'});
        if(checkLoginStatus()){
          window.event? window.event.cancelBubble = true : e.stopPropagation();OpenWebPage(memberSiteUrl+'/Fx/GeneralizePic.aspx?shopid=170718164338876176&fxshopid='+fxshopid+'&userId='+api.getPrefs({sync: true,key: 'SessionUserID'})+'&act =tgshopapplet','邀请店主');
        }
      },
      openyshop(){
        if(checkLoginStatus()){
          openWin({
              name: 'yshop',
              url: './yshop.html',
              pageParam: {
                  yshopid:getname('SessionShopID'),
              },
              bgColor:'#fcfcfc'
          });
        }
      },
      tg() {
        var that = this
        var fxshopid=getname('SessionShopID')
        console.log(memberSiteUrl+'/Fx/new_inve.aspx?shopid=170718164338876176&fxshopid='+fxshopid+'&userId='+getname()+'&isapp=true')
        if(checkLoginStatus()){
          window.event? window.event.cancelBubble = true : e.stopPropagation();
          OpenWebPage(memberSiteUrl+'/Fx/new_inve.aspx?shopid=170718164338876176&fxshopid='+fxshopid+'&userId='+api.getPrefs({sync: true,key: 'SessionUserID'})+'&isapp=true','邀请店主');
        }
      },
      openwailian(index) {
        var that = this
        if(checkLoginStatus()){
          window.event? window.event.cancelBubble = true : e.stopPropagation();
          if(index==1){
          openWin({
              name: 'myfans',
              url: './myfans.html',
              pageParam: {
                title: '我的分享'
              }
          }, 1);
         }
        else if (index==2){
          openWin({
              name: 'myallies',
              url: './myallies.html',
              pageParam:{
                title: '团队管理'
              }
          }, 1);
        }
        else if (index==3){    
          openWin({
              name: 'myintegrate',
              url: './myintegrate.html',
              pageParam:{
                title: '我的积分'
              }
          }, 1);

        }
        else if (index==4){    
          window.event? window.event.cancelBubble = true : e.stopPropagation();
          OpenWebPage(memberSiteUrl+'Fx/LevelUpgrateHistory.aspx?shopid=170718164338876176&fxshopid='+that.user.yshopid,'升级记录');
        }
        else if (index==5){
          //如果实习店主可以直接买礼包
          if(document.getElementById("isintern_text").innerHTML=='实习店主'){
            this.gobuylibao()
          }else{
            openWin({
                name: 'open_yshopbuy',
                url: './open_yshopbuy.html',
                pageParam: {
                    shop: 1,
                    title: '开店礼包'
                }
            }, 1)
        }
        }
          else if (index==6){
          window.event? window.event.cancelBubble = true : e.stopPropagation();
          openWin({name: 'yshopset',url: './yshopset1.7.html',bounces: false,bgColor: '#fff'});
        }
          else if (index==7){
          window.event? window.event.cancelBubble = true : e.stopPropagation();
          OpenWebPage(memberSiteUrl+'CommissionDetail.shtml?shopid=170718164338876176&act=total&fxshopid='+that.user.yshopid,'奖励明细');
        }   
          else if (index==8){
          window.event? window.event.cancelBubble = true : e.stopPropagation();
          //OpenWebPage(memberSiteUrl+'Fx/SystemDesc.aspx?shopid=170718164338876176&fxshopid='+that.user.yshopid,'奖励制度');
          openWin({
              name: 'systemdesc',
              url: './systemdesc.html',
              pageParam:{
                title: '查看制度'
              }
          }, 1)

        }   
      }
      },
      gobuylibao() {
        openWin({
          name: 'open_yshopbuy',
          url: './open_yshopbuy.html',
          bounces: false,
          pageParam: {
              dongjie: 1,
              title: '开店礼包'
          },
          bgColor: '#fff'
        }, 1);
      },
      as(act) {
        var that = this
        if(checkLoginStatus()){
          openWin({
              name: 'fxordermanage',
              url: './fxordermanage.html',
              pageParam: {
                  yshopid: that.user.yshopid,
                  type: act,
                  title: '销售订单'
              }
          }, 1)
        }
      },
      openAccumulative() {
          if(checkLoginStatus()){
            openWin({
                name: 'accumulative_reward',
                url: './accumulative_reward.html',
                bgColor:'#fcfcfc'
            });
          }
      },
      openTixian() {
    checkuser(function(ret){
      https({
        url:siteUrl +'Main/MemberPay/CheckPayPwd',
        method:'get',
        data:{
          uid:getname(),
          devicetype:1
        },
        headers:1,
        successBack:function(ret){
            if(ret.success&&ret.status==1){
              if(ret.Data.issetpwd=='N'){
                OpenWebPage(ret.Data.url,'密码设置')
              }else if(ret.Data.issetpwd=='Y'){
                  openWin({
                    name: 'xltixian',
                    url: './xl_tixian.html',
                    pageParam:{
                      title:'我要提现',
                      data:{
                        name:'xltixian'
                      },
                      onshow:1
                    }
                  },1);  
              }
            }else{
              promptMsg(ret.err)
            }
        }
      })
    }) 
        // openWin({
        //   name: 'tixian',
        //   url: './tixian.html'
        // });
      },
      openvistor() {
        if(checkLoginStatus()){
          openWin({
              name: 'visitorsnumber',
              url: './visitorsnumber.html',
              bgColor:'#fcfcfc',
              pageParam:{
                title:'访客管理'
              }
          },1);
        }
      },
      openTutor() {
        openWin({
          name: 'opentutor',
          url: './opentutor.html',
          pageParam:{
            title:'创业导师'
          }
        },1);
      },
      OpenPackageWin() {
       openWin({
          name: 'packageselect',
          url: './packageselect.html',
          bgColor: '#fff',
          pageParam: {
            title: '高佣专区'
          }
        }, 1);
      },
      openBusiness_school(columnid) {
        openWin({
          name: 'business_school',
          url: './business_school.html',
          pageParam: {
            title: '攸妍商学院',
            columnid: columnid
          }
        }, 1)
      },
      openSchool() {
        openWin({
          name: 'business_school',
          url: './business_school.html',
          pageParam: {
            title: '攸妍商学院',
            columnid: ''
          }
        }, 1)
      }
    }
  }
</script>
<style lang="scss">
  @import "member_center.scss";
</style>