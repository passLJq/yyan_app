<template>
  <section style="display: none;" :style="{display: isDone ? 'block' : 'none'}">
    <!-- <img src="../../img/banner2.jpg" alt=""> -->
      <!-- 头部轮播 -->
      <!-- <van-swipe :autoplay="3000" v-if="imgUrl?imgUrl.length>0?true:false:false" id="swiper"> -->
      <van-swipe :autoplay="3000" id="swiper" :show-indicators="false">
        <van-swipe-item class="imgBox" v-for="(image, index) in imgUrl" :key="index" @click="clickBanner(image.cid)">
          <img style="display:block" v-lazy="image.soure" />
        </van-swipe-item>
        <van-swipe-item class="imgBox" v-if="imgUrl && !imgUrl.length">
          <img style="display:block" src="../../img/banner2.jpg" />
        </van-swipe-item>
      </van-swipe>
      <!-- 活动规则 -->
      <div class="rule" @click="showRule">活动规则</div>
      <!-- 抽奖说明 -->
      <div id="shuoming">
        <div class="explain flex flex_align_center">
          <div class="step flex flex_align_center flex_pack_center">
            <div class="flex flex_align_center text_center">1</div>
          </div>
          <span>参与活动</span>
          <div class="right"></div>
          <div class="step flex flex_align_center flex_pack_center"><div class="flex flex_align_center text_center">2</div></div>
          <span>好友助力</span>
          <div class="right"></div>
          <div class="step flex flex_align_center flex_pack_center"><div class="flex flex_align_center text_center">3</div></div>
          <span>中奖发货</span>
        </div>
      </div>
      
      <!-- 导航nav -->
      <div class="nav" id="navBar">
        <div style="width: 100%; height: 100%; white-space: nowrap; position: relative;">
            <div v-for="(item, index) in nav" v-bind:key="index" id="nav_item" :class="{active: currentIndex == index}"
             @click="changeNav(index)" data-index="index" data-sqltype="item.sqltype" style="text-align: center;" v-html="item.name"></div>
          <div class="bottomBar" :style="{left: bottomBarPosition > 0 ? bottomBarPosition + 'px' : '16.665%'}"></div>
        </div>
      </div>

      <!-- 商品列表 style="{{isFixTop ? 'margin-top: 90rpx;' : ''}}" -->
      <div class="productList" id="productList">
          <div tapmode v-for="(item, index) in proData" v-bind:key="index" v-show="proData.length" class="list-item flex"  @click="toLndianaDetail(index)" > <!-- data-cid="{{item.cloudid}}" -->
            <div class="pic">
              <img v-lazy="item.img">
            </div>
            <div class="proDetails flex flex_v flex_pack_justify_between">
              <div class="slogan line_over_2">
                <span v-html="item.proname"></span>
              </div>
              <div class="progress">
                <div :style="{width: (item.amout / item.totalamout) * 100 + '%'}"></div>
              </div>
              <div class="member flex flex_align_center flex_pack_justify_between">
                <span style="color: #B2B2B2" v-cloak>{{item.amout}}人已参加</span>
                <span style="color: #B2B2B2" v-cloak>剩余{{item.remainingamout}}</span>
              </div>
              <div class="pricediv flex flex_align_center flex_pack_justify_between">
                <div class="priceText flex flex_align_center">
                  <span :class="{mr_12: item.cloudPrice >= 100 ? false : true}" v-html="'￥'+item.cloudPrice"></span>
                  <span :class="{fs_10: item.proprice >= 1000 || item.cloudPrice >= 100 ? true : false}" v-html="'原价￥'+item.proprice"></span>
                </div>
                <div class="btn close flex flex_align_center flex_pack_center" v-if="sqltype == 3">活动结束</div>
                <div class="btn flex flex_align_center flex_pack_center" style="color:#fff;" @click.stop="goResult(item.cloudid)" v-else-if="item.isparticipate == 2">查看结果</div>
                <div class="btn flex flex_align_center flex_pack_center gradient"
                 style="color: #fff" v-else-if="sqltype == 1">立即抽奖</div>
                 <div class="btn flex flex_align_center flex_pack_center" v-else-if="sqltype == 2 ">立即抽奖</div>
              </div>
            </div>
          </div>
          <!-- 没有内容 -->
          <div class="flex flex_v flex_align_center flex_pack_center" style="width: 100%;" v-if="proData.length <= 0">
            <div class="flex flex_align_center flex_pack_center noda">
              <img src="../../img/naozhong2.png">
            </div>
            <span class="color_333 fs_13">活动商品正在火热上架中，敬请期待</span>
          </div>
      </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        imgUrl: [],
        proData: [],          // 分享商品数据
        hasMore: true,        // 触底是否继续加载商品列表
        page: 1,              // 分享商品数据页数
        pageSize: 5,          // 分享商品每页数量
        sqltype: 1,           // 当前nav选项卡id 1:本期活动 2:下期活动 3:已结束
        nav: [                // nav导航选项数据
          { name: "本期活动", sqltype: "1" },
          { name: "下期活动", sqltype: "2" },
          { name: "已结束", sqltype: "3" }
        ],
        bottomBarPosition: '', // 导航选项底部条的left位置
        currentIndex: 0,       // 导航栏当前选项
        isDone: false         // 是否加载完毕
      }
    },
    created() {
      var that = this
      if (window.api) {
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
              that.reset()
              // that.getProData()
            }, 500)
        });
      }
    },
    mounted() {
      let bottomBar = document.querySelector('.bottomBar')
      this.getBottomW()
      this.scroll()
      this.onBottom()
      this.getProData() // 获取商品列表数据
    },
    watch: {
      // 动态修改横条left
      currentIndex (idx) {
        var nav = document.querySelector('.active')
        let left = idx * nav.offsetWidth
        this.bottomBarPosition = left + (nav.offsetWidth / 2)
      }
    },
    methods: {
      // 点击选项卡切换
      changeNav(idx) {
        this.currentIndex = idx
        this.sqltype = this.nav[idx].sqltype
        this.proData = []
        this.hasMore = true
        this.page = 1
        this.getProData()
      },
      // 获取nav底部宽度
      getBottomW() {
        var nav = document.querySelector('.active')
        this.bottomBarPosition = nav.offsetWidth / 2
      },
      getProData(type) {
        showjindu('加载中...')
        https({
          url: siteUrl + 'Marketing/Cloudbuy/GetCloudShoppingSet',
          data: {
            uid: getname(),
            currentPage: this.page,
            pageSize: this.pageSize,
            sqltype: this.sqltype,
            type: "2"
          },
          successBack: (ret) => {
            // clg(ret)
            hideLoading()
            if (ret.success && ret.status == 1) {
              if (ret.Data.length < this.pageSize) {
                this.hasMore = false
              }
              // ret.Data.forEach(item => {
              //   this.proData.push(item)
              // })
              if (this.proData.length == 0 || type) {
                this.proData = ret.Data
              } else {
                this.proData = [...this.proData, ...ret.Data]
              }
              this.isDone = true
            } else {
              this.isDone = true
              this.hasMore = false
            }
            if (ret.cloudurlimg && ret.cloudurlimg.length > 0) {
                this.imgUrl = ret.cloudurlimg
            }
            refreshDone()
            this.$forceUpdate()
          }
        })
      },
      // 重置data数据
      reset() {
          this.page = 1
          this.sqltype = '1'
          this.hasMore = true
          this.proData = []
          this.currentIndex = 0
          console.log(this.proData)
          this.getProData(1) // 获取商品列表数据
      },
      // 活动规则
      showRule() {
        var content = ''
        if (api.systemType == "ios") {
          content = `1：根据市场价将每个产品分成若干等份，每份X元。
                  <br><br>2：每个用户可对1件商品支持1份或者多份，每支持一份获得1个幸运码。
                  <br><br>3：当1件商品的所有份额都获得支持后，计算出1个“幸运码”，持有幸运码的支持者集拥有该商品。
                  <br><br>4：活动没有达到开奖要求或者已开奖的活动未中奖者，会原路自动退款（注意：中奖者是不退款的）
                  <br><br>5：天天抽奖的订单不产生本店销售管理奖和团队销售管理奖，利润也不参与分红。 计算方式 1：以该商品最后支持时间为截至点，取最后一元的购买者前100条全站记录（这个全站记录是指所有购买一元购的人的记录，并不是单独一个活动的记录）的时间转化成数字（例如21:45:32.123转化后就是214532123）的总和，用这个总和与设置的价钱取余数，这余数加上100000组成最终的幸运号码，（当全站记录没有100条时，则有几条取几条）。
                  <br><br>6: 本活动与美国苹果公司（Apple.Lnc)无关。`
        } else {
          content = `1：根据市场价将每个产品分成若干等份，每份X元。
                  <br><br>2：每个用户可对1件商品支持1份或者多份，每支持一份获得1个幸运码。
                  <br><br>3：当1件商品的所有份额都获得支持后，计算出1个“幸运码”，持有幸运码的支持者集拥有该商品。
                  <br><br>4：活动没有达到开奖要求或者已开奖的活动未中奖者，会原路自动退款（注意：中奖者是不退款的）
                  <br><br>5：天天抽奖的订单不产生本店销售管理奖和团队销售管理奖，利润也不参与分红。 计算方式 1：以该商品最后支持时间为截至点，取最后一元的购买者前100条全站记录（这个全站记录是指所有购买一元购的人的记录，并不是单独一个活动的记录）的时间转化成数字（例如21:45:32.123转化后就是214532123）的总和，用这个总和与设置的价钱取余数，这余数加上100000组成最终的幸运号码，（当全站记录没有100条时，则有几条取几条）。`
        }
        api.openFrame({
            name: 'rule',
            url: './showRule.html',
            rect: {
                x: 0,
                y: 0,
                w: 'auto',
                h: 'auto'
            },
            pageParam: {
                content,
            },
            bounces: false,
            bgColor: 'rgba(0,0,0,0)',
            vScrollBarEnabled: false,
            hScrollBarEnabled: false
        })
      },
      // 跳转抽奖详情
      toLndianaDetail(index) {
        let {cloudid} = this.proData[index]
        openWin({
          name: 'lndianaDetail',
          url: './new_lndianaDetail.html',
          useWKWebView: true,
          pageParam: {
            title: '商品详情',
            cloudid,
            share: true,
            bgColor: '#f6f6fa',
            hScrollBarEnabled: false,
            vScrollBarEnabled: false,
          }
        }, 1)
      },
      // 页面触底  加载更多数据
      onBottom () {
        if (window.api) {
          api.addEventListener({ name: 'scrolltobottom' }, (ret, err) => {
            if (!this.hasMore) return
            this.page += 1
            this.getProData()
          })
        }
      },
      // 页面滚动
      scroll () {
        var that = this
        window.onscroll = function () {
          let top = document.body.scrollTop || document.documentElement.scrollTop
          let swiper = document.getElementById('swiper') // 轮播
          let shuoming = document.getElementById('shuoming') // 活动说明
          let headerTop = swiper.offsetHeight + shuoming.offsetHeight
          if (top > 0) {
            refreshDone()
          }
          let navBar = document.getElementById('navBar') // 选项栏
          let productList = document.getElementById('productList') // 商品列表栏
          if (top > headerTop) {
            navBar.classList.add('fixed')
            productList.classList.add('mt_35')
          } else {
            navBar.classList.remove('fixed')
            productList.classList.remove('mt_35')
          }
          // 浏览器触底加载
          if (!openapp) {
            let b = document.body.offsetHeight
            let h = document.documentElement.clientHeight || document.body.clientHeight
            if (top == (b - h)) {
              if (!that.hasMore) return
              that.page += 1
              that.getProData()
            }
          }
        }
      },
      goResult(cloudid) {
        openWin({
          name: 'lndianaResult',
            url: './new_lndiana_result.html',
          pageParam: {
            title: '抽奖详情',
            cloudid,
            way: 'detail', // 表示跳转抽奖详情
            bgColor: '#f6f6fa',
            hScrollBarEnabled: false,
            vScrollBarEnabled: false
          }
        },1)
      },
      clickBanner(cid) {
        if (!cid || cid == '') return
        openWin({
          name: 'lndianaDetail',
          url: './new_lndianaDetail.html',
          pageParam: {
            title: '商品详情',
            cloudid: cid
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "new_lndiana.scss";
</style>