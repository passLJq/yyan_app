<template>
  <div id='app'>
    <div class="top">
      <p>{{hasComfirm ? '修改手机号后，登录账号将切为新的手机号码，请谨慎操作。' : '为了保证您的账号安全，请验证身份。验证成功后进行下一步操作。'}}</p>
    </div>

    <div class="middle" v-if="!hasComfirm">
      <p class="op"><span>+{{areaCode}}</span>{{oldPhone}}</p>
      <div class="inputbox">
        <input class="code" type="tel" maxlength="4" v-model="codenum">
        <div class="inbtn" v-if="!hideinvte" @click="GetSmsCode(0)">获取验证码</div>
        <div class="inbtn" v-else>{{daojinum}}秒后重新获取</div>
      </div>
      <div style="width: 100%;display:flex;justify-content: center;">
        <span class="btnn" :style="{background: code&&codenum.length==4 ? '#F5AC9E' : '#ccc'}" v-if="!hasComfirm" @click="comfirmOld">修改手机号码</span>
      </div>
    </div>

    <div class="middle" v-else>
      <div class="tel">
        <div style="border-bottom: 0.01333rem solid #dedee1;width: 100%;display: flex;align-items:center;">
          <div class="prefix" @click="showAreaBox">+{{areaCode}}<span class="sanDown"></span></div>
          <input type="tel" :maxlength="maxlength" v-model="newTelephone" placeholder="请输入新手机号码">
        </div>
      </div>
      <div class="inputbox">
        <div class="tel">
          <input class="codes" type="tel" maxlength="4" v-model="codenum" placeholder="请输入验证码">
        </div>
        <div class="newbtn" v-if="!hideinvte" @click="GetSmsCode(1)">获取验证码</div>
        <div class="newbtn" v-else>{{daojinum}}秒后重新获取</div>
      </div>
      <div style="width: 100%;display:flex;justify-content: center;">
        <span class="btnn" :style="{background: code&&codenum.length==4 ? '#F5AC9E' : '#ccc'}" @click="bindNewTel">确定</span>
      </div>
    </div>
    <Area_box @bindArea="getArea" :showBox="showArea"></Area_box>
  </div>
</template>

