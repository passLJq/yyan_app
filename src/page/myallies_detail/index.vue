<template>
  <div>
    <div class="user_msg_container" v-if="msg && msg">
      <div class="user_img_box">
        <img :src="msg.shoplogo || './img/man.jpg'" alt="">
      </div>
      <div class="right_list flex_1 flex flex_v flex_pack_justify_between">
        <div class="flex  font_17 color_333 user_names">
          <div v-html="msg.username"></div>
          <div class="user_shop_type" v-if="newShopType" v-html="newShopType"></div>
        </div>
        <div class="flex flex_align_center font_12 color_999 user_right_bottom">
          <div class="flex flex_align_center" style="padding-right: 5px;">邀请码 </div>
          <div class="flex flex_align_center">{{msg.code}}</div>
        </div>
        <div class="flex flex_align_center font_12 color_999 user_right_bottom">
          <div class="flex flex_align_center" style="padding-right: 5px;">手机号 </div>
          <div class="flex flex_align_center">{{msg.phone}}</div>
        </div>
      </div>
    </div>

    <div class="flex flex_v overflow_boxsizing bottom_content_container" v-if="msg" style="margin-top:20px">
      <div>
        <div>店铺名称</div>
        <div>{{msg.shopname}}</div>
      </div>
      <div>
        <div>店铺等级</div>
        <div>{{msg.shoplevel}}</div>
      </div>
      <div>
        <div>会员职称</div>
        <div>{{msg.shoptitlename}}</div>
      </div>
      <div>
        <div>推荐人</div>
        <div>{{msg.recommenderName + ' (' + msg.RecommendCode + ')'}}</div>
      </div>
      <div v-if="newShopType === '正式店主'">
        <div>开店方式</div>
        <div v-if="msg.openshoptype === 0"><img src="../../image/kaidianlibao_icon.png"/><span>礼包开店</span></div>
        <div v-if="msg.openshoptype === 2"><img src="../../image/xiaoshoukaidian_icon.png"/><span>销售开店</span></div>
      </div>
      <div>
        <div>销售额</div>
        <div>&yen; {{xiaoshou}}</div>
      </div>
      <div>
        <div>TA的分享</div>
        <div>{{msg.fannum}}人</div>
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
                msg: "",
          newShopType: "",
          xiaoshou:'0.00'
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){
    var that=this
           this.newShopType = pageParam('alliesMsg') && (pageParam('alliesMsg.shoptype') === 1 ? '正式店主' : pageParam('alliesMsg.shoptype') === 2 ? '实习店主' : pageParam('alliesMsg.shoptype') === 3 ? '冻结店主' : '')
       this.msg = pageParam('alliesMsg',1)
        https({
        url: siteUrl +'Main/member/GetSalePrice',
        method: 'get',
        data:{
           shopid:that.msg.shopid ,
           uid:getname()      
        },
        headers:1,
        successBack:function(ret){
          
          console.log($api.jsonToStr(ret))
          if(ret.success&&ret.status==1){
            that.xiaoshou=ret.Data
          }else{
            promptMsg(ret.err)
          }
        }
        })
  },
  mounted(){}
}
</script>
<style lang="scss">
.font_10{font-size: rem(10);} .font_11{font-size: rem(11);} .font_12{font-size: rem(12);} .font_13{font-size: rem(13);} .font_14{font-size: rem(14);} .font_17{font-size: rem(17);} .font_18{font-size: rem(18);} .font_16{font-size: rem(16);} .font_20{font-size: rem(20);} .font_24{font-size: rem(24);}
.color_333{color: #333;} .color_666{color: #666;} .color_999{color: #999;} .color_light_yellow{color: #CDA86E;} .color_fff{color: #fff;} .color_000{color: #000;} .color_ccc{color: #ccc;}
.flex { display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex;}
.flex_v { -webkit-box-orient: vertical; -webkit-flex-direction: column; -ms-flex-direction: column; flex-direction: column; }
.flex_1 { -webkit-box-flex: 1; -webkit-flex: 1; -ms-flex: 1; flex: 1; }
.flex_align_center { -webkit-box-align: center; -webkit-align-items:center; -ms-flex-align: center; align-items: center; }
.flex_pack_center { -webkit-box-pack: center; -webkit-justify-content: center; -ms-flex-pack: center; justify-content: center; }
.flex_pack_right { -webkit-box-pack: flex-end; -webkit-justify-content: flex-end; -ms-flex-pack: flex-end; justify-content: flex-end; }
.flex_pack_justify_between { -webkit-box-pack: justify; -webkit-justify-content: space-between; -ms-flex-pack: justify; justify-content: space-between; }
.flex_pack_justify_around { -webkit-box-pack: justify; -webkit-justify-content: space-around; -ms-flex-pack: justify;
justify-content: space-around; }
.translateXY{transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);-moz-transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);-o-transform: translateX(-50%);}
.transition_ease_in_out_fast{-moz-transition:all 0.1s ease-in-out;-webkit-transition:all 0.1s ease-in-out;-o-transition:all 0.1s ease-in-out;transition:all 0.1s ease-in-out;}
.overflow_boxsizing{overflow: hidden; box-sizing: border-box;}
.line_over_2{overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
*{margin: 0; padding: 0;}
body {background-color: #F6F6FA; font-size: rem(14); font-family:PingFangSC-Regular;}
/* 个人信息头部 */
.user_msg_container {
    @extend .overflow_boxsizing, .flex;
    width: 100%;
    height: rem(110);
    background-color: #fff;
    padding: rem(21) rem(15) rem(17);
    .user_img_box {
        width: rem(72);
        height: rem(72);
        margin-right: rem(12);
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
    }
    .right_list{
      .user_names{
        font-weight: 400;
        @extend .flex, .flex_align_center;
        .user_shop_type{
          width:rem(60);
          height:rem(18);
          background:linear-gradient(270deg,rgba(232,55,74,1) 0%,rgba(253,94,67,1) 100%);
          border-radius:rem(9);
          font-size:rem(10);
          font-weight:600;
          color:rgba(255,255,255,1);
          text-align: center;
          margin-left: rem(9);
        }
      }
      .user_right_bottom{
        height: rem(17);
      }
      .user_right_bottom > div{
        height: rem(17);
        line-height: rem(17)
      }
    }
}

.bottom_content_container {
  @extend .font_14, .color_999;
  background-color: #fff;
  padding: 0 rem(15);
  >div{
    @extend .flex, .overflow_boxsizing, .flex_align_center, .flex_pack_justify_between;
    border-top: 1px solid #F6F6FA;
    width: 100%;
    height: rem(48);
    >div:nth-child(even) {
      @extend .color_333, .flex, .flex_align_center;
    }
  }
  img{
    width: rem(18);
    height: rem(18);
    margin-right: rem(5);
  }
}

</style>