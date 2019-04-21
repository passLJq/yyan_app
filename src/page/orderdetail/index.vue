<template>
<section :style="{display: isDone ? 'block' : 'none'}">
    <div class="tou">
        <div class="titlebox">
         <p>{{list.orderstate|orderstate}}</p>
        </div>
        <img src="../../img/orderdetail/all.png" alt="">
    </div>
    <div class="boxbao">
        <div class="kuaibox"  @click="openinfor" v-if="wuliuimag&&wuliutime">
            <div class="kuaimain">
                <img src="../../img/orderdetail/add_icon@3x.png" alt="">
                <div class="miaosu">
                    <p>{{wuliuimag}}</p>
                    <p>{{wuliutime}}</p>
                </div>
            </div>
            <i class="newright-arrow"></i>
        </div>
        <div class="kuaibox" style="border-bottom:0;">
            <div class="kuaimain">
                <img src="../../img/orderdetail/wuliu_icon@3x.png" alt="">
                <div class=" dizhi">
                    <p>{{list.linkman}}&nbsp;&nbsp;{{list.phone}}</p>
                    <p>{{list.fullarea+list.address}}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="boxbao" v-if="list.gbdata">
        <div class="pingtou">  
            <img src="../../img/orderdetail/iPhone8@3x.png" alt=""> 
            <p v-if="list.gbstate==2">拼团成功</p>
            <p v-if="list.gbstate==1">拼单中，还差{{list.gbdata.count}}人，剩余{{hours}}:{{min}}:{{miao}}结束</p>  
            <p v-if="list.gbstate>=3">拼团失败</p>  
        </div>
        <div class="pingimgbox" >
            <div class='pinimhli'>
                <img v-if="list.gbdata.imgphoto!=''"  :src="list.gbdata.imgphoto" @error="onerr($event)">
                <img v-else src="../../img/man.jpg" alt="">
                <div class="tuanzhang">团长</div>
            </div>
            <div class='pinimhli' v-for="(item,index) in list.gbdata.groupbuylist" :key="index">
                <img :src="item.head?item.head:'./img/man.jpg'">
            </div>            
        </div>
        <div class="btnbox">
            <!-- <p class="heibtn" v-if="list.gbstate==1">邀请好友</p> -->
            <p class="pingbtn" @click="gogroupdetali(list.orderid)">拼单详情</p>
        </div>
    </div>
    <div class="boxbao">
        <div class="orderpro" v-for="(item,index) in list.orderitems" :key="index">
            <img :src="item.pic" alt="">
            <div class="orderfoot">
                <p class="op1">{{item.proname}}</p>
                <p class="op1" v-if="item.skutext!=null">{{item.skutext}}</p>
                <div class="oxia">
                    <p v-if="item.ordertype == 110">&yen;{{Number(list.total / item.buycount).toFixed(2)}}</p>
                    <p v-else>&yen;{{item.price}}</p>
                    <p>数量*{{item.buycount}}</p>
                </div>
                <div v-if="(list.orderstate==20||(list.orderstate==40&&!list.isoversevenday))&&list.ordetype!=4&&list.ordetype!=12">
                    <div v-if="item.ordertype!=110&&!item.isrefundorder">
                        <div v-if="list.gbdata" class="heibpx">
                            <div v-if="list.gbstate ==  2 && list.gbdata && !list.gbdata.headfree">
                                <p class="heibtn" @click="tuikuan(list.orderid,item.itemid,item.proid,item.buycount,item.refundprice,item.proname)">申请退款</p>
                            </div>
                        </div>
                        <div v-else class="heibpx">
                             <p class="heibtn" @click="tuikuan(list.orderid,item.itemid,item.proid,item.buycount,item.refundprice,item.proname)">申请退款</p>
                        </div>
                    </div>
                </div>
                 <div v-if="(list.orderstate==62||list.orderstate==40)&&(list.ordetype==4||list.ordetype==12)&&!item.isexchangeorder&&!list.isoversevenday" class="heibpx">
                        <p class="heibtn" @click="ExchangeOrder(list.orderid,item.itemid,item.proid,item.packageid,item.buycount,item.proname)">换货</p>
                </div>                
            </div>
        </div>
        <div class="tilebox">
            <div class="titleitem">
                <p>运费</p>
                <p>{{list.ordersFreight != 0 ? '&yen;'+list.ordersFreight : '卖家包邮'}}</p>
                <!-- <p>卖家包邮</p> -->
            </div>
            <div class="titleitem">
                <p>优惠</p>
                <p>&yen;{{list.couponoffset|toFixed}}</p>
            </div>
            <div class="titleitem">
                <p>实付金额</p>
                <p>&yen;{{list.total|toFixed}}</p>
            </div>
        </div>
        <!-- //平团提示语 -->
        <div class="tilebox" v-if="(list.orderstate == 20 || list.orderstate == 30)&&list.gbid&&!list.orderitems[0].isrefundorder">
            <p class="tishi">{{list.gbstate==1?'等待成团，快去邀请小伙伴参与吧..':list.gbstate==2?(list.orderstate==30?'拼团成功，商品已经在路上，请耐心等待...':'拼团成功，商品正在打包中，请耐心等待...'):'拼购失败,已全额退款'}}</p>
        </div>
         <!-- //普通提示语 -->
        <div class="tilebox" v-if="index < 1 && (((list.orderstate == 20 || list.orderstate == 30) && list.gbid === null) || orderitems.isrefundorder)" v-for="(orderitems,index) in list.orderitems" :key="index">
             <p class="tishi">{{orderitems.isrefundorder ? (orderitems.refundstatus === 1 ? '商品退款审核中，请您耐心等待....' : orderitems.refundstatus === 2 ? '商品退款申请被拒绝...' : orderitems.refundstatus === 3 ? (list.gbdata!=null && list.gbdata.headfree&&list.gbstate <3 ? '恭喜您，获得团长免单机会，已全额退款':'商品退款成功') : orderitems.refundstatus === 4 ? '商品退款申请已失效...' : '商品退款申请处理中...') : (list.orderstate === 20 ? '商品正在打包中，请耐心等待...' : list.orderstate === 30 ? '商品已经在路上，请耐心等待...' : '')}}</p>
        </div>
        <div class="btnbox">
            <p class="pingbtn lxkf" v-if="list.orderstate!=10" @click="gokefu">联系开票</p>
            <p class="pingbtn" v-if="list.orderstate==30" @click="ReceiptOrder(list.orderid)">确认收货</p>
        </div>
    </div>
    <div class="boxbao">
        <div class="paybox">
            <div class="boxitem">
            <p>订单编号：{{list.orderid}}</p>
            <p class='fuzhi' @click="fuzhi(list.orderid)">复制</p>
            </div>
            <p>支付方式：{{list.orderstate==10?"未支付":list.paymenttype}}</p>
            <p>下单时间：{{list.createtime}}</p>
            <p v-if="list.deliverydata">物流单号：{{list.deliverydata.trackno}}</p>
            <p v-if="list.deliverydata">发货时间：{{list.deliverydata.time}}</p>
        </div>
    </div>
    <!-- 发票信息屏蔽 -->
    <!-- <div class="boxbao" v-if="false">
        <div class="paybox">
            <p>发票信息</p>
            <p>发票状态：{{list.isInvoice ? '已开票' : '不开发票'}}</p>
            <div v-if="list.isInvoice">
                <p>发票类型：{{list.invoiceType == 1 ? '电子普通发票' : '电子增值税发票'}}</p>    
                <p>发票抬头：{{list.invoiceTitle == 2 ? list.invoiceCompanyName : '个人'}}</p>  
                <p v-if="list.invoiceTitle == 2">公司税号：{{list.invoiceNumber}}</p>
                <p>发票内容：{{list.invoiceData == 1 ? '商品明细' : '商品类别'}}</p>             
            </div>
        </div>
    </div> -->
