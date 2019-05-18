!function(e){var n={};function s(t){if(n[t])return n[t].exports;var i=n[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=e,s.c=n,s.d=function(t,i,e){s.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:e})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(i,t){if(1&t&&(i=s(i)),8&t)return i;if(4&t&&"object"==typeof i&&i&&i.__esModule)return i;var e=Object.create(null);if(s.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:i}),2&t&&"string"!=typeof i)for(var n in i)s.d(e,n,function(t){return i[t]}.bind(null,n));return e},s.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(i,"a",i),i},s.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},s.p="",s(s.s=246)}({0:function(t,i){t.exports=Vue},1:function(t,i,e){"use strict";function n(t,i,e,n,s,o,r,a){var c,u="function"==typeof t?t.options:t;if(i&&(u.render=i,u.staticRenderFns=e,u._compiled=!0),n&&(u.functional=!0),o&&(u._scopeId="data-v-"+o),r?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),s&&s.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},u._ssrRegister=c):s&&(c=a?function(){s.call(this,this.$root.$options.shadowRoot)}:s),c)if(u.functional){u._injectStyles=c;var l=u.render;u.render=function(t,i){return c.call(i),l(t,i)}}else{var h=u.beforeCreate;u.beforeCreate=h?[].concat(h,c):[c]}return{exports:t,options:u}}e.d(i,"a",function(){return n})},10:function(t,i,e){"use strict";var r=e(8),n=e(2),s=Object(n.f)("swipe-item"),o=s[0],a=s[1];i.a=o({data:function(){return{offset:0}},beforeCreate:function(){this.$parent.swipes.push(this)},destroyed:function(){this.$parent.swipes.splice(this.$parent.swipes.indexOf(this),1)},render:function(t){var i=this.$parent,e=i.vertical,n=i.computedWidth,s=i.computedHeight,o={width:n+"px",height:e?s+"px":"100%",transform:"translate"+(e?"Y":"X")+"("+this.offset+"px)"};return t("div",{class:a(),style:o,on:Object(r.a)({},this.$listeners)},[this.slots()])}})},13:function(t,i,e){"use strict";e(5),e(14)},14:function(t,i,e){},15:function(t,i,e){"use strict";e(5),e(16)},16:function(t,i,e){},188:function(t,i,e){"use strict";var n=e(77);e.n(n).a},2:function(t,i,e){"use strict";var n=e(0),s=e.n(n),o="--";function r(t,i,e){return i?t+e+i:t}function a(e){return function(t,i){return t&&"string"!=typeof t&&(i=t,t=""),t=r(e,t,"__"),i?[t,function i(e,n){if("string"==typeof n)return r(e,n,o);if(Array.isArray(n))return n.map(function(t){return i(e,t)});var s={};return n&&Object.keys(n).forEach(function(t){s[e+o+t]=n[t]}),s}(t,i)]:t}}Object.prototype.hasOwnProperty;var c=s.a.prototype,u=s.a.util.defineReactive;u(c,"$vantLang","zh-CN"),u(c,"$vantMessages",{"zh-CN":{name:"姓名",tel:"电话",save:"保存",confirm:"确认",cancel:"取消",delete:"删除",complete:"完成",loading:"加载中...",telEmpty:"请填写电话",nameEmpty:"请填写姓名",confirmDelete:"确定要删除么",telInvalid:"请填写正确的电话",vanContactCard:{addText:"添加联系人"},vanContactList:{addText:"新建联系人"},vanPagination:{prev:"上一页",next:"下一页"},vanPullRefresh:{pulling:"下拉即可刷新...",loosing:"释放即可刷新..."},vanSubmitBar:{label:"合计："},vanCoupon:{valid:"有效期",unlimited:"无使用门槛",discount:function(t){return t+"折"},condition:function(t){return"满"+t+"元可用"}},vanCouponCell:{title:"优惠券",tips:"使用优惠",count:function(t){return t+"张可用"}},vanCouponList:{empty:"暂无优惠券",exchange:"兑换",close:"不使用优惠",enable:"可使用优惠券",disabled:"不可使用优惠券",placeholder:"请输入优惠码"},vanAddressEdit:{area:"地区",postal:"邮政编码",areaEmpty:"请选择地区",addressEmpty:"请填写详细地址",postalEmpty:"邮政编码格式不正确",defaultAddress:"设为默认收货地址",telPlaceholder:"收货人手机号",namePlaceholder:"收货人姓名",areaPlaceholder:"选择省 / 市 / 区"},vanAddressEditDetail:{label:"详细地址",placeholder:"街道门牌、楼层房间号等信息"},vanAddressList:{add:"新增地址"}}});var l=function(){return c.$vantMessages[c.$vantLang]},h={methods:{slots:function(t,i){void 0===t&&(t="default");var e=this.$slots,n=this.$scopedSlots;return n[t]?n[t](i):e[t]}}},f={type:Array,default:function(){return[]}},p={type:Number,default:0};function d(t){var i=this.name;t.component(i,this),t.component(S("-"+i),this)}function v(e){return{functional:!0,props:e.props,model:e.model,render:function(t,i){return e(t,i.props,function(t){var i=t.scopedSlots||t.data.scopedSlots||{},e=t.slots();return Object.keys(e).forEach(function(t){i[t]||(i[t]=function(){return e[t]})}),i}(i),i)}}}function g(i){return function(t){return"function"==typeof t&&(t=v(t)),t.functional||(t.mixins=t.mixins||[],t.mixins.push(h)),t.props&&function(i){Object.keys(i).forEach(function(t){i[t]===Array?i[t]=f:i[t]===Number&&(i[t]=p)})}(t.props),t.name=i,t.install=d,t}}function m(t){return[g(t="van-"+t),a(t),function(t){var o=S(t)+".";return function(t){for(var i=w(l(),o+t)||w(l(),t),e=arguments.length,n=new Array(1<e?e-1:0),s=1;s<e;s++)n[s-1]=arguments[s];return"function"==typeof i?i.apply(void 0,n):i}}(t)]}e.d(i,"e",function(){return y}),e.d(i,"c",function(){return _}),e.d(i,"d",function(){return C}),e.d(i,"b",function(){return w}),e.d(i,"a",function(){return S}),e.d(i,"f",function(){return m});var y=s.a.prototype.$isServer;function _(t){return null!=t}function C(t){var i=typeof t;return null!==t&&("object"==i||"function"==i)}function w(t,i){var e=i.split("."),n=t;return e.forEach(function(t){n=_(n[t])?n[t]:""}),n}var b=/-(\w)/g;function S(t){return t.replace(b,function(t,i){return i.toUpperCase()})}},246:function(t,i,o){"use strict";o.r(i);o(13);function e(){var n=this,t=n.$createElement,s=n._self._c||t;return s("section",[s("header",{staticClass:"my_coupon_header",attrs:{id:"header"}},[s("div",{staticClass:"mo",on:{click:function(t){return n.changeCon(0)}}},[n._v("\n      未使用\n      "),n.hasData(0)?s("span",[n._v(n._s(n.listNum(0)))]):n._e()]),n._v(" "),s("div",{staticClass:"mo",on:{click:function(t){return n.changeCon(1)}}},[n._v("\n      已使用\n      "),n.hasData(1)?s("span",[n._v(n._s(n.listNum(1)))]):n._e()]),n._v(" "),s("div",{staticClass:"mo",on:{click:function(t){return n.changeCon(2)}}},[n._v("\n      已过期\n      "),n.hasData(2)?s("span",[n._v(n._s(n.listNum(2)))]):n._e()]),n._v(" "),s("div",{ref:"line",staticClass:"line",staticStyle:{left:"4.7%",transition:"all 0.5s ease-out"}})]),n._v(" "),s("van-swipe",{ref:"swipe",staticStyle:{opacity:"0"},style:{opacity:n.isDone?"1":"0"},attrs:{id:"swip",loop:!1,"indicator-color":"white","show-indicators":!1},on:{change:n.changeContent}},n._l(n.listMsg,function(t,e){return s("van-swipe-item",{key:e,staticClass:"couponContent",attrs:{id:n.forId(e)}},[n._l(t,function(t,i){return n.hasData(e)?s("div",{key:i,staticClass:"coupon_item",class:{pass:2==e},on:{click:function(t){return n.goCanUse(i,e)}}},[s("div",{staticClass:"left"},[s("div",{staticClass:"top"},[s("div",{staticClass:"price"},[s("span",{staticClass:"p"},[n._v(n._s(t.facevalue))]),n._v(" "),s("span",[n._v("元")])]),n._v(" "),s("div",{staticClass:"exp"},[s("p",[n._v("满"+n._s(t.uselimit)+"元可用")]),n._v(" "),s("p",[n._v("有效期至："+n._s(t.time))])])]),n._v(" "),s("div",{staticClass:"bottom"},[n._v("\n            "+n._s(t.israandom?"随机券":t.couponalias)+"\n          ")])]),n._v(" "),0==e?s("div",{staticClass:"right"},[s("p",[n._v("去")]),n._v(" "),s("p",[n._v("使")]),n._v(" "),s("p",[n._v("用")])]):n._e(),n._v(" "),1==e?s("div",{staticClass:"right"},[s("p",[n._v("已")]),n._v(" "),s("p",[n._v("使")]),n._v(" "),s("p",[n._v("用")])]):n._e(),n._v(" "),2==e?s("div",{staticClass:"right"},[s("p",[n._v("已")]),n._v(" "),s("p",[n._v("过")]),n._v(" "),s("p",[n._v("期")])]):n._e()]):n._e()}),n._v(" "),n.hasData(e)?n._e():s("div",{staticClass:"no_coupon",on:{click:n.goCouponCenter}},[s("img",{attrs:{src:o(25),alt:""}}),n._v(" "),s("p",[n._v("您还没有优惠券喔~")]),n._v(" "),s("div",{staticClass:"btn"},[n._v("\n          去领券\n        ")])])],2)}),1)],1)}var n=o(9),s=(o(15),o(10)),r=o(0),a=o.n(r);e._withStripped=!0;var c={data:function(){return{listMsg:[[],[],[]],isDone:!1,loadTimer:null,clickindex:0}},created:function(){this.getMsg()},mounted:function(){if(window.api){var i=this;"android"!=api.systemType&&api.setCustomRefreshHeaderInfo({bgColor:"#fff",images:["widget://image/suaxin1.png","widget://image/suaxin2.png","widget://image/suaxin3.png","widget://image/suaxin4.png","widget://image/suaxin5.png","widget://image/suaxin6.png","widget://image/suaxin7.png"],tips:{pull:"下拉刷新",threshold:"松开立即刷新",load:"正在刷新"}},function(){setTimeout(function(){var t=i.clickindex;i.getMsg(t)},1e3)})}var t=$api.byId("header"),e=document.documentElement.clientHeight||document.body.clientHeight;$api.byId("swip").style.height=e-t.offsetTop-t.offsetHeight+"px"},methods:{getMsg:function(){this.loadTimer=setTimeout(function(){showLoading()},1e3),this.getCouMsg(0),this.getCouMsg(1),this.getCouMsg(2)},getCouMsg:function(e){var n=this,t=1,i=void 0;0===e||1===e?t=e+1:2===e&&(t=1,i=2),https({url:siteUrl+"Marketing/Coupon/GetUserCouponListJson",data:{uid:window.api?api.getPrefs({sync:!0,key:"SessionUserID"}):$api.getStorage("SessionUserID"),sta:t,isexpire:i},headers:1,successBack:function(t){if(null!=n.loadTimer&&(hideLoading(),clearTimeout(n.loadTimer),n.loadTimer=null),!t)return promptMsg(err.Msg);if(t.success&&1==t.status){var i=t.Data;i.length&&(i.map(function(t){t.time=n.getTime(t.endtime)}),n.listMsg[e]=i),n.$forceUpdate()}n.isDone=!0,window.api&&api.refreshHeaderLoadDone()}})},getTime:function(t){return t.split(" ")[0]},hasData:function(t){return!(!this.listMsg||!this.listMsg[t][0])},listNum:function(t){return this.listMsg&&this.listMsg[t]&&this.listMsg[t].length?this.listMsg[t].length:0},changeCon:function(t){this.$refs.swipe.swipeTo(t),this.changeContent(t)},changeContent:function(t){0==(this.clickindex=t)?this.$refs.line.style.left="4.7%":1==t?this.$refs.line.style.left="43.9%":2==t&&(this.$refs.line.style.left="83.4%")},goCouponCenter:function(){openWin({name:"coupon_center",url:"./coupon_center.html",bgColor:"#f5f5f5",pageParam:{title:"领券中心"}},1)},forId:function(t){return"item_"+t},goCanUse:function(t,i){if(0==i){var e=this.listMsg[0][t];if(e.isCurrencyCoupon)6==e.couponType?openWin({name:"grouplist",url:"./grouplist.html",bgColor:"#f5f5f5",pageParam:{title:"劲爆拼团"}},1):7==e.couponType?openWin({name:"timebuy",url:"./timebuy.html",bgColor:"#fff",pageParam:{title:"限时抢购"}},1):(api.sendEvent({name:"gobackroot"}),api.closeWin());else{var n="";6==e.couponType?n="groupbuy":7==e.couponType&&(n="rushbuy"),openWin({url:"./coupon_can_use.html",name:"coupon_can_use",pageParam:{title:"可用商品",way:n,couponid:e.couponid},bgColor:"#fff"},1)}}}}},u=(o(188),o(1)),l=Object(u.a)(c,e,[],!1,null,null,null);l.options.__file="src/page/my_coupon/my_coupon.vue";var h=l.exports;a.a.use(n.a).use(s.a);openapp?window.apiready=function(){new a.a({render:function(t){return t(h)}}).$mount("#app")}:new a.a({render:function(t){return t(h)}}).$mount("#app")},25:function(t,i,e){t.exports=e.p+"img/couponNoData1.png"},3:function(t,i,e){"use strict";e.d(i,"b",function(){return r}),e.d(i,"a",function(){return a}),e.d(i,"c",function(){return c});var s=e(2),o=!1;if(!s.e)try{var n={};Object.defineProperty(n,"passive",{get:function(){o=!0}}),window.addEventListener("test-passive",null,n)}catch(t){}function r(t,i,e,n){void 0===n&&(n=!1),s.e||t.addEventListener(i,e,!!o&&{capture:!1,passive:n})}function a(t,i,e){s.e||t.removeEventListener(i,e)}function c(t,i){"boolean"==typeof t.cancelable&&!t.cancelable||t.preventDefault(),i&&function(t){t.stopPropagation()}(t)}},5:function(t,i,e){},6:function(t,i,e){"use strict";e.d(i,"a",function(){return n});var n={data:function(){return{direction:""}},methods:{touchStart:function(t){this.resetTouchStatus(),this.startX=t.touches[0].clientX,this.startY=t.touches[0].clientY},touchMove:function(t){var i=t.touches[0];this.deltaX=i.clientX-this.startX,this.deltaY=i.clientY-this.startY,this.offsetX=Math.abs(this.deltaX),this.offsetY=Math.abs(this.deltaY),this.direction=this.direction||function(t,i){return i<t&&10<t?"horizontal":t<i&&10<i?"vertical":""}(this.offsetX,this.offsetY)},resetTouchStatus:function(){this.direction="",this.deltaX=0,this.deltaY=0,this.offsetX=0,this.offsetY=0}}}},77:function(t,i,e){},8:function(t,i,e){"use strict";function n(){return(n=Object.assign||function(t){for(var i=1;i<arguments.length;i++){var e=arguments[i];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t}).apply(this,arguments)}e.d(i,"a",function(){return n})},9:function(t,i,e){"use strict";var n=e(2),s=e(3),o=e(6),r=Object(n.f)("swipe"),a=r[0],c=r[1];i.a=a({mixins:[o.a],props:{width:Number,height:Number,autoplay:Number,vertical:Boolean,initialSwipe:Number,indicatorColor:String,loop:{type:Boolean,default:!0},touchable:{type:Boolean,default:!0},showIndicators:{type:Boolean,default:!0},duration:{type:Number,default:500}},data:function(){return{computedWidth:0,computedHeight:0,offset:0,active:0,deltaX:0,deltaY:0,swipes:[],swiping:!1}},mounted:function(){this.initialize(),this.$isServer||Object(s.b)(window,"resize",this.onResize,!0)},activated:function(){this.rendered&&this.initialize(),this.rendered=!0},destroyed:function(){this.clear(),this.$isServer||Object(s.a)(window,"resize",this.onResize,!0)},watch:{swipes:function(){this.initialize()},initialSwipe:function(){this.initialize()},autoplay:function(t){t?this.autoPlay():this.clear()}},computed:{count:function(){return this.swipes.length},delta:function(){return this.vertical?this.deltaY:this.deltaX},size:function(){return this[this.vertical?"computedHeight":"computedWidth"]},trackSize:function(){return this.count*this.size},activeIndicator:function(){return(this.active+this.count)%this.count},isCorrectDirection:function(){var t=this.vertical?"vertical":"horizontal";return this.direction===t},trackStyle:function(){var t,i=this.vertical?"height":"width",e=this.vertical?"width":"height";return(t={})[i]=this.trackSize+"px",t[e]=this[e]?this[e]+"px":"",t.transitionDuration=(this.swiping?0:this.duration)+"ms",t.transform="translate"+(this.vertical?"Y":"X")+"("+this.offset+"px)",t},indicatorStyle:function(){return{backgroundColor:this.indicatorColor}}},methods:{initialize:function(t){if(void 0===t&&(t=this.initialSwipe),clearTimeout(this.timer),this.$el){var i=this.$el.getBoundingClientRect();this.computedWidth=this.width||i.width,this.computedHeight=this.height||i.height}this.swiping=!0,this.active=t,this.offset=1<this.count?-this.size*this.active:0,this.swipes.forEach(function(t){t.offset=0}),this.autoPlay()},onResize:function(){this.initialize(this.activeIndicator)},onTouchStart:function(t){this.touchable&&(this.clear(),this.swiping=!0,this.touchStart(t),this.correctPosition())},onTouchMove:function(t){this.touchable&&this.swiping&&(this.touchMove(t),this.isCorrectDirection&&(Object(s.c)(t,!0),this.move({offset:Math.min(Math.max(this.delta,-this.size),this.size)})))},onTouchEnd:function(){if(this.touchable&&this.swiping){if(this.delta&&this.isCorrectDirection){var t=this.vertical?this.offsetY:this.offsetX;this.move({pace:0<t?0<this.delta?-1:1:0,emitChange:!0})}this.swiping=!1,this.autoPlay()}},move:function(t){var i=t.pace,e=void 0===i?0:i,n=t.offset,s=void 0===n?0:n,o=t.emitChange,r=this.delta,a=this.active,c=this.count,u=this.swipes,l=this.trackSize,h=0===a,f=a===c-1;!this.loop&&(h&&(0<s||e<0)||f&&(s<0||0<e))||c<=1||(u[0]&&(u[0].offset=f&&(r<0||0<e)?l:0),u[c-1]&&(u[c-1].offset=h&&(0<r||e<0)?-l:0),e&&-1<=a+e&&a+e<=c&&(this.active+=e,o&&this.$emit("change",this.activeIndicator)),this.offset=Math.round(s-this.active*this.size))},swipeTo:function(t){var i=this;this.swiping=!0,this.resetTouchStatus(),this.correctPosition(),setTimeout(function(){i.swiping=!1,i.move({pace:t%i.count-i.active,emitChange:!0})},30)},correctPosition:function(){this.active<=-1&&this.move({pace:this.count}),this.active>=this.count&&this.move({pace:-this.count})},clear:function(){clearTimeout(this.timer)},autoPlay:function(){var t=this,i=this.autoplay;i&&1<this.count&&(this.clear(),this.timer=setTimeout(function(){t.swiping=!0,t.resetTouchStatus(),t.correctPosition(),setTimeout(function(){t.swiping=!1,t.move({pace:1,emitChange:!0}),t.autoPlay()},30)},i))}},render:function(e){var n=this,t=this.count,s=this.activeIndicator,i=this.slots("indicator")||this.showIndicators&&1<t&&e("div",{class:c("indicators",{vertical:this.vertical})},[Array.apply(void 0,Array(t)).map(function(t,i){return e("i",{class:c("indicator",{active:i===s}),style:i===s?n.indicatorStyle:null})})]);return e("div",{class:c()},[e("div",{ref:"track",style:this.trackStyle,class:c("track"),on:{touchstart:this.onTouchStart,touchmove:this.onTouchMove,touchend:this.onTouchEnd,touchcancel:this.onTouchEnd}},[this.slots()]),i])}})}});