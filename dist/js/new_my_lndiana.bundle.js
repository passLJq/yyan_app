!function(n){var i={};function r(t){if(i[t])return i[t].exports;var e=i[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=n,r.c=i,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=235)}({0:function(t,e){t.exports=Vue},1:function(t,e,n){"use strict";function i(t,e,n,i,r,o,a,s){var u,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=n,l._compiled=!0),i&&(l.functional=!0),o&&(l._scopeId="data-v-"+o),a?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},l._ssrRegister=u):r&&(u=s?function(){r.call(this,this.$root.$options.shadowRoot)}:r),u)if(l.functional){l._injectStyles=u;var c=l.render;l.render=function(t,e){return u.call(e),c(t,e)}}else{var d=l.beforeCreate;l.beforeCreate=d?[].concat(d,u):[u]}return{exports:t,options:l}}n.d(e,"a",function(){return i})},196:function(t,e,n){t.exports=n.p+"img/nostate.png"},197:function(t,e,n){"use strict";var i=n(82);n.n(i).a},235:function(t,e,n){"use strict";n.r(e);function i(){var i=this,t=i.$createElement,r=i._self._c||t;return r("section",[r("div",{staticClass:"my",attrs:{id:"my"}},[i._l(i.msgReady,function(e,n){return r("div",{key:n,staticClass:"itm flex flex_v flex_align_center",on:{click:function(t){return i.toDetail(n)}}},[r("div",{staticClass:"head flex flex_align_center flex_pack_justify_between"},[r("span",{},[i._v(i._s(e.lotterytime||e.endtime))]),i._v(" "),r("span",{},[i._v(i._s(4==e.state?"已开奖":3==e.state?"已失效":"未开奖"))])]),i._v(" "),r("div",{staticClass:"line"}),i._v(" "),r("div",{staticClass:"content flex"},[r("div",{staticClass:"pic"},[r("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.img,expression:"item.img"}]})]),i._v(" "),r("div",{staticClass:"data"},[r("div",{staticClass:"title line_over_2"},[i._v(i._s(e.proname))]),i._v(" "),r("div",{staticClass:"progress"},[r("div",{staticStyle:{"background-color":"#F5AC9E"},style:{width:e.amout/e.totalamout*100+"%"}})]),i._v(" "),r("div",{staticClass:"join flex flex_pack_justify_between"},[r("span",{},[i._v(i._s(e.amout)+"人已参与")]),i._v(" "),r("span",{},[i._v("剩余"+i._s(e.remainingamout))])]),i._v(" "),r("div",{staticClass:"price"},[r("span",[i._v("￥")]),i._v(" "),r("span",{},[i._v(i._s(e.price))]),i._v(" "),r("span",{},[i._v("原价 "+i._s(e.proprice))])])])]),i._v(" "),r("div",{staticClass:"line"}),i._v(" "),r("div",{staticClass:"btnGroup flex flex_align_center flex_pack_right"},[r("div",{directives:[{name:"show",rawName:"v-show",value:3==e.state||4==e.state,expression:"item.state == 3 || item.state == 4"}],staticClass:"btn flex flex_align_center flex_pack_center",on:{click:function(t){return t.stopPropagation(),i.toResult(e.state,n)}}},[i._v("揭晓结果")]),i._v(" "),r("div",{staticClass:"btn flex flex_align_center flex_pack_center",on:{click:function(t){return t.stopPropagation(),i.checkNumber(e.state,n,e.cloudid)}}},[i._v("查看号码")])])])}),i._v(" "),i.isDone?i._e():r("div",{staticClass:"flex flex_v flex_align_center",staticStyle:{width:"100%"}},[i._m(0),i._v(" "),r("span",{staticClass:"fs_12",staticStyle:{color:"#666"}},[i._v("您还没有活动")]),i._v(" "),r("div",{staticClass:"look",on:{click:i.tolndiana}},[i._v("去抽奖看看")])])],2)])}var r=n(0),o=n.n(r),a=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"flex flex_align_center flex_pack_center noda"},[e("img",{attrs:{src:n(196)}})])}];i._withStripped=!0;var s={data:function(){return{isDone:!1,page:1,pageSize:4,msg:"",winningcode:"",hasMore:!0,already:!1}},created:function(){var t=this;this.getData(),this.onBottom(),window.onscroll=function(){0<(document.body.scrollTop||document.documentElement.scrollTop)&&refreshDone()},window.api&&api.setCustomRefreshHeaderInfo({bgColor:"#fff",images:["widget://image/suaxin1.png","widget://image/suaxin2.png","widget://image/suaxin3.png","widget://image/suaxin4.png","widget://image/suaxin5.png","widget://image/suaxin6.png","widget://image/suaxin7.png"],tips:{pull:"下拉刷新",threshold:"松开立即刷新",load:"正在刷新"}},function(){setTimeout(function(){t.reset()},500)})},mounted:function(){window.api&&"iPhone10,3"==api.deviceModel&&(document.getElementById("my").style.paddingBottom=api.getPrefs({sync:!0,key:"safeAreaBottom"})+"px")},watch:{msg:function(){this.msg&&0<this.msg.length?this.isDone=!0:this.isDone=!1}},computed:{msgReady:function(){return!!this.isDone&&this.msg}},methods:{getData:function(){var e=this;showLoading(),https({url:siteUrl+"/arketing/Cloudbuy/GetMyCloudShoppingSet",data:{currentPage:this.page,pageSize:this.pageSize,uid:getname(),type:100},headers:1,successBack:function(t){hideLoading(),refreshDone(),t.success&&1==t.status?1==e.page?e.msg=t.Data:e.msg=e.msg.concat(t.Data):t.success&&2==t.status&&(e.hasMore=!1),e.already=!0}})},reset:function(){this.isDone=!1,this.page=1,this.hasMore=!0,this.getData()},onBottom:function(){var n=this;window.api&&api.addEventListener({name:"scrolltobottom"},function(t,e){n.hasMore&&(n.page+=1,n.getData())})},toDetail:function(t){var e=this.msg[t];openWin({name:"lndianaResult",url:"./new_lndiana_result.html",pageParam:{title:"抽奖详情",cloudid:e.cloudid,way:"detail",bgColor:"#f6f6fa",hScrollBarEnabled:!1,vScrollBarEnabled:!1}},1)},toResult:function(t,e){var n=0;3==t&&(n=1);var i=this.msg[e];4==t&&(i.winningcode||(n=1)),openWin({name:"lndianaResult",url:"./new_lndiana_result.html",pageParam:{title:"揭晓结果",cloudid:i.cloudid,endtime:i.lotterytime||i.endtime,img:i.headphoto||"",invalid:n,pid:i.productid,user:i.username||"",winningcode:i.winningcode||"",bgColor:"#f6f6fa",hScrollBarEnabled:!1,vScrollBarEnabled:!1}},1)},tolndiana:function(){openWin({name:"lndiana",url:"./new_lndiana.html",bgColor:"#EFEFEF",pageParam:{title:"分享抽奖",bgColor:"#f6f6fa"}},1)},checkNumber:function(t,e,n){var i=!1;1!=t&&(i=!0),this.winningcode=this.msg[e].winningcode||"",api.openFrame({name:"checkNumber",url:"./showRule.html",rect:{x:0,y:0,w:"auto",h:"auto"},pageParam:{cloudid:n,winningcode:this.winningcode,done:i},bounces:!1,bgColor:"rgba(0,0,0,0)",vScrollBarEnabled:!1,hScrollBarEnabled:!1})}}},u=(n(197),n(1)),l=Object(u.a)(s,i,a,!1,null,null,null);l.options.__file="src/page/new_my_lndiana/new_my_lndiana.vue";var c=l.exports,d=n(4),f=n.n(d);o.a.use(f.a,{throttleWait:200});openapp?window.apiready=function(){new o.a({render:function(t){return t(c)}}).$mount("#app")}:new o.a({render:function(t){return t(c)}}).$mount("#app")},4:function(t,e,n){
/*!
 * Vue-Lazyload.js v1.2.6
 * (c) 2018 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */
t.exports=function(){"use strict";function a(t){t=t||{};var e=arguments.length,n=0;if(1===e)return t;for(;++n<e;){var i=arguments[n];f(t)&&(t=i),s(i)&&r(t,i)}return t}function r(t,e){for(var n in h(t,e),e)if("__proto__"!==n&&(r=e,o=n,Object.prototype.hasOwnProperty.call(r,o))){var i=e[n];s(i)?("undefined"===p(t[n])&&"function"===p(i)&&(t[n]=i),t[n]=a(t[n]||{},i)):t[n]=i}var r,o;return t}function s(t){return"object"===p(t)||"function"===p(t)}function o(t,e){if(t.length){var n=t.indexOf(e);return-1<n?t.splice(n,1):void 0}}function d(t,e){if("IMG"===t.tagName&&t.getAttribute("data-srcset")){var n=t.getAttribute("data-srcset"),i=[],r=t.parentNode,o=r.offsetWidth*e,a=void 0,s=void 0,u=void 0;(n=n.trim().split(",")).map(function(t){t=t.trim(),a=t.lastIndexOf(" "),u=-1===a?(s=t,999998):(s=t.substr(0,a),parseInt(t.substr(a+1,t.length-a-2),10)),i.push([u,s])}),i.sort(function(t,e){if(t[0]<e[0])return-1;if(t[0]>e[0])return 1;if(t[0]===e[0]){if(-1!==e[1].indexOf(".webp",e[1].length-5))return 1;if(-1!==t[1].indexOf(".webp",t[1].length-5))return-1}return 0});for(var l="",c=void 0,d=i.length,f=0;f<d;f++)if((c=i[f])[0]>=o){l=c[1];break}return l}}function u(t,e){for(var n=void 0,i=0,r=t.length;i<r;i++)if(e(t[i])){n=t[i];break}return n}function c(){}var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},t=function(){function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}(),f=function(t){return null==t||"function"!=typeof t&&"object"!==(void 0===t?"undefined":l(t))},h=function(t,e){if(null==t)throw new TypeError("expected first argument to be an object.");if(void 0===e||"undefined"==typeof Symbol)return t;if("function"!=typeof Object.getOwnPropertySymbols)return t;for(var n=Object.prototype.propertyIsEnumerable,i=Object(t),r=arguments.length,o=0;++o<r;)for(var a=Object(arguments[o]),s=Object.getOwnPropertySymbols(a),u=0;u<s.length;u++){var l=s[u];n.call(a,l)&&(i[l]=a[l])}return i},n=Object.prototype.toString,p=function(t){var e=void 0===t?"undefined":l(t);return"undefined"===e?"undefined":null===t?"null":!0===t||!1===t||t instanceof Boolean?"boolean":"string"===e||t instanceof String?"string":"number"===e||t instanceof Number?"number":"function"===e||t instanceof Function?void 0!==t.constructor.name&&"Generator"===t.constructor.name.slice(0,9)?"generatorfunction":"function":void 0!==Array.isArray&&Array.isArray(t)?"array":t instanceof RegExp?"regexp":t instanceof Date?"date":"[object RegExp]"===(e=n.call(t))?"regexp":"[object Date]"===e?"date":"[object Arguments]"===e?"arguments":"[object Error]"===e?"error":"[object Promise]"===e?"promise":function(t){return t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}(t)?"buffer":"[object Set]"===e?"set":"[object WeakSet]"===e?"weakset":"[object Map]"===e?"map":"[object WeakMap]"===e?"weakmap":"[object Symbol]"===e?"symbol":"[object Map Iterator]"===e?"mapiterator":"[object Set Iterator]"===e?"setiterator":"[object String Iterator]"===e?"stringiterator":"[object Array Iterator]"===e?"arrayiterator":"[object Int8Array]"===e?"int8array":"[object Uint8Array]"===e?"uint8array":"[object Uint8ClampedArray]"===e?"uint8clampedarray":"[object Int16Array]"===e?"int16array":"[object Uint16Array]"===e?"uint16array":"[object Int32Array]"===e?"int32array":"[object Uint32Array]"===e?"uint32array":"[object Float32Array]"===e?"float32array":"[object Float64Array]"===e?"float64array":"object"},v=a,b="undefined"!=typeof window,i=b&&"IntersectionObserver"in window,y={event:"event",observer:"observer"},_=function(){function t(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}if(b)return"function"==typeof window.CustomEvent?window.CustomEvent:(t.prototype=window.Event.prototype,t)}(),g=function(){if(b){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,e)}catch(t){}return t}}(),w={on:function(t,e,n){var i=3<arguments.length&&void 0!==arguments[3]&&arguments[3];g?t.addEventListener(e,n,{capture:i,passive:!0}):t.addEventListener(e,n,i)},off:function(t,e,n){var i=3<arguments.length&&void 0!==arguments[3]&&arguments[3];t.removeEventListener(e,n,i)}},E=function(t,e,n){var i=new Image;i.src=t.src,i.onload=function(){e({naturalHeight:i.naturalHeight,naturalWidth:i.naturalWidth,src:i.src})},i.onerror=function(t){n(t)}},e=function(t,e){return"undefined"!=typeof getComputedStyle?getComputedStyle(t,null).getPropertyValue(e):t.style[e]},L=function(t){return e(t,"overflow")+e(t,"overflow-y")+e(t,"overflow-x")},k={},x=function(){function l(t){var e=t.el,n=t.src,i=t.error,r=t.loading,o=t.bindType,a=t.$parent,s=t.options,u=t.elRenderer;m(this,l),this.el=e,this.src=n,this.error=i,this.loading=r,this.bindType=o,this.attempt=0,this.naturalHeight=0,this.naturalWidth=0,this.options=s,this.rect=null,this.$parent=a,this.elRenderer=u,this.performanceData={init:Date.now(),loadStart:0,loadEnd:0},this.filter(),this.initState(),this.render("loading",!1)}return t(l,[{key:"initState",value:function(){"dataset"in this.el?this.el.dataset.src=this.src:this.el.setAttribute("data-src",this.src),this.state={error:!1,loaded:!1,rendered:!1}}},{key:"record",value:function(t){this.performanceData[t]=Date.now()}},{key:"update",value:function(t){var e=t.src,n=t.loading,i=t.error,r=this.src;this.src=e,this.loading=n,this.error=i,this.filter(),r!==this.src&&(this.attempt=0,this.initState())}},{key:"getRect",value:function(){this.rect=this.el.getBoundingClientRect()}},{key:"checkInView",value:function(){return this.getRect(),this.rect.top<window.innerHeight*this.options.preLoad&&this.rect.bottom>this.options.preLoadTop&&this.rect.left<window.innerWidth*this.options.preLoad&&0<this.rect.right}},{key:"filter",value:function(){var e=this;(function(t){if(!(t instanceof Object))return[];if(Object.keys)return Object.keys(t);var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n);return e})(this.options.filter).map(function(t){e.options.filter[t](e,e.options)})}},{key:"renderLoading",value:function(e){var n=this;E({src:this.loading},function(t){n.render("loading",!1),e()},function(){e(),n.options.silent})}},{key:"load",value:function(){var e=this,n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:c;return this.attempt>this.options.attempt-1&&this.state.error?(this.options.silent,void n()):this.state.loaded||k[this.src]?(this.state.loaded=!0,n(),this.render("loaded",!0)):void this.renderLoading(function(){e.attempt++,e.record("loadStart"),E({src:e.src},function(t){e.naturalHeight=t.naturalHeight,e.naturalWidth=t.naturalWidth,e.state.loaded=!0,e.state.error=!1,e.record("loadEnd"),e.render("loaded",!1),k[e.src]=1,n()},function(t){e.options.silent,e.state.error=!0,e.state.loaded=!1,e.render("error",!1)})})}},{key:"render",value:function(t,e){this.elRenderer(this,t,e)}},{key:"performance",value:function(){var t="loading",e=0;return this.state.loaded&&(t="loaded",e=(this.performanceData.loadEnd-this.performanceData.loadStart)/1e3),this.state.error&&(t="error"),{src:this.src,state:t,time:e}}},{key:"destroy",value:function(){this.el=null,this.src=null,this.error=null,this.loading=null,this.bindType=null,this.attempt=0}}]),l}(),C="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",S=["scroll","wheel","mousewheel","resize","animationend","transitionend","touchmove"],A={rootMargin:"0px",threshold:0},j=function(c){return function(){function g(t){var e=t.preLoad,n=t.error,i=t.throttleWait,r=t.preLoadTop,o=t.dispatchEvent,a=t.loading,s=t.attempt,u=t.silent,l=void 0===u||u,c=t.scale,d=t.listenEvents,f=(t.hasbind,t.filter),h=t.adapter,p=t.observer,v=t.observerOptions;m(this,g),this.version="1.2.6",this.mode=y.event,this.ListenerQueue=[],this.TargetIndex=0,this.TargetQueue=[],this.options={silent:l,dispatchEvent:!!o,throttleWait:i||200,preLoad:e||1.3,preLoadTop:r||0,error:n||C,loading:a||C,attempt:s||3,scale:c||function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return b?window.devicePixelRatio||t:t}(c),ListenEvents:d||S,hasbind:!1,supportWebp:function(){if(!b)return!1;var t=!0,e=document;try{var n=e.createElement("object");n.type="image/webp",n.style.visibility="hidden",n.innerHTML="!",e.body.appendChild(n),t=!n.offsetWidth,e.body.removeChild(n)}catch(e){t=!1}return t}(),filter:f||{},adapter:h||{},observer:!!p,observerOptions:v||A},this._initEvent(),this.lazyLoadHandler=function(r,o){var a=null,s=0;return function(){if(!a){var t=Date.now()-s,e=this,n=arguments,i=function(){s=Date.now(),a=!1,r.apply(e,n)};o<=t?i():a=setTimeout(i,o)}}}(this._lazyLoadHandler.bind(this),this.options.throttleWait),this.setMode(this.options.observer?y.observer:y.event)}return t(g,[{key:"config",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};v(this.options,t)}},{key:"performance",value:function(){var e=[];return this.ListenerQueue.map(function(t){e.push(t.performance())}),e}},{key:"addLazyBox",value:function(t){this.ListenerQueue.push(t),b&&(this._addListenerTarget(window),this._observer&&this._observer.observe(t.el),t.$el&&t.$el.parentNode&&this._addListenerTarget(t.$el.parentNode))}},{key:"add",value:function(i,r,o){var a=this;if(function(t,e){for(var n=!1,i=0,r=t.length;i<r;i++)if(e(t[i])){n=!0;break}return n}(this.ListenerQueue,function(t){return t.el===i}))return this.update(i,r),c.nextTick(this.lazyLoadHandler);var t=this._valueFormatter(r.value),s=t.src,u=t.loading,l=t.error;c.nextTick(function(){s=d(i,a.options.scale)||s,a._observer&&a._observer.observe(i);var t=Object.keys(r.modifiers)[0],e=void 0;t&&(e=(e=o.context.$refs[t])?e.$el||e:document.getElementById(t)),e||(e=function(t){if(b){if(!(t instanceof HTMLElement))return window;for(var e=t;e&&e!==document.body&&e!==document.documentElement&&e.parentNode;){if(/(scroll|auto)/.test(L(e)))return e;e=e.parentNode}return window}}(i));var n=new x({bindType:r.arg,$parent:e,el:i,loading:u,error:l,src:s,elRenderer:a._elRenderer.bind(a),options:a.options});a.ListenerQueue.push(n),b&&(a._addListenerTarget(window),a._addListenerTarget(e)),a.lazyLoadHandler(),c.nextTick(function(){return a.lazyLoadHandler()})})}},{key:"update",value:function(e,t){var n=this,i=this._valueFormatter(t.value),r=i.src,o=i.loading,a=i.error;r=d(e,this.options.scale)||r;var s=u(this.ListenerQueue,function(t){return t.el===e});s&&s.update({src:r,loading:o,error:a}),this._observer&&(this._observer.unobserve(e),this._observer.observe(e)),this.lazyLoadHandler(),c.nextTick(function(){return n.lazyLoadHandler()})}},{key:"remove",value:function(e){if(e){this._observer&&this._observer.unobserve(e);var t=u(this.ListenerQueue,function(t){return t.el===e});t&&(this._removeListenerTarget(t.$parent),this._removeListenerTarget(window),o(this.ListenerQueue,t)&&t.destroy())}}},{key:"removeComponent",value:function(t){t&&(o(this.ListenerQueue,t),this._observer&&this._observer.unobserve(t.el),t.$parent&&t.$el.parentNode&&this._removeListenerTarget(t.$el.parentNode),this._removeListenerTarget(window))}},{key:"setMode",value:function(t){var e=this;i||t!==y.observer||(t=y.event),(this.mode=t)===y.event?(this._observer&&(this.ListenerQueue.forEach(function(t){e._observer.unobserve(t.el)}),this._observer=null),this.TargetQueue.forEach(function(t){e._initListen(t.el,!0)})):(this.TargetQueue.forEach(function(t){e._initListen(t.el,!1)}),this._initIntersectionObserver())}},{key:"_addListenerTarget",value:function(e){if(e){var t=u(this.TargetQueue,function(t){return t.el===e});return t?t.childrenCount++:(t={el:e,id:++this.TargetIndex,childrenCount:1,listened:!0},this.mode===y.event&&this._initListen(t.el,!0),this.TargetQueue.push(t)),this.TargetIndex}}},{key:"_removeListenerTarget",value:function(n){var i=this;this.TargetQueue.forEach(function(t,e){t.el===n&&(--t.childrenCount||(i._initListen(t.el,!1),i.TargetQueue.splice(e,1),t=null))})}},{key:"_initListen",value:function(e,n){var i=this;this.options.ListenEvents.forEach(function(t){return w[n?"on":"off"](e,t,i.lazyLoadHandler)})}},{key:"_initEvent",value:function(){var r=this;this.Event={listeners:{loading:[],loaded:[],error:[]}},this.$on=function(t,e){r.Event.listeners[t]||(r.Event.listeners[t]=[]),r.Event.listeners[t].push(e)},this.$once=function(e,n){var i=r;r.$on(e,function t(){i.$off(e,t),n.apply(i,arguments)})},this.$off=function(t,e){if(e)o(r.Event.listeners[t],e);else{if(!r.Event.listeners[t])return;r.Event.listeners[t].length=0}},this.$emit=function(t,e,n){r.Event.listeners[t]&&r.Event.listeners[t].forEach(function(t){return t(e,n)})}}},{key:"_lazyLoadHandler",value:function(){var e=this,n=[];this.ListenerQueue.forEach(function(t,e){if(!t.state.error&&t.state.loaded)return n.push(t);t.checkInView()&&t.load()}),n.forEach(function(t){return o(e.ListenerQueue,t)})}},{key:"_initIntersectionObserver",value:function(){var e=this;i&&(this._observer=new IntersectionObserver(this._observerHandler.bind(this),this.options.observerOptions),this.ListenerQueue.length&&this.ListenerQueue.forEach(function(t){e._observer.observe(t.el)}))}},{key:"_observerHandler",value:function(t,e){var n=this;t.forEach(function(e){e.isIntersecting&&n.ListenerQueue.forEach(function(t){if(t.el===e.target){if(t.state.loaded)return n._observer.unobserve(t.el);t.load()}})})}},{key:"_elRenderer",value:function(t,e,n){if(t.el){var i=t.el,r=t.bindType,o=void 0;switch(e){case"loading":o=t.loading;break;case"error":o=t.error;break;default:o=t.src}if(r?i.style[r]='url("'+o+'")':i.getAttribute("src")!==o&&i.setAttribute("src",o),i.setAttribute("lazy",e),this.$emit(e,t,n),this.options.adapter[e]&&this.options.adapter[e](t,this.options),this.options.dispatchEvent){var a=new _(e,{detail:t});i.dispatchEvent(a)}}}},{key:"_valueFormatter",value:function(t){var e=t,n=this.options.loading,i=this.options.error;return function(t){return null!==t&&"object"===(void 0===t?"undefined":l(t))}(t)&&(t.src||this.options.silent,e=t.src,n=t.loading||this.options.loading,i=t.error||this.options.error),{src:e,loading:n,error:i}}}]),g}()},z=function(){function n(t){var e=t.lazy;m(this,n),((this.lazy=e).lazyContainerMananger=this)._queue=[]}return t(n,[{key:"bind",value:function(t,e,n){var i=new O({el:t,binding:e,vnode:n,lazy:this.lazy});this._queue.push(i)}},{key:"update",value:function(e,t,n){var i=u(this._queue,function(t){return t.el===e});i&&i.update({el:e,binding:t,vnode:n})}},{key:"unbind",value:function(e,t,n){var i=u(this._queue,function(t){return t.el===e});i&&(i.clear(),o(this._queue,i))}}]),n}(),T={selector:"img"},O=function(){function o(t){var e=t.el,n=t.binding,i=t.vnode,r=t.lazy;m(this,o),this.el=null,this.vnode=i,this.binding=n,this.options={},this.lazy=r,this._queue=[],this.update({el:e,binding:n})}return t(o,[{key:"update",value:function(t){var e=this,n=t.el,i=t.binding;this.el=n,this.options=v({},T,i.value),this.getImgs().forEach(function(t){e.lazy.add(t,v({},e.binding,{value:{src:"dataset"in t?t.dataset.src:t.getAttribute("data-src"),error:"dataset"in t?t.dataset.error:t.getAttribute("data-error"),loading:"dataset"in t?t.dataset.loading:t.getAttribute("data-loading")}}),e.vnode)})}},{key:"getImgs",value:function(){return function(t){for(var e=t.length,n=[],i=0;i<e;i++)n.push(t[i]);return n}(this.el.querySelectorAll(this.options.selector))}},{key:"clear",value:function(){var e=this;this.getImgs().forEach(function(t){return e.lazy.remove(t)}),this.vnode=null,this.binding=null,this.lazy=null}}]),o}();return{install:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=j(t),i=new n(e),r=new z({lazy:i}),o="2"===t.version.split(".")[0];t.prototype.$Lazyload=i,e.lazyComponent&&t.component("lazy-component",function(t){return{props:{tag:{type:String,default:"div"}},render:function(t){return!1===this.show?t(this.tag):t(this.tag,null,this.$slots.default)},data:function(){return{el:null,state:{loaded:!1},rect:{},show:!1}},mounted:function(){this.el=this.$el,t.addLazyBox(this),t.lazyLoadHandler()},beforeDestroy:function(){t.removeComponent(this)},methods:{getRect:function(){this.rect=this.$el.getBoundingClientRect()},checkInView:function(){return this.getRect(),b&&this.rect.top<window.innerHeight*t.options.preLoad&&this.rect.bottom>0&&this.rect.left<window.innerWidth*t.options.preLoad&&this.rect.right>0},load:function(){this.show=!0,this.state.loaded=!0,this.$emit("show",this)}}}}(i)),e.lazyImage&&t.component("lazy-image",function(r){return{props:{src:[String,Object],tag:{type:String,default:"img"}},render:function(t){return t(this.tag,{attrs:{src:this.renderSrc}},this.$slots.default)},data:function(){return{el:null,options:{src:"",error:"",loading:"",attempt:r.options.attempt},state:{loaded:!1,error:!1,attempt:0},rect:{},renderSrc:""}},watch:{src:function(){this.init(),r.addLazyBox(this),r.lazyLoadHandler()}},created:function(){this.init(),this.renderSrc=this.options.loading},mounted:function(){this.el=this.$el,r.addLazyBox(this),r.lazyLoadHandler()},beforeDestroy:function(){r.removeComponent(this)},methods:{init:function(){var t=r._valueFormatter(this.src),e=t.src,n=t.loading,i=t.error;this.state.loaded=!1,this.options.src=e,this.options.error=i,this.options.loading=n,this.renderSrc=this.options.loading},getRect:function(){this.rect=this.$el.getBoundingClientRect()},checkInView:function(){return this.getRect(),b&&this.rect.top<window.innerHeight*r.options.preLoad&&this.rect.bottom>0&&this.rect.left<window.innerWidth*r.options.preLoad&&this.rect.right>0},load:function(){var n=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c;if(this.state.attempt>this.options.attempt-1&&this.state.error)return r.options.silent||console.log("VueLazyload log: "+this.options.src+" tried too more than "+this.options.attempt+" times"),void t();var e=this.options.src;E({src:e},function(t){var e=t.src;n.renderSrc=e,n.state.loaded=!0},function(t){n.state.attempt++,n.renderSrc=n.options.error,n.state.error=!0})}}}}(i)),o?(t.directive("lazy",{bind:i.add.bind(i),update:i.update.bind(i),componentUpdated:i.lazyLoadHandler.bind(i),unbind:i.remove.bind(i)}),t.directive("lazy-container",{bind:r.bind.bind(r),update:r.update.bind(r),unbind:r.unbind.bind(r)})):(t.directive("lazy",{bind:i.lazyLoadHandler.bind(i),update:function(t,e){v(this.vm.$refs,this.vm.$els),i.add(this.el,{modifiers:this.modifiers||{},arg:this.arg,value:t,oldValue:e},{context:this.vm})},unbind:function(){i.remove(this.el)}}),t.directive("lazy-container",{update:function(t,e){r.update(this.el,{modifiers:this.modifiers||{},arg:this.arg,value:t,oldValue:e},{context:this.vm})},unbind:function(){r.unbind(this.el)}}))}}}()},82:function(t,e,n){}});