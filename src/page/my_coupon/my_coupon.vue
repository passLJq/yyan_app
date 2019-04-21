<template>
  <section>
    <header class="my_coupon_header" id="header">
      <div class="mo" @click="changeCon(0)">
        未使用
        <span v-if="hasData(0)">{{listNum(0)}}</span>
      </div>
      <div class="mo" @click="changeCon(1)">
        已使用
        <span v-if="hasData(1)">{{listNum(1)}}</span>
      </div>
      <div class="mo" @click="changeCon(2)">
        已过期
        <span v-if="hasData(2)">{{listNum(2)}}</span>
      </div>
      <div class="line" ref="line" style="left: 4.7%;transition: all 0.5s ease-out;"></div>
    </header>
    <van-swipe ref="swipe" id="swip" @change="changeContent" style="opacity: 0" :style="{'opacity': isDone ? '1' : '0'}" :loop="false" indicator-color="white" :show-indicators="false">
      <van-swipe-item class="couponContent" :id="forId(index)" v-for="(item, index) in listMsg" :key="index">
        <div class="coupon_item" :class="{'pass' : index==2?true:false}" v-if="hasData(index)" v-for="(itm, idx) in item" :key="idx" @click="goCanUse(idx, index)">
          <div class="left">
            <div class="top">
              <div class="price">
                <span class="p">{{itm.facevalue}}</span>
                <span>元</span>
              </div>
              <div class="exp">
                <p>满{{itm.uselimit}}元可用</p>
                <p>有效期至：{{itm.time}}</p>
              </div>
            </div>
            <div class="bottom">
              {{itm.israandom ? '随机券' : itm.couponalias}}
            </div>
          </div>
          <div class="right" v-if="index==0">
            <p>去</p>
            <p>使</p>
            <p>用</p>
          </div>
          <div class="right" v-if="index==1">
            <p>已</p>
            <p>使</p>
            <p>用</p>
          </div>
          <div class="right" v-if="index==2">
            <p>已</p>
            <p>过</p>
            <p>期</p>
          </div>
        </div>    
        <!-- 没有数据 -->
        <div class="no_coupon" v-if="!hasData(index)" @click="goCouponCenter">
          <img src="../../img/couponNoData1.png" alt="">
          <p>您还没有优惠券喔~</p>
          <div class="btn">
            去领券
          </div>
        </div>

      </van-swipe-item>
      
    </van-swipe>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        listMsg: [
          [],
          [],
          []
        ],
        isDone: false,
        loadTimer: null,
        clickindex:0
      }
    },
    created() {
      console.log(getname())
      this.getMsg()
    },
    mounted() {
     if(window.api){
        //下拉刷新
        var that=this
        if (api.systemType != 'android') {
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
              var index=that.clickindex
                that.getMsg(index)
            },1000)
          });
        } 
      }
      var header = $api.byId('header')
      var h = document.documentElement.clientHeight || document.body.clientHeight
      $api.byId('swip').style.height = h - header.offsetTop - header.offsetHeight + 'px' // 获取屏幕剩余高度
    },
    methods: {
      getMsg() {
        this.loadTimer = setTimeout(function () {
          showLoading()
        }, 1000)
        this.getCouMsg(0)
        this.getCouMsg(1)
        this.getCouMsg(2)
      },
      getCouMsg(slide) {
        let sta = 1
        let isexpire = undefined
        if (slide === 0 || slide === 1) {
          sta = slide + 1
        } else if (slide === 2) {
          sta = 1
          isexpire = 2
        }
        https({
          url: siteUrl + 'Marketing/Coupon/GetUserCouponListJson',
          data: {
            uid: window.api ? api.getPrefs({sync: true,key: 'SessionUserID'}) : $api.getStorage('SessionUserID'),
            sta: sta, //状态 0-未激活 1-未使用 2-已使用
            isexpire: isexpire //sta == "1" && isexpire == 1-未激活的卷，sta == "1" && isexpire == 2) 未使用过期的卷，sta == "1"未使用未过期的卷
          },
          headers: 1,
          successBack: ret => {
            if (this.loadTimer != null) {
              hideLoading()
              clearTimeout(this.loadTimer)
              this.loadTimer = null
            }
            if (!ret) return promptMsg(err.Msg)
            if (ret.success && ret.status == 1) {
              var data = ret.Data
              if (data.length) {
                data.map(item => {
                  item.time = this.getTime(item.endtime)
                })
                this.listMsg[slide] = data
              }
              console.log(data)
              this.$forceUpdate()
            }
            // console.log(this.listMsg)
            this.isDone = true
                  if(window.api){
        api.refreshHeaderLoadDone();     
                  }
          }
        })
      },
      getTime(t) {
        return t.split(' ')[0]
      },
      // 是否有数据
      hasData(index) {
        // console.log(this.listMsg[index][0])
        if (this.listMsg && this.listMsg[index][0]) {
          return true
        } else {
          return false
        }
      },
      // 数据数量
      listNum(index) {
        if(this.listMsg && this.listMsg[index]) {
          if (this.listMsg[index].length) {
            return this.listMsg[index].length
          }
        }
        return 0
      },
      changeCon(index) {
        this.$refs.swipe.swipeTo(index)
        this.changeContent(index)
      },
      changeContent(index) {
        this.clickindex=index
        if (index == 0) {
          this.$refs.line.style.left = '4.7%'
        } else if (index == 1) {
          this.$refs.line.style.left = '43.9%'
        } else if (index == 2) {
          this.$refs.line.style.left = '83.4%'
        }
      },
     
      // 去领券中心
      goCouponCenter() {
        console.log('这是调到领券中心')
        // 这是调到领券中心
        openWin({
          name: 'coupon_center',
          url: './coupon_center.html',
          bgColor:"#f5f5f5",
          pageParam:{
            title: '领券中心'
          }
        },1)
      },
      forId(index) {
        return 'item_' + index
      },
      goCanUse(idx, index) {
        // 有type表示未領的
        if (index != 0) return
        var listData = this.listMsg[0]
        var data = listData[idx]

        // 通用券跳转
        if (data.isCurrencyCoupon) {
          if (data.couponType == 6) {
            openWin({
              name: 'grouplist',
              url: './grouplist.html',
              bgColor: '#f5f5f5',
              pageParam: {
                title: '劲爆拼团'
              }
            }, 1)
          } else if (data.couponType == 7) {
            openWin({
              name: 'timebuy',
              url: './timebuy.html',
              bgColor: '#fff',
              pageParam: {
                title: '限时抢购'
              }
            }, 1)
          } else {
            // 返回首页
            // api.closeToWin({
            //   name: 'root',
            // });
            api.sendEvent({
              name: 'gobackroot'
            });
            api.closeWin()
          }
        } else {
          // 专属券则关联可使用的商品
          var way = ''
          if (data.couponType == 6) {
            way = 'groupbuy'
          } else if (data.couponType == 7) {
            way = 'rushbuy'
          }
          openWin({
            url: './coupon_can_use.html',
            name: 'coupon_can_use',
            pageParam: {
              title: '可用商品',
              way,
              couponid: data.couponid,
            },
            bgColor:'#fff'
          }, 1)
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "my_coupon.scss";
</style>