<template>
  <section>
    <div class="mark" id="mark" @click="goclose"></div>
    <div class="mainn">
      <div class="tit">申请发票</div>
      <div class="type">
        <p class="title">发票类型</p>
        <div class="conton">
          <div class="conitem" :class="{active: invType==0?true:false}" @click="selectType(0)">不开票</div>
          <div class="conitem" :class="{active: invType==1?true:false}" @click="selectType(1)">普通发票</div>
          <div class="conitem" :class="{active: invType==2?true:false}" @click="selectType(2)">增值税专用发票</div>
        </div>
      </div>

      <div class="type" :class="{closeAll: invType==0?true:false}">
        <p class="title">发票抬头</p>
        <div class="conton">
          <div class="conitem" :class="{active: invWho==1?true:false}" @click="selectWho(1)">个人</div>
          <div class="conitem" :class="{active: invWho==2?true:false}" @click="selectWho(2)">公司</div>
        </div>
        <input ref="bus" v-show="invType==0?false:invWho==2?true:false" type="text" class="inp1" placeholder="这里填写公司名称">
        <input ref="den" maxlength="20" v-show="invType==0?false:invWho==2?true:false" type="tel" class="inp2" placeholder="请在此填写纳税人识别号">
      </div>

      <div class="type">
        <p class="title">收票人信息</p>
        <div class="conton flexx">
          <div class="ema">*收票人邮箱</div>
          <input class="emainput" ref="ema" type="email" placeholder="用来接收发票邮件" :disabled="invType==0">
        </div>
      </div>

      <div class="type" :class="{closeAll: invType==0?true:false}">
        <p class="title">发票内容</p>
        <div class="conton">
          <div class="conitem" :class="{active: invCon==1?true:false}" @click="selectCon(1)">商品明细</div>
          <div class="conitem" :class="{active: invCon==2?true:false}" @click="selectCon(2)">商品类别</div>
        </div>
        <span class="tip">发票内容将详细商品名称与价格信息</span>
      </div>

      <div class="confirm" @click="confirmInv">确认</div>
    </div>
    <div v-show="showPop" class="commark" id="commark" @click="closecom">
      <div class="com">
        <p class="titt">请确认纳税人识别号是否正确?</p>
        <p class="numm" id="nssbh"></p>
        <div class="btnbox">
          <div class="cof" @click="queren">正确</div>
          <div class="qx" @click="closecom">取消</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      invType: 0,           // 发票类型
      invWho: 1,            // 发票抬头
      invCon: 1,            // 发票内容
      showPop: false,
      invoiceJson: ''       // 发票数据
    }
  },
  created() {

  },
  mounted() {
    var t = document.documentElement.clientHeight || document.body.clientHeight
    $api.byId('mark').style.height = t + 'px'
    $api.byId('commark').style.height = t + 'px'
    if (pageParam('invoiceJson')) {
      var data = pageParam('invoiceJson')
      this.$refs.bus.value = data.IcompanyName
      this.$refs.den.value = data.invoiceNumber
      this.$refs.ema.value = data.invoiceEmail
      this.invWho = data.invoiceTitle
      this.invCon = data.invoiceData
      this.invType = data.invoiceType
    }
    console.log(pageParam('invoiceJson'))
  },
  methods: {
    selectType(index) {
      this.invType = index
    },
    selectWho(index) {
      this.invWho = index
    },
    selectCon(index) {
      this.invCon = index
    },
    confirmInv() {
      if (this.invType) {
        let IcompanyName = this.$refs.bus.value.replace(/^\s+/g, '') || ''
        let invoiceNumber = this.$refs.den.value.replace(/^\s+/g, '') || ''
        let invoiceEmail = this.$refs.ema.value.replace(/^\s+/g, '')
        let invoiceTitle = this.invWho
        let invoiceUserName = ''
        let invoiceData = this.invCon
        let invoiceType = this.invType
        
        if (invoiceNumber == '' && invoiceTitle == 2) return promptMsg('请输入纳税人识别号！')
        if (IcompanyName == '' && invoiceTitle == 2) return promptMsg('请输入公司名！')
        if (invoiceEmail == '') return promptMsg('请输入收票人邮箱地址！')
        if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(invoiceEmail)) return promptMsg('邮箱地址不正确，请重新输入！')
        this.invoiceJson = {
          IcompanyName,
          invoiceUserName,
          invoiceNumber,
          invoiceEmail,
          invoiceTitle,
          invoiceData,
          invoiceType
        }
        // 选择公司则弹窗确认识别号
        if (invoiceTitle == 2) {
          $api.byId('nssbh').innerHTML = invoiceNumber
          this.showPop = true
        } else {
          this.queren()
        }
      } else {
        api.closeFrame()
      }
      
    },
    goclose() {
      api.closeFrame()
    },
    closecom() {
      this.showPop = false
    },
    queren() {
      var that = this
      api.sendEvent({
        name: 'invoice_event',
        extra: {key: that.invoiceJson}
      })
      api.closeFrame()
    }
  }
}
</script>
<style lang="scss">
  @import "invoice.scss";
</style>