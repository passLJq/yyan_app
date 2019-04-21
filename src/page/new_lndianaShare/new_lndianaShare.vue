<template>
  <section>
    <div class="flex flex_v flex_align_center box" :class="avatarIndex > 6 ? 'removeH' : ''">
      <!-- 分享说明 -->
        <div class="explain flex flex_pack_center" :style="avatarIndex > 6 ? 'margin-top: 0;' : ''">
          <span>再分享<span class="num">{{userData.remaining}}人</span>即可参加抽奖</span>
        </div>
        <!-- 助力头像区域 -->
          <div class="helper flex flex_pack_justify_between" :style="avatarIndex > 6 ? 'flex-wrap: wrap;' : ''">
              <div class="flex flex_v flex_align_center">
                <img v-if="userData.userimg != ''" :src="userData.userimg">
                <img v-else src="../../img/hui.png" style="border:1px solid #d8d8d8;">
                <span style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;" v-cloak>{{userData.username}}</span>
              </div>
            <!-- 已助力的 -->
              <div class="flex flex_v flex_align_center" v-for="(item, index) in userData.sharedes" :key="index">
                <img v-if="item.userhead != ''" :src="item.userhead">
                <img v-else src="../../img/hui.png" style="border:1px solid #d8d8d8;">
                <span style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">{{item.username != '' ? item.username : '已助力'}}</span>
              </div>
            <!-- 待助力的 -->
              <div class="flex flex_v flex_align_center" v-for="(item, index) in remaining" :key="index">
                <img src="../../img/hui.png" style="border:1px solid #d8d8d8;">
                <span >待助力</span>
              </div>
          </div>
          <!-- 分享按钮 -->
            <div v-if="userData.remaining" class="btn gradient flex flex_pack_center flex_align_center" @click="goshare">
              分享活动给好友
            </div>
            <span v-if="userData.remaining" class="fxx">分享3个群之后，成功率高达90%哦</span>
      </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
         shareNum: 0,              // 需要分享次数
          userData: {},             // user数据
          msg: {},                  // 商品数据
          remaining: [],            // 未助力 凑数的arr
          ready: false,             // 是否加载完毕 userDataReady 与 dataReady都为true
          userDataReady: false,
          dataReady: false
      }
    },
    watch: {
      userDataReady() {
        if (this.userDataReady && this.dataReady) {
          this.ready = true
        }
      },
      dataReady() {
        if (this.userDataReady && this.dataReady) {
          this.ready = true
        }
      }
    },
    created() {
      this.getData()
      this.getProductMsg()
    },
    computed: {
      avatarIndex() {
        let sharedes = 0
        if (this.userData.sharedes) {
          sharedes = this.userData.sharedes.length || 0
          console.log(sharedes + this.userData.remaining)
          return sharedes + this.userData.remaining
        } else {
          return this.userData.remaining
        }
      }
    },
    methods: {
      // 获取分享夺宝数据
      getData() {
        https({
          url: siteUrl + 'Marketing/Cloudbuy/IsPayCloud?devicetype=1&uid=' + getname(),
          method: 'post',
          data: {
            uid: getname(),
            cloudid: pageParam('cloudid'),
            buycount: pageParam('buycount')
          },
          headers: 1,
          successBack: (ret) => {
            // console.log(JSON.stringify(ret))
            if (ret.success && (ret.status == 1 || ret.status == 20)) {
              let data = ret.Data
              if (data.sharedes && data.sharedes.length > 0) {
                data.sharedes = JSON.parse(data.sharedes)
              }
              this.userData = data
              // v-for 不识别数字 所以创建数组遍历 未助力d
              this.remaining = []
              var that = this
              if (this.userData.remaining > 0) {
                for (let i=0; i<that.userData.remaining; i++) {
                  that.remaining.push(i)
                }
              }
              // 数据拿到再渲染
              this.userDataReady = true
            } else {
              promptMsg(ret.err)
            }
            // remaining 是分享需要次数
            console.log(JSON.stringify(this.userData))
          }
        })
      },
      // 获取夺宝商品信息
      getProductMsg() {
        https({
          url: siteUrl + 'Marketing/Cloudbuy/GetOneCloudShoppingSet?devicetype=1',
          data: {
            cloudid: pageParam('cloudid'),
            uid: getname()
          },
          headers: 1,
          successBack: this.msgSuccessBack
        })
      },
      // 夺宝商品信息成功回调函数
      msgSuccessBack(ret) {
        // console.log(JSON.stringify(ret))

        if (ret.success && ret.status == 1) {
          const data = ret.Data[0]
          // 转换为合法路径
          data.proimg = data.proimg.replace('weigouyi', 'rushouvip')
          this.msg = data
          // console.log(data)
          this.dataReady= true
        } else {
          promptMsg(ret.err)
        }
      },
      // 分享
      goshare() {
        var that = this
        console.log(JSON.stringify(this.msg))
        // console.log(this.userData)
        api.openFrame({
            name: 'marketing_shaerdiv',
            url: '../tool/marketing_shaerdiv.html',
            rect: {
                x: 0,
                y: 0,
                w: 'auto',
                h: 'auto'
            },
            pageParam: {
                data: that.msg,
                userData: that.userData,
                way: 'lndiana',
                cloudid: pageParam('cloudid'),
                buycount: pageParam('buycount')
            },
            bounces: false,
            bgColor: 'rgba(0,0,0,0)'
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "new_lndianaShare.scss";
</style>