</section>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        list:'',
        wuliuimag:'',
        wuliutime:'',
        hours:'00',
        min:'00',
        miao:'00',
        timesover:null,
        isDone: false,
        loadTimer: null
    }
  },
  watch:{},
  computed:{},
  filters:{
      orderstate:function(value){
   return value == 10? '待付款':value == 11? '待处理': value == 20? '待发货': value == 30? '已发货': value == 40? '交易完成': value == 50? '已退货': value == 60? '已退款': value == 62? '申请换货': value == 70? '交易关闭': '--'
      },
      toFixed: function (value) {
          if (value) {
              return Number(value).toFixed(2)
          }
      }
  },
  methods:{
      binddata(){
          var that=this
          that.loadTimer = setTimeout(function () {
              showLoading()
          }, 1000)
            https({
            url:siteUrl + 'Main/Member/GetOrderListJson',
            data:{
                currpage:1,
                pagesize:1,
                uid: window.api?api.getPrefs({sync: true,key: 'SessionUserID'}):$api.getStorage('SessionUserID'),
                orderid :pageParam('orderid')

                // orderid:'181128151443888201'
            },
            headers:1,
            successBack:function(ret){
                if (that.loadTimer != null) {
                    hideLoading()
                    clearTimeout(that.loadTimer)
                    that.loadTimer = null
                }
                if(ret.status==1&&ret.success&& ret.Data!=null){
                    //物流信息读取
                    // if(ret.Data[0].deliverydata!=null&&ret.Data[0].deliverydata.expressjson!=""){
                    //   var wuliumesng=$api.strToJson(ret.Data[0].deliverydata.expressjson)
                    //   console.log(wuliumesng)
                    //   that.wuliuimag=wuliumesng.result.list[0].status
                    //   that.wuliutime=wuliumesng.result.list[0].time
                    // }
                    if(ret.Data[0].gbdata){
                        that.remaintime =  ret.Data[0].gbdata.ts - ret.Data[0].gbdata.tpgap;
                        if(that.remaintime >0&&ret.Data[0].gbstate==1){
                            that.timesover= window.setInterval(function(){
                                that.leftTimer()
                            },1000);
                        }
                    }
                    that.list=ret.Data[0]
                    if(that.list.deliverydata){
                        that.wuliu()
                    }
                    that.isDone = true
                }else{
                    promptMsg(ret.err)
                }
            }
            })
      },
      wuliu(){
       var that=this
    https({
        url: siteUrl +'Main/member/GetSFExpress',
        method: 'get',
        data:{
           trackstr: that.list.deliverydata.trackno,
           uid: getname()         
        },
        headers:1,
        successBack:function(ret){
            if(ret.success&&ret.status==1){
                var wuliu=ret.Data
                if(wuliu.length>0){
                wuliu=ret.Data.reverse()
                that.wuliuimag=wuliu[0].remark
                that.wuliutime=wuliu[0].accept_time
                }
            }else{
                promptMsg(ret.err)
            }
        }
      })
      },
    ReceiptOrder(orderid){
      var that=this
        comfirmDialogBox('你确定已收到货物了吗？',function(){
      https({
        url: siteUrl +'Main/Member/ReceiptOrder?uid='+ getname(),
        method: 'post',
        data:{
           orderid: orderid,
           uid: getname()         
        },
        headers:1,
        successBack:function(ret){
            if(ret.success){
                if(ret.status==1){
                  that.binddata();
                  promptMsg('您已确认收货');
                }
                else{
                  promptMsg(ret.err);
                }
            }
            else{
                if(checkLoginStatus()){
                  promptMsg(err.msg);
                }
            }
        }
      })
    })
    },
    tuikuan(orderid,itemid,proid,buycount,price,proname){
        openWin({
            name: 'refunddatail',
            url: 'refunddatail.html',
            pageParam:{
              orderid:orderid,
              itemid:itemid,
              proid:proid,
              buycount:buycount,
              price:price,
              proname:proname,
              title:'申请退款'
            },
            bounces: false,
            bgColor: '#fff'
        },1);
    },
    gogroupdetali(orderids){
             var orderid = orderids
               openWin({
                 name:'group_detail'+orderid,
                 url:'./group_detail.html',
                 useWKWebView:true,
                 pageParam:{
                   title:'拼单详情',
                   orderid:orderid
                 }
               },1)
    },
     ExchangeOrder(orderid,itemid,proid,packageid,buycount,proname){
          openWin({
              name: 'exchangedatail',
              url: './exchangedatail.html',
              pageParam:{
                orderid:orderid,
                itemid:itemid,
                proid:proid,
                packageid:packageid,
                proname:proname,
                buycount:buycount,
                title:'申请换货'
              },
              bounces: false,
              bgColor: '#fff'
          },1);
        },
        onerr(e) {
            e.target.src = './img/man.jpg'
        },
        gokefu() {
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
     openinfor(){
         var that=this
         var trackno=''
         if(that.list.deliverydata){
            trackno=that.list.deliverydata.trackno
         }
        openWin({
              name: 'information_aboutorder',
              url: './information_aboutorder.html',
              pageParam: {
                  trackstr: trackno,
                  title:'物流信息'
              },
              bgColor:'#f5f5f5'
        },1);
        },
         leftTimer(){
             var that=this
          if(that.remaintime <=1){
            window.clearInterval(that.timesover);
            that.timesover=null
            console.log('1')
            that.binddata()
            return;
          }
          var showhtml = "";
          that.remaintime  = that.remaintime -1;
          var days = parseInt(that.remaintime  / 60 / 60 / 24); //计算剩余的天数
          var hours = parseInt(that.remaintime  / 60 / 60 % 24); //计算剩余的小时
          var minutes = parseInt(that.remaintime  / 60 % 60);//计算剩余的分钟
          var seconds = parseInt(that.remaintime  % 60);//计算剩余的秒数
          if(days!=0){
            showhtml+=days+"天";
          }
          if(hours!=0){
            showhtml+=hours+"：";
          }
          that.hours=hours
          that.min = that.checkTime(minutes);
          that.miao = that.checkTime(seconds);
        },
         checkTime(i){ //将0-9的数字前面加上0，例1变为01
           if(i<10)
           {
              i = "0" + i;
           }
           return i;
        },
        fuzhi(value){
            var clipBoard = api.require('clipBoard');
            clipBoard.set({
                value: value
            }, function(ret, err) {
                if (ret) {
                    if(ret.status){
                        promptMsg('复制成功')
                    }
                } else {
                    alert(JSON.stringify(err));
                }
            });
        }
  },
  created(){},
  mounted(){
          var that=this
      console.log(pageParam('orderid'))
      if(window.api){
        api.addEventListener({
            name: 'tuikuan'
        }, function(ret, err) {
             that.binddata()
        });
        api.addEventListener({
            name: 'orderdetail_bindData'
        }, function (ret, err) {
            that.binddata()
        })
      }
      this.binddata()
  }
}
</script>
<style lang="scss">
img{display: block;}
.tishi{
    font-size: rems(24);
    @include item;
    justify-content: flex-end;
    color: #666464;
}
body{
    background: rgb(242,242,242)
}
.tou{
    @include item;
    background-color: rgba(255,234,224,1);
    font-size: rems(32);
    justify-content: space-between;
    text-align: center;
    .titlebox{
        color: #E69888;
        text-align: center;
        width: 100%;
    }
    img{
        width: rems(188);
        height: rems(188);
        flex-shrink: 0;
        margin-right: rems(58);
    }
    padding: rems(16) 0;
}
.boxbao{
    padding: 0 rems(44);
    background: #fff;
    margin-bottom: rems(16);
}
.kuaibox{
  @include item;
  justify-content: space-between;
  border-bottom: 1px solid #DEDEE1;
  padding: rems(30) 0;
  .kuaimain{
        @include item;
    img{
        width: rems(56);
        height: rems(56) ;
        margin-right:rems(20)
    }
    .miaosu{
        p:nth-child(1){
            color: #215645;
            font-size: rems(24);
            margin-bottom: rems(6);
        }
        p:nth-child(2){
            color: #9B9B9B;
            font-size: rems(24);
            margin-bottom: rems(6);
        }
    }
  }
}
.dizhi{
            p:nth-child(1){
            color: #9B9B9B;
            font-size: rems(24);
            margin-bottom: rems(6);
        }
        p:nth-child(2){
            color: #9B9B9B;
            font-size: rems(24);
            margin-bottom: rems(6);
        }
}
.pingtou{
   @include item;
   padding: rems(20) 0;
   img{
    width:rems(50);
    margin-right: rems(20);   
   }
  p{
      color: #215645;
      font-size: rems(24);
  }
}
.pingimgbox{
    padding-left: rems(60);
    flex-flow: wrap;
    @include item;
      border-bottom: 1px solid #DEDEE1;
    img{
       width: rems(80);
       height: rems(80);
       border-radius: 50%; 
       padding: rems(10) 0;
       margin: 0 auto;
       margin-right: rems(20);
    }
    .pinimhli{
        position: relative;
    }
    .tuanzhang{
        position: absolute;
        left: 0;
        top: 0;
        font-size: rems(24);
        color: #fff;
        padding: rems(8) rems(4);
        border-radius: 50%;
        background: rgb(245,172,158);
    }
}
.heibpx{
        @include item;
        justify-content: flex-end;
        margin-top: rems(20)
}
        .heibtn{
                      @include item;
  justify-content: center;
            border: 1px solid #666464;
            color: #666464;
            text-align: center;
            font-size: rems(24);
            border-radius: 30px;
            margin-right: rems(10);
            width:rems(150);
            height:rems(50);
        }
