<template>
  <div class="box" style="display: none;" :style="{display: isDone ? 'block' : 'none'}">
    <div class="msitem out" @click="gosection(1,'个人消费订单')">
      <div class="msitem">
        <div class="img_box">
          <img src="../../img/mes1.png" alt="">
          <div class="icon_corner" v-if="myorderurcount > 0">{{myorderurcount >= 100 ? 99 : myorderurcount }}</div>
          <!-- <div class="icon_corner">11</div> -->
        </div>
        <div class="titles">
          <div>个人消费订单</div>
          <div>{{myorder}}</div>
        </div>
      </div>
      <div class="right">
        <img src="../../img/right-icon.png" alt="">
      </div>
    </div>
    <div class="msitem out" @click="gosection(4,'本店销售订单')">
    <div class="msitem">
      <div class="img_box">
        <img src="../../img/mes4.png" alt="">
        <div class="icon_corner" v-if="mysaleorderurcount > 0">{{mysaleorderurcount >= 100 ? 99 : mysaleorderurcount }}</div>
      </div>
      <div class="titles">
        <div>本店销售订单</div>
        <div>{{mysaleorder}}</div>
      </div>
    </div>
    <div class="right">
      <img src="../../img/right-icon.png" alt="">
    </div>
  </div>
  <div class="msitem out" @click="gosection(5,'团队销售订单')">
    <div class="msitem">
      <div class="img_box">
        <img src="../../img/mes5.png" alt="">
        <div class="icon_corner" v-if="myfxorderurcount > 0">{{myfxorderurcount >= 100 ? 99 : myfxorderurcount }}</div>
      </div>
      <div class="titles">
        <div>团队销售订单</div>
        <div>{{myfxorder}}</div>
      </div>
    </div>
    <div class="right">
      <img src="../../img/right-icon.png" alt="">
    </div>
  </div>
      <div class="msitem out" @click="gosection(2,'钱包收支明细')">
      <div class="msitem">
        <div class="img_box">
          <img src="../../img/mes2.png" alt="">
          <div class="icon_corner" v-if="myassetsurcount > 0">{{myassetsurcount >= 100 ? 99 : myassetsurcount }}</div>
        </div>
        <div class="titles">
          <div>钱包收支明细</div>
          <div>{{myassets}}</div>
        </div>
      </div>
      <div class="right">
        <img src="../../img/right-icon.png" alt="">
      </div>
    </div>
      <div class="msitem out" @click="gosection(3,'团队新进店主')">
      <div class="msitem">
        <div class="img_box">
          <img src="../../img/mes3.png" alt="">
          <div class="icon_corner" v-if="myteamurcount > 0">{{myteamurcount >= 100 ? 99 : myteamurcount }}</div>
        </div>
        <div class="titles">
          <div>团队新进店主</div>
          <div>{{myteam}}</div>
        </div>
      </div>
      <div class="right">
        <img src="../../img/right-icon.png" alt="">
      </div>
    </div>

        <div class="msitem out" @click="gosection(6,'系统消息')">
      <div class="msitem">
        <div class="img_box">
          <img src="../../img/mes6.png" alt="">
          <div class="icon_corner" v-if="mynoticeurcount > 0">{{mynoticeurcount >= 100 ? 99 : mynoticeurcount }}</div>
        </div>
        <div class="titles">
          <div>系统消息</div>
          <div>{{mynotice}}</div>
        </div>
      </div>
      <div class="right">
        <img src="../../img/right-icon.png" alt="">
      </div>
    </div>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        myassets:"",
        myfxorder:"",
        mynotice:"",
        myorder:"",
        mysaleorder:"",
        myteam:"",
        myorderurcount: 0,
        myassetsurcount: 0,
        mynoticeurcount: 0,
        myfxorderurcount: 0,
        mysaleorderurcount: 0,
        myteamurcount: 0,
        isDone: true    // 数据是否已加载出来
      }
    },
    created() {
      var that = this
      this.getMsg()

      if (window.api) {
        api.addEventListener({
          name: 'viewappear'
        }, function(ret, err){
          that.getMsg()
        });
      }
    },
    methods: {
      getMsg() {
        var that = this
        https({
          method:'get',
          headers:1,
          url:siteUrl +'Main/Member/GetMyFirstMessageList',
          data:{
            uid: getname()
          },
          successBack:function(ret){
            console.log(ret)
            if(ret.success&&ret.status==1){
              that.myassets = ret.Data[0].myassets
              that.myfxorder = ret.Data[0].myfxorder
              that.mynotice = ret.Data[0].mynotice
              that.myorder = ret.Data[0].myorder
              that.myorderurcount = ret.Data[0].myorderurcount
              that.myassetsurcount = ret.Data[0].myassetsurcount
              that.mynoticeurcount = ret.Data[0].mynoticeurcount
              that.myfxorderurcount = ret.Data[0].myfxorderurcount
              that.mysaleorderurcount = ret.Data[0].mysaleorderurcount
              that.mysaleorder = ret.Data[0].mysaleorder
              that.myteam = ret.Data[0].myteam
              that.isDone = true
            }else{
              promptMsg(ret.err)
            }
            console.log(that.myorderurcount)
          }
        })
      },
      gosection(index,str){
        var pic= index
        console.log(index)
        openWin({
            name: 'message_detail',
            url: './message_detail.html',
            pageParam: {
              title: str,
              type: pic
            },
            bgColor:'#fff'
        },1);
      }
    }

  }
</script>
<style lang="scss">
  body{
    background-color: #f5f5f5;
   }
   .msitem.out {
     width: 92%;
    height: rems(144);
    border-radius:rems(8);
    overflow: hidden;
   }
.msitem{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center}
.msitem img{
  width: rems(96);
  height: rems(96);
  // margin-right: 15px;
  flex-shrink: 0
  }
  .right {
    width: rems(140);
    height: 100%;
    background-color: #F5AC9E;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: rems(46);
      height: rems(46);
      display: block;
      margin: 0;
    }
  }
.newright-arrow::after {
  display: none;
}
.out{
  justify-content: space-between;
background: #fff;
margin-top: rems(20);
border-bottom: 1px solid #F6F6FA}
.titles div:nth-child(1){
  font-size: 17px;
color: #2C5B33}
.titles div:nth-child(2){
  font-size: rems(24);
color: #666464;
margin-top: 5px;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical}
.img_box{
  margin-left: rems(40);
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
}
.icon_corner{
  position: absolute;
 top: 20%;
 right: -25%;
 transform: translateX(-50%);
 width:22px;
height:14px;
background:rgba(255,85,65,1);
border-radius:7px;
 font-size: 12px;
 text-align: center;
 line-height: 14px;
 color: #fff;
 box-sizing: border-box;
}
</style>