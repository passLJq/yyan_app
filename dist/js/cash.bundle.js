!function(i){var n={};function s(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return i[t].call(e.exports,e,e.exports,s),e.l=!0,e.exports}s.m=i,s.c=n,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=239)}({0:function(t,e){t.exports=Vue},1:function(t,e,i){"use strict";function n(t,e,i,n,s,o,r,a){var c,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=i,l._compiled=!0),n&&(l.functional=!0),o&&(l._scopeId="data-v-"+o),r?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),s&&s.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},l._ssrRegister=c):s&&(c=a?function(){s.call(this,this.$root.$options.shadowRoot)}:s),c)if(l.functional){l._injectStyles=c;var u=l.render;l.render=function(t,e){return c.call(e),u(t,e)}}else{var f=l.beforeCreate;l.beforeCreate=f?[].concat(f,c):[c]}return{exports:t,options:l}}i.d(e,"a",function(){return n})},114:function(t,e,i){t.exports=i.p+"img/nodata.png"},122:function(t,e,i){"use strict";var n=i(56);i.n(n).a},17:function(t,e,i){var n=i(37),s=i(38),o=i(39);t.exports=function(t){return n(t)||s(t)||o()}},19:function(t,e){var i;i=function(){return this}();try{i=i||new Function("return this")()}catch(t){"object"==typeof window&&(i=window)}t.exports=i},2:function(t,e,i){"use strict";var n=i(0),s=i.n(n),o="--";function r(t,e,i){return e?t+i+e:t}function a(i){return function(t,e){return t&&"string"!=typeof t&&(e=t,t=""),t=r(i,t,"__"),e?[t,function e(i,n){if("string"==typeof n)return r(i,n,o);if(Array.isArray(n))return n.map(function(t){return e(i,t)});var s={};return n&&Object.keys(n).forEach(function(t){s[i+o+t]=n[t]}),s}(t,e)]:t}}Object.prototype.hasOwnProperty;var c=s.a.prototype,l=s.a.util.defineReactive;l(c,"$vantLang","zh-CN"),l(c,"$vantMessages",{"zh-CN":{name:"姓名",tel:"电话",save:"保存",confirm:"确认",cancel:"取消",delete:"删除",complete:"完成",loading:"加载中...",telEmpty:"请填写电话",nameEmpty:"请填写姓名",confirmDelete:"确定要删除么",telInvalid:"请填写正确的电话",vanContactCard:{addText:"添加联系人"},vanContactList:{addText:"新建联系人"},vanPagination:{prev:"上一页",next:"下一页"},vanPullRefresh:{pulling:"下拉即可刷新...",loosing:"释放即可刷新..."},vanSubmitBar:{label:"合计："},vanCoupon:{valid:"有效期",unlimited:"无使用门槛",discount:function(t){return t+"折"},condition:function(t){return"满"+t+"元可用"}},vanCouponCell:{title:"优惠券",tips:"使用优惠",count:function(t){return t+"张可用"}},vanCouponList:{empty:"暂无优惠券",exchange:"兑换",close:"不使用优惠",enable:"可使用优惠券",disabled:"不可使用优惠券",placeholder:"请输入优惠码"},vanAddressEdit:{area:"地区",postal:"邮政编码",areaEmpty:"请选择地区",addressEmpty:"请填写详细地址",postalEmpty:"邮政编码格式不正确",defaultAddress:"设为默认收货地址",telPlaceholder:"收货人手机号",namePlaceholder:"收货人姓名",areaPlaceholder:"选择省 / 市 / 区"},vanAddressEditDetail:{label:"详细地址",placeholder:"街道门牌、楼层房间号等信息"},vanAddressList:{add:"新增地址"}}});var u=function(){return c.$vantMessages[c.$vantLang]},f={methods:{slots:function(t,e){void 0===t&&(t="default");var i=this.$slots,n=this.$scopedSlots;return n[t]?n[t](e):i[t]}}},d={type:Array,default:function(){return[]}},h={type:Number,default:0};function p(t){var e=this.name;t.component(e,this),t.component(x("-"+e),this)}function v(i){return{functional:!0,props:i.props,model:i.model,render:function(t,e){return i(t,e.props,function(t){var e=t.scopedSlots||t.data.scopedSlots||{},i=t.slots();return Object.keys(i).forEach(function(t){e[t]||(e[t]=function(){return i[t]})}),e}(e),e)}}}function m(e){return function(t){return"function"==typeof t&&(t=v(t)),t.functional||(t.mixins=t.mixins||[],t.mixins.push(f)),t.props&&function(e){Object.keys(e).forEach(function(t){e[t]===Array?e[t]=d:e[t]===Number&&(e[t]=h)})}(t.props),t.name=e,t.install=p,t}}function b(t){return[m(t="van-"+t),a(t),function(t){var o=x(t)+".";return function(t){for(var e=w(u(),o+t)||w(u(),t),i=arguments.length,n=new Array(1<i?i-1:0),s=1;s<i;s++)n[s-1]=arguments[s];return"function"==typeof e?e.apply(void 0,n):e}}(t)]}i.d(e,"e",function(){return _}),i.d(e,"c",function(){return g}),i.d(e,"d",function(){return y}),i.d(e,"b",function(){return w}),i.d(e,"a",function(){return x}),i.d(e,"f",function(){return b});var _=s.a.prototype.$isServer;function g(t){return null!=t}function y(t){var e=typeof t;return null!==t&&("object"==e||"function"==e)}function w(t,e){var i=e.split("."),n=t;return i.forEach(function(t){n=g(n[t])?n[t]:""}),n}var C=/-(\w)/g;function x(t){return t.replace(C,function(t,e){return e.toUpperCase()})}},239:function(t,e,s){"use strict";s.r(e);s(34);function i(){var i=this,t=i.$createElement,n=i._self._c||t;return n("div",[n("van-tabs",{attrs:{"line-width":40,swipeable:"",animated:"",sticky:""},on:{change:i.changeTab},model:{value:i.active,callback:function(t){i.active=t},expression:"active"}},[n("van-tab",{attrs:{title:"到账明细"}},[n("p",{staticClass:"allCom"},[i._v("总计: ¥"+i._s(i._f("toFixed")(i.total[0])))]),i._v(" "),i._l(i.msg[0],function(t){return n("div",{directives:[{name:"show",rawName:"v-show",value:0==i.active,expression:"active == 0"}],staticClass:"commission_preview"},[n("div",{staticClass:"commission_list"},[n("p",{staticClass:"clear list_top"},[n("span",{staticClass:"fl commission_list_value"},[i._v(i._s(t.C_CommisionName))]),i._v(" "),n("span",{staticClass:"fr commission_list_value"},[i._v(i._s(i._f("toFixed")(t.C_Commision)))])]),i._v(" "),""!=t.C_OrderID&&null!=t.C_OrderID?n("p",[n("label",{staticClass:"commission_list_label"},[i._v("订单号")]),i._v(" "),n("span",{staticClass:"commission_list_value order_num"},[i._v(i._s(t.C_OrderID))])]):i._e(),i._v(" "),n("p",[n("label",{staticClass:"commission_list_label"},[i._v("到账时间")]),i._v(" "),n("span",{staticClass:"commission_list_value"},[i._v(i._s(i._f("getTime")(t.C_SuccessTime)))])])])])}),i._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:i.msg[0]&&0<i.msg[0].length&&!i.hasMore[0],expression:"msg[0] && msg[0].length > 0 && !hasMore[0]"}],staticClass:"nomore"},[i._v("没有更多了~")]),i._v(" "),!i.msg[0]||i.msg[0].length<=0?n("div",{staticClass:"noRec"},[n("div",{staticClass:"square"},[n("img",{staticStyle:{width:"100%"},attrs:{src:s(114),alt:"没有相关数据"}})]),i._v(" "),n("div",{staticClass:"ic_text"},[i._v("亲，目前没有相关数据~")])]):i._e()],2),i._v(" "),n("van-tab",{attrs:{title:"钱包明细"}},[n("p",{staticClass:"allCom"},[i._v("总计: ¥"+i._s(i._f("toFixed")(i.total[1])))]),i._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:1==i.active,expression:"active == 1"}],staticClass:"commission_preview"},i._l(i.msg[1],function(t,e){return n("div",{key:e,staticClass:"commission_list"},[n("p",{staticClass:"clear list_top"},[0!=t.orderNo?n("span",{staticClass:"fl commission_list_value"},[i._v(i._s(t.amount<0?"钱包支付":"退款金额"))]):n("span",{staticClass:"fl commission_list_value"},[i._v(i._s(t.amount<0?"转账到提现账号":"转账驳回"))]),i._v(" "),n("span",{staticClass:"fr commission_list_value",class:t.amount<0?"red_color":""},[i._v(i._s(i._f("toFixed")(t.amount)))])]),i._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:0!=t.orderNo,expression:"item.orderNo != 0"}]},[n("label",{staticClass:"commission_list_label"},[i._v("订单号")]),i._v(" "),n("span",{staticClass:"commission_list_value order_num"},[i._v(i._s(t.orderNo))])]),i._v(" "),n("p",[n("label",{staticClass:"commission_list_label"},[i._v("订单时间")]),i._v(" "),n("span",{staticClass:"commission_list_value"},[i._v(i._s(t.time))])])])}),0),i._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:i.msg[1]&&0<i.msg[1].length&&!i.hasMore[1],expression:"msg[1] && msg[1].length > 0 && !hasMore[1]"}],staticClass:"nomore"},[i._v("没有更多了~")]),i._v(" "),!i.msg[1]||i.msg[1].length<=0?n("div",{staticClass:"noRec"},[n("div",{staticClass:"square"},[n("img",{staticStyle:{width:"100%"},attrs:{src:s(114),alt:"没有相关数据"}})]),i._v(" "),n("div",{staticClass:"ic_text"},[i._v("亲，目前没有相关数据~")])]):i._e()])],1)],1)}var n=s(27),o=(s(35),s(29)),r=s(0),a=s.n(r);i._withStripped=!0;var c=s(17),l=s.n(c),u={components:{},props:{},data:function(){return{msg:["",""],total:[0,0],active:0,page:[1,1],pageSize:10,hasMore:[!0,!0]}},watch:{},computed:{},methods:{changeTab:function(t){this.active=t},bindData:function(t){var i=this,n=t||this.active;1==n?https({url:siteUrl+"Main/Member/CashConsumer",method:"get",data:{uid:getname(),currentPage:this.page[n],pageSize:this.pageSize},headers:1,successBack:function(t){refreshDone(),hideLoading(),t.success&&1==t.status?(i.total[1]=t.Total,1==i.page[n]?i.msg[n]=t.Data:i.msg[n]=[].concat(l()(i.msg[n]),l()(t.Data)),t.Data.length<i.pageSize&&(i.hasMore[n]=!1),i.$forceUpdate()):2==t.status?i.hasMore[n]=!1:promptMsg(t.err)}}):https({url:siteUrl+"Main/Member/GetCommisionList",method:"get",data:{uid:getname(),pageIndex:this.page[n],pageSize:this.pageSize},headers:1,successBack:function(t){if(refreshDone(),hideLoading(),t.success&&1==t.status){if(i.total[0]=t.Total,1==i.page[n])i.msg[n]=t.Data;else{var e=i.msg[n];i.msg[n]=[].concat(l()(e),l()(t.Data))}i.$forceUpdate()}else promptMsg(t.err);t.Data.length<i.pageSize&&(i.hasMore[n]=!1)}})}},filters:{getTime:function(t){if(t){var e=t.toString().split(".")[0];return e=e.split("T")[0]+" "+e.split("T")[1]}return t},toFixed:function(t){return Number(t).toFixed(2)}},created:function(){var t=new Date;t.getFullYear(),t.getMonth();showLoading(),this.bindData(0),this.bindData(1)},mounted:function(){var n=this;window.api&&(refresh(function(){var t=n.active;n.hasMore[t]=!0,n.page[t]=1,n.bindData()}),api.addEventListener({name:"scrolltobottom"},function(t,e){var i=n.active;n.hasMore[i]&&(n.page[i]+=1,showLoading(),n.bindData())}),api.setWinAttr({slidBackEnabled:!1}))}},f=(s(122),s(1)),d=Object(f.a)(u,i,[],!1,null,null,null);d.options.__file="src/page/cash/index.vue";var h=d.exports;a.a.use(n.a).use(o.a);openapp?window.apiready=function(){new a.a({render:function(t){return t(h)}}).$mount("#app")}:new a.a({render:function(t){return t(h)}}).$mount("#app")},24:function(t,e,i){"use strict";i.d(e,"a",function(){return n});var n={data:function(){return{parent:null}},methods:{findParent:function(t){for(var e=this.$parent;e;){if(e.$options.name===t){this.parent=e;break}e=e.$parent}}}}},27:function(t,e,i){"use strict";var n=i(2),s=i(24),o=Object(n.f)("tab"),r=o[0],a=o[1];e.a=r({mixins:[s.a],props:{title:String,disabled:Boolean},data:function(){return{inited:!1}},computed:{index:function(){return this.parent.tabs.indexOf(this)},selected:function(){return this.index===this.parent.curActive}},watch:{"parent.curActive":function(){this.inited=this.inited||this.selected},title:function(){this.parent.setLine()}},created:function(){this.findParent("van-tabs")},mounted:function(){var t=this.parent.tabs,e=this.parent.slots().indexOf(this.$vnode);t.splice(-1===e?t.length:e,0,this),this.slots("title")&&this.parent.renderTitle(this.$refs.title,this.index)},beforeDestroy:function(){this.parent.tabs.splice(this.index,1)},render:function(t){var e=this.slots,i=this.inited||!this.parent.lazyRender;return t("div",{directives:[{name:"show",value:this.selected||this.parent.animated}],class:a("pane")},[i?e():t(),e("title")&&t("div",{ref:"title"},[e("title")])])}})},28:function(t,r,a){"use strict";(function(t){a.d(r,"a",function(){return o});var e=a(2),s=Date.now();var i=e.e?t:window,n=i.requestAnimationFrame||function(t){var e=Date.now(),i=Math.max(0,16-(e-s)),n=setTimeout(t,i);return s=e+i,n};i.cancelAnimationFrame||i.clearTimeout;function o(t){return n.call(i,t)}}).call(this,a(19))},29:function(t,e,i){"use strict";var u=i(2),r=i(28),a=i(3),n=i(6);function s(t){return"scrollTop"in t?t.scrollTop:t.pageYOffset}function o(t){return(t===window?0:t.getBoundingClientRect().top)+s(window)}var c=Object(u.f)("tabs"),l=c[0],f=c[1],d=Object(u.f)("tab")[1];e.a=l({mixins:[n.a],model:{prop:"active"},props:{color:String,sticky:Boolean,animated:Boolean,offsetTop:Number,swipeable:Boolean,background:String,titleActiveColor:String,titleInactiveColor:String,ellipsis:{type:Boolean,default:!0},lazyRender:{type:Boolean,default:!0},lineWidth:{type:Number,default:null},lineHeight:{type:Number,default:null},active:{type:[Number,String],default:0},type:{type:String,default:"line"},duration:{type:Number,default:.3},swipeThreshold:{type:Number,default:4}},data:function(){return{tabs:[],position:"",curActive:null,lineStyle:{backgroundColor:this.color},events:{resize:!1,sticky:!1,swipeable:!1}}},computed:{scrollable:function(){return this.tabs.length>this.swipeThreshold||!this.ellipsis},wrapStyle:function(){switch(this.position){case"top":return{top:this.offsetTop+"px",position:"fixed"};case"bottom":return{top:"auto",bottom:0};default:return null}},navStyle:function(){return{borderColor:this.color,background:this.background}},trackStyle:function(){if(this.animated)return{left:-1*this.curActive*100+"%",transitionDuration:this.duration+"s"}}},watch:{active:function(t){t!==this.curActive&&this.correctActive(t)},color:function(){this.setLine()},tabs:function(){this.correctActive(this.curActive||this.active),this.scrollIntoView(),this.setLine()},curActive:function(){this.scrollIntoView(),this.setLine(),"top"!==this.position&&"bottom"!==this.position||function(t,e){"scrollTop"in t?t.scrollTop=e:t.scrollTo(t.scrollX,e)}(window,o(this.$el)-this.offsetTop)},sticky:function(){this.handlers(!0)},swipeable:function(){this.handlers(!0)}},mounted:function(){this.onShow()},activated:function(){this.onShow(),this.setLine()},deactivated:function(){this.handlers(!1)},beforeDestroy:function(){this.handlers(!1)},methods:{onShow:function(){var t=this;this.$nextTick(function(){t.inited=!0,t.handlers(!0),t.scrollIntoView(!0)})},handlers:function(t){var e=this.events,i=this.sticky&&t,n=this.swipeable&&t;if(e.resize!==t&&((e.resize=t)?a.b:a.a)(window,"resize",this.setLine,!0),e.sticky!==i&&(e.sticky=i,this.scrollEl=this.scrollEl||function(t,e){void 0===e&&(e=window);for(var i=t;i&&"HTML"!==i.tagName&&"BODY"!==i.tagName&&1===i.nodeType&&i!==e;){var n=window.getComputedStyle(i).overflowY;if("scroll"===n||"auto"===n)return i;i=i.parentNode}return e}(this.$el),(i?a.b:a.a)(this.scrollEl,"scroll",this.onScroll,!0),this.onScroll()),e.swipeable!==n){e.swipeable=n;var s=this.$refs.content,o=n?a.b:a.a;o(s,"touchstart",this.touchStart),o(s,"touchmove",this.touchMove),o(s,"touchend",this.onTouchEnd),o(s,"touchcancel",this.onTouchEnd)}},onTouchEnd:function(){var t=this.direction,e=this.deltaX,i=this.curActive;"horizontal"===t&&50<=this.offsetX&&(0<e&&0!==i?this.setCurActive(i-1):e<0&&i!==this.tabs.length-1&&this.setCurActive(i+1))},onScroll:function(){var t=s(window)+this.offsetTop,e=o(this.$el),i=e+this.$el.offsetHeight-this.$refs.wrap.offsetHeight;this.position=i<t?"bottom":e<t?"top":"";var n={scrollTop:t,isFixed:"top"===this.position};this.$emit("scroll",n)},setLine:function(){var c=this,l=this.inited;this.$nextTick(function(){var t=c.$refs.tabs;if(t&&t[c.curActive]&&"line"===c.type){var e=t[c.curActive],i=c.lineWidth,n=c.lineHeight,s=Object(u.c)(i)?i:e.offsetWidth/2,o=e.offsetLeft+(e.offsetWidth-s)/2,r={width:s+"px",backgroundColor:c.color,transform:"translateX("+o+"px)"};if(l&&(r.transitionDuration=c.duration+"s"),Object(u.c)(n)){var a=n+"px";r.height=a,r.borderRadius=a}c.lineStyle=r}})},correctActive:function(e){e=+e;var t=this.tabs.some(function(t){return t.index===e}),i=(this.tabs[0]||{}).index||0;this.setCurActive(t?e:i)},setCurActive:function(t){t=this.findAvailableTab(t,t<this.curActive),Object(u.c)(t)&&t!==this.curActive&&(this.$emit("input",t),null!==this.curActive&&this.$emit("change",t,this.tabs[t].title),this.curActive=t)},findAvailableTab:function(t,e){for(var i=e?-1:1,n=t;0<=n&&n<this.tabs.length;){if(!this.tabs[n].disabled)return n;n+=i}},onClick:function(t){var e=this.tabs[t],i=e.title;e.disabled?this.$emit("disabled",t,i):(this.setCurActive(t),this.$emit("click",t,i))},scrollIntoView:function(t){var e=this.$refs.tabs;if(this.scrollable&&e&&e[this.curActive]){var i=this.$refs.nav,n=i.scrollLeft,s=i.offsetWidth,o=e[this.curActive],r=o.offsetLeft,a=o.offsetWidth;this.scrollTo(i,n,r-(s-a)/2,t)}},scrollTo:function(e,i,n,t){if(t)e.scrollLeft+=n-i;else{var s=0,o=Math.round(1e3*this.duration/16);!function t(){e.scrollLeft+=(n-i)/o,++s<o&&Object(r.a)(t)}()}},renderTitle:function(e,i){var n=this;this.$nextTick(function(){var t=n.$refs.title[i];t.parentNode.replaceChild(e,t)})},getTabStyle:function(t,e){var i={},n=this.color,s=e===this.curActive,o="card"===this.type;n&&(t.disabled||!o||s||(i.color=n),!t.disabled&&o&&s&&(i.backgroundColor=n),o&&(i.borderColor=n));var r=s?this.titleActiveColor:this.titleInactiveColor;return r&&(i.color=r),this.scrollable&&this.ellipsis&&(i.flexBasis=88/this.swipeThreshold+"%"),i}},render:function(i){var n=this,t=this.type,s=this.ellipsis,e=this.animated,o=this.scrollable,r=this.tabs.map(function(t,e){return i("div",{ref:"tabs",refInFor:!0,class:d({active:e===n.curActive,disabled:t.disabled,complete:!s}),style:n.getTabStyle(t,e),on:{click:function(){n.onClick(e)}}},[i("span",{ref:"title",refInFor:!0,class:{"van-ellipsis":s}},[t.title])])});return i("div",{class:f([t])},[i("div",{ref:"wrap",style:this.wrapStyle,class:[f("wrap",{scrollable:o}),{"van-hairline--top-bottom":"line"===t}]},[i("div",{ref:"nav",class:f("nav",[t]),style:this.navStyle},[this.slots("nav-left"),"line"===t&&i("div",{class:f("line"),style:this.lineStyle}),r,this.slots("nav-right")])]),i("div",{ref:"content",class:f("content",{animated:e})},[e?i("div",{class:f("track"),style:this.trackStyle},[this.slots()]):this.slots()])])}})},3:function(t,e,i){"use strict";i.d(e,"b",function(){return r}),i.d(e,"a",function(){return a}),i.d(e,"c",function(){return c});var s=i(2),o=!1;if(!s.e)try{var n={};Object.defineProperty(n,"passive",{get:function(){o=!0}}),window.addEventListener("test-passive",null,n)}catch(t){}function r(t,e,i,n){void 0===n&&(n=!1),s.e||t.addEventListener(e,i,!!o&&{capture:!1,passive:n})}function a(t,e,i){s.e||t.removeEventListener(e,i)}function c(t,e){"boolean"==typeof t.cancelable&&!t.cancelable||t.preventDefault(),e&&function(t){t.stopPropagation()}(t)}},34:function(t,e,i){"use strict";i(5)},35:function(t,e,i){"use strict";i(5),i(36)},36:function(t,e,i){},37:function(t,e){t.exports=function(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}},38:function(t,e){t.exports=function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}},39:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}},5:function(t,e,i){},56:function(t,e,i){},6:function(t,e,i){"use strict";i.d(e,"a",function(){return n});var n={data:function(){return{direction:""}},methods:{touchStart:function(t){this.resetTouchStatus(),this.startX=t.touches[0].clientX,this.startY=t.touches[0].clientY},touchMove:function(t){var e=t.touches[0];this.deltaX=e.clientX-this.startX,this.deltaY=e.clientY-this.startY,this.offsetX=Math.abs(this.deltaX),this.offsetY=Math.abs(this.deltaY),this.direction=this.direction||function(t,e){return e<t&&10<t?"horizontal":t<e&&10<e?"vertical":""}(this.offsetX,this.offsetY)},resetTouchStatus:function(){this.direction="",this.deltaX=0,this.deltaY=0,this.offsetX=0,this.offsetY=0}}}}});