<script>
// import {httpp} from '../../assets/js/httpp';
import Area_box from "../../components/area/area.vue";
export default {
  components:{
    Area_box
  },
  props:{},
  data(){
    return {
      newTelephone: '',
      hideinvte:false,
      daojinum:'120',
      daojishi:null,
      code: '',
      codenum: '',
      hasComfirm: false,      // 是否已经验证确认旧号码
      areaCode: 86,
      showArea: 0,
      oldPhone: '',
      maxlength: 11,
    }
  },
  filters:{

  },
  watch:{
    areaCode(val) {
      var length = 11
      if (val == 852) {
        length = 8
      } else if (val == 853) {
        length = 8
      } else if (val == 886) {
        length = 10
      }
      this.maxlength = length
    }
  },
  computed:{},
  methods: {
    getArea(val) {
      console.log(val.area)
      if (val && val.area != '' && val.area != null) {
        this.areaCode = val.area
        // this.areaCode = 91
      }
      this.showArea = 0
      this.newTelephone = ''
    },
    showAreaBox() {
      this.showArea = 1
    },
    timeshow(){
      var that = this
      that.daojishi = setInterval(function() {
        that.daojinum = Number(that.daojinum) - 1
        if (that.daojinum == 0) {
          that.hideinvte = false
          that.daojinum = 120
          clearInterval(that.daojishi)
        }
      }, 1000)
    },
    hidePhone(phone) {
      var p = String(phone)
      var p1 = p.substr(0, 3)
      var p2 = p.substr(7, 4)
      return p1 + '****' + p2
    },
    GetSmsCode(type){
      var that=this
      var telephone = pageParam('phone')
      if (type && type == 1) {
        telephone = this.newTelephone
      }
      var c = checkPhoneNum(telephone, that.areaCode)
      if (!c.bool) {
        return promptMsg(c.err)
      }
      that.hideinvte=true
      that.timeshow()
      https({
        url: siteUrl +'Main/Login/SendSMSCode',
        method: 'get',
          data: {
              telphone: telephone,
              areaNum: this.areaCode == 86 ? '' : this.areaCode
          },
          successBack:(ret)=>{
            if(ret.success && ret.status==1){
              if(ret.Data!=null&&ret.Data!=""){
                that.code=ret.Data
              }
            } else if (ret.success && ret.status == 4) {
              that.hideinvte = false
              that.daojinum = 120
              clearInterval(that.daojishi)
              alert(ret.err)
            } else{
              promptMsg(ret.err)
            }
          }
      })
      // try {
      //   let ret = await httpp({
      //     url: siteUrl +'Main/Login/SendSMSCode',
      //     data: {
      //       telphone: telephone
      //     }
      //   })
      //   if (ret.success) {
      //     // ...
      //   } else {
      //     throw ret
      //   }
      // } catch (error) {
      //   promptMsg(error.err || error.Msg)
      // }
    },
    comfirmOld() {
      if (!this.code) return
      if(this.codenum==null||this.codenum==''){
        promptMsg('请输入验证码');
        return;
      }
      if(this.codenum.length!=4){
        promptMsg('验证码错误');
        return;
      }
      https({
        url: siteUrl +'Main/Login/LoginIn',
        data: {
          telphone: pageParam('phone'),
          smscode: this.codenum,
          smspassword: this.code,
          areaNum: this.areaCode == 86 ? '' : this.areaCode
        },
        successBack: ret => {
          if(ret.success&&ret.status==1) {
            //登录成功
            //设置登录状态
            if(window.api){
              api.setPrefs({ key:'SessionUserID',value:ret.data.userid});
              api.setPrefs({ key:'SessionName',value:ret.data.telphone});
              api.setPrefs({ key:'SessionKey',value:ret.data.sessionkey});
              api.setPrefs({ key:'SessionShopID',value:ret.data.fxshopid});
              api.setPrefs({ key:'loginStatus',value:'loginSuccess'});
             }else{
              $api.setStorage('SessionUserID',ret.data.userid);
              $api.setStorage('SessionName',ret.data.telphone);
              $api.setStorage('SessionKey',ret.data.sessionkey);
              $api.setStorage('SessionShopID',ret.data.fxshopid);
              $api.setStorage('loginStatus','loginSuccess');
            }
            this.code = ''
            this.codenum = ''
            this.hideinvte = false
            this.daojinum = 120
            clearInterval(this.daojishi)
            this.daojishi = null
            this.hasComfirm = true
          } else {
            promptMsg(ret.err)
          }
        }
      })
    },
    bindNewTel() {
      var that = this
      if (!that.code) return
      if(that.newTelephone==null||that.newTelephone==''){
        promptMsg('请输入手机号码');
        return;
      }
      if(that.codenum==null||that.codenum==''){
        promptMsg('请输入验证码');
        return;
      }
      var c = checkPhoneNum(that.newTelephone, that.areaCode)
      if (!c.bool) {
        return promptMsg(c.err)
      }
      if(that.codenum.length!=4){
        promptMsg('验证码错误');
        return;
      }
      https({
        url: siteUrl + 'Main/Login/ChangePhone',
        method: 'get',
        data: {
          uid: getname(),
          Phone: this.newTelephone,
          smscode: this.codenum,
          smspassword: this.code,
          areaNum: this.areaCode == 86 ? '' : this.areaCode
        },
        successBack: ret => {
          if (ret.success) {
            if(window.api){
              api.setPrefs({ key:'SessionName',value:this.newTelephone})
             }else{
              $api.setStorage('SessionName',this.newTelephone)
            }
            promptMsg('修改成功')
            setTimeout(function() {
              closeWin()
            }, 2000)
          } else {
            promptMsg(ret.err)
          }
        }
      })
    }
  },
  created(){
    this.oldPhone = this.hidePhone(pageParam('phone'))
    this.areaCode = pageParam('areaNum')
  },
  mounted(){

  }
}
</script>
<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .top {
    width: 100%;
    margin-top: rems(150);
    p {
      margin: 0 auto;
      width: rems(500);
      color: #2C5B33;
      font-size: rems(28);
      text-align: center;
      line-height: rems(44);
    }
  }
  .middle {
    width: 100%;
    // margin-top: rems(100);
    text-align: center;
    .op {
      font-size: rems(44);
      color: #333;
      text-align: center;
      display: inline;
      margin: 0 auto;
      position: relative;
      span {
        color: #999;
        font-size: rems(30);
        position: absolute;
        left: rems(-88);
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .inputbox {
      width: 100%;
      margin-top: rems(60);
      display: flex;
      justify-content: center;
      position: relative;
      .inbtn {
        position: absolute;
        top: rems(-10);
        right: 10%;
        font-size: rems(28);
        color: #2C5B33;
        // background-color: #F5AC9E;
        // border-radius: rems(8);
        line-height: rems(50);
        // padding: 0 rems(10);
        text-align: center;
        // width: rems(200);
      }
      .code {
        width: rems(640);
        outline: none;
        border-bottom: rems(2) solid #dedee1;
        font-size: rems(32);
        line-height: rems(32);
        color: #2C5B33;
        text-align: center;
      }
      .newbtn {
        position: absolute;
        bottom: rems(10);
        right: rems(30);
        font-size: rems(28);
        color: #2C5B33;
        line-height: rems(50);
        text-align: center;
        // width: rems(200);
      }
    }
    
  }
  input {
    outline: none;
  }
  .tel {
    width: 100%;
    padding: 0 rems(30);
    height: rems(60);
    display: flex;
    input {
      padding-left: rems(30);
      width: 100%;
      font-size: rems(32);
      height: rems(60);
      color: #2C5B33;
      border-bottom: rems(2) solid #dedee1;
    }
  }
  .btnn {
    font-size: rems(28);
    line-height: rems(60);
    border-radius: rems(8);
    width: rems(300);
    text-align: center;
    color: #fff;
    margin: 0 auto;
    background-color: #F5AC9E;
    margin-top: rems(50);
  }

  /* 号码前缀 */
  .prefix {
    color: #2c5b33;
    background-color: #d8d8d8;
    font-size: rems(28);
    // height: rems(50);
    display: flex;
    align-items: center;
    padding: rems(6) rems(12);
    border-radius: rems(4);
  }
  .sanDown {
    width: 0;
    height: 0;
    border-width: rems(20) rems(16) 0;
    border-style: solid;
    border-color: #2c5b33 transparent transparent; /*灰 透明 透明 */
    margin-top: rems(4);
    position: relative;
    box-sizing: content-box;
  }
</style>