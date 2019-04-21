<template>
  <section>
    <div id="head"></div>
    <div v-for="(item,index) in listdata" @click='goother(index)' :key="index">
    <div class="time">
      <span>{{item.createtime}}</span>
    </div>
    <div class="obox">
      <div class="p1">{{item.contentjson.title||item.title}}
        <span v-if="options.type==1" class="ap">{{item.contentjson.order_type}}</span>
        <span v-if="options.type==4||options.type==5" class="ap">{{item.contentjson.user_name}}</span>
        <div class="fr readstate" style="margin: 0;" v-if="!item.isread && (options.type == '2' || options.type == '3' || options.type == '6')">未读</div>
      </div>
      <div class="p2 itemse" v-if="options.type==4||options.type==1||options.type==5">
        <img :src="item.contentjson.pro_pic">
        <div class="mestime" style="width: 100%;">
          <div class="line_over_2">{{item.contentjson.pro_name}}</div>
          <div class="clear" style="width: 100%; height: 17px; line-height: 17px;">
            <div class="fl" style="margin: 0;">共{{item.contentjson.pro_count}}件</div>
            <div class="fr readstate" style="margin: 0;" v-if="!item.isread && (options.type == '1' || options.type == '4' || options.type == '5')">未读</div>
          </div>
        </div>
      </div>
      <div class="p2 itemse" v-else>
        <div style='font-size:28rpx'>
        {{item.contentjson.content||item.content}}
            <div v-if="options.type==3" class='aps'>
          <div>昵称: {{item.contentjson.name}}</div>
          <div>微信: {{item.contentjson.wxnum}}</div>
          <div>手机号: {{item.contentjson.phone}}</div>
        </div>
        </div>
      </div>
    </div>
    </div>

        <div class="nomores" v-if="stops">
            <div v-if="listdata.length>0">
                没有记录了
            </div>
            <div v-else>
              <div class="noRec" id="noRec">
                <div class="square">
                <img src="../../img/noorders.png" alt="" width="100%">
                </div>
                <div class="ic_text">抱歉，目前没有显示记录~</div>
                </div>
            </div>
        </div>
  </section>
</template>
  
<script>
  export default {
    data() {
      return {
        listdata:'',
        options:{
          type: ''
        },
        currentPage: 1,
        stops:false
      }
    },
    created() {
      var that = this
      if (window.api) {
        api.addEventListener({
          name: 'scrolltobottom'
        }, 
        function(ret, err){
          if (!that.stops) {
            that.currentPage += 1 
            that.BindData()
          }
        })
        
      }
      
      that.BindData()
    },
    methods:{
      goother(index){
        var that=this
        https({
            url: siteUrl +'Main/Member/UpdateMessage?uid=' + getname(),
            method: 'post',
            data: {
              uid: getname(),
               msgid: this.listdata[index].msgid
            },
            headers:1,
            successBack: function(ret, err){
          if(ret && ret.success && ret.status === 1) {
            that.listdata[index].isread = true

            if (window.api) {
              // 让首页刷新消息红点
              api.sendEvent({
                name: 'root_refresh_messagenum'
              });
            }
          }
          if ( that.options.type == '1'){
            openWin({
                name: 'orderdetail',
                url: './orderdetail.html',
                pageParam: {
                    orderid: that.listdata[index].contentjson.order_id,
                    title:'订单详情'
                }
            },1)
          } else if (that.options.type  == '4'){
            openWin({
                name: 'fxordersdetail',
                url: './fxordersdetail.html',
                pageParam: {
                  orderid:that.listdata[index].contentjson.order_id
                },
                bgColor:"#F3F2F2"
            })
          }
        }
        })
      },
       BindData(){
         var that = this
        https({
          method:'get',
          headers:1,
          url:siteUrl +'Main/Member/GetMyMessageList',
          data:{
            uid: getname(),
            currentPage: that.currentPage,
            pageSize: 8,
            type: 0,
            itemcode: pageParam('type')
          },
          successBack:function(ret){
            if(ret.success&&ret.status==1){
              if(that.currentPage==1){
                that.listdata=ret.Data
              }else{
                that.listdata=that.listdata.concat(ret.Data)
              }
              that.options.type = pageParam('type')
            }else if(ret.success&&ret.status==2){
              if(that.currentPage==1){
                that.listdata=[]
              }
              that.stops=true
              
            }else{
              promptMsg(ret.err)
            }
            console.log(ret)
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  body{
background-color:#F6F6FA;
color: #2C5B33;
          }
          .obox{width: 90%;margin: 0 auto;padding: rems(30) rems(44);background: #fff;border-radius: 8px;box-sizing: border-box;}
.p1{font-size:rems(30);
font-family:PingFangSC-Semibold;
font-weight:600;line-height:20px;border-bottom: rems(2) solid #E69888;padding: 10px 0;display: flex;align-items: center;justify-content: space-between}
.ap{overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;font-size: 11px;font-weight: 300;width: 15%;flex-shrink: 0;text-align: right}
.itemse{display: flex;align-items: center;font-size: rems(24);}
.p2{padding: 10px 0;font-size: rems(24);color:#666464;}
.p2 img{width: 72px;height: 72px;margin-right: 8px;flex-shrink: 0}
.mestime div:nth-child(1){font-size: 14px;}
.mestime div:nth-child(2){font-size: 12px;color: #999;margin-top: 23px}
.time{text-align: center;color: #fff;margin: 15px 0;font-size: 14px;}
.time span{background:rgba(216,216,216,1);
border-radius:4px;font-size: 12px;padding: 8px 10px;}
.nomores{margin: 10px 0;font-size: 13px;text-align: center;color: #999}
.aps div{font-size: 12px;color: #999}

#head{position: fixed;width: 100%;top:0}
.fl{float: left;} .fr{float: right;}
.clear:after{content: ""; display: block; clear: both;}
.readstate:before{content: ""; display: inline-block; width:8px; height:8px; background:rgba(255,66,44,1); border-radius: 50%; margin-right: 5px;font-size: rems(24);}
</style>