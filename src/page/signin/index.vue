<template>
    <div>
      <!--pages/signin/signin.wxml-->
        <div class="abose">
        <div class="boxs">
          <div class="boxli">
            <div class="xp1">百万奖池仅剩</div>
            <div class="xp2">¥{{showmoney}}</div>
            <div class="xp4">本周签到</div>
          </div>
          <div class="xp3" @click="huodong">活动细则</div>
        </div>

        <div class="packon">
          <div class="qianitem">
            <div class="qiantime" v-for="(item,index) in [0,1,2,3,4,5,6]" :style="clickwho[index]?'background:#fff;color:#333':''" :key="index">
            <p v-if="qiandaodata[index]>0||qiandaodata[index]<0" @click="bian(index)" >{{index+1}}天</p>
            <p v-else-if="qiandaodata.length==index&&!nowsignin" @click="bian(index)">{{qiandaodata.length+1}}天</p>
            <p v-else><i class="iconfont icon-qiandao_icon"></i></p>
            </div>
          </div>
          <div class="initem">
            <div class="inileft">
              <div class="xp6" v-if="!jieshu||qiandaodata[clickindex]<0">活动已结束</div>
              <div class="xp6" v-else>{{qiandaodata[clickindex]>0?'+'+qiandaodata[clickindex]:'Hi~'}}<span  class="small" v-if="qiandaodata[clickindex]>0">元</span></div>
              <div class="xp7">{{qiandaodata[clickindex]>0||qiandaodata[clickindex]<0?'恭喜您已获取今日签到红包哦':'今日您还没有签到哦'}}</div>
            </div>
            <div class="xp5"  v-if="!jieshu||qiandaodata[clickindex]>0||qiandaodata[clickindex]<0" style="background:#D8D8D8">明日再来</div>
            <div class="xp5" v-else @click="qiandao">签到领红包</div>
          </div>

          <!-- <div class="nie">
            <img src="https://images.yyoungvip.com/IMG/chu2.jpg" @click="goyaoqing"/>
          </div> -->
          <div class="nies">
            <img src="https://images.yyoungvip.com/IMG/chu3.jpg" @click="gosharpro"/>
          </div>
        </div>

        <div class="zhezaos" v-if="shownow"  @click="huodong"></div>
        <div class="actives" v-if="shownow">
          <div class="tatile">活动细则</div>
          <div class="shouone">
            <div class="biaoti">
            <p>新手奖励</p>
            </div>
            <div class="guizi">注册成功的新用户，即送100元购物优惠券以及随机现金红包奖励</div>
          </div>
            <div class="shouone">
            <div class="biaoti">
            <p>每日签到</p>
            </div>
            <div class="guizi">完成每日签到即可获得随机现金红包奖励</div>
          </div>
            <div class="shouone">
            <div class="biaoti">
            <p>分享商品</p>
            </div>
            <div class="guizi">好友点击进入后，即可获得随机现金红包奖励，每天限领3次</div>
          </div>
        </div>

        <div class="zhezaos" v-if="!activitiesswitch"></div>
        <div class="actives activesover" v-if="!activitiesswitch">
        <div class='actp1'>活动已结束</div>
        <div class='actp2'>下次早点来哦~</div>
        <div class="sp3"  @click="okle">我知道了</div>
        </div>
        </div>

        <div class="popup_container" v-if="showPopup">
            <div class="succbox">
              <p class='sp1' v-if="qiandaodata[clickindex]">恭喜你</p>
              <p class='sp2' v-if="qiandaodata[clickindex]"> 今日签到获得<span style="color:#F5AC9E">{{qiandaodata[clickindex]>0?'+'+qiandaodata[clickindex]:'活动已结束'}}</span>元</p>
              <p class='sp4' v-else> 活动已结束</p>
              <div class='sp3' @click='closePopup'>确认</div>
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
         shownow:false,
    qiandaodata:[],
    clickwho: [true, false, false, false, false, false, false],
    showmoney:'',
    clickindex:0,
    nowsignin:false,//判断今天是否签到
    activitiesswitch:true,//判断提示弹窗开启还是关闭
    showPopup: false,
    jieshu: true,     // 活动是否结束，false为结束
    isqian: false
    }
  },
  watch:{},
  computed:{},
  methods:{
 getWeekDay(dateString) {
    let dateStringReg = /^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/;

    if (dateString.match(dateStringReg)) {
      var time = dateString;
        time = time.replace(/-/g,':').replace(' ',':');
        time = time.split(':');
        let presentDate = new Date(time[0],(time[1]-1),time[2]),
            today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;
        return Array.from(new Array(7), function(val, index) {
            return  formatDate(new Date(presentDate.getTime() - (today - index-1) * 24 * 60 * 60 * 1000));
        });

    } else {
        throw new Error('dateString should be like "yyyy-mm-dd" or "yyyy/mm/dd"');
    }

    function formatDate(date) {
      console.log(date)
        var Month
        var day
        if(date.getMonth() + 1<10){
          Month='0'+(date.getMonth() + 1)
        }else{
          Month=date.getMonth() + 1
        }
        if(date.getDate()<10){
          day='0'+(date.getDate())
        }else{
          day=date.getDate()
        }
        return  Month + '-' + day;
    console.log(Month + '-' + day)
    }
},
    getdata(state){
          var that = this
    https({
      url: siteUrl + 'marketing/redpackage/GetSignData',
      data: {
        uid: getname()
      },
      headers: 1,
      successBack: (ret) => {
        console.log($api.jsonToStr(ret))
        if (ret.success && ret.status == 1) {
          let nowsignin=false
          let imdata = []
          let date = new Date
          let day = date.getDate()
          if(day<10){
            day='0'+day
          }
        var todaytime=date.getFullYear()+'-'+ (date.getMonth()+1)+'-'+date.getDate()
        console.log(todaytime)
          if (ret.Data != null) {
          //解决ios时间排序错乱问题
          if (window.api) {
            if(api.systemType == "ios"){
          var a=that.getWeekDay(todaytime)
            var time={}
            a.forEach(function(item,index){
             for (var i in ret.Data.signin) {
              if(item==i){
                time[i]=ret.Data.signin[i]
              }
             }
            })
            for (var i in time) {
              if (i.substr(3, 4)==day){
                if (time[i] != 0){
                  nowsignin=true
                }
              }
              if (time[i] != 0) {
                imdata.push(time[i])
              }
            }
            }else{
               //浏览器和安卓公用
              for (var i in ret.Data.signin) {
              if (i.substr(3, 4)==day){
                if (ret.Data.signin[i] != 0){
                  nowsignin=true
                }
              }
              if (ret.Data.signin[i] != 0) {
                imdata.push(ret.Data.signin[i])
              }
            }
            }
          }else{
            //浏览器和安卓公用
            for (var i in ret.Data.signin) {
              if (i.substr(3, 4)==day){
                if (ret.Data.signin[i] != 0){
                  nowsignin=true
                }
              }
              if (ret.Data.signin[i] != 0) {
                imdata.push(ret.Data.signin[i])
              }
            }
          }
            //定位到最新的一天
            let ims = []
            for (var i; i < 7; i++) {
              ims.push(false)
            }
            //判断签到的定位赛，没签到数组会少一位
            var today
            if (nowsignin){
              today = imdata.length-1
            }else{
              today = imdata.length
            }
            ims[today] = true
            that.clickindex=today
            that.clickwho=ims
          }
          let showPopup = false
          if(state) {
            showPopup = true
          }
            that.showmoney=ret.Data.showbonuspool
            that.qiandaodata=imdata
            that.nowsignin=nowsignin
            that.jieshu = ret.Data.activitiesswitch
            that.activitiesswitch= ret.Data.activitiesswitch
            that.showPopup=showPopup
        } else {
          promptMsg(ret.err)
        }
      }
    })
    },
     huodong:function(){
      this.shownow=!this.shownow
  },
    bian:function(index){
    let ims=[]
    for(var i;i<7;i++){
      ims.push(false)
    }
    ims[index]=true
      this.clickindex=index,
      this.clickwho=ims
  },
    qiandao:function(){
      if (this.isqian) return
      this.isqian = true
    var that = this
    https({
      url: siteUrl + 'marketing/redpackage/SignIn?devicetype=1',
      data: {
        uid: getname()
      },
      headers: 1,
      successBack: (ret) => {
        console.log(ret)
        if(ret.success&&ret.status==1){
          that.getdata(1)
        }else{
          promptMsg(ret.err)
        }
        // if (ret && ret.data && ret.data.success && ret.data.status === 1 && ret.data.Data.length > 0) {
        //   let couponMsg = ""
        //   this.setData({
        //     showShopCoupon: true,
        //     couponMsg: ret.data.Data
        //   })
        // }
        this.isqian = false
      }
    })
  },
    okle:function(){
      this.activitiesswitch=true
  },
    closePopup() {
      this.showPopup=false
  },
  gosharpro(){
    openWin({
      name:'sharepro',
      url:'./sharepro.html',
      pageParam:{
        title:'分享商品'
      }
    },1)
  },
  goyaoqing() {
    console.log(1111)
    openWin({
      name:'frinedsharp',
      url:'./frinedsharp.html',
      bgColor:'#FFEAE1',
      pageParam:{
        title:'邀请好友签到'
      }
    },1)
  }
  },
  created(){},
  mounted(){
     this.getdata()
  }
}
</script>
<style lang="scss">
/* pages/signin/signin.wxss */
body{
  background: #f5f5f5
}
img{
  display: block;
}
.abose{overflow: hidden;width: 100%}
.boxs {
  width: 100%;
  height: rems(400);
  background:linear-gradient(49deg,rgba(255,234,224,1),rgba(247,195,179,1));
  border: 1px solid rgba(151, 151, 151, 0);
  color: #fff;
}

