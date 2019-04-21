<template>
    <div>
    <section style="background:#F6F6FA;width:100%;overflow:hidden">
      <div v-if="once">
        <div class="pro_box" v-for="(item, index) in listdata" :key="item.pid" @click="godetail(index)">
          <img :src="item.propic" alt="" class="pro_img">
          <div class='pro_right'>
            <div class="pro_title" v-cloak>
              <p><span v-cloak>{{item.gbuynum}}人团</span>{{item.title}}</p>
            </div>
            <div class="pro_main">
              <div class="listuer" style="display: flex;">
                <div v-for="(useritem, indexs) in item.userimglist" :style="indexs > 4 ? 'display: none;' : ''" :key="indexs">
                  <img v-if="useritem!=''" :src="useritem" alt="">
                  <img v-else src="../../img/man.jpg" alt="">
                </div>
              </div>
              <p v-cloak>共{{item.userimglist.length||0}}人参加</p>
            </div>
            <div class="pro_foot">
              <div>
                <span class="p1" v-cloak>&yen;{{item.gbprice|toFixed}}</span>
                <span class="p2" :class="listdata[index].proprice > 999 ? 'fs_10' : ''" v-cloak>原价&yen;<del>{{item.proprice|toFixed}}</del></span>
              </div>
              <div class="p3">立即开团</div>
            </div>
          </div>
        </div>

        <div class="pro_box" v-for="(item, index) in prodata" :key="item.pid" @click="godetail(index)">
          <img :src="item.proImg" alt="" class="pro_img">
          <div class='pro_right'>
            <div class="pro_title" v-cloak>
              <p>{{item.proName}}</p>
            </div>
            <div class="pro_foot">
              <div style="margin-top: 5%;">
                <span class="p1" v-cloak>&yen;{{item.vipPrice|toFixed}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="pro_box" v-for="(item, index) in rushdata" :key="item.pid" @click="godetail(index)">
          <img :src="item.src" alt="" class="pro_img">
          <div class='pro_right'>
            <div class="pro_title" v-cloak>
              <p>{{item.title}}</p>
            </div>
            <div class="pro_foot">
              <div style="margin-top: 3.5%;">
                <span class="p1" v-cloak>&yen;{{item.salePrice|toFixed}}</span>
                <!-- <span class="p2" :class="listdata[index].proprice > 999 ? 'fs_10' : ''" v-cloak>原价&yen;<del>{{item.proprice|toFixed}}</del></span> -->
              </div>
            </div>
            <div class="profoot">
              <div class="profppyt">
              <div class="loading">
                <div class="loadingback" :style="{width:((item.chenjiaoNum/item.totalstocks*100)|toFixed)+'%'}"></div>
              </div>
                <p class='pros'>已抢{{(item.chenjiaoNum/item.totalstocks*100)|toFixed}}%</p>
              </div>
              <div class='nowbuy'>
                <img src="../../img/main/wwouu.png" alt="">
                <p>立即抢</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- <div v-else>
        <div class="noRec" id="noRec" style="display: block;">
          <div class="square">
            <img src="../../image/noaddress.png" alt="目前没有活动" style="width:100%;">
          </div>
          <div class="ic_text">抱歉，目前没有活动~</div>
        </div>
      </div> -->
    </section>
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
      once:false,//第一次加载完在显示
      // checkindexs:0,
      // redlinewhere:'',
      // imgdata:'',
      // classidlist:'',//分类列表
      listdata:'',// 拼团列表数据
      rushdata:'',// 限时抢购列表数据
      prodata:'',// 普通商品列表数据
      // stopload:false,
      // currpage:1,
      // classid:'',
    }
  },
  watch:{},
  computed:{
      // checkindex(){
      //     return "active"
      // }
  },
  filters: {
    toFixed: function(value) {
      value = Number(value)
      return value.toFixed(2)
    }
  },
  methods:{
    // 重置
    // reset() {
    //   this.checkindexs = 0
    //   this.currpage = 1
    // },
    prolistdata(){
      var that=this
      var type = 1
      if (pageParam('way') == 'rushbuy') {
        type = 7
      } else if (pageParam('way') == 'groupbuy') {
        type = 6
      }
      https({
        url: siteUrl + 'Marketing/Coupon/getCouponInProduct',
        data: {
          coupon: pageParam('couponid'),
          type,
          // coupon: '181227115802577279',
          // type: 1,
          fxshopid: getname('SessionShopID')
        },
        successBack: ret => {
          console.log(ret)
          if (ret.success) {
            if (pageParam('way') == 'rushbuy') {
              that.rushdata = ret.Data
            } else if (pageParam('way') == 'groupbuy') {
              that.listdata = ret.Data
            } else {
              that.prodata = ret.Data
            }
          } else {
            promptMsg(ret.err)
          }
          that.once = true
        }
      })
      
    },
    godetail(index) {
      if (pageParam('way') == 'groupbuy') {
        openWin({
          url:'./new_lndianaDetail.html',
          name:'groupbuy',
          useWKWebView:true,
          pageParam:{
            title:'拼团详情',
            share: true,
            gbid: this.listdata[index].gbid,
            pid: this.listdata[index].pid
          }
        }, 1)
      } else if (pageParam('way') == 'rushbuy') {
        var pid = this.rushdata[index].pid
        openWin({
          name:'productDetail'+pid,
          url:'./productDetail.html',
          useWKWebView:true,
          pageParam:{
            pid
          }
        })
      } else {
        var pid = this.prodata[index].proId
        openWin({
          name:'productDetail'+pid,
          url:'./productDetail.html',
          useWKWebView:true,
          pageParam:{
            pid
          }
        })
      }
    }, 
  },
  created(){
      var that=this
      if(window.api){
        // api.addEventListener({
        //   name: 'scrolltobottom'
        // }, function(ret, err) {
        //     if (!that.stopload) {
        //         that.currpage = that.currpage + 1;
        //         that.prolistdata()
        //     }
        // });
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
          setTimeout(function () {
            // that.reset()
            that.prolistdata()
          }, 500)
        })
      }
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll)
    this.prolistdata()
  }
}
</script>
<style lang="scss">
.van-swipe-item{
  img{
    width: 100%;
  }
}
@mixin item {
  display: flex;
  align-items: center;
}
@mixin font1 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
@mixin font2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
img{display: block;}
/*头部轮播*/
.tuan_wrap {
  width: 100%;
}
.tuan_banner .banner_img {
    display: block;
    width: 100%;
    overflow: hidden;
}
img {
    border: 0;
    vertical-align: middle;
}

