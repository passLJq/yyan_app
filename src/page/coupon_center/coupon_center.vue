<template>
<section>
  <div class="coupon_center" :style="unGet ? unGet.length ? '' : 'display: none;' : 'display: none;'">
    <div class="cou_item" v-for="(item, index) in unGet" :key="index" @click="goCanUse(index, 1)">
      <div class="ex">
        <div class="left">
        <div>{{item.israandom ? '??' : item.facevalue}}</div><div>元</div>
        </div>
        <div class="right">
          <p class="unt">满{{item.uselimit}}可用</p>
          <p class="date">可领取时间至: {{item.time}}</p>
          <p class="date">使用有效期：{{item.useday}}天</p>
          <p class="explain">{{item.israandom ? '随机券' : item.couponalias}}</p>
        </div>
      </div>
      <div class="btn" @click.stop="getCoupon(item.couponid, index)">立即领取</div>
    </div>
  </div>
  <!-- 无数据样式 -->
  <div class="coupon_center_nodata" v-if="!unGet">
    <img src="../../img/couponNoData1.png" alt="">
    <p>很遗憾</p>
    <p>您暂无可领的优惠券</p>
  </div>
  
  <!-- <div class="hasget" v-if="uid" :style="showHasGet ? showHasGet.length ? '' : 'display: none;' : 'display: none;'">
    <div class="hasItem" v-for="(item, index) in showHasGet" :key="item.couponid" @click="goCanUse(index)">
      <div class="ll">
        <div class="upp">
          <div class="left">
            <p>{{item.israandom ? '??' : item.facevalue}}</p>
            <p>元</p>
          </div>
          <div class="right">
            <p>满{{item.uselimit}}元可用</p>
            <p>有效期至: {{getUseEndTime(item.userendtime)}}</p>
          </div>
        </div>
        <p class="doww">{{item.israandom ? '随机券' : item.couponalias}}</p>
      </div>
      <div class="rr">

      </div>
    </div>
  </div> -->
</section>
</template>

