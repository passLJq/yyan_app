!function(a){var n={};function i(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return a[t].call(e.exports,e,e.exports,i),e.l=!0,e.exports}i.m=a,i.c=n,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(a,n,function(t){return e[t]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=248)}({0:function(t,e){t.exports=Vue},1:function(t,e,a){"use strict";function n(t,e,a,n,i,s,r,o){var c,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=a,l._compiled=!0),n&&(l.functional=!0),s&&(l._scopeId="data-v-"+s),r?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},l._ssrRegister=c):i&&(c=o?function(){i.call(this,this.$root.$options.shadowRoot)}:i),c)if(l.functional){l._injectStyles=c;var u=l.render;l.render=function(t,e){return c.call(e),u(t,e)}}else{var d=l.beforeCreate;l.beforeCreate=d?[].concat(d,c):[c]}return{exports:t,options:l}}a.d(e,"a",function(){return n})},117:function(t,e,a){t.exports=a.p+"img/nobank.png"},118:function(t,e,a){"use strict";var n=a(53);a.n(n).a},248:function(t,e,a){"use strict";a.r(e);function n(){var a=this,t=a.$createElement,n=a._self._c||t;return n("div",{attrs:{id:"app1"}},[n("section",{class:0==a.status?"":"hide"},[a._m(0),a._v(" "),n("div",{staticClass:"setinput"},[n("input",{directives:[{name:"model",rawName:"v-model",value:a.realname,expression:"realname"}],attrs:{type:"text",value:"",placeholder:"请填写您的姓名"},domProps:{value:a.realname},on:{input:function(t){t.target.composing||(a.realname=t.target.value)}}})]),a._v(" "),n("div",{staticClass:"setinput"},[n("input",{directives:[{name:"model",rawName:"v-model",value:a.certno,expression:"certno"}],attrs:{type:"text",name:"",value:"",placeholder:"请填写您的身份证号码",maxlength:"18"},domProps:{value:a.certno},on:{input:function(t){t.target.composing||(a.certno=t.target.value)}}})])]),a._v(" "),1==a.status?n("section",{},[0<a.carelistdata.length?n("div",a._l(a.carelistdata,function(e,t){return n("div",{key:t,staticClass:"careinfobox",staticStyle:{"background-color":"#f5ac9e"},on:{click:function(t){return a.deletcare(e.bankid)}}},[n("div",{staticClass:"careitem"},[n("div",{staticClass:"careinfo"},[n("p",[a._v(a._s(e.name)+"  ("+a._s(e.number)+")")]),a._v(" "),n("p",[a._v("储蓄卡")]),a._v(" "),2!=e.signtype?n("p",[a._v("未认证成功,请解绑重新绑定")]):a._e()])]),a._v(" "),n("div",{staticClass:"carenumber"},[n("p",[a._v("****   ****   ****   "+a._s(e.number))])])])}),0):n("div",[a._m(1)])]):a._e(),a._v(" "),2==a.status?n("section",{},[a._m(2),a._v(" "),n("div",{staticClass:"itemboxs"},[n("div",{staticClass:"item"},[n("div",{staticClass:"itp1"},[a._v("银行卡号")]),a._v(" "),n("div",{staticClass:"itp2",on:{click:a.onfouce}},[""==a.banknumber?n("p",[a._v("请填写银行卡号")]):a._l([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],function(t,e){return n("span",{key:t,staticClass:"spani"},[a._v(a._s(a._f("towhert")(a.banknumber,e)))])})],2),a._v(" "),n("div",{staticClass:"inputhide"},[n("input",{directives:[{name:"model",rawName:"v-model",value:a.banknumber,expression:"banknumber"}],ref:"content",attrs:{type:"tel",name:"",maxlength:"19",value:""},domProps:{value:a.banknumber},on:{input:function(t){t.target.composing||(a.banknumber=t.target.value)}}})])])]),a._v(" "),n("div",{staticClass:"itemboxs"},[n("div",{staticClass:"item"},[n("div",{staticClass:"itp1"},[a._v("选择银行")]),a._v(" "),n("div",{staticClass:"itp2"},[n("div",{staticClass:"chebank",on:{click:a.checkbank}},[a.bankcareinfo.name?n("p",[a._v(a._s(a.bankcareinfo.name))]):n("p",[a._v("请选择银行卡")]),a._v(" "),n("i",{staticClass:"newright-arrow"})])])])]),a._v(" "),n("div",{staticClass:"itemboxs"},[n("div",{staticClass:"item"},[n("div",{staticClass:"itp1"},[a._v("开户地区")]),a._v(" "),n("div",{staticClass:"itp2"},[n("p",{on:{click:a.showCity}},[a._v(a._s(a.city?a.city.text:"请选择开户地区"))])])])]),a._v(" "),n("div",{staticClass:"itemboxs"},[n("div",{staticClass:"item"},[n("div",{staticClass:"itp1"},[a._v("银行卡支行")]),a._v(" "),n("div",{staticClass:"itp2"},[n("input",{directives:[{name:"model",rawName:"v-model",value:a.bankbranch,expression:"bankbranch"}],attrs:{type:"text",name:"",placeholder:"请填写支行(非必填)",maxlength:"11"},domProps:{value:a.bankbranch},on:{input:function(t){t.target.composing||(a.bankbranch=t.target.value)}}})])])]),a._v(" "),n("div",{staticClass:"itemboxs"},[n("div",{staticClass:"item"},[n("div",{staticClass:"itp1"},[a._v("银行预留手机")]),a._v(" "),n("div",{staticClass:"itp2"},[n("input",{directives:[{name:"model",rawName:"v-model",value:a.telphone,expression:"telphone"}],attrs:{type:"tel",name:"",placeholder:"请填写电话号码",maxlength:"11"},domProps:{value:a.telphone},on:{input:function(t){t.target.composing||(a.telphone=t.target.value)}}})])])])]):a._e(),a._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:a.renzhen,expression:"renzhen"}],staticClass:"zhezhaos"}),a._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:a.renzhen,expression:"renzhen"}],staticClass:"invietbox"},[n("p",[a._v("已发送验证码到银行卡预留手机号")]),a._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:a.codetel,expression:"codetel"}],attrs:{type:"tel",maxlength:"6"},domProps:{value:a.codetel},on:{input:function(t){t.target.composing||(a.codetel=t.target.value)}}}),a._v(" "),n("div",{staticClass:"querenbox"},[n("p",{staticClass:"pp1",on:{click:a.getyaoqingma}},[a._v("确认")]),a._v(" "),n("p",{staticClass:"pp2",on:{click:a.quxiao}},[a._v("取消")])])]),a._v(" "),0==a.status?n("div",{staticClass:"appbtn yanbtn",on:{click:function(t){return a.next()}}},[a._v("下一步")]):a._e(),a._v(" "),1==a.status?n("div",{staticClass:"appbtn yanbtn",on:{click:function(t){return a.next()}}},[a._v("添加一张新的银行卡")]):a._e(),a._v(" "),2==a.status?n("div",{staticClass:"appbtn yanbtn",on:{click:function(t){return a.next()}}},[a._v("完成")]):a._e()])}var i=a(0),s=a.n(i),r=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"toubu"},[e("p",[this._v("第一次绑定银行卡前，请填写本人的相关真实有效信息，已经绑定成功后，该部分信息不能修改！")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"nobankcar"},[e("img",{attrs:{src:a(117)}}),this._v(" "),e("p",[this._v("暂时没有银行卡~")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bakimg"},[e("p",[this._v("请填写您本人的银行卡信息")])])}];n._withStripped=!0;var o={components:{},props:{},data:function(){return{status:"",realname:"",certno:"",banknumber:"",bankbranch:"",focusState:!1,bankcareinfo:{name:"",text:""},city:"",telphone:"",carelistdata:"",yanzhentijiao:!1,codetel:"",renzhen:!1,ticket:"",renbankid:""}},watch:{banknumber:function(){this.jiancha()}},computed:{},methods:{next:function(){var e=this;if(0==this.status){if(""==this.realname)return promptMsg("姓名不能为空"),!1;if(!this.certno)return promptMsg("身份证不能为空"),!1;https({url:siteUrl+"Main/MemberPay/VerifiedUser?uid="+getname(),data:{uid:getname(),realname:e.realname,certno:e.certno},method:"post",headers:1,successBack:function(t){t.success&&1==t.status?"pay"==api.pageParam.whoin?e.cherkpassword():(window.api&&api.execScript({name:api.frameName,script:'checktitle("绑定银行卡")'}),e.status=1):promptMsg(t.err)}})}else if(1==this.status)openWin({name:"add_bankcard",url:"./addbank_card.html",pageParam:{title:"添加银行卡",status:2}},1);else if(2==this.status){e=this;if(""==this.banknumber)return promptMsg("银行卡不能为空"),!1;if(""==this.city.coder||null==this.city.code)return promptMsg("银行地区不能为空"),!1;if(""==this.telphone)return promptMsg("电话号码不能为空"),!1;if(this.telphone.length<11)return promptMsg("电话号码格式错误"),!1;if(""==this.bankcareinfo.text||null==this.bankcareinfo.text)return promptMsg("银行卡类型不能为空"),!1;if(this.yanzhentijiao)return promptMsg("请勿重复点击"),!1;this.yanzhentijiao=!0,https({url:siteUrl+"Main/MemberPay/BindUserBank?uid="+getname(),method:"post",data:{uid:getname(),bankcode:e.bankcareinfo.text,bankaccountno:e.banknumber,phoneno:e.telphone,areacode:e.city.code,bankbranch:e.bankbranch},headers:1,successBack:function(t){t.success&&1==t.status?(e.ticket=t.Data.ticket,e.renbankid=t.Data.bankid,e.renzhen=!0,api.sendEvent({name:"bank_cardlist"})):(e.yanzhentijiao=!1,promptMsg(t.err))}})}},getyaoqingma:function(){var e=this;""!=e.codetel?e.codetel.length<6?promptMsg("请输入正确格式的验证码"):1==e.status?https({url:siteUrl+"Main/MemberPay/UnBindUserBankAdvance?uid="+getname(),method:"post",data:{uid:getname(),bankid:e.renbankid,ticket:e.ticket,code:e.codetel},headers:1,successBack:function(t){t.success&&1==t.status?(e.renbankid="",e.ticket="",e.codetel="",e.renzhen=!1,e.datalist(),promptMsg("解绑成功")):promptMsg(t.err)}}):https({url:siteUrl+"Main/MemberPay/BindUserBankAdvance?uid="+getname(),method:"post",data:{uid:getname(),bankid:e.renbankid,ticket:e.ticket,code:e.codetel},headers:1,successBack:function(t){t.success&&1==t.status?(e.renbankid="",e.ticket="",e.codetel="",e.renzhen=!1,api.sendEvent({name:"bank_cardlist"}),promptMsg("绑定成功"),setTimeout(function(){api.closeWin({name:api.winName})},1500)):promptMsg(t.err)}}):promptMsg("请输入验证码")},showCity:function(){var e=this;api.require("UIActionSelector").open({datas:"widget://common/json/citys.json",layout:{row:5,col:3,height:30,size:12,sizeActive:14,rowSpacing:5,colSpacing:10,maskBg:"rgba(0,0,0,0.2)",bg:"#fff",color:"#888",colorActive:"#f00",colorSelected:"#f00"},animation:!0,cancel:{text:"取消",size:12,w:90,h:35,bg:"#fff",bgActive:"#ccc",color:"#888",colorActive:"#fff"},ok:{text:"确定",size:12,w:90,h:35,bg:"#fff",bgActive:"#ccc",color:"#888",colorActive:"#fff"},title:{text:"",size:12,h:44,bg:"#fff",color:"#888"},fixedOn:api.frameName},function(a,t){if(a){if("ok"==a.eventType){var n="";a.selectedInfo.forEach(function(t,e){e==a.selectedInfo.length-1&&(n=t.code)}),e.city={text:a.level1+a.level2+a.level3,code:n}}}else promptMsg(JSON.stringify(t))})},checkbank:function(){var a=this;api.require("UIActionSelector").open({datas:api.wgtRootDir+"/common/json/bankcare.json",layout:{row:5,col:1,height:30,size:12,sizeActive:14,rowSpacing:5,colSpacing:10,maskBg:"rgba(0,0,0,0.2)",bg:"#fff",color:"#888",colorActive:"#f00",colorSelected:"#f00"},animation:!0,cancel:{text:"取消",size:12,w:90,h:35,bg:"#fff",bgActive:"#ccc",color:"#888",colorActive:"#fff"},ok:{text:"确定",size:12,w:90,h:35,bg:"#fff",bgActive:"#ccc",color:"#888",colorActive:"#fff"},title:{text:"",size:12,h:44,bg:"#fff",color:"#888"},fixedOn:api.frameName},function(t,e){t?"ok"==t.eventType&&(a.bankcareinfo={name:t.selectedInfo[0].name,text:t.selectedInfo[0].text}):alert(JSON.stringify(e))})},jiancha:function(){var n=this;15<n.banknumber.length&&https({url:"https://ccdcapi.alipay.com/validateAndCacheCardInfo.json",data:{cardNo:this.banknumber,cardBinCheck:"true"},successBack:function(a){a.validated&&"ok"==a.stat?$api.strToJson(n.databank).forEach(function(t,e){t.text==a.bank&&(n.bankcareinfo={name:t.name,text:t.text})}):n.bankcareinfo={name:"",text:""}}})},deletcare:function(t){var e=this;alerts("提示","是否解除绑定","解除",function(){https({url:siteUrl+"Main/MemberPay/UnBindUserBank",method:"post",data:{uid:getname(),bankid:t},headers:1,successBack:function(t){t.success&&1==t.status?t.Data?(e.ticket=t.Data.ticket,e.renbankid=t.Data.bankid,e.renzhen=!0):e.datalist():promptMsg(t.err)}})})},onfouce:function(){this.$refs.content.focus()},datalist:function(){var e=this;https({url:siteUrl+"Main/MemberPay/GetUserBankListJson",method:"get",data:{uid:getname()},headers:1,successBack:function(t){if(t.success&&1==t.status&&null!=t.Data){var n=[];t.Data.forEach(function(a,t){$api.strToJson(e.databank).forEach(function(t,e){t.text==a.bankcode&&n.push({name:t.name,number:a.accountno.substr(a.accountno.length-4),bankid:a.bankid,signtype:a.signtype})})}),e.carelistdata=n}else t.success&&1==t.status?e.carelistdata="":(e.carelistdata="",promptMsg(t.err))}})},cherkpassword:function(){https({url:siteUrl+"Main/MemberPay/CheckPayPwd",method:"get",data:{uid:getname(),devicetype:1},headers:1,successBack:function(t){t.success&&1==t.status?"N"==t.Data.issetpwd?(OpenWebPage(t.Data.url,"密码设置"),setTimeout(function(){api.closeWin()},1e3)):"Y"==t.Data.issetpwd&&api.closeWin():promptMsg(t.err)}})},quxiao:function(){2==this.status?(api.sendEvent({name:"bank_cardlist"}),api.closeWin({name:api.winName})):this.renzhen=!1}},filters:{towhert:function(t,e){return t.substr(e,1)}},created:function(){var a=this;window.api&&(a.databank=api.readFile({sync:!0,path:api.wgtRootDir+"/common/json/bankcare.json"}),api.addEventListener({name:"bank_cardlist"},function(t,e){a.datalist()}))},mounted:function(){this.status=pageParam("status"),1==this.status&&this.datalist()}},c=(a(118),a(1)),l=Object(c.a)(o,n,r,!1,null,null,null);l.options.__file="src/page/addbank_card/index.vue";var u=l.exports;openapp?window.apiready=function(){new s.a({render:function(t){return t(u)}}).$mount("#app")}:new s.a({render:function(t){return t(u)}}).$mount("#app")},53:function(t,e,a){}});