<template>
     <div>
        <div class='items ordetou'>
            <div class="tablie" @click='change(0)' :style="checktype[0]?'color:#FAAFA0':''">
                <div>全部订单</div>
                <div class='renlie' v-if="checktype[0]">
                    <div class="redline"></div>
                </div>
            </div>
            <div class="tablie" @click='change(1)' :style="checktype[1]?'color:#FAAFA0':''">
                <div>进行中</div>
                <div class='renlie' v-if="checktype[1]">
                    <div class="redline"></div>
                </div>
            </div>
            <div class="tablie" @click='change(2)' :style="checktype[2]?'color:#FAAFA0':''">
                <div>已成功</div>
                <div class='renlie' v-if="checktype[2]">
                    <div class="redline"></div>
                </div>
            </div>
            <div class="tablie" @click='change(3)' :style="checktype[3]?'color:#FAAFA0':''">
                <div>已失败</div>
                <div class='renlie' v-if="checktype[3]">
                    <div class="redline"></div>
                </div>
            </div>
        </div>
        <div v-if="listdata.length>0" class='bigbox'>
            <div class="box" v-for="(item, index) in listdata" :key="index">
                <div class="box_tou">
                    <div class="items oreder_tou">
                        <div class="o_tou_left items">
                            <div v-cloak>{{item.mytype}}</div>
                            <span v-cloak>{{item.groupcount}}人团</span>
                        </div>
                        <div class="oreder_tishi" v-cloak>{{item.grouptype}}</div>
                    </div>
                    <div class="order_time" v-cloak>{{item.paytime}}</div>
                </div>
                <div class="box_main items">
                    <img :src="item.groupimg" />
                    <div class="pro_right">
                        <div class="pro_xian">
                            <div class="p1" v-cloak>
                                <span class="allhave" v-if="item.isbuyonegetone&&item.headfree"><span class="allhaveping">团长免单</span>拼一送一</span>
                                <span class="pingone" v-else-if="item.isbuyonegetone">拼一送一</span>
                                <span class="tuanfree" v-else-if="item.headfree">团长免单</span> {{item.groupname}}
                            </div>
                        </div>
                        <div>
                            <div class="p3">
                                <span class="p4" v-cloak>¥</span>{{item.groupprice}}
                                <span class="p5" v-cloak>原价{{item.proprice}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box_foot items">
                    <div class="oreder_imge items">
                        <img :src="imgitem?imgitem:'./img/man.jpg'" v-for="(imgitem, idx) in item.userimg" :key="idx" />
                    </div>
                    <div class="order_btn">
                        <span @click='go_group_detail(item.orderid)'>拼单详情</span>
                        <div class="abse" @click="goorder(item.orderid)">订单详情</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="nodata">
            <div class="noRec" id="noRec" style="display: block;">
                <div class="square">
                    <img src="../../image/noping.png" alt="" style="width:100%;">
                </div>
                <div class="ic_text">抱歉，目前没有活动~</div>
            </div>
            <div class="bordes" @click='goindex'>去拼团看看</div>
        </div>
    </div>   
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
            nodata:false,//没有数据的时候
            listdata:'',
            currentPage:1,
            stops:false,
            checktype:[true,false,false,false],
            orderstatr:100 //100是全部订单，1是进行中，2是已成功，3是失败
    }
  },
  watch:{},
  computed:{},
  methods:{
            databind:function(){
               var that=this
                https({
                 url: siteUrl + '/Marketing/Groupbuy/GetMyGroupbuy',
                 data: {
                   uid: getname(),
                   currentPage: that.currentPage,
                   pageSize: 6,
                   gbuystate: that.orderstatr
                 },
                 headers: 1,
                 successBack: (ret) => {
                   console.log($api.jsonToStr(ret))
                   if (ret.status == 1 && ret.success) {
                     if (that.currentPage==1){
                       that.listdata=[]
                     }
                    that.nodata=false
                     that.listdata=that.listdata.concat(ret.Data)
                   } else if (ret.status == 2 && ret.success){
                     if (that.currentPage == 1) {
                       that.listdata=[]
                       that.nodata=true
                     }
                     that.stops=true
                     if (that.listdata.length>0){
                       promptMsg('没有更多数据了')
                     }
                   }else{
                     promptMsg(ret.err)
                   }
                    if(window.api){
                    api.refreshHeaderLoadDone();     
                      
                    }
                 }
               })
             },
             go_group_detail:function(orderids){
               var orderid = orderids
               openWin({
                 name:'group_detail',
                 url:'./group_detail.html',
                 useWKWebView:true,
                 pageParam:{
                   title:'拼单详情',
                   orderid:orderid
                 }
               },1)
             },
             change:function(indexs){
               var index = indexs
               let a=[]
               for(var i=0;i<4;i++){
                 a.push(false)
               }
               a[index]=true
               this.checktype=a
               if(index=='0'){
                 this.orderstatr=100
               } else if (index == '1'){
                 this.orderstatr = 1
               } else if (index == '2') {
                 this.orderstatr = 2
               } else if (index == '3') {
                 this.orderstatr = 3
               }
               this.currentPage=1
               this.stops = false
               this.databind()
              document.body.scrollTop = 0
             },
             goindex:function(){
               openWin({
                 name:'webapps',
                url:'./grouplist.html',
                 useWKWebView:true,
                 pageParam:{
                   title:'劲爆拼团',
                 }
               },1)
             },
             goorder:function(orderid){
               openWin({
                   name: 'orderdetail',
                   url: './orderdetail.html',
                   pageParam: {
                       orderid: orderid,
                       title:'订单详情'
                   }
               },1);
             }
  },
  created(){
      var app=this
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
              app.currentPage=1
              app.stops=false
              app.databind()
        }); 
            api.addEventListener({
          name: 'scrolltobottom'
      }, function(ret, err) {
          if (!app.stops) {
              app.currentPage = app.currentPage + 1;
              app.databind()
          }
      });
      }
  },
  mounted(){
        this.databind()
  }
}
</script>
<style lang="scss">
body{
  background-color: #f5f5f5
}
.box{
  background-color: #fff;
  padding: 0 rem(15);
  margin-bottom: rem(10);
}
.nodata,.bigbox{
    margin-top: rem(36);
}
.items{display: flex;align-items: center;}
.oreder_tou{
  justify-content: space-between;

}
.o_tou_left{
  font-size: rem(14);
  color: #333;
}
.o_tou_left span{
  font-size: rem(10);
  color: #fff;
  padding: rem(2) rem(11);
  background-color: rgb(233,57,74);
  margin-left:rem(10);
  border-radius: 30px;
}
.oreder_tishi{
  font-size:rem(14);
  color: #FF5541;
  font-weight: 700;
}
.order_time{
  font-size: rem(12);
  color: #999
}
.box_tou{
  padding: rem(13) 0;
  border-bottom: 1px solid #F6F6FA;
}
.box_main{
  padding: rem(12) 0;
   border-bottom: 1px solid #F6F6FA;
}
.box_main img{
  width: rem(96);
  height: rem(96);
  margin-right: rem(8);
  flex-shrink: 0;
}
.p1{
  font-size: rem(12);
  overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;
  margin-bottom: rem(22);
  line-height: 2;
}
.p3{
  font-size: rem(18);
  color: #FF5541;
}
.p4{
  color: #FF5541;
  font-size: rem(12);
}
.p5{
  color: #999;
  font-size: rem(10);
  text-decoration: line-through;
}
.box_foot{
  justify-content: space-between;
  padding: rem(8) 0
}
.oreder_imge img{
width:rem(32);
height: rem(32);
margin-right: rem(5);
border-radius: 50%;
}
.order_btn{
  display: flex;
  align-items: center;
}
.order_btn span:nth-child(1){
  color: #999;
  border: 1px solid #999;
  padding:rem(6) rem(15);
  font-size: rem(12);
  border-radius: 30px;
}
.abse{
  color: #FF5541;
  border: 1px solid #FF5541;
  padding: rem(6) rem(15);
  font-size: rem(12);
  border-radius: 30px;
  margin-left: rem(10);
}
.tablie{
  font-size: rem(14);
  color: #333;
  padding: rem(8) 0;
  width: 25%;
  background: #fff;
  text-align: center;
  position: relative;
}
.renlie{
  position: absolute;
  bottom:0;
  width: 100%;
}
.redline{
  width: 55%;
  background-color: #FAAFA0;
  height:  rem(3);
  border-radius: rem(15);
  margin: 0 auto;
}
.bordes{
  color: #FF5541;
  border-radius: 30px;
  padding: rem(8) rem(20);
  border:1px solid #FF5541;
  margin: rem(30) auto;
  text-align: center;
  width: 30%;
  font-weight: 700;
  font-size: rem(14);
}
.ordetou{
  position: fixed;
  top:0;
  width: 100%;
}
/* 拼团标识 */
.pingone{
  border: 1px solid #FF5541;
  border-radius: 30px;
  color: #FF5541;
  padding: 0 rem(6);
  font-size: rem(10);
  margin-right:rem(3);
}
.tuanfree{
  border: 1px solid rgba(232,55,74,1);
  border-radius: 30px;
  color: #fff;
  padding: 0 rem(6);
  font-size: rem(10);
  margin-right: rem(3);
  background:linear-gradient(270deg,rgba(232,55,74,1) 0%,rgba(253,94,67,1) 100%);
}
.allhave{
border-radius:16px;
border:1px solid rgba(255,85,65,1);
color: #FF5541;
background: #fff;
font-size: rem(10);
padding-right:rem(5);
}
.allhaveping{
  background:linear-gradient(270deg,rgba(232,55,74,1) 0%,rgba(253,94,67,1) 100%);
  color: #fff;
  border-radius:16px;
  font-size: rem(10);
  padding:0 rem(5);
  margin-right: rem(5);
}

</style>