<script>
  export default {
    data() {
      return {
        // companyid: pageParam('cid'),        // 商家id
        companyid: '',                      // 商家id
        unGet: '',                          // 优惠券数据
        hasGet: '',
        loadTimer: null,
        uid: '',
        fxshopid: '',
        unGetonclick:[] //请求接口，只有等接口返回才允许继续点
      }
    },
    created() {
      this.uid = getname()
      this.fxshopid = getname('SessionShopID')

      if (window.api) {
        var that=this
        api.addEventListener({
          name: 'loginSuccess'
        }, function(ret, err){
          this.uid = getname()
          this.fxshopid = getname('SessionShopID')
        });
        api.addEventListener({
          name: 'loginout'
        }, function(ret, err){
          this.uid = ''
          this.fxshopid = ''
        });
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
              that.getMsg()
          },1000)
        }); 
      }
    },
    computed: {
      // 筛选显示已领取的优惠券
      showHasGet() {
        var arr = []
        if (this.hasGet && this.hasGet.length > 0 && this.uid) {
          this.hasGet.map(item => {
            if (!this.fxshopid) {
              if (item.couponType != '3') {
                arr.push(item)
              } 
            } else {
              arr.push(item)
            }
          })
        } else {
          arr = ''
        }
        return arr
      }
    },
    mounted() {
      this.getMsg()
    },
    methods: {
      getMsg() {
        this.loadTimer = setTimeout(function () {
          showLoading()
        }, 500)
        if (this.companyid) {
          this.getComCou()
        } else {
          this.getAllCou()
        }
      },
      // 获取所有优惠券
      getAllCou() {
        https({
          url: siteUrl + '/Marketing/Coupon/GetCouponListJson',
          data: {
            ispaltform: 3,            // 3是包括商家券与平台券
            uid: window.api ? api.getPrefs({sync: true,key: 'SessionUserID'}) : $api.getStorage('SessionUserID'),
          },
          headers: 1,
          successBack: ret => {
            this.couponBack(ret)
          }
        })
      },
      // 获取商家优惠券
      getComCou() {
        https({
          url: siteUrl + '/Marketing/Coupon/GetCouponListJson',
          data: {
            ispaltform: 3,            // 3是包括商家券与平台券
            comid: this.companyid,
            isrb: 'false',
            uid: window.api ? api.getPrefs({sync: true,key: 'SessionUserID'}) : $api.getStorage('SessionUserID'),
          },
          headers: 1,
          successBack: ret => {
            this.couponBack(ret)
          }
        })
      },
      couponBack(ret) {
        // console.log(ret)
        if (this.loadTimer != null) {
          hideLoading()
          clearTimeout(this.loadTimer)
          this.loadTimer = null
        }
        let data = []
        if (ret.success && ret.status == 1) {
          if (ret.Data.length) {
            ret.Data.forEach(item => {
              data.push(item)
            })
          }
        } else {
          app.promsg(ret.err)
        }
        if (data.length) {
          var hasGet = []
          var unGet = []
          var unGetonclick=[]
          
          data.forEach(item => {
            // isover 表示总数领取完了 或领取次数剩余0了 就加入已领取列表
            if (!item.isover && (item.eachamount - item.getnum) > 0 && item.couponType != 2 && item.couponType != 3) {
              item.time = this.getTime(item.endtime)
              item.state = this.getState(item.endtime)
              var userdate=item.userendtime.substring(0,10).replace(/\./g,"-")
              item.useday=this.DateDiff(userdate)
              if (item.getnum >= 1) {
                if (item.getnum > 1) {
                  for(let i=0;i<item.getnum;i++) {
                    hasGet.push(item)
                  }
                } else {
                  hasGet.push(item)
                }
              }
              unGetonclick.push(true)
              unGet.push(item)
            } else {
              item.time = this.getTime(item.userendtime)
              item.state = this.getState(item.endtime)  // 1 即将过期 2 已过期  0 正常
              if (item.getnum > 1) {
                // 获取的数量大于1则遍历
                for (let i = 0; i < item.getnum; i++) {
                  hasGet.push(item)
                }
              } else {
                hasGet.push(item)
              }
            }
          })
          if (!hasGet.length) hasGet = ''
          if (!unGet.length) unGet = ''
          this.hasGet = hasGet
          this.unGet = unGet
          this.unGetonclick=unGetonclick
          console.log(unGet)
          console.log(hasGet)
        }
              if(window.api)
        api.refreshHeaderLoadDone();   
      },
      getState(time) {
        var t1 = Date.now()
        var t2 = Date.parse(new Date(time))
        // console.log(time)
        var t3 = t2 - t1
        if (t3 > 0 && t3 <= 432000000) {
          return 1
        } else if (t3 <= 0) {
          return 2
        }
        return 0
         // 1 即将过期 2 已过期  0 正常
      },
      getTime(t) {
        // var t1 = t.split(' ')[0]
        // var t2 = t1.split('.')
        return t.split(' ')[0]
        // return t2[0] + '-' + t2[1] + '-' +t2[2]
      },
      getCoupon(cid, idx) {
        var that = this
        //重复提交限制
        if(!that.unGetonclick[idx]){
            promptMsg('领取处理中,请勿重复点击')
            return
        }
        that.unGetonclick[idx]=false
        https({
          url: siteUrl + 'Marketing/Coupon/ReceiveCoupon',
          data: {
            uid: window.api ? api.getPrefs({sync: true,key: 'SessionUserID'}) : $api.getStorage('SessionUserID'),
            couponid: cid
          },
          headers: 1,
          successBack: ret => {
            if (ret && ret.success && ret.status == 1) {
             that.unGetonclick[idx]=true
              promptMsg('领取成功')
              let data = that.unGet[idx]
              data.getnum += 1
              if ((data.eachamount - data.getnum) <= 0) {
                that.unGet.splice(idx, 1)
                if (that.unGet.length == 0) that.unGet = ''
              } else {
                that.unGet[idx] = data
              }
              if (!that.hasGet) that.hasGet = []
              that.hasGet.push(data)
              that.$forceUpdate()
            } else if (ret.status == 5) {
              promptMsg('该优惠券已全部领完了')
              // 总数为零
              let data = that.unGet[idx]
              that.unGet.splice(idx, 1)
              // that.hasGet.push(data)
              that.$forceUpdate()
            }
             else {
             that.unGetonclick[idx]=true
              promptMsg(ret.err)
            }
          },
          errorBack:function(err){
             that.unGetonclick[idx]=true
             promptMsg(err.msg)
          }
        })
      },
      goCanUse(index, type) {
        var data = ''
        // 有type表示未領的
        if (type) {
          data = this.unGet[index]
        } else {
          data = this.hasGet[index]
        }
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
            api.sendEvent({
                name: 'gobackroot'
              });
            setTimeout(function () {
              api.closeToWin({
                name: 'root',
                animation: {
                  type: 'push',
                  subType:"from_right"
                }
              });
            }, 500)
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
      },
      getUseEndTime(time) {
        if (time) {
          var t1 = time.split(' ')[0]
          if (t1 && t1 != '' && t1 != null) {
            return t1
          } else {
            return time
          }
        } else {
          return ''
        }
      },
      DateDiff(sDate2) {
        //sDate1和sDate2是2002-12-18格式
        var timese=new Date();
        var todey=timese.getFullYear()+'-'+(timese.getMonth()+1)+'-'+timese.getDate();
        var aDate, oDate1, oDate2, iDays;
        aDate = todey.split("-");
        oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]); //转换为12/18/2002格式
        aDate = sDate2.split("-");
        oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
        return iDays;
      }
    }
  }
</script>
<style lang="scss">
@import "coupon_center.scss";
</style>