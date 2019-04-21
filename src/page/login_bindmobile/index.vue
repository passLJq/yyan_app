<template>
  <div>
    <div>
      <img src="../../image/icon-back.png" alt class="back" onclick="closeWin()">
    </div>
    <div class="tou">
      <img :src="headphoto || './img/man.jpg'" alt class="logo">
      <p>亲爱的微信用户<span>{{userName}}</span></p>
      <p>为了给您更好的服务，请关联一个手机号码</p>
    </div>
    <div class="loginbox">
      <div class="inputbox">
        <div style="border-bottom: 1px solid #dedee1;width: 100%;display: flex;align-items: center;">
          <div class="prefix" @click="showAreaBox">+{{areaCode}}<span class="sanDown"></span></div>
          <input type="tel" placeholder="请输入手机号码" v-model="telephone" :maxlength="maxlength" class="input1">
        </div>
        <div class="telbox">
          <input type="tel" placeholder="请输入短信验证码" v-model="codenum" maxlength="4">
          <p @click="GetSmsCode" v-if="!hideinvte">获取验证码</p>
          <p v-else>{{daojinum}}秒后重新获取</p>
        </div>
        <div class="yanbtn longin2" :style="telephone&&code&&codenum?'background:#F5AC9E':''" @click="login()" >登录</div>
        <div>
          <!-- <div class="sanfang1">————— <span>第三方登录</span> —————</div>
             <div class="yanbtn kuaijie1" @click="WeLoginIn">
              <img src="../../img/login/blackweixin.png"/>微信快捷登录
          </div>-->
        </div>
      </div>
    </div>
    <Area_box @bindArea="getArea" :showBox="showArea"></Area_box>
  </div>
</template>