.tuan_btn_ctn {
    height: 40px;
    font-size: 15px;
    margin-bottom: 2px;
    background-color: #fff;
}
.tuan_btn_ctn .tuan_btn_active {
    color: #f44836;
    border-bottom: 2px solid #f44836;
}
.tuan_btn_ctn .tuan_btn {
    display: block;
    float: left;
    width: 50%;
    height: 100%;
    color: #666;
    text-align: center;
    line-height: 40px;
}
.gun_waibox{
  overflow:hidden;
  width: 100%;
}
.gun_box{
  @include item;
  overflow-x: scroll;
  position: relative;
}
.gun_ul{
  position: relative;
  width: rem(88);
  flex-shrink: 0;
  text-align: center;
  p{
    color: #9B9B9B;
    font-size: rem(14);
    padding: rem(8) 0;
  }
}
.line{
  position: absolute;
  width: rem(88);
  bottom:0;
  height: rem(5);
  transition: left .5s;
  left: 0px;
  .redline{
    width: 40%;
    height: rem(5);
    border-radius: 30px;
    margin: 0 auto;
    background-color: #FAAFA0
  }
}
.active{
  color: #FF5541;
}
.pro_box{
  @include  item;
  font-size: rem(15);
  padding: rem(22) 0;
  border-bottom: rems(2) solid #f6f6fa;
  background: #fff;
  .pro_img{
    width: rem(100);
    height: rem(100);
    flex-shrink: 0;
    padding: 0 rem(10) 0 rem(19);
  }
  .pro_right{
    padding-right:rem(20)
  }
  .listuer{
    @include item;
    div {
      width:rems(64);
      height:rems(64);
      img {
      border: rem(2) solid #fff;
      }
    }
    div + div {
        margin-left: rem(-11);
      }
  }
  .pro_title{
    span{
      flex-shrink: 0;
      font-size: rem(10);
      color: #fff;
      background:linear-gradient(270deg,rgba(232,55,74,1) 0%,rgba(253,94,67,1) 100%);
      padding: 0 rem(5);
      border-radius: 30px;
      margin-right: rem(8);
    }
    p{
      @include font2;
      color:#666464;
    }
  }
  .pro_main{
    @include item;
    height: rem(35);
    margin-bottom: rem(15);
    justify-content: space-between;
    img{
      width: rem(32);
      height: rem(32);
      border-radius: 50%
    }
    p{
      font-size: rem(12);
      color: #999;
    }
  }
}
.pro_foot{
@include item;
width: rem(227);
justify-content: space-between;
   .p1{
     font-size: rem(18);
     color: #FF5541;
   }
   .p2{
     font-size: rem(12);
     color: #999;
   }
   .p3{
     font-size: rem(12);
     color: #fff;
     padding: rem(8) rem(15);
     border-radius: 30px;
     background:#427161;
   }
}
.fs_10 {
  font-size: rem(10) !important;
}
.noRec{
  background-color: #fff;
}
.fixed{
  position: fixed;
  top:0;
  width: 100%;
  z-index: 9999;
  background-color: #fff;
}
/* 活动规则 */
.rule {
  width:rem(70);
  height:rem(24);
  background-color: #B70000;
  border-radius:rem(12) 0 0 rem(12);
  text-align: center;
  line-height: rem(24);
  font-size: rem(12);
  color: #fff;
  position: absolute;
  top: rem(26);
  right: 0;
  z-index: 99;
}

