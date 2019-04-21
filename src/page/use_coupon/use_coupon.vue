<template>
  <section>
    <header class="headtap" id="head">
      <img src="../../img/icon-back.png" alt="" @click="goback">
      <span class="tit">使用优惠券</span>
      <div class="btn" @click="notsub()">不使用</div>
    </header>
    <!-- <van-tabs v-model="active" swipeable>
      <van-tab v-for="index in 4" :title="'选项 ' + index" :key="index">
        内容 {{ index }}
      </van-tab>
    </van-tabs> -->
    <div class="tab" ref="tab">
      <div class="con">
        <div class="tab-item" @click="changeContent(0,1)">
          可用优惠券({{useableMsg ? useableMsg.length : 0}})
        </div>
        <div class="tab-item" @click="changeContent(1,1)">
          不可用优惠券({{unuseableMsg ? unuseableMsg.length : 0}})
        </div>
        <div class="line" ref="line" style="left: 0;"></div>
      </div>
    </div>
    <!-- <div class="content"> -->
      <van-swipe id="sw" ref="swipe" @change="changeContent" :autoplay="0" :loop="false" :show-indicators="false">
        <van-swipe-item class="content" id="canuse">
          <div v-if="useableMsg?useableMsg.length?true:false:false">
            <div class="content-item" v-for="(item, index) in useableMsg" :key="index" @click="selectItem(index)">
              <div class="left">
                <p>{{item.facevalue}}</p><p>元</p>
              </div>
              <div class="right">
                <p>满{{item.uselimit}}可用</p>
                <p>有效期至：{{getTime(item.endtime)}}</p>
                <p>除标注不可用产品外全场通用</p>
              </div>
              <div class="icon iconfont" style="background-color:#fff;" v-show="!itemSelect[index] ? true:false"></div>
              <div class="icon iconfont icon-selectfill" v-show="itemSelect[index] ? true:false" style="background-color:#fff;"></div>
            </div>
          </div>
          <div v-else class="nodatta">
            <img src="../../img/couponNoData1.png" alt="">
            <p>很遗憾</p>
            <p>您暂无可以使用的优惠券</p>
          </div>
        </van-swipe-item>
        <van-swipe-item class="content" id="uncanuse">
          <div v-if="unuseableMsg?unuseableMsg.length?true:false:false">
           <div class="content-item" v-for="(item, index) in unuseableMsg" :key="index">
              <div class="left">
                <p>{{item.facevalue}}</p><p>元</p>
              </div>
              <div class="right">
                <p>满{{item.uselimit}}可用</p>
                <p>有效期至：{{getTime(item.endtime)}}</p>
                <p>除标注不可用产品外全场通用</p>
              </div>
              <div class="icon iconfont"></div>
            </div>    
        </div>
        <div v-else class="nodatta">
            <img src="../../img/couponNoData1.png" alt="">
            <p>很遗憾</p>
            <p>您暂无可以使用的优惠券</p>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="confirm" @click="sub">确认</div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        uid: '',            // userid
        comfirmMsg: "",     //确认页过来的数据
        useableMsg: [],     //可用数据
        unuseableMsg: [],   //不可用数据
        noMsg: false,       //首次没有数据
        useTimeOver: [],    //可使用的优惠券是否显示即将过期
        unuseTimeOver: [],  //不可使用的优惠券是否显示即将过期
        allSelect: 0,       //不使用选择器
        itemSelect: [],     //使用选择器  
        loadTimer: null
      }
    },
    created() {
      this.uid = window.api ? api.getPrefs({sync: true,key: 'SessionUserID'}) : $api.getStorage('SessionUserID')
      this.comfirmMsg = pageParam('sksk')
      // console.log(JSON.stringify(pageParam('sksk')))
      // console.log(JSON.stringify(api.pageParam.sksk))
      // this.comfirmMsg = [{"shopid":"170823105729085905","productID":"170915183533469403","proskuid":"","buycount":1,"RushBuyID":""}]

    },
    mounted() {
      console.log('顶部状态栏高度'+getname('statustop'))
      var sp = getname('statustop') || 0
      $api.byId('head').style.paddingTop = sp + 'px'
      this.bindHeight()
      this.getMsg()
    },
    methods: {
      bindHeight() {
        var ch = document.documentElement.clientHeight || document.body.clientHeight
        var tab = this.$refs.tab
        var sp = getname('statustop') || 0
        $api.byId('uncanuse').style.height = ch - tab.offsetTop - tab.offsetHeight - sp + 'px'
        $api.byId('canuse').style.height = ch - tab.offsetTop - tab.offsetHeight - sp + 'px'
        $api.byId('sw').style.height = ch - tab.offsetTop - tab.offsetHeight - sp + 'px'
        console.log(ch - tab.offsetTop - tab.offsetHeight - sp + 'px')
      },
      getMsg() {
        this.loadTimer = setTimeout(function () {
          showLoading()
        }, 1000)
        var that = this
        if (openapp) {
          api.ajax({
            url: siteUrl + '/Marketing/Coupon/GetUseableCouponListJson?uid=' + that.uid,
            method: 'post',
            data: {
              body: {
                uid: that.uid,
                queryinput: that.comfirmMsg,
                isgb: pageParam('way') == 'groupbuynow' ? true : ''
              }
            },
            headers: {
              "Authorization": window.api?api.getPrefs({sync: true,key: 'SessionKey'}):$api.getStorage('SessionKey'),
              "Content-Type": 'application/json; charset=utf-8'
            }
          }, function (ret) {
            // console.log(JSON.stringify(ret))
            that.sucback(ret)
          })
        } else {
          axios({
            method:'POST',
            url:siteUrl + '/Marketing/Coupon/GetUseableCouponListJson?uid=' + that.uid,
            data: {
              uid: that.uid,
              queryinput: that.comfirmMsg,
              isgb: pageParam('way') == 'groupbuynow' ? true : ''
            },
            headers:{
              "Authorization": window.api?api.getPrefs({sync: true,key: 'SessionKey'}):$api.getStorage('SessionKey'),
              "Content-Type": 'application/json; charset=utf-8'
            }
          }).then(function(response) {
            console.log(response)
            that.sucback(response.data)
          })
        }
        
        
      },
      sucback(response) {
        if (this.loadTimer != null) {
          hideLoading()
          clearTimeout(this.loadTimer)
          this.loadTimer = null
        }
        var that = this
        let ret = response
        let useableMsg = that.useableMsg
        let unuseableMsg = that.unuseableMsg
        let noMsg = that.noMsg
        let itemSelect = that.itemSelect
        let allSelect = that.allSelect
        if (ret && ret.success && ret.status == 1) {
          if(ret.Data.useable.length > 0) {
            useableMsg = [...useableMsg, ...ret.Data.useable]
          }
          if (ret.Data.unuseable.length > 0) {
            unuseableMsg = [...unuseableMsg, ...ret.Data.unuseable]
          }
        } else {
          promptMsg(ret.err)
        }
        if (useableMsg.length < 1 && unuseableMsg.length < 1) {
          noMsg = true
        }
        useableMsg.forEach((item, index) => {
          itemSelect.push(0)
          allSelect = 0
        })
        that.useableMsg = useableMsg
        that.unuseableMsg = unuseableMsg
        that.noMsg = noMsg
        that.itemSelect = itemSelect
        that.allSelect = allSelect
      },
      changeContent(index, type) {
        console.log(index)
        console.log(type)
        // 表示来自点击
        if (type) {
          this.$refs.swipe.swipeTo(index)
        }
        if (index == 0) {
          this.$refs.line.style.left = 0
        } else if (index == 1) {
          this.$refs.line.style.left = '50%'
        }
      },
      getTime(t) {
        var t1 = t.split(' ')[0].replace(/\./g,'-')
        return t1
      },
      // 点击选择优惠券
      selectItem(index) {
        let idx = index
        if(idx === "a") {//不使用
          this.itemSelect.fill(0)
          this.allSelect = 1
        }else {//使用
          this.allSelect = 0
          for(let i in this.itemSelect) {
            if (this.useableMsg[idx].isplatform) {//平台券
              if (Number(i) === Number(idx)) {
                this.itemSelect[i] = (this.itemSelect[i] ? 0 : 1)
              }else {
                if (this.useableMsg[i].isplatform) {
                  this.itemSelect[i] = 0
                }
              }
            }else {//商家券
              if (Number(i) === Number(idx)) {
                this.itemSelect[i] = (this.itemSelect[i] ? 0 : 1)
              } else {
                if (!this.useableMsg[i].isplatform) {
                  this.itemSelect[i] = 0
                }
              }
            }

          }
        }
        this.$forceUpdate()
        console.log(this.itemSelect)
      },
      goback() {
        closeWin()
      },
      sub() {
        var usercoupons = []
        var paycode = ''
        this.itemSelect.forEach((item, i) => {
          if (item == 1) {
            usercoupons.push(this.useableMsg[i].usercouponid)
            paycode = Number(paycode) + Number(this.useableMsg[i].facevalue)
          }
        })
        api.execScript({
          name: 'ordercomfirm',
          script: 'shuju(\''+usercoupons+'\',\''+paycode+'\');'
        });
        setTimeout(function(){
          api.closeWin()
        },500)
      },
      notsub(){
        var usercoupons='';
        var paycode='';
        api.execScript({
            name: 'ordercomfirm',
            script: 'shuju(\''+usercoupons+'\',\''+paycode+'\');'
        });
        setTimeout(function(){
            api.closeWin()
        },500)
      }
    }
  }
</script>
<style lang="scss">
  @import "use_coupon.scss";
</style>