.btnbox{
        @include item;
        justify-content: flex-end;
        padding: rems(24) 0;
        .pingbtn{
                      @include item;
  justify-content: center;
            border: 1px solid #E69888;
            color: #E69888;
            text-align: center;
            font-size: rems(24);
            border-radius: 30px;
            margin-right: rems(10);
            width:rems(150);
            height:rems(50);
        }
}
.orderpro{
    @include item;
    border-bottom: 1px solid #DEDEE1;
    padding: rems(20) 0;
   img{
       width: rems(180);
       height: rems(180);
       flex-shrink: 0;
   }
   .orderfoot{
    width: 100%;
    font-size: rems(22);
    margin-left: rems(20);
    .op1{
    @include font2;
    color: #666464;
    margin-bottom: rems(10);
    }
    .oxia{
    @include item;
    justify-content: space-between;
    p:nth-child(1){
        color: #E69888;
    }
    p:nth-child(2){
        color: #666464;
    }     
    }
   }
}
.tilebox{
    padding: rems(20) 0;
        border-bottom: 1px solid #DEDEE1;
}
.titleitem{
    @include item;
    font-size: rems(24);
    justify-content: space-between;
    margin-bottom: rems(10);
    color: #666464;
}
.paybox{
    font-size: rems(24);
    color: #666464;
    padding: rems(26) 0 rems(10) 0;
    p{
        margin-bottom: rems(10);
    }
}
.lxkf {
    color: #666464 !important;
    border-color: #666464 !important;
}
.boxitem{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .fuzhi{
        border: 1px solid #9B9B9B;
        padding: 0 rems(10);
        border-radius: 30px;
    }
}
</style>