/* 拼团说明 */
#shuoming {
  background-color:rgba(66,113,97,1);
  display: flex;
  justify-content: center;
}

.explain {
  height: rem(48);
  padding: 0 rem(15);
  display: flex;
  align-items: center;
}

.explain .step {
  width: rem(22);
  height: rem(22);
  display: flex;
  justify-content: center;
  align-items: center;
}

.explain .step + .step {
  margin-left: rem(7);
}

.explain .step div {
  font-size: rem(11);
  display: block;
  background-color: rgba(232, 55, 74, 1);
  width: rem(16);
  height: rem(16);
  line-height: rem(16);
  color: #fff;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.explain span {
  color: #fff;
  font-size: rem(12);
  margin-left: rem(5);
}

.explain .right {
  width: rem(22);
  height: rem(22);
  margin-left: rem(10);
  background: url('../../image/right@3x.png') no-repeat;
  background-position: center;
  background-size: contain;
}

.explain .right img {
  width: 100%;
  height: 100%;
}
#shuoming {
  margin-bottom: rem(10);
}
.profoot{
     @include item;
     font-size: rems(20);
     color: #B2B2B2;
     justify-content: space-between;
     margin-top:rems(20);
     .profppyt{
         @include item;
         width: 60%;
     }
     .pros{
     margin-left: rems(8)
     }
     .nowbuy{
              @include item;
              font-size: rems(26);
              color:#fff;
              padding: rems(13) rems(18);
              background:rgba(252,139,118,1);
              border-radius: 30px;
         img{
             width:rems(34);
             height: rems(34);
             margin-right: rems(10)
         }
     }
}
.loading{
    background: #F2F2F2;
    height: rems(18);
    border-radius: 30px;
    width: 50%;
    overflow: hidden;
    .loadingback{
      background: #FAA696;
      border-radius: 30px;
      height: rems(18);
    }
}
</style>