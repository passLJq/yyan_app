<template>
  <div>
    <van-tabs v-model="active" :line-width="40" swipeable animated sticky @change="changeTab">
      <van-tab title="到账明细">
        <p class="allCom">总计: &yen;{{total[0] | toFixed}}</p>
        <div class="commission_preview" v-for="item in msg[0]" v-show="active == 0">
          <div class="commission_list">
            <p class="clear list_top">
              <span class="fl commission_list_value">{{item.C_CommisionName}}</span>
              <span class="fr commission_list_value">{{item.C_Commision | toFixed}}</span>
            </p>
            <p v-if="item.C_OrderID != '' && item.C_OrderID != null">
              <label class="commission_list_label">订单号</label>
              <span class="commission_list_value order_num">{{item.C_OrderID}}</span>
            </p>
            <p>
              <label class="commission_list_label">到账时间</label>
              <span class="commission_list_value">{{item.C_SuccessTime | getTime}}</span>
            </p>
          </div>
        </div>
        <p class="nomore" v-show="msg[0] && msg[0].length > 0 && !hasMore[0]">没有更多了~</p>
        <div class="noRec" v-if="!msg[0] || msg[0].length <= 0">
          <div class="square">
            <img src="../../image/nodata.png" alt="没有相关数据" style="width:100%;"/>
          </div>
          <div class="ic_text">亲，目前没有相关数据~</div>
        </div>
      </van-tab>
      <van-tab title="钱包明细">
        <p class="allCom">总计: &yen;{{total[1] | toFixed}}</p>
        <div class="commission_preview" v-show="active == 1">
          <div class="commission_list" v-for="(item, i) in msg[1]" :key="i">
            <p class="clear list_top">
              <span class="fl commission_list_value" v-if="item.orderNo != 0">{{item.amount < 0 ? '钱包支付' : '退款金额'}}</span>
              <span class="fl commission_list_value" v-else>{{item.amount < 0 ? '转账到提现账号' : '转账驳回'}}</span>
              <span class="fr commission_list_value" :class="item.amount < 0 ? 'red_color' : ''">{{item.amount | toFixed}}</span>
            </p>
            <p v-show="item.orderNo != 0">
              <label class="commission_list_label">订单号</label>
              <span class="commission_list_value order_num">{{item.orderNo}}</span>
            </p>
            <p>
              <label class="commission_list_label">订单时间</label>
              <span class="commission_list_value">{{item.time}}</span>
            </p>
          </div>
        </div>
        <p class="nomore" v-show="msg[1] && msg[1].length > 0 && !hasMore[1]">没有更多了~</p>
        <div class="noRec" v-if="!msg[1] || msg[1].length <= 0">
          <div class="square">
            <img src="../../image/nodata.png" alt="没有相关数据" style="width:100%;"/>
          </div>
          <div class="ic_text">亲，目前没有相关数据~</div>
        </div>
      </van-tab>
    </van-tabs>
    
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      msg: ['', ''],
      total: [0,0],
      active: 0,
      page: [1, 1],
      pageSize: 10,
      hasMore: [true, true]
    };
  },
  watch: {},
  computed: {},
  methods: {
    changeTab(index) {
      this.active = index
    },
    bindData(index) {
      // console.log(index)
      var i = index ? index : this.active
      if (i == 1) {
        https({
          url: siteUrl +'Main/Member/CashConsumer',
          method: 'get',
          data:{
            uid: getname(),
            currentPage: this.page[i],
            pageSize: this.pageSize
          },
          headers:1,
          successBack: ret => {
            refreshDone()
            hideLoading()
            if (ret.success && ret.status == 1) {
              this.total[1] = ret.Total
              if (this.page[i] == 1) {
                this.msg[i] = ret.Data
              } else {
                this.msg[i] = [...this.msg[i], ...ret.Data]
              }
              if (ret.Data.length < this.pageSize) {
                this.hasMore[i] = false
              }
              // console.log(this.msg)
              this.$forceUpdate()
            } else if (ret.status == 2) {
              this.hasMore[i] = false
            } else {
              promptMsg(ret.err)
            }
          }
        })
      } else {
        https({
          url: siteUrl +'Main/Member/GetCommisionList',
          method: 'get',
          data:{
            uid: getname(),
            pageIndex: this.page[i],
            pageSize: this.pageSize,   
          },
          headers:1,
          successBack: ret => {
            refreshDone()
            hideLoading()
            if (ret.success && ret.status == 1) {
              this.total[0] = ret.Total
              if (this.page[i] == 1) {
                this.msg[i] = ret.Data
              } else {
                var data = this.msg[i]
                this.msg[i] = [...data, ...ret.Data]
              }
              this.$forceUpdate()
            } else {
              promptMsg(ret.err)
            }
          
            if (ret.Data.length < this.pageSize) {
              this.hasMore[i] = false
            }
          }
        })
      }
      // this.$forceUpdate()
    }
  },
  filters: {
    getTime(val) {
      if (val) {
        var p = val.toString()
        console.log()
        var p1 = p.split('.')[0]
        p1 = p1.split('T')[0] + ' ' + p1.split('T')[1]
        return p1
      } else {
        return val
      }
    },
    toFixed(val) {
      return Number(val).toFixed(2)
    }
  },
  created() {
    var date = new Date()
    var year = date.getFullYear()
    var months = date.getMonth() + 1
    showLoading()
    this.bindData(0)
    this.bindData(1)
  },
  mounted() {
    if (window.api) {
      refresh(() => {
        var i = this.active
        this.hasMore[i] = true
        this.page[i] = 1
        this.bindData()
      })
      api.addEventListener({
        name: 'scrolltobottom'
      }, (ret, err) => {
        var i = this.active
        if (this.hasMore[i]) {
          this.page[i] += 1
          showLoading()
          this.bindData()
        }
      })
      api.setWinAttr({
        slidBackEnabled:false
      })
    }
    // window.onscroll = function () {
    //   let clientHeight  = document.documentElement.clientHeight; // 浏览器高度
    //   let scrollHeight = document.body.scrollHeight;             // body超过window的高度
    //   let scrollTop = document.documentElement.scrollTop;        // 滚动视窗的高度距离window顶部的距离
    
    //   let distance = 0;  //距离视窗还用50的时候，开始触发；
    //   console.log(scrollTop + clientHeight + '-------' +scrollHeight)
    //   if ((scrollTop + clientHeight) >= (scrollHeight - distance)) {
    //       console.log("到底了，开始加载数据");
    //   }
    // }
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{background-color: #F3F2F2;/* margin-bottom: rem(60); */ }
 ul,ol{list-style: none;}
 a{ color: #333; text-decoration: none;}
.commission_preview { background-color: #fff; position: relative; padding: 0 rem(15);}
.commission_preview li {background-color: #fff;}
.commission_list {color: #2C5B33; font-size: rem(14); line-height: 2; padding: rem(10) 0;border-bottom:rem(1) solid #F6F6FA; }
.commission_list_label { color: #999999; float: left; margin-right: rem(10); min-width: rem(60);text-align: justify; text-align-last: justify; }
.commission_list_value { display: block; overflow: hidden; overflow-wrap:break-word; word-break: normal; color:#666464;}
.height10 { height: rem(10); background: #f8f8f8; }
.fr{float: right;} .fl{float: left;} .clear:after{content: ""; display: block; clear: both;}
.red_color{color: #F5AC9E;}
.hide{display: none;}
.list_top{font-size: rem(17);}
.order_num{ -webkit-user-select:all; -moz-user-select:all; -ms-user-select:all; user-select:all;}
.noRec {
    padding: rem(20) rem(0);
}
.noRec .square {
    width: rem(180);
    height: rem(130);
    margin: 0 auto;
}
.noRec .ic_text {
    height: rem(24);
    text-align: center;
    color: #999;
    font-size: rem(15);
    padding-top: rem(30);
}
.nomore {
  width: 100%;
  text-align: center;
  color: #999;
  font-size: rems(24);
  padding: rems(30) 0;
}
.allCom {
  font-size: rems(34);
  color: #2C5B33;
  padding: rems(10) rem(15);
  background-color: #fff;
  border-bottom: 1px solid #f6f6fa;
}
</style>