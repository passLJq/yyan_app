<template>
  <section>
    <!-- 商品及获奖者 -->
      <div class="upper flex flex_pack_center flex_align_center">
        <div class="back flex flex_v flex_align_center">
          <div class="proDetail flex" v-if="proMsg">
            <img :src="proMsg.proimg" @error="onerr($event)">
            <div class="content flex flex_v flex_pack_justify_between">
              <div class="title line_over_2" v-html="proMsg.proname"></div>
              <div class="price flex">
                <span>￥</span>
                <span v-cloak>{{proMsg.cloudPrice}}</span>
                <span style="text-decoration: line-through;" v-cloak>{{'原价' + proMsg.proprice}}</span>
              </div>
            </div>
          </div>
          <div style="width: 90%;height: 1px;background: #DEDEE1;"></div>
          <!-- 获奖编号 -->
          <span class="bingo" v-if="!detail" v-cloak>{{pageParam.invalid == 0 ? '本期获奖编号' : '该抽奖已失效'}}</span>
          <span class="bingo code" v-if="!detail" v-cloak>{{pageParam.invalid == 0 ? pageParam.winningcode : '　'}}</span>
          <span class="bingo" v-if="detail&&proMsg.state==4">活动已开奖，请到活动揭晓页查看中奖人信息</span>
          <span class="bingo" v-else-if="detail&&proMsg.state==3">遗憾，活动没有达到开奖条件，已过期</span>
          <span class="bingo" v-else-if="detail&&userData.remaining!=0">我正在参与抽奖</span>
          <span class="bingo" v-else-if="detail&&userData.remaining==0">恭喜您，正在等待开奖</span>
          <!-- 获奖者 -->
            <div class="bingoer flex flex_v flex_align_center" v-if="!detail">
              <img v-if="pageParam.invalid == 0" :src="(pageParam.img&&pageParam.img!='null') ? pageParam.img : './img/man.jpg'">
              <img v-else src="../../img/man.jpg">
              <!-- <div style="color:#EB6100;"></div> -->
            </div>
            <!-- 名字 -->
            <span class="username" style="color:#EB6100;" :style="detail ? 'marginBottom: 0' : ''" v-cloak v-if="!detail">{{pageParam.invalid == 0 ? '获奖者:'+pageParam.user : '　'}}</span>
            <!-- 如果是分享详情则显示头像 -->
              <div v-if="detail" class="avatar flex flex_pack_justify_around" style="flex-wrap: wrap;width: 70%;margin-top: 5%;">
                <!-- 分享者头像 -->
                <div class="item flex flex_v flex_align_center">
                  <img :src="userData.userimg" v-if="userData.userimg">
                  <img v-else src="../../img/man.jpg" alt="">
                  <span class="color_999">{{userData.username | hidePhone}}</span>
                </div>
                <!-- 助力者头像 -->
                <div class="item flex flex_v flex_align_center" v-for="(item, index) in userData.sharedes" :key="index">
                  <img :src="item.userhead" v-if="item.userhead">
                  <img v-else src="../../img/man.jpg" alt="">
                  <span class="color_999 line_over_1">{{item.username}}</span>
                </div>
                <!-- 待助力 -->
                <div class="item flex flex_v flex_align_center" v-for=" (item, index) in remaining" :key="index">
                  <img src="../../img/hui.png">
                  <span class="color_999 line_over_1">待助力</span>
                </div>
              </div>
              <!-- done即分享次数为0 -->
              <div v-if="(proMsg.state==3||proMsg.state==4)&&pageParam.way=='detail'" class="btn" style="background-color: #9b9b9b;">已结束</div>
              <div v-else-if="pageParam.way=='detail'&&!done" @click="goshare" class="btn gradient">继续邀请好友助力</div>
              <!-- <div v-else-if="!done&&pageParam.way=='detail'" @click="goshare" class="btn gradient">助力，即可参加抽奖</div> -->
              <!-- <div v-else-if="done&&status==1&&pageParam.way=='detail'" @click="goLndianaDetail" class="btn gradient">已成功，立即付款</div> -->
              <div v-else-if="done&&pageParam.way=='detail'" @click="goshare" class="btn gradient">立即炫耀</div>
              <!-- <div v-else-if="done&&status==20&&pageParam.way=='detail'" @click="goLndiana" class="btn" style="background-color: #999;">已成功</div> -->
        </div>
      </div>

      <!-- 参与人数与揭晓时间 -->
      <div class="detail flex flex_v flex_align_center" v-if="!detail">
        <div class="flex flex_pack_justify_between flex_align_center">
          <span style="color:#9b9b9b;" >参与人数</span>
          <span style="color:#9b9b9b;"  v-if="proMsg" v-cloak>{{proMsg.amout + '人次'}}</span>
        </div>
        <div style="width: 90%;height: 1px;background: #f6f6fa;"></div>
        <div class="flex flex_pack_justify_between flex_align_center">
          <span style="color:#9b9b9b;"  v-cloak>{{pageParam.invalid == 0 ? '揭晓' : '结束'}}时间</span>
          <span style="color:#9b9b9b;"  v-cloak>{{pageParam.endtime}}</span>
        </div>
      </div>
      <!-- 玩法说明 -->
      <div v-else class="explain" style="background: #fff;">
        <div class="title text_center" style="color: #427161;">玩法说明</div>
        <div class="content flex flex_v flex_align_center">
          <img src="../../img/wanfashuoming@3x.png">
          <div class="flex flex_pack_justify_around">
            <div >
              <span style="color:#9B9B9B;">选择商品 参加活动</span>
            </div>
            <div >
              <span style="color:#9B9B9B;">邀请好友 为你助力</span>
            </div>
            <div >
              <span style="color:#9B9B9B;">人满获得 夺宝资格</span>
            </div>
            <div >
              <span style="color:#9B9B9B;">中奖发奖 失败退款</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部栏 -->
      <!-- <div style="width: 100%;height: 70rpx;"></div> -->
      <div v-if="detail" class="footer flex flex_pack_center flex_align_center" @click="goLndiana">
        <div class="other flex flex_pack_center flex_align_center">其他活动</div>
      </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        pageParam: '',
        proMsg: '',               // 商品数据
        detail: '',               // 
        detail: false,            // 是否
        userData: '',             // 用户数据
        status: 0,                // 用户数据状态码
        remaining: '',            // 待助力的数组
        done: false,              // 该用户的抽奖活动是否已助力完成
        isDone: false             // 是否加载完毕
      }
    },
    filters: {
      hidePhone(value) {
        if (value) {
          var p = String(value)
          var phone = new RegExp(/^1[34578]\d{9}$/)
          if (phone.test(p)) {
            var p1 = String(p).substr(0, 3)
            var p2 = String(p).substr(8, 3)
            return p1 + '****' + p2
          }
          return value
        }
      }
    },
    created() {
      // this.pageParam = {way:'detail'}
      if(window.api) {
        this.pageParam = api.pageParam
        if (this.pageParam.user) {
          var phone = new RegExp(/^1[34578]\d{9}$/)
          if (phone.test(this.pageParam.user)) {
            var p1 = String(this.pageParam.user).substr(0, 3)
            var p2 = String(this.pageParam.user).substr(8, 3)
            this.pageParam.user = p1 + '****' + p2
          }
        }
      }
      if (pageParam('way') == 'detail') {
        this.detail = true
        this.getUserData()
        this.getProData()
      } else {
        this.getProData()
      }
    },
    methods: {
      getProData() {
        showLoading()
        https({
          url: siteUrl + 'Marketing/Cloudbuy/GetOneCloudShoppingSet',
          data: {
            cloudid: pageParam('cloudid'),
            userid: getname()
          },
          successBack: (ret) => {
            console.log(ret)
            hideLoading()
            if (ret.success && ret.status == 1) {
              this.proMsg = ret.Data[0]
            } else {
              promptMsg(ret.err)
            }
            this.isDone = true
          }
        })
      },
      getUserData() {
        // console.log(siteUrl + 'Marketing/Cloudbuy/IsPayCloud?uid=' + getname())
        // console.log(this.pageParam.cloudid)
        https({
          url: siteUrl + 'Marketing/Cloudbuy/IsPayCloud?uid=' + getname(),
          method: 'post',
          data: {
            uid: getname(),
            cloudid: pageParam('cloudid'),
            buycount: 0
          },
          headers: 1,
          successBack: ret => {
            console.log(ret)
            // 1-成功 2-活动已经被禁用 3-活动已经结束 4-活动未开始 5-活动神域参与名额不足 7-请登录再操作 8-本次最大购买次数为  20-客官，您已经参与该活动，不能重复参加
            if (ret.success) {
              var data = ret.Data
              if (ret.status != 1 && ret.status != 20) return promptMsg(ret.err)
              if (data.sharedes && data.sharedes.length > 0) {
                data.sharedes = JSON.parse(data.sharedes)
              }
              // 待助力凑数
              if (data.remaining) {
                this.remaining = []
                for(let i=0;i<data.remaining;i++) {
                  this.remaining.push(i)
                }
              } else {
                // 分享数为0或不需分享 且status不为20 则显示付款
                this.done = true
                this.status = ret.status
              }
              this.userData = data
            } else {
              promptMsg(ret.err)
            }
            this.getProData()
          }
        })
      },
      // 分享
      goshare() {
        var that = this
        api.openFrame({
            name: 'marketing_shaerdiv',
            url: './marketing_shaerdiv.html',
            rect: {
                x: 0,
                y: 0,
                w: 'auto',
                h: 'auto'
            },
            pageParam: {
                data: that.proMsg,
                userData: that.userData,
                way: 'lndiana',
                cloudid: pageParam('cloudid'),
                buycount: 0
            },
            bounces: false,
            bgColor: 'rgba(0,0,0,0)'
        })
      },
      // 跳转抽奖商品详情页
      goLndianaDetail() {
        openWin({
          name: 'lndianaDetail',
          url: './new_lndianaDetail.html',
          bgColor: '#f6f6fa',
          pageParam: {
            title: '商品详情',
            cloudid: pageParam('cloudid'),
            hScrollBarEnabled: false,
            vScrollBarEnabled: false
          }
        }, 1)
      },
      // 跳转抽奖活动页
      goLndiana() {
        openWin({
          name: 'lndiana',
          url: './new_lndiana.html',
          bgColor: '#f6f6fa',
          pageParam: {
            title: '天天抽奖',
            hScrollBarEnabled: false,
            vScrollBarEnabled: false,
            bounces: true
          }
        }, 1)
      },
      onerr(e) {
        e.target.src = './img/bkg_cover.jpg'
      }
    }
  }
</script>
<style lang="scss">
  @import "new_lndiana_result.scss";
</style>