.xp1 {
  color: #2C5B33;
  font-size: rems(28);
  margin-top: rems(40);
}

.xp2 {
  color: #2C5B33;
  font-size: rems(60);
  margin-top: rems(10);
}

.xp3 {
  width: rems(180);
  height: rems(58);
  border-radius: 15px;
  background: #fff;
  position: absolute;
  right: 3%;
  top: 4%;
  font-size: rems(24);
  display: flex;
  color: #2C5B33;
  align-items: center;
  justify-content: center;
}

.xp4 {
  font-size: rems(34);
  color: #fff;
  margin-top: rems(30);
}

.boxli {
  padding-left: rems(30);
}

.qiantime {
  background: rgba(255, 221, 164, 1);
  border-radius: 4px 4px 0px 0px;
  height: rems(100);
  width: 12%;
  text-align: center;
  line-height: rems(100);
  color: #CDA86E;
  p{
    font-size: rems(30);
    color: #AB5638;
  }
  i{
    font-size: rems(60);
    color: #E57762
  }
}

.qianitem {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 rems(22);
}

.initem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: rems(48) 0;
  margin: 0 rems(30);
  border-radius: 0px 0px 4px 4px;
  color: #cda86e;
}

.packon {
  margin-top: -70px;
}

.inileft {
  margin-left: rems(20);
}

