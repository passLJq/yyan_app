!function(i){var n={};function s(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return i[t].call(e.exports,e,e.exports,s),e.l=!0,e.exports}s.m=i,s.c=n,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=233)}({0:function(t,e){t.exports=Vue},1:function(t,e,i){"use strict";function n(t,e,i,n,s,r,o,a){var c,u="function"==typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=i,u._compiled=!0),n&&(u.functional=!0),r&&(u._scopeId="data-v-"+r),o?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),s&&s.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},u._ssrRegister=c):s&&(c=a?function(){s.call(this,this.$root.$options.shadowRoot)}:s),c)if(u.functional){u._injectStyles=c;var l=u.render;u.render=function(t,e){return c.call(e),l(t,e)}}else{var d=u.beforeCreate;u.beforeCreate=d?[].concat(d,c):[c]}return{exports:t,options:u}}i.d(e,"a",function(){return n})},101:function(t,e,i){"use strict";function u(){return(u=Object.assign||function(t){for(var e,i=1;i<arguments.length;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)}var l=["attrs","props","domProps"],d=["class","style","directives"],p=["on","nativeOn"],f=function(t,e){return function(){t&&t.apply(this,arguments),e&&e.apply(this,arguments)}};t.exports=function(t){return t.reduce(function(t,e){for(var i in e)if(t[i])if(-1!==l.indexOf(i))t[i]=u({},t[i],e[i]);else if(-1!==d.indexOf(i)){var n=t[i]instanceof Array?t[i]:[t[i]],s=e[i]instanceof Array?e[i]:[e[i]];t[i]=n.concat(s)}else if(-1!==p.indexOf(i))for(var r in e[i])if(t[i][r]){var o=t[i][r]instanceof Array?t[i][r]:[t[i][r]],a=e[i][r]instanceof Array?e[i][r]:[e[i][r]];t[i][r]=o.concat(a)}else t[i][r]=e[i][r];else if("hook"==i)for(var c in e[i])t[i][c]=t[i][c]?f(t[i][c],e[i][c]):e[i][c];else t[i]=e[i];else t[i]=e[i];return t},{})}},110:function(t,e,i){t.exports=i.p+"img/orderno.png"},19:function(t,e){var i;i=function(){return this}();try{i=i||new Function("return this")()}catch(t){"object"==typeof window&&(i=window)}t.exports=i},2:function(t,e,i){"use strict";var n=i(0),s=i.n(n),r="--";function o(t,e,i){return e?t+i+e:t}function a(i){return function(t,e){return t&&"string"!=typeof t&&(e=t,t=""),t=o(i,t,"__"),e?[t,function e(i,n){if("string"==typeof n)return o(i,n,r);if(Array.isArray(n))return n.map(function(t){return e(i,t)});var s={};return n&&Object.keys(n).forEach(function(t){s[i+r+t]=n[t]}),s}(t,e)]:t}}Object.prototype.hasOwnProperty;var c=s.a.prototype,u=s.a.util.defineReactive;u(c,"$vantLang","zh-CN"),u(c,"$vantMessages",{"zh-CN":{name:"姓名",tel:"电话",save:"保存",confirm:"确认",cancel:"取消",delete:"删除",complete:"完成",loading:"加载中...",telEmpty:"请填写电话",nameEmpty:"请填写姓名",confirmDelete:"确定要删除么",telInvalid:"请填写正确的电话",vanContactCard:{addText:"添加联系人"},vanContactList:{addText:"新建联系人"},vanPagination:{prev:"上一页",next:"下一页"},vanPullRefresh:{pulling:"下拉即可刷新...",loosing:"释放即可刷新..."},vanSubmitBar:{label:"合计："},vanCoupon:{valid:"有效期",unlimited:"无使用门槛",discount:function(t){return t+"折"},condition:function(t){return"满"+t+"元可用"}},vanCouponCell:{title:"优惠券",tips:"使用优惠",count:function(t){return t+"张可用"}},vanCouponList:{empty:"暂无优惠券",exchange:"兑换",close:"不使用优惠",enable:"可使用优惠券",disabled:"不可使用优惠券",placeholder:"请输入优惠码"},vanAddressEdit:{area:"地区",postal:"邮政编码",areaEmpty:"请选择地区",addressEmpty:"请填写详细地址",postalEmpty:"邮政编码格式不正确",defaultAddress:"设为默认收货地址",telPlaceholder:"收货人手机号",namePlaceholder:"收货人姓名",areaPlaceholder:"选择省 / 市 / 区"},vanAddressEditDetail:{label:"详细地址",placeholder:"街道门牌、楼层房间号等信息"},vanAddressList:{add:"新增地址"}}});var l=function(){return c.$vantMessages[c.$vantLang]},d={methods:{slots:function(t,e){void 0===t&&(t="default");var i=this.$slots,n=this.$scopedSlots;return n[t]?n[t](e):i[t]}}},p={type:Array,default:function(){return[]}},f={type:Number,default:0};function h(t){var e=this.name;t.component(e,this),t.component(C("-"+e),this)}function v(i){return{functional:!0,props:i.props,model:i.model,render:function(t,e){return i(t,e.props,function(t){var e=t.scopedSlots||t.data.scopedSlots||{},i=t.slots();return Object.keys(i).forEach(function(t){e[t]||(e[t]=function(){return i[t]})}),e}(e),e)}}}function m(e){return function(t){return"function"==typeof t&&(t=v(t)),t.functional||(t.mixins=t.mixins||[],t.mixins.push(d)),t.props&&function(e){Object.keys(e).forEach(function(t){e[t]===Array?e[t]=p:e[t]===Number&&(e[t]=f)})}(t.props),t.name=e,t.install=h,t}}function b(t){return[m(t="van-"+t),a(t),function(t){var r=C(t)+".";return function(t){for(var e=_(l(),r+t)||_(l(),t),i=arguments.length,n=new Array(1<i?i-1:0),s=1;s<i;s++)n[s-1]=arguments[s];return"function"==typeof e?e.apply(void 0,n):e}}(t)]}i.d(e,"e",function(){return g}),i.d(e,"c",function(){return y}),i.d(e,"d",function(){return w}),i.d(e,"b",function(){return _}),i.d(e,"a",function(){return C}),i.d(e,"f",function(){return b});var g=s.a.prototype.$isServer;function y(t){return null!=t}function w(t){var e=typeof t;return null!==t&&("object"==e||"function"==e)}function _(t,e){var i=e.split("."),n=t;return i.forEach(function(t){n=y(n[t])?n[t]:""}),n}var x=/-(\w)/g;function C(t){return t.replace(x,function(t,e){return e.toUpperCase()})}},201:function(t,e,i){},202:function(t,e,i){t.exports=i.p+"img/weiXin-pay.png"},203:function(t,e,i){"use strict";var n=i(86);i.n(n).a},233:function(t,e,i){"use strict";i.r(e);i(5),i(201);var s=i(2),n=i(101),r=i.n(n),o=i(8),a=i(0),c=i.n(a),u=["ref","style","class","attrs","nativeOn","directives","staticClass","staticStyle"],l={nativeOn:"on"};function d(i,t){var e=u.reduce(function(t,e){return i.data[e]&&(t[l[e]||e]=i.data[e]),t},{});return t&&(e.on=e.on||{},Object(o.a)(e.on,i.data.on)),e}var p=Object(s.f)("info"),f=p[0],h=p[1];function v(t,e,i,n){if(Object(s.c)(e.info))return t("div",r()([{class:h()},d(n,!0)]),[e.info])}v.props={info:[String,Number]};var m=f(v);var b=Object(s.f)("icon")[0];function g(t,e,i,n){var s=function(t){return/^(https?:)?\/\/|data:image/.test(t)}(e.name);return t(e.tag,r()([{class:[e.classPrefix,s?"van-icon--image":e.classPrefix+"-"+e.name],style:{color:e.color,fontSize:e.size}},d(n,!0)]),[i.default&&i.default(),s&&t("img",{attrs:{src:e.name}}),t(m,{attrs:{info:e.info}})])}g.props={name:String,size:String,color:String,info:[String,Number],tag:{type:String,default:"i"},classPrefix:{type:String,default:"van-icon"}};function y(){var n=this,t=n.$createElement,s=n._self._c||t;return s("div",{ref:"app"},[s("van-tabs",{attrs:{"swipe-threshold":"5",swipeable:"true",color:"#FAAFA0",sticky:"true"},on:{change:n.change,click:n.change},model:{value:n.active,callback:function(t){n.active=t},expression:"active"}},n._l(n.titledata,function(t,e){return s("van-tab",{key:e,attrs:{title:t}},[n._l(n.data,function(i,t){return s("div",{key:t,staticClass:"orderbox"},[s("div",{staticClass:"oredertou"},[s("div",{staticClass:"oredertouleft"},[s("i",{staticClass:"iconfont icon-dianpu"}),n._v(" "),s("p",[n._v(n._s(i.shopname))]),n._v(" "),s("span",{staticClass:"newright-arrow"})]),n._v(" "),s("p",{staticClass:"orp"},[n._v("\n                  "+n._s(n._f("orderstate")(i.orderstate))+"\n                ")])]),n._v(" "),n._l(i.orderitems,function(t,e){return s("div",{key:e,staticClass:"ordermain",on:{click:function(t){return n.godetail(i.orderid)}}},[s("img",{attrs:{src:t.pic,alt:""}}),n._v(" "),s("div",{staticClass:"ordermainright"},[s("div",{staticClass:"ordertitle"},[s("p",[null!=i.gbdata?s("span",{staticClass:"ping"},[n._v("劲爆拼团")]):n._e(),n._v(" "),t.isrushbuy?s("span",{staticClass:"ping"},[n._v("限时抢购")]):n._e(),n._v(" "),110==i.ordetype?s("span",{staticClass:"chou"},[n._v("天天抽奖")]):n._e(),n._v(" "),4==i.ordetype||12==i.ordetype?s("span",{staticClass:"chou"},[n._v("创业礼包")]):n._e(),n._v("\n                    "+n._s(t.proname)+"\n                   ")]),n._v(" "),s("p",{staticClass:"skutext"},[n._v(n._s(t.skutext))])]),n._v(" "),s("div",{staticClass:"orderprice"},[110==t.ordertype?s("p",[n._v("¥"+n._s(Number(i.ordertotal/t.buycount).toFixed(2)))]):s("p",[n._v("¥"+n._s(t.price))]),n._v(" "),s("p",[n._v("x"+n._s(t.buycount))])])])])}),n._v(" "),s("div",{staticClass:"allprice"},[s("p",[n._v("共"+n._s(i.totalbuycount)+"件商品   合计："),s("span",[n._v("¥"+n._s(i.total))])])]),n._v(" "),s("div",{staticClass:"btnzu"},[10==i.orderstate?s("p",{staticClass:"paybtn",on:{click:function(t){return n.openpaybox(i.orderid,i.gbid,i.orderitems[0].ordertype,i.orderitems[0].invitationcode)}}},[n._v("付款")]):n._e(),n._v(" "),10==i.orderstate?s("p",{staticClass:"quxiapbtn",on:{click:function(t){return n.deletorder(i.orderid)}}},[n._v("取消订单")]):n._e(),n._v(" "),30==i.orderstate?s("p",{staticClass:"querenbtn",on:{click:function(t){return n.ReceiptOrder(i.orderid)}}},[n._v("确认收货")]):n._e(),n._v(" "),40==i.orderstate&&i.isopencomment?s("p",{staticClass:"querenbtn",on:{click:function(t){return n.toAssess(i.orderid)}}},[n._v("评价晒单")]):n._e()])],2)}),n._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:n.payboxshow,expression:"payboxshow"}]},[s("div",{staticClass:"zezao",on:{click:n.closebox}}),n._v(" "),s("div",{staticClass:"paybox",style:n.payboxshow?"bottom:0":""},[s("div",{staticClass:"payli"},[s("div",{staticClass:"paylileft"},[s("img",{attrs:{src:i(202),alt:""}}),n._v(" "),s("p",[n._v("微信")])]),n._v(" "),s("div",[s("van-radio-group",{model:{value:n.paycode,callback:function(t){n.paycode=t},expression:"paycode"}},[s("van-radio",{attrs:{name:"wxpay","checked-color":"#F5AC9E"}})],1)],1)]),n._v(" "),s("div",{staticClass:"okpay",style:n.safeAreaBottom?"padding-bottom:"+n.safeAreaBottom+"px":"",on:{click:n.PayOrder}},[n._v("\n                确认\n              ")])])]),n._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:n.payopenshop,expression:"payopenshop"}],attrs:{id:"yaoqinbox"}},[s("div",{staticClass:"zhezaos",on:{click:function(t){return n.showmodel(1)}}}),n._v(" "),s("div",{staticStyle:{position:"relative"}},[s("div",{staticClass:"tanchuan"},[s("div",{directives:[{name:"show",rawName:"v-show",value:1==n.modelstatu,expression:"modelstatu==1"}],staticClass:"inputbox",staticStyle:{"text-align":"center"},attrs:{id:"bu1"}},[s("p",[n._v("邀请码不可更改，如需更改请重新下单")])]),n._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:2==n.modelstatu,expression:"modelstatu==2"}],staticClass:"tuijianren",attrs:{id:"bu2"}},[s("p",[n._v("推荐人信息")]),n._v(" "),s("img",{attrs:{src:n.tuiimg?n.tuiimg:"./image/man.jpg",alt:"",id:"tuiimg"}}),n._v(" "),s("p",{attrs:{id:"tuiname"}},[n._v(n._s(n.tuiname))])]),n._v(" "),s("div",{staticClass:"appbtn yanbtn",attrs:{id:"next"},on:{click:function(t){return n.nextgo()}}},[n._v(n._s(1==n.modelstatu?"下一步":"确定"))])])])]),n._v(" "),0==n.data.length?s("div",{staticClass:"nodedata"},[s("img",{attrs:{src:i(110)}}),n._v(" "),s("div",{staticClass:"wenzi"},[s("p",[n._v("抱歉，您还没有相关的订单～")])])]):n._e()],2)}),1)],1)}var w,_,x=b(g),C=i(24),S=Object(s.f)("radio"),k=S[0],A=S[1],O=k({mixins:[(w="van-radio-group",_=A,{mixins:[C.a],props:{name:null,value:null,disabled:Boolean,checkedColor:String,labelPosition:String,labelDisabled:Boolean,shape:{type:String,default:"round"}},created:function(){this.findParent(w)},computed:{isDisabled:function(){return this.parent&&this.parent.disabled||this.disabled},iconStyle:function(){var t=this.checkedColor;if(t&&this.checked&&!this.isDisabled)return{borderColor:t,backgroundColor:t}}},render:function(t){var e=this,i=this.slots,n=this.checked,s=i("icon",{checked:n})||t(x,{attrs:{name:"success"},style:this.iconStyle}),r=i()&&t("span",{class:_("label",[this.labelPosition,{disabled:this.isDisabled}]),on:{click:this.onClickLabel}},[i()]);return t("div",{class:_(),on:{click:function(t){e.$emit("click",t)}}},[t("div",{class:_("icon",[this.shape,{disabled:this.isDisabled,checked:n}]),on:{click:this.onClickIcon}},[s]),r])}})],computed:{currentValue:{get:function(){return this.parent?this.parent.value:this.value},set:function(t){(this.parent||this).$emit("input",t)}},checked:function(){return this.currentValue===this.name}},methods:{onClickIcon:function(){this.isDisabled||(this.currentValue=this.name)},onClickLabel:function(){this.isDisabled||this.labelDisabled||(this.currentValue=this.name)}}}),D=Object(s.f)("radio-group"),P=D[0],T=D[1],$=P({props:{value:null,disabled:Boolean},watch:{value:function(t){this.$emit("change",t)}},render:function(t){return t("div",{class:T()},[this.slots()])}}),j=(i(34),i(27)),B=(i(35),i(29));y._withStripped=!0;var M={components:{},props:{},data:function(){return{data:"",stops:!1,currentPage:1,paycode:"wxpay",payboxshow:!1,gbidorder:!1,payorderid:"",invitationcode:"",payopenshop:!1,modelstatu:1,tuiimg:"",tuiname:"",titledata:["全部","待付款","待发货","待收货","已完成"],orderstatus:"",active:"",safeAreaBottom:""}},filters:{orderstate:function(t){return 10==t?"待付款":11==t?"待处理":20==t?"待发货":30==t?"已发货":40==t?"交易完成":50==t?"已退货":60==t?"已退款":62==t?"申请换货":70==t?"交易关闭":"--"}},watch:{},computed:{},methods:{change:function(t,e){var i=this;i.currentPage=1,i.stops=!1,0==t?(i.orderstatus="all",i.BindData()):1==t?(i.orderstatus="payment",i.BindData()):2==t?(i.orderstatus="pending",i.BindData()):3==t?(i.orderstatus="receipt",i.BindData()):4==t&&(i.orderstatus="completion",i.BindData())},BindData:function(){var e=this;https({url:siteUrl+"Main/Member/GetOrderListJson",data:{currpage:e.currentPage,pagesize:8,uid:getname(),orderstatus:e.orderstatus},headers:"1",successBack:function(t){1==t.status&&t.success&&null!=t.Data?1==e.currentPage?e.data=t.Data:e.data=e.data.concat(t.Data):2==t.status&&t.success?(1==e.currentPage&&(e.data=[]),e.stops=!0):promptMsg(t.err),window.api&&api.refreshHeaderLoadDone()}})},openpaybox:function(t,e,i,n){var s=this;s.gbidorder=null!=e,4==i&&""==getname("SessionShopID")?(s.invitationcode=n,s.payopenshop=!0):(s.payboxshow=!0,s.invitationcode=""),s.payorderid=t},closebox:function(){this.payboxshow=!1},PayOrder:function(){var n=this;""!=n.payorderid?("wxpay"==n.paycode&&https({url:siteUrl+"Main/ShoppingSinaPay/GetPayOrderInfo",data:{orderid:n.payorderid,uid:getname(),payid:"20180929145311965542",devicetype:1,devicemac:getname()},headers:1,successBack:function(t){t.success&&1==t.status&&null!=t.Data.payorderinfo&&""!=t.Data.payorderinfo?n.gbidorder?wechatpay(t.Data.payorderinfo,"wxpay","buynow","./groups_success.html",n.payorderid,t.ogid,"isgroupswechatpay"):n.invitationcode?wechatpay(t.Data.payorderinfo,"wxpay","buynow","./success.html",n.payorderid,"",""):wechatpay(t.Data.payorderinfo,"wxpay","buynow","./success.html",n.payorderid):promptMsg(t.err)}}),"alipay"==n.paycode&&https({url:siteUrl+"Main/Shopping/GetAliPayOrderInfo",data:{orderid:n.payorderid,uid:getname()},headers:1,successBack:function(t){if(t.success&&1==t.status&&null!=t.Data&&""!=t.Data){var i=t.ogid;api.require("aliPayPlus").payOrder({orderInfo:decodeURIComponent(t.Data)},function(t,e){"9000"==t.code?(ping_ordernow(n.payorderid,i,t.code),n.gbidorder?ShoppingSuccess("","buynow","./groups_success.html",n.payorderid,i,"isgroupswechatpay"):n.invitationcode?kaidian():ShoppingSuccess("","buynow","./success.html",n.payorderid)):("6001"!=t.code&&ping_ordernow(n.payorderid,i,t.code),pushMsg("订单号: ["+n.payorderid+"] 订单提交成功,等待付款",n.payorderid),api.alert({title:"支付结果",msg:alipayReturnCode(t.code),buttons:["确定"]})),n.currentPage=1,n.stops=!1,n.BindData(),n.closebox()})}else promptMsg(t.err)}})):promptMsg("参数出错")},onScroll:function(){var t=this.$refs.app.clientHeight,e=document.documentElement.clientHeight,i=document.documentElement.scrollTop||document.body.scrollTop;t<=e+i&&(this.stops||(this.currentPage+=1,this.BindData()))},deletorder:function(e){var i=this;comfirmDialogBox("是否删除订单？",function(){https({url:siteUrl+"Main/Member/CloseOrder?uid="+getname(),method:"post",data:{orderid:e,uid:getname()},headers:1,successBack:function(t){t.success?1==t.status?(i.currentPage=1,i.stops=!1,i.BindData(),pushMsg("订单号: ["+e+"] 关闭成功",e),promptMsg("订单关闭成功")):promptMsg(t.err):checkLoginStatus()&&promptMsg(err.msg)}})})},ReceiptOrder:function(t){var e=this;comfirmDialogBox("你确定已收到货物了吗？",function(){https({url:siteUrl+"Main/Member/ReceiptOrder?uid="+getname(),method:"post",data:{orderid:t,uid:getname()},headers:1,successBack:function(t){t.success?1==t.status?(e.currentPage=1,e.stops=!1,e.BindData(),promptMsg("您已确认收货")):promptMsg(t.err):checkLoginStatus()&&promptMsg(err.msg)}})})},godetail:function(t){openWin({name:"orderdetail",url:"./orderdetail.html",pageParam:{orderid:t,title:"订单详情"}},1)},showmodel:function(t){t&&(this.payopenshop=!1)},nextgo:function(){var e=this;1==e.modelstatu?https({url:siteUrl+"Main/Member/GetCodeUser?uid="+getname(),data:{code:e.invitationcode},headers:1,successBack:function(t){t.success&&1==t.status?(e.modelstatu=2,t.reobj.refereeimg&&(e.tuiimg=t.reobj.refereeimg),e.tuiname=t.reobj.referee):promptMsg(t.err)}}):2==e.modelstatu&&(e.payopenshop=!1,e.payboxshow=!0,e.modelstatu=1)},toAssess:function(t){openWin({name:"assess",url:"./assess.html",historyGestureEnabled:!0,pageParam:{orderId:t,title:"评价晒单"}},1)}},created:function(){},mounted:function(){var i=this;window.api?(i.safeAreaBottom=getname("safeAreaBottom"),api.setCustomRefreshHeaderInfo({bgColor:"#f8f8f8",images:["widget://image/suaxin1.png","widget://image/suaxin2.png","widget://image/suaxin3.png","widget://image/suaxin4.png","widget://image/suaxin5.png","widget://image/suaxin6.png","widget://image/suaxin7.png"],tips:{pull:"下拉刷新",threshold:"松开立即刷新",load:"正在刷新"}},function(){i.stops=!1,i.currentPage=1,i.BindData()}),api.addEventListener({name:"scrolltobottom"},function(t,e){i.stops||(i.currentPage+=1,i.BindData())})):window.addEventListener("scroll",this.onScroll);var t=pageParam("selectindex");this.active=t,this.change(t)}},E=(i(203),i(1)),L=Object(E.a)(M,y,[],!1,null,null,null);L.options.__file="src/page/order/index.vue";var N=L.exports;c.a.use(j.a).use(B.a),c.a.use($),c.a.use(O);openapp?window.apiready=function(){new c.a({render:function(t){return t(N)}}).$mount("#app")}:new c.a({render:function(t){return t(N)}}).$mount("#app")},24:function(t,e,i){"use strict";i.d(e,"a",function(){return n});var n={data:function(){return{parent:null}},methods:{findParent:function(t){for(var e=this.$parent;e;){if(e.$options.name===t){this.parent=e;break}e=e.$parent}}}}},27:function(t,e,i){"use strict";var n=i(2),s=i(24),r=Object(n.f)("tab"),o=r[0],a=r[1];e.a=o({mixins:[s.a],props:{title:String,disabled:Boolean},data:function(){return{inited:!1}},computed:{index:function(){return this.parent.tabs.indexOf(this)},selected:function(){return this.index===this.parent.curActive}},watch:{"parent.curActive":function(){this.inited=this.inited||this.selected},title:function(){this.parent.setLine()}},created:function(){this.findParent("van-tabs")},mounted:function(){var t=this.parent.tabs,e=this.parent.slots().indexOf(this.$vnode);t.splice(-1===e?t.length:e,0,this),this.slots("title")&&this.parent.renderTitle(this.$refs.title,this.index)},beforeDestroy:function(){this.parent.tabs.splice(this.index,1)},render:function(t){var e=this.slots,i=this.inited||!this.parent.lazyRender;return t("div",{directives:[{name:"show",value:this.selected||this.parent.animated}],class:a("pane")},[i?e():t(),e("title")&&t("div",{ref:"title"},[e("title")])])}})},28:function(t,o,a){"use strict";(function(t){a.d(o,"a",function(){return r});var e=a(2),s=Date.now();var i=e.e?t:window,n=i.requestAnimationFrame||function(t){var e=Date.now(),i=Math.max(0,16-(e-s)),n=setTimeout(t,i);return s=e+i,n};i.cancelAnimationFrame||i.clearTimeout;function r(t){return n.call(i,t)}}).call(this,a(19))},29:function(t,e,i){"use strict";var l=i(2),o=i(28),a=i(3),n=i(6);function s(t){return"scrollTop"in t?t.scrollTop:t.pageYOffset}function r(t){return(t===window?0:t.getBoundingClientRect().top)+s(window)}var c=Object(l.f)("tabs"),u=c[0],d=c[1],p=Object(l.f)("tab")[1];e.a=u({mixins:[n.a],model:{prop:"active"},props:{color:String,sticky:Boolean,animated:Boolean,offsetTop:Number,swipeable:Boolean,background:String,titleActiveColor:String,titleInactiveColor:String,ellipsis:{type:Boolean,default:!0},lazyRender:{type:Boolean,default:!0},lineWidth:{type:Number,default:null},lineHeight:{type:Number,default:null},active:{type:[Number,String],default:0},type:{type:String,default:"line"},duration:{type:Number,default:.3},swipeThreshold:{type:Number,default:4}},data:function(){return{tabs:[],position:"",curActive:null,lineStyle:{backgroundColor:this.color},events:{resize:!1,sticky:!1,swipeable:!1}}},computed:{scrollable:function(){return this.tabs.length>this.swipeThreshold||!this.ellipsis},wrapStyle:function(){switch(this.position){case"top":return{top:this.offsetTop+"px",position:"fixed"};case"bottom":return{top:"auto",bottom:0};default:return null}},navStyle:function(){return{borderColor:this.color,background:this.background}},trackStyle:function(){if(this.animated)return{left:-1*this.curActive*100+"%",transitionDuration:this.duration+"s"}}},watch:{active:function(t){t!==this.curActive&&this.correctActive(t)},color:function(){this.setLine()},tabs:function(){this.correctActive(this.curActive||this.active),this.scrollIntoView(),this.setLine()},curActive:function(){this.scrollIntoView(),this.setLine(),"top"!==this.position&&"bottom"!==this.position||function(t,e){"scrollTop"in t?t.scrollTop=e:t.scrollTo(t.scrollX,e)}(window,r(this.$el)-this.offsetTop)},sticky:function(){this.handlers(!0)},swipeable:function(){this.handlers(!0)}},mounted:function(){this.onShow()},activated:function(){this.onShow(),this.setLine()},deactivated:function(){this.handlers(!1)},beforeDestroy:function(){this.handlers(!1)},methods:{onShow:function(){var t=this;this.$nextTick(function(){t.inited=!0,t.handlers(!0),t.scrollIntoView(!0)})},handlers:function(t){var e=this.events,i=this.sticky&&t,n=this.swipeable&&t;if(e.resize!==t&&((e.resize=t)?a.b:a.a)(window,"resize",this.setLine,!0),e.sticky!==i&&(e.sticky=i,this.scrollEl=this.scrollEl||function(t,e){void 0===e&&(e=window);for(var i=t;i&&"HTML"!==i.tagName&&"BODY"!==i.tagName&&1===i.nodeType&&i!==e;){var n=window.getComputedStyle(i).overflowY;if("scroll"===n||"auto"===n)return i;i=i.parentNode}return e}(this.$el),(i?a.b:a.a)(this.scrollEl,"scroll",this.onScroll,!0),this.onScroll()),e.swipeable!==n){e.swipeable=n;var s=this.$refs.content,r=n?a.b:a.a;r(s,"touchstart",this.touchStart),r(s,"touchmove",this.touchMove),r(s,"touchend",this.onTouchEnd),r(s,"touchcancel",this.onTouchEnd)}},onTouchEnd:function(){var t=this.direction,e=this.deltaX,i=this.curActive;"horizontal"===t&&50<=this.offsetX&&(0<e&&0!==i?this.setCurActive(i-1):e<0&&i!==this.tabs.length-1&&this.setCurActive(i+1))},onScroll:function(){var t=s(window)+this.offsetTop,e=r(this.$el),i=e+this.$el.offsetHeight-this.$refs.wrap.offsetHeight;this.position=i<t?"bottom":e<t?"top":"";var n={scrollTop:t,isFixed:"top"===this.position};this.$emit("scroll",n)},setLine:function(){var c=this,u=this.inited;this.$nextTick(function(){var t=c.$refs.tabs;if(t&&t[c.curActive]&&"line"===c.type){var e=t[c.curActive],i=c.lineWidth,n=c.lineHeight,s=Object(l.c)(i)?i:e.offsetWidth/2,r=e.offsetLeft+(e.offsetWidth-s)/2,o={width:s+"px",backgroundColor:c.color,transform:"translateX("+r+"px)"};if(u&&(o.transitionDuration=c.duration+"s"),Object(l.c)(n)){var a=n+"px";o.height=a,o.borderRadius=a}c.lineStyle=o}})},correctActive:function(e){e=+e;var t=this.tabs.some(function(t){return t.index===e}),i=(this.tabs[0]||{}).index||0;this.setCurActive(t?e:i)},setCurActive:function(t){t=this.findAvailableTab(t,t<this.curActive),Object(l.c)(t)&&t!==this.curActive&&(this.$emit("input",t),null!==this.curActive&&this.$emit("change",t,this.tabs[t].title),this.curActive=t)},findAvailableTab:function(t,e){for(var i=e?-1:1,n=t;0<=n&&n<this.tabs.length;){if(!this.tabs[n].disabled)return n;n+=i}},onClick:function(t){var e=this.tabs[t],i=e.title;e.disabled?this.$emit("disabled",t,i):(this.setCurActive(t),this.$emit("click",t,i))},scrollIntoView:function(t){var e=this.$refs.tabs;if(this.scrollable&&e&&e[this.curActive]){var i=this.$refs.nav,n=i.scrollLeft,s=i.offsetWidth,r=e[this.curActive],o=r.offsetLeft,a=r.offsetWidth;this.scrollTo(i,n,o-(s-a)/2,t)}},scrollTo:function(e,i,n,t){if(t)e.scrollLeft+=n-i;else{var s=0,r=Math.round(1e3*this.duration/16);!function t(){e.scrollLeft+=(n-i)/r,++s<r&&Object(o.a)(t)}()}},renderTitle:function(e,i){var n=this;this.$nextTick(function(){var t=n.$refs.title[i];t.parentNode.replaceChild(e,t)})},getTabStyle:function(t,e){var i={},n=this.color,s=e===this.curActive,r="card"===this.type;n&&(t.disabled||!r||s||(i.color=n),!t.disabled&&r&&s&&(i.backgroundColor=n),r&&(i.borderColor=n));var o=s?this.titleActiveColor:this.titleInactiveColor;return o&&(i.color=o),this.scrollable&&this.ellipsis&&(i.flexBasis=88/this.swipeThreshold+"%"),i}},render:function(i){var n=this,t=this.type,s=this.ellipsis,e=this.animated,r=this.scrollable,o=this.tabs.map(function(t,e){return i("div",{ref:"tabs",refInFor:!0,class:p({active:e===n.curActive,disabled:t.disabled,complete:!s}),style:n.getTabStyle(t,e),on:{click:function(){n.onClick(e)}}},[i("span",{ref:"title",refInFor:!0,class:{"van-ellipsis":s}},[t.title])])});return i("div",{class:d([t])},[i("div",{ref:"wrap",style:this.wrapStyle,class:[d("wrap",{scrollable:r}),{"van-hairline--top-bottom":"line"===t}]},[i("div",{ref:"nav",class:d("nav",[t]),style:this.navStyle},[this.slots("nav-left"),"line"===t&&i("div",{class:d("line"),style:this.lineStyle}),o,this.slots("nav-right")])]),i("div",{ref:"content",class:d("content",{animated:e})},[e?i("div",{class:d("track"),style:this.trackStyle},[this.slots()]):this.slots()])])}})},3:function(t,e,i){"use strict";i.d(e,"b",function(){return o}),i.d(e,"a",function(){return a}),i.d(e,"c",function(){return c});var s=i(2),r=!1;if(!s.e)try{var n={};Object.defineProperty(n,"passive",{get:function(){r=!0}}),window.addEventListener("test-passive",null,n)}catch(t){}function o(t,e,i,n){void 0===n&&(n=!1),s.e||t.addEventListener(e,i,!!r&&{capture:!1,passive:n})}function a(t,e,i){s.e||t.removeEventListener(e,i)}function c(t,e){"boolean"==typeof t.cancelable&&!t.cancelable||t.preventDefault(),e&&function(t){t.stopPropagation()}(t)}},34:function(t,e,i){"use strict";i(5)},35:function(t,e,i){"use strict";i(5),i(36)},36:function(t,e,i){},5:function(t,e,i){},6:function(t,e,i){"use strict";i.d(e,"a",function(){return n});var n={data:function(){return{direction:""}},methods:{touchStart:function(t){this.resetTouchStatus(),this.startX=t.touches[0].clientX,this.startY=t.touches[0].clientY},touchMove:function(t){var e=t.touches[0];this.deltaX=e.clientX-this.startX,this.deltaY=e.clientY-this.startY,this.offsetX=Math.abs(this.deltaX),this.offsetY=Math.abs(this.deltaY),this.direction=this.direction||function(t,e){return e<t&&10<t?"horizontal":t<e&&10<e?"vertical":""}(this.offsetX,this.offsetY)},resetTouchStatus:function(){this.direction="",this.deltaX=0,this.deltaY=0,this.offsetX=0,this.offsetY=0}}}},8:function(t,e,i){"use strict";function n(){return(n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t}).apply(this,arguments)}i.d(e,"a",function(){return n})},86:function(t,e,i){}});