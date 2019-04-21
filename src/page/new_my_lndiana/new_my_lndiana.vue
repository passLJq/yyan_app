<template>
  <section>
    <div class="my" id="my">
      <!-- <block -->
        <div class="itm flex flex_v flex_align_center" v-for="(item, index) in msgReady"  @click="toDetail(index)" :key="index"> <!-- data-cid="{{item.cloudid}}" data-pid="{{item.productid}}" data-jieshu="{{item.state == 5 ? 0 : 1}}" -->
          <!-- 头部 -->
          <div class="head flex flex_align_center flex_pack_justify_between">
            <span v-cloak>{{item.lotterytime || item.endtime}}</span>
            <span v-cloak>{{item.state == 4 ? '已开奖' : item.state == 3 ? '已失效' : '未开奖'}}</span>
          </div>
          <!-- 横线 -->
          <div class="line"></div>
          <!-- 商品数据 -->
          <div class="content flex">
            <div class="pic">
              <img v-lazy="item.img">
            </div>
            <div class="data">
              <div class="title line_over_2">{{item.proname}}</div>
              <!-- 进度条 -->
              <div class="progress">
                <div style="background-color: #F5AC9E;" :style="{width: (item.amout / item.totalamout) * 100 + '%'}"></div>
              </div>
              <!-- 参与人数 -->
              <div class="join flex flex_pack_justify_between">
                <span v-cloak>{{item.amout}}人已参与</span>
                <span v-cloak>剩余{{item.remainingamout}}</span>
              </div>
              <!-- 价格 -->
              <div class="price">
                <span>￥</span>
                <span v-cloak>{{item.price}}</span>
                <span v-cloak>原价 {{item.proprice}}</span>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <!-- 按钮 -->
            <div class="btnGroup flex flex_align_center flex_pack_right">
              <div class="btn flex flex_align_center flex_pack_center" v-show="item.state == 3 || item.state == 4" @click.stop="toResult(item.state, index)">揭晓结果</div>
              <div class="btn flex flex_align_center flex_pack_center" @click.stop="checkNumber(item.state, index, item.cloudid)">查看号码</div>
            </div>
        </div>
        
        <div class="flex flex_v flex_align_center" style="width: 100%;" v-if="!isDone">
          <div class="flex flex_align_center flex_pack_center noda">
            <img src="../../img/nostate.png">
          </div>
          <span class="fs_12" style="color:#666;">您还没有活动</span>
          <!-- <span class="fs_12" style="color:#666;">您还没有抽奖活动，快去参加吧</span> -->
          <div class="look" @click="tolndiana">去抽奖看看</div>
        </div>

    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        isDone: false,      // 数据是否加载完毕
        page: 1,            // 夺宝列表页数
        pageSize: 4,        // 夺宝页数量
        msg: '',            // 列表数据
        winningcode: '',    // 中奖号码
        hasMore: true,      // 是否还有更多数据
        // done: false         // 判断夺宝是否已结束
        already: false      // 页面是否可以加载
      }
    },
    created(){
      var that = this
      this.getData()
      this.onBottom()
      window.onscroll = function () {
        let top = document.body.scrollTop || document.documentElement.scrollTop
        if (top > 0) {
          refreshDone()
        }
      }
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
            }, 500)
          })
      }
    },
    mounted() {
      if (window.api && api.deviceModel == 'iPhone10,3') {
        let my = document.getElementById('my')
        my.style.paddingBottom = api.getPrefs({sync: true,key: 'safeAreaBottom'}) + 'px'
      }
    },
    watch: {
      msg() {
        if (this.msg && this.msg.length > 0) {
          this.isDone = true
        } else {
          this.isDone = false
        }
      }
    },
    computed: {
      msgReady() {
        if (this.isDone) {
          return this.msg
        } else {
          return false
        }
      }
    },
    methods: {
      // 获取我的夺宝列表信息
      getData() {
        showLoading()
        https({
          url: siteUrl + '/arketing/Cloudbuy/GetMyCloudShoppingSet',
          data: {
            currentPage: this.page,
            pageSize: this.pageSize,
            uid: getname(),
            type: 100 // 1: 未揭晓 2: 已揭晓 3: 已中奖 100: 未揭晓+已中奖
          },
          headers: 1,
          successBack: (ret) => {
            hideLoading()
            refreshDone()
            // console.log(JSON.stringify(ret))
            if (ret.success && ret.status == 1) {
              if (this.page == 1) {
                this.msg = ret.Data
              } else {
                this.msg = this.msg.concat(ret.Data)
              }
            // console.log(this.data.msg)
            } else if (ret.success && ret.status == 2) {
              this.hasMore = false
              // promptMsg('没有更多数据了')
            }
            this.already = true
          }
        })
      },
      // 重置
      reset() {
        this.isDone = false
        this.page = 1
        // this.msg = ''
        this.hasMore = true
        this.getData()
        // this.already = false
      },
      // 页面触底  加载更多数据
      onBottom () {
        if (!window.api) return
        api.addEventListener({ name: 'scrolltobottom' }, (ret, err) => {
          if (!this.hasMore) return
          this.page += 1
          this.getData()
        })
      },
      // 跳转商品详情
      toDetail(index) {
        let data = this.msg[index]
        // console.log(JSON.stringify(data))
        openWin({
          name: 'lndianaResult',
            url: './new_lndiana_result.html',
          pageParam: {
            title: '抽奖详情',
            cloudid: data.cloudid,
            way: 'detail', // 表示跳转抽奖详情
            bgColor: '#f6f6fa',
            hScrollBarEnabled: false,
            vScrollBarEnabled: false
          }
        },1)
      },
      // 跳转揭晓结果
      toResult(state, index) {
        var invalid = 0   // 是否为失效 0为否(已开奖) 1为是(已失效)
        if (state == 3) {
          invalid = 1
        }
        let data = this.msg[index]
        // 已开奖，却没有中奖人，则失效
        if (state == 4) {
          if (!data.winningcode) invalid = 1
        }
        openWin({
          name: 'lndianaResult',
            url: './new_lndiana_result.html',
          pageParam: {
            title: '揭晓结果',
            cloudid: data.cloudid,
            endtime: data.lotterytime || data.endtime,
            img: data.headphoto || '',
            invalid,
            pid: data.productid,
            user: data.username || '',
            winningcode: data.winningcode || '',
            bgColor: '#f6f6fa',
            hScrollBarEnabled: false,
            vScrollBarEnabled: false
          }
        },1)
      },
      // 跳转
      tolndiana () {
        openWin({
          name: "lndiana",
            url: './new_lndiana.html',
          bgColor: "#EFEFEF",
          pageParam: {
            title: '分享抽奖',
            bgColor: '#f6f6fa'
          }
        },1)
      },
      // 查看号码
      checkNumber(state, index, cloudid) {
        var done = false
        if (state != 1) {
          done = true
        }
        this.winningcode = this.msg[index].winningcode || ''
        api.openFrame({
            name: 'checkNumber',
            url: './showRule.html',
            rect: {
                x: 0,
                y: 0,
                w: 'auto',
                h: 'auto'
            },
            pageParam: {
                cloudid,
                winningcode: this.winningcode,
                done,
            },
            bounces: false,
            bgColor: 'rgba(0,0,0,0)',
            vScrollBarEnabled: false,
            hScrollBarEnabled: false
        });
      }
    }
  }
</script>
<style lang="scss">
  @import "new_my_lndiana.scss";
</style>