.xp5 {
  background: #427161;
  border-radius: 18px;
  width: rems(240);
  height: rems(70);
  color: #fff;
  text-align: center;
  line-height: rems(70);
  font-size: rems(28);
  margin-right: rems(20);
}

.xp6 {
  font-size: rems(60);
  color: #427161;
}

.xp7 {
  font-size: rems(28);
  margin-top: rems(10);
  color: #427161;
}

.nie img {
  width: 90%;
  margin: 0 auto;
  margin-top: rems(30);
  border-radius: 4px;
}

.icon-jinbi_ {
  color: #cda86e;
  font-size: rems(48);
}

.nies img {
  width: 90%;
  margin:rems( 20) auto;
  border-radius: 4px;
}

.zhezaos {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.actives {
  background-color: #fff;
  width: 80%;
  left: 10%;
  border-radius: 8px;
  position: fixed;
  top: 20%;
  font-size: rems(28);
  z-index: 9999;
  padding-bottom: rems(30)
}

.tatile {
  background:rgba(245,172,158,1);
  font-size: rems(36);
  width: rems(240);
  padding: rems(10) 0;
  text-align: center;
  border-radius: 8px;
  margin: 0 auto;
  margin-top: -20px;
  color: #fff
}
.shouone{text-align: center}
.biaoti{position: relative;margin: 0 auto;z-index: 99999;margin-top: rems(30)}
.biaoti p{font-size: rems(34);position: relative;z-index: 999992;color: #2C5B33;}
.xian{border-bottom:7px solid rgb(205, 168, 110);position: absolute;bottom: 0px;z-index: 999991;width: rems(138);}
.guizi{font-size: rems(28);color: #666464;width: 90%;margin: 0 auto;margin-top: rems(10)}
.small{font-size: rems(28)}

.activesover{text-align: center;padding: rems(60) 0}
.actp1{font-size: rems(34);font-weight: 700;padding: rems(40) 0}
.actp2{ font-size: rems(28);padding-bottom: rems(60)}
.actp3{width: 80%;}

.popup_container{position: fixed; top: 0; left: 0; z-index: 9;width: 100%;height:100%;background:rgba(51,51,51,0.7);border:2rpx solid rgba(151,151,151,1);}
.succbox{
  position: absolute;
  width: 60%;
  left: 20%;
  top:30%;
  text-align: center;
  background: #fff;
  border-radius: 8px;
}
.sp1{
  color: #2C5B33;
  font-size: rems(34);
  padding: rems(90) 0 rems(26) 0
}
.sp2{
   color: #666464;
  font-size: rems(30);
  margin-bottom: rems(46) 
}
.sp3{
width:rems(226);
height:rems(74);
background:rgba(245,172,158,1);
border-radius:8px;
margin: 0 auto;
  font-size: rems(32);
  color: #fff;
  @include item;
  justify-content: center;
  margin-bottom: rems(36)
}
.sp4{
   color: #666464;
  font-size: rems(30);
  margin: rems(46) 0;
}  
</style>