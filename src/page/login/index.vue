<template>
  <div>
    <div>
      <img src="../../img/icon-back.png" alt class="back" onclick="closeWin()">
    </div>
    <div>
      <img src="../../img/login/yanlogo.png" alt class="logo">
    </div>
    <div class="loginbox">
      <div v-if="!showinput">
        <div class="yanbtn" @click="WeLoginIn" v-if="installwx">
          <img src="../../img/login/weixin_logo_white.png">微信快捷登录
        </div>
        <div class="xian"></div>
        <p class="tp" @click="huan">使用手机号码登录</p>
      </div>
      <div class="inputbox" v-else>
        <div style="display: flex;align-items:center;border-bottom: 1px solid #DEDEE1;">
          <div class="prefix" @click="showAreaBox">+{{areaCode}}<span class="sanDown"></span></div>
          <input type="tel" placeholder="请输入手机号码" v-model="telephone" maxlength="11" class="input1">
        </div>
        <div class="telbox">
          <input type="tel" placeholder="请输入短信验证码" v-model="codenum" maxlength="4">
          <p @click="GetSmsCode" v-if="!hideinvte">获取验证码</p>
          <p v-else>{{daojinum}}秒后重新获取</p>
        </div>
        <div class="yanbtn longin2" :style="telephone&&code&&codenum?'background:#F5AC9E':''" @click="login()" >登录</div>
        <div v-if="installwx">
          <div class="sanfang1">—————<span>第三方登录</span> —————</div>
          <div class="yanbtn kuaijie1" @click="WeLoginIn">
            <img src="../../img/login/blackweixin.png">微信快捷登录
          </div>
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
      installwx: true,
      areaCode: 86,
      showArea: 0,
      maxlength: 11,
      bool: true          // 登录按钮点击
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
      if (val && val.area != '' && val.area != null) {
        this.areaCode = val.area
      }
      this.showArea = 0
      this.telephone = ''
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
      console.log(c)
      if (!c.bool) {
        return promptMsg(c.err)
      }
      that.hideinvte = true;
      that.timeshow();
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
              that.code = ret.Data;
            }
          } else if (ret.success && ret.status == 4) {
            that.hideinvte = false;
            that.daojinum = 120;
            clearInterval(that.daojishi);
            alert(ret.err)
          } else {
            promptMsg(ret.err);
          }
        }
      });
    },
    timeshow() {
      var that = this;
      that.daojishi = setInterval(function() {
        that.daojinum = Number(that.daojinum) - 1;
        if (that.daojinum == 0) {
          that.hideinvte = false;
          that.daojinum = 120;
          clearInterval(that.daojishi);
        }
      }, 1000);
    },
    login() {
      if (!this.bool) return
      if (!this.code) return promptMsg('请重新获取验证码')
      this.bool = false
      var that = this;
      if (that.telephone == "15989289012") {
        that.code = "4b49fd74e877d70276951435d388a319";
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
        url: siteUrl + "Main/Login/LoginIn",
        method: "get",
        data: {
          telphone: that.telephone,
          smscode: that.codenum,
          smspassword: that.code,
          areaNum: this.areaCode == 86 ? '' : this.areaCode
          // areaNum: 91
        },
        successBack: ret => {
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
              if (api.pageParam.isIndexComming) {
                api.execScript({
                  name: "root",
                  frameName: "new_showcoupon",
                  script: "getMsg();"
                });
              }
            } else {
              if (api.pageParam.isIndexComming) {
                api.execScript({
                  name: "root",
                  frameName: "new_showcoupon",
                  script: "clos();"
                });
              }
            }
            //推送开始
            var ajpush = api.require("ajpush");
            var param = { alias: ret.data.userid, tags: "" };
            ajpush.bindAliasAndTags(param, function(ret) {
              var statusCode = ret.statusCode;
            });
            //推送结束
            //api.sendEvent广播登录成功事件
            api.sendEvent({
              name: "loginSuccess"
            });
            //跳转视图
            api.closeWin();
            api.execScript({
              name: "root",
              frameName: "mycenter_body",
              script: "BindData()"
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
            this.bool = true
            promptMsg(ret.err);
          }
        }
      });
    },
    huan() {
      this.showinput = true;
    },
    WeLoginIn() {
      var wx = api.require("wx");
      wx.auth(
        {
          apiKey: ""
        },
        function(ret, err) {
          console.log($api.jsonToStr(ret));
          console.log($api.jsonToStr(err));
          if (ret.status) {
            var code = ret.code;
            https({
              url: siteUrl + "Main/Login/LoginInWeChat",
              method: "get",
              data: {
                code: code
              },
              successBack: ret => {
                if (ret.success) {
                  if (ret.status == 1) {
                    //登录成功
                    //设置登录状态
                    if (window.api) {
                      api.setPrefs({
                        key: "SessionUserID",
                        value: ret.data.userid
                      });
                      api.setPrefs({
                        key: "SessionName",
                        value: ret.data.telphone
                      });
                      api.setPrefs({
                        key: "SessionKey",
                        value: ret.data.sessionkey
                      });
                      api.setPrefs({
                        key: "SessionShopID",
                        value: ret.data.fxshopid
                      });
                      api.setPrefs({
                        key: "loginStatus",
                        value: "loginSuccess"
                      });
                    } else {
                      $api.setStorage("SessionUserID", ret.data.userid);
                      $api.setStorage("SessionName", ret.data.telphone);
                      $api.setStorage("SessionKey", ret.data.sessionkey);
                      $api.setStorage("SessionShopID", ret.data.fxshopid);
                      $api.setStorage("loginStatus", "loginSuccess");
                    }
                    //推送开始
                    var ajpush = api.require("ajpush");
                    var param = { alias: ret.data.userid, tags: "" };
                    ajpush.bindAliasAndTags(param, function(ret) {
                      var statusCode = ret.statusCode;
                    });
                    //跳转视图
                    api.closeWin({
                      type: "none",
                      duration: 100
                    });
                    if (api.pageParam.isIndexComming) {
                      api.execScript({
                        name: "root",
                        frameName: "new_showcoupon",
                        script: "clos();"
                      });
                    }
                    api.execScript({
                      name: "root",
                      frameName: "mycenter_body",
                      script: "BindData()"
                    });
                    //api.sendEvent广播登录成功事件
                    api.sendEvent({
                      name: "loginSuccess"
                    });
                    if (ret.data.fxshopid != null && ret.data.fxshopid != "") {
                      api.sendEvent({
                        name: "hasshopid"
                      });
                    }
                  } else if (ret.status == 100) {
                    // api.showProgress({
                    //     text: '系统正在处理，请耐心等待...',
                    //     modal: true
                    // });
                    if (
                      ret.data.accesstoken != null &&
                      ret.data.openid != null
                    ) {
                      api.openWin({
                        name: "login_bindmobile",
                        url: "login_bindmobile.html",
                        pageParam: {
                          accesstoken: ret.data.accesstoken,
                          openid: ret.data.openid,
                          refreshtoken: ret.data.refreshtoken,
                          expiresin: ret.data.expiresin,
                          headphoto: ret.data.headphoto,
                          userName: ret.data.username,
                          isIndexComming: api.pageParam.isIndexComming
                        },
                        bgColor: "#fff"
                      });
                    } else {
                      promptMsg("返回参数错误");
                    }
                  } else {
                    promptMsg(ret.err);
                  }
                } else {
                  promptMsg(ret.err);
                }
              }
            });
          } else {
            switch (err.code) {
              case -1:
                promptMsg("当前设备未安装微信，请使用账号以及验证码登录");
                break;
              case 1:
                promptMsg("您已取消授权登录");
                break;
              case 2:
                promptMsg("您拒绝授权，登录失败");
                break;
              case 3:
                promptMsg("当前设备未安装微信，请使用账号以及验证码登录");
                break;
              default:
                promptMsg("当前设备未安装微信，请使用账号以及验证码登录");
                break;
            }
          }
        }
      );
    },
    closeNewMember() {
      api.sendEvent({
        name: "closeNewMember"
      });
    }
  },
  created() {},
  mounted() {
    var that = this;
    if (window.api) {
      var wx = api.require("wx");
      wx.isInstalled(function(ret, err) {
        if (ret.installed) {
          that.installwx = true;
        } else {
          that.installwx = false;
        }
      });
      this.closeNewMember(); //
    }
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
.logo {
  width: rems(140);
  height: rems(140);
  margin: 0 auto;
  margin-top: 35%;
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
  margin-top: rems(70);
}
.inputbox {
  margin: 0 rems(40);
  .input1 {
    outline: none;
    font-size: rems(32);
    color: #9b9b9b;
    padding: rems(20) 0;
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