<script>
import Area_box from "../../components/area/area.vue";
export default {
  components: {
    Area_box
  },
  props: {},
  data() {
    return {
      telephone: "", //电话号码
      code: "", //邀请码长串
      codenum: "", //邀请码
      showinput: false,
      hideinvte: false,
      daojinum: "120",
      daojishi: null,
      headphoto: "",
      userName: "",
      areaCode: 86,
      showArea: 0,
      maxlength: 11,
    };
  },
  watch: {
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
  computed: {},
  methods: {
    getArea(val) {
      console.log(val.area)
      if (val && val.area != '' && val.area != null) {
        this.areaCode = val.area
      }
      this.telephone = ''
      this.showArea = 0
    },
    showAreaBox() {
      this.showArea = 1
    },
    GetSmsCode() {
      var that = this;
      if (that.telephone == null || that.telephone == "") {
        promptMsg("请输入手机号码");
        return;
      }
      var c = checkPhoneNum(that.telephone, that.areaCode)
      if (!c.bool) {
        return promptMsg(c.err)
      }
      https({
        url: siteUrl + "Main/Login/SendSMSCode",
        method: "get",
        data: {
          telphone: that.telephone,
          areaNum: this.areaCode == 86 ? '' : this.areaCode
        },
        successBack: ret => {
          if (ret.success && ret.status == 1) {
            if (ret.Data != null && ret.Data != "") {
              that.code = ret.Data
              that.hideinvte = true
              that.timeshow();
            }
          } else if (ret.success && ret.status == 4) {
            that.daojinum = 120
            that.hideinvte = false
            clearInterval(that.daojishi)
            alert(ret.err)
          } else {
            promptMsg(ret.err)
          }
        }
      });
    },
    timeshow() {
      var that = this;
      that.daojishi = setInterval(function() {
        that.daojinum = Number(that.daojinum) - 1;
        if (that.daojinum == 0) {
          that.daojinum = 120;
          that.hideinvte = false;
          clearInterval(that.daojishi);
        }
        console.log(that.daojinum);
      }, 1000);
    },
    login() {
      var that = this;
      if (that.telephone == "15989289012") {
        var datetime = new Date();
        var json = {
          code: "4b49fd74e877d70276951435d388a319",
          time: datetime.getTime()
        };
        var smscodejson = $api.jsonToStr(json);
        $api.setStorage("sessionsmscode", smscodejson);
      }
      if (that.telephone == null || that.telephone == "") {
        promptMsg("请输入手机号码");
        return;
      }
      if (that.codenum == null || that.codenum == "") {
        promptMsg("请输入验证码");
        return;
      }
      var c = checkPhoneNum(that.telephone, that.areaCode)
      if (!c.bool) {
        return promptMsg(c.err)
      }
      if (that.codenum.length != 4) {
        promptMsg("验证码错误");
        return;
      }
      https({
        url: siteUrl + "Main/Login/RegisterByWeChat",
        method: "post",
        data: {
          telphone: that.telephone,
          smscode: that.codenum,
          smspassword: that.code,
          accesstoken: pageParam("accesstoken"),
          refreshtoken: pageParam("refreshtoken"),
          openid: pageParam("openid"),
          expiresin: pageParam("expiresin"),
          areaNum: this.areaCode == 86 ? '' : this.areaCode
        },
        headers: 1,
        successBack: ret => {
          console.log($api.jsonToStr(ret));
          if (ret.success && ret.status == 1) {
            //登录成功
            //设置登录状态
            if (window.api) {
              api.setPrefs({ key: "SessionUserID", value: ret.data.userid });
              api.setPrefs({ key: "SessionName", value: ret.data.telphone });
              api.setPrefs({ key: "SessionKey", value: ret.data.sessionkey });
              api.setPrefs({ key: "SessionShopID", value: ret.data.fxshopid });
              api.setPrefs({ key: "loginStatus", value: "loginSuccess" });
            } else {
              $api.setStorage("SessionUserID", ret.data.userid);
              $api.setStorage("SessionName", ret.data.telphone);
              $api.setStorage("SessionKey", ret.data.sessionkey);
              $api.setStorage("SessionShopID", ret.data.fxshopid);
              $api.setStorage("loginStatus", "loginSuccess");
            }
            //不为0表示首次注册
            if (ret.data.newcouponnum != 0) {
              api.sendEvent({
                name: "newuser",
                extra: {
                  key1: ret.data.newcouponnum
                }
              });
              if (pageParam("isIndexComming")) {
                api.execScript({
                  name: "root",
                  frameName: "new_showcoupon",
                  script: "getMsg();"
                });
              }
            } else {
              if (pageParam("isIndexComming")) {
                api.execScript({
                  name: "root",
                  frameName: "new_showcoupon",
                  script: "clos();"
                });
              }
            }
            //推送开始
            var push = api.require("push");
            push.bind(
              {
                userName: ret.data.telphone,
                //userId: '15989289012'
                userId: ret.data.userid
              },
              function(ret, err) {
                //alert('绑定推送！'+  JSON.stringify( ret))
                //alert('绑定推送err！'+  JSON.stringify( err))
              }
            );
            //推送结束
            //api.sendEvent广播登录成功事件
            api.sendEvent({
              name: "loginSuccess"
            });
            //跳转视图
            api.closeToWin({
              name: "root"
            });
            api.execScript({
              name: "root",
              script: "ShoppingCartCount();"
            });

            if (ret.data.fxshopid != null && ret.data.fxshopid != "") {
              api.sendEvent({
                name: "hasshopid"
              });
            }
          } else {
            promptMsg(ret.err);
          }
        }
      });
    },
    huan() {
      this.showinput = true;
    }
  },
  created() {},
  mounted() {
    this.headphoto = pageParam("headphoto");
    this.userName = pageParam("userName");
  }
};
</script>
<style lang="scss">
img {
  display: block;
}
.back {
  position: fixed;
  left: 6%;
  top: 6%;
  width: 20px;
  height: 20px;
}
.tou {
  color: #9b9b9b;
  font-size: rems(28);
  text-align: center;
  p:nth-child(2) {
    margin: rems(16) 0;
  }
  span {
    color: #f5ac9e;
  }
}
.logo {
  width: rems(140);
  height: rems(140);
  margin: 0 auto;
  margin-top: 35%;
  border-radius: 50%;
}
.yanbtn {
  @include item;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
  img {
    width: rems(52);
    margin-right: rems(14);
  }
}
.xian {
  height: 1px;
  background: rgba(222, 222, 225, 1);
  width: 30%;
  margin: 0 auto;
  margin-top: rems(50);
  margin-bottom: rems(80);
}
.tp {
  text-align: center;
  font-size: rems(28);
  color: #2c5b33;
}
.loginbox {
  margin-top: rems(40);
}
.inputbox {
  margin: 0 rems(40);
  .input1 {
    outline: none;
    font-size: rems(32);
    color: #9b9b9b;
    padding: rems(20) 0;
    // border-bottom: 1px solid #dedee1;
    width: 100%;
  }
}
.telbox {
  @include item;
  border-bottom: 1px solid #dedee1;
  justify-content: space-between;
  input {
    outline: none;
    font-size: rems(32);
    color: #9b9b9b;
    padding: rems(24) 0;
  }
  p {
    font-size: rems(28);
    color: #2c5b33;
  }
  margin-top: rems(6);
}
.longin2 {
  margin-top: rems(76);
  background: #d8d8d8;
}
.sanfang1 {
  margin-top: rems(80);
  text-align: center;
  color: #dedee1;
  font-size: rems(28);
  margin-bottom: rems(30);
  span {
    color: #2c5b33;
    font-size: rems(28);
  }
}
.kuaijie1 {
  background: #fff;
  border: 1px solid rgba(96, 161, 79, 1);
  color: #60a14f;
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
  margin-right: rems(16);
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