!function(n){var r={};function i(t){if(r[t])return r[t].exports;var e=r[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,i),e.l=!0,e.exports}i.m=n,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=261)}({0:function(t,e){t.exports=Vue},1:function(t,e,n){"use strict";function r(t,e,n,r,i,o,s,a){var u,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),o&&(c._scopeId="data-v-"+o),s?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},c._ssrRegister=u):i&&(u=a?function(){i.call(this,this.$root.$options.shadowRoot)}:i),u)if(c.functional){c._injectStyles=u;var d=c.render;c.render=function(t,e){return u.call(e),d(t,e)}}else{var l=c.beforeCreate;c.beforeCreate=l?[].concat(l,u):[u]}return{exports:t,options:c}}n.d(e,"a",function(){return r})},12:function(t,e,r){"use strict";function n(){var t=this,e=t.$createElement,n=t._self._c||e;return"403"!=t.statusCode&&"1"!=t.statusCode?n("div",{staticClass:"err"},[n("img",{staticClass:"img",attrs:{src:r(20),alt:""}}),t._v(" "),503==t.statusCode?n("p",[t._v("当前访问峰值过高，请稍候再试...")]):n("p",[t._v("网络出现了错误，请稍候再试...")]),t._v(" "),n("span",{staticClass:"chongshi",on:{click:t.reload}},[t._v("点击重试")])]):t._e()}n._withStripped=!0;var i={components:{},props:{showErr:{type:String,required:!1},scode:{type:String,required:!1}},data:function(){return{statusCode:"1"}},watch:{scode:function(t){0<=t&&(this.statusCode=t)}},computed:{},created:function(){},mounted:function(){},methods:{reload:function(){this.$emit("reload")}}},o=(r(21),r(1)),s=Object(o.a)(i,n,[],!1,null,"310113f7",null);s.options.__file="src/components/statuserr/statuserr.vue";e.a=s.exports},148:function(t,e,n){"use strict";var r=n(70);n.n(r).a},20:function(t,e,n){t.exports=n.p+"img/statuserr.png"},21:function(t,e,n){"use strict";var r=n(7);n.n(r).a},261:function(t,e,n){"use strict";n.r(e);function r(){var n=this,t=n.$createElement,r=n._self._c||t;return r("div",{ref:"app",staticStyle:{"padding-top":"20px"}},[n._l(n.listdata,function(e){return r("div",{key:e.protBigImg,staticClass:"probox",on:{click:function(t){return n.gopid(e.pid)}}},[r("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.protBigImg,expression:"item.protBigImg"}],attrs:{alt:""}}),n._v(" "),r("div",{staticClass:"profoot"},[r("p",{staticClass:"p1"},[n._v(n._s(e.name))]),n._v(" "),r("p",{staticClass:"p2"},[n._v(n._s(e.secondname))]),n._v(" "),r("div",{staticClass:"footbox"},[r("p",[n._v("\n          ¥"+n._s(n._f("toFixed")(e.salePrice))+"\n          "),n.fxshopid?r("span",{staticClass:"zuannum"},[n._v("/ 赚¥"+n._s(n._f("toFixed")(e.commPrice)))]):n._e()]),n._v(" "),r("p",[n._v("立即购买")])])])])}),n._v(" "),n.gotopshow?r("div",{staticClass:"gotop",on:{click:n.gotop}},[r("i",{staticClass:"iconfont icon-huidaodingbu"})]):n._e(),n._v(" "),r("statuserr",{attrs:{scode:n.statusCode},on:{reload:n.errReload}})],2)}var i=n(0),o=n.n(i);r._withStripped=!0;var s={components:{statuserr:n(12).a},props:{},data:function(){return{listdata:[],currentPage:1,stops:!1,gotopshow:!1,fxshopid:"",statusCode:"1",times:null,clickone:!1}},filters:{toFixed:function(t){return Number(t).toFixed(2)}},watch:{},computed:{},methods:{gotop:function(){document.documentElement.scrollTop=document.body.scrollTop=0},binddata:function(){var e=this;e.clickone=!0,e.times=setTimeout(function(){showLoading()},2e3),https({url:siteUrl+"Main/Main/GetProductCategoryList",data:{currpage:e.currentPage,pageSize:8,clsid:pageParam("classid"),fxshopid:getname("SessionShopID"),userid:getname()},timeout:10,successBack:function(t){if(clearTimeout(e.times),e.clickone=!1,1==t.status&&t.success&&0<t.Data.length){var r=t.Data;r.forEach(function(t,n){null!=t.rushbuy&&JSON.parse(r[n].rushbuy.specjson).forEach(function(t,e){0==e&&(r[n].salePrice=t.Price)})}),1==e.currentPage?(e.listdata=r,e.stops=!1):e.listdata=e.listdata.concat(r)}else 0==t.status&&t.success?(1==e.currentPage&&(e.listdata=[]),e.stops=!0):promptMsg(t.err);refreshDone(),e.statusCode="1",hideLoading()},errorBack:function(t){e.clickone=!1,e.statusCode=t.statusCode,hideLoading(),promptMsg(t.msg)}})},gopid:function(t){openWin({name:"productDetail"+t,url:"./productDetail.html",pageParam:{pid:t},useWKWebView:!0})},onScroll:function(){var t=this,e=t.$refs.app.clientHeight,n=document.documentElement.clientHeight,r=document.documentElement.scrollTop||document.body.scrollTop;t.gotopshow=200<r,e<=n+r&&(t.stops||t.clickone||(t.currentPage+=1,t.binddata()))},errReload:function(){this.fxshopid=getname("SessionShopID"),this.currentPage=1,this.stops=!1,this.binddata()}},created:function(){if(window.api){var t=this;api.setCustomRefreshHeaderInfo({bgColor:"#fff",images:["widget://image/suaxin1.png","widget://image/suaxin2.png","widget://image/suaxin3.png","widget://image/suaxin4.png","widget://image/suaxin5.png","widget://image/suaxin6.png","widget://image/suaxin7.png"],tips:{pull:"下拉刷新",threshold:"松开立即刷新",load:"正在刷新"}},function(){setTimeout(function(){t.fxshopid=getname("SessionShopID"),t.currentPage=1,t.stops=!1,t.binddata()},1e3)})}},mounted:function(){var n=this;this.fxshopid=getname("SessionShopID"),window.api&&api.addEventListener({name:"scrolltobottom"},function(t,e){n.stops||n.clickone||(n.currentPage+=1,n.binddata())}),this.binddata()}},a=(n(148),n(1)),u=Object(a.a)(s,r,[],!1,null,null,null);u.options.__file="src/page/main_pingdao/index.vue";var c=u.exports,d=n(4),l=n.n(d);o.a.use(l.a,{throttleWait:200,loading:"./image/bkg_coverheng.jpg",error:"./image/bkg_coverheng.jpg"});openapp?window.apiready=function(){new o.a({render:function(t){return t(c)}}).$mount("#app")}:new o.a({render:function(t){return t(c)}}).$mount("#app")},4:function(t,e,n){
/*!
 * Vue-Lazyload.js v1.2.6
 * (c) 2018 Awe <hilongjw@gmail.com>
 * Released under the MIT License.
 */
t.exports=function(){"use strict";function s(t){t=t||{};var e=arguments.length,n=0;if(1===e)return t;for(;++n<e;){var r=arguments[n];h(t)&&(t=r),a(r)&&i(t,r)}return t}function i(t,e){for(var n in f(t,e),e)if("__proto__"!==n&&(i=e,o=n,Object.prototype.hasOwnProperty.call(i,o))){var r=e[n];a(r)?("undefined"===p(t[n])&&"function"===p(r)&&(t[n]=r),t[n]=s(t[n]||{},r)):t[n]=r}var i,o;return t}function a(t){return"object"===p(t)||"function"===p(t)}function o(t,e){if(t.length){var n=t.indexOf(e);return-1<n?t.splice(n,1):void 0}}function l(t,e){if("IMG"===t.tagName&&t.getAttribute("data-srcset")){var n=t.getAttribute("data-srcset"),r=[],i=t.parentNode,o=i.offsetWidth*e,s=void 0,a=void 0,u=void 0;(n=n.trim().split(",")).map(function(t){t=t.trim(),s=t.lastIndexOf(" "),u=-1===s?(a=t,999998):(a=t.substr(0,s),parseInt(t.substr(s+1,t.length-s-2),10)),r.push([u,a])}),r.sort(function(t,e){if(t[0]<e[0])return-1;if(t[0]>e[0])return 1;if(t[0]===e[0]){if(-1!==e[1].indexOf(".webp",e[1].length-5))return 1;if(-1!==t[1].indexOf(".webp",t[1].length-5))return-1}return 0});for(var c="",d=void 0,l=r.length,h=0;h<l;h++)if((d=r[h])[0]>=o){c=d[1];break}return c}}function u(t,e){for(var n=void 0,r=0,i=t.length;r<i;r++)if(e(t[r])){n=t[r];break}return n}function d(){}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},t=function(){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}}(),h=function(t){return null==t||"function"!=typeof t&&"object"!==(void 0===t?"undefined":c(t))},f=function(t,e){if(null==t)throw new TypeError("expected first argument to be an object.");if(void 0===e||"undefined"==typeof Symbol)return t;if("function"!=typeof Object.getOwnPropertySymbols)return t;for(var n=Object.prototype.propertyIsEnumerable,r=Object(t),i=arguments.length,o=0;++o<i;)for(var s=Object(arguments[o]),a=Object.getOwnPropertySymbols(s),u=0;u<a.length;u++){var c=a[u];n.call(s,c)&&(r[c]=s[c])}return r},n=Object.prototype.toString,p=function(t){var e=void 0===t?"undefined":c(t);return"undefined"===e?"undefined":null===t?"null":!0===t||!1===t||t instanceof Boolean?"boolean":"string"===e||t instanceof String?"string":"number"===e||t instanceof Number?"number":"function"===e||t instanceof Function?void 0!==t.constructor.name&&"Generator"===t.constructor.name.slice(0,9)?"generatorfunction":"function":void 0!==Array.isArray&&Array.isArray(t)?"array":t instanceof RegExp?"regexp":t instanceof Date?"date":"[object RegExp]"===(e=n.call(t))?"regexp":"[object Date]"===e?"date":"[object Arguments]"===e?"arguments":"[object Error]"===e?"error":"[object Promise]"===e?"promise":function(t){return t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}(t)?"buffer":"[object Set]"===e?"set":"[object WeakSet]"===e?"weakset":"[object Map]"===e?"map":"[object WeakMap]"===e?"weakmap":"[object Symbol]"===e?"symbol":"[object Map Iterator]"===e?"mapiterator":"[object Set Iterator]"===e?"setiterator":"[object String Iterator]"===e?"stringiterator":"[object Array Iterator]"===e?"arrayiterator":"[object Int8Array]"===e?"int8array":"[object Uint8Array]"===e?"uint8array":"[object Uint8ClampedArray]"===e?"uint8clampedarray":"[object Int16Array]"===e?"int16array":"[object Uint16Array]"===e?"uint16array":"[object Int32Array]"===e?"int32array":"[object Uint32Array]"===e?"uint32array":"[object Float32Array]"===e?"float32array":"[object Float64Array]"===e?"float64array":"object"},v=s,b="undefined"!=typeof window,r=b&&"IntersectionObserver"in window,y={event:"event",observer:"observer"},_=function(){function t(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}if(b)return"function"==typeof window.CustomEvent?window.CustomEvent:(t.prototype=window.Event.prototype,t)}(),g=function(){if(b){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,e)}catch(t){}return t}}(),w={on:function(t,e,n){var r=3<arguments.length&&void 0!==arguments[3]&&arguments[3];g?t.addEventListener(e,n,{capture:r,passive:!0}):t.addEventListener(e,n,r)},off:function(t,e,n){var r=3<arguments.length&&void 0!==arguments[3]&&arguments[3];t.removeEventListener(e,n,r)}},L=function(t,e,n){var r=new Image;r.src=t.src,r.onload=function(){e({naturalHeight:r.naturalHeight,naturalWidth:r.naturalWidth,src:r.src})},r.onerror=function(t){n(t)}},e=function(t,e){return"undefined"!=typeof getComputedStyle?getComputedStyle(t,null).getPropertyValue(e):t.style[e]},k=function(t){return e(t,"overflow")+e(t,"overflow-y")+e(t,"overflow-x")},E={},x=function(){function c(t){var e=t.el,n=t.src,r=t.error,i=t.loading,o=t.bindType,s=t.$parent,a=t.options,u=t.elRenderer;m(this,c),this.el=e,this.src=n,this.error=r,this.loading=i,this.bindType=o,this.attempt=0,this.naturalHeight=0,this.naturalWidth=0,this.options=a,this.rect=null,this.$parent=s,this.elRenderer=u,this.performanceData={init:Date.now(),loadStart:0,loadEnd:0},this.filter(),this.initState(),this.render("loading",!1)}return t(c,[{key:"initState",value:function(){"dataset"in this.el?this.el.dataset.src=this.src:this.el.setAttribute("data-src",this.src),this.state={error:!1,loaded:!1,rendered:!1}}},{key:"record",value:function(t){this.performanceData[t]=Date.now()}},{key:"update",value:function(t){var e=t.src,n=t.loading,r=t.error,i=this.src;this.src=e,this.loading=n,this.error=r,this.filter(),i!==this.src&&(this.attempt=0,this.initState())}},{key:"getRect",value:function(){this.rect=this.el.getBoundingClientRect()}},{key:"checkInView",value:function(){return this.getRect(),this.rect.top<window.innerHeight*this.options.preLoad&&this.rect.bottom>this.options.preLoadTop&&this.rect.left<window.innerWidth*this.options.preLoad&&0<this.rect.right}},{key:"filter",value:function(){var e=this;(function(t){if(!(t instanceof Object))return[];if(Object.keys)return Object.keys(t);var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n);return e})(this.options.filter).map(function(t){e.options.filter[t](e,e.options)})}},{key:"renderLoading",value:function(e){var n=this;L({src:this.loading},function(t){n.render("loading",!1),e()},function(){e(),n.options.silent})}},{key:"load",value:function(){var e=this,n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:d;return this.attempt>this.options.attempt-1&&this.state.error?(this.options.silent,void n()):this.state.loaded||E[this.src]?(this.state.loaded=!0,n(),this.render("loaded",!0)):void this.renderLoading(function(){e.attempt++,e.record("loadStart"),L({src:e.src},function(t){e.naturalHeight=t.naturalHeight,e.naturalWidth=t.naturalWidth,e.state.loaded=!0,e.state.error=!1,e.record("loadEnd"),e.render("loaded",!1),E[e.src]=1,n()},function(t){e.options.silent,e.state.error=!0,e.state.loaded=!1,e.render("error",!1)})})}},{key:"render",value:function(t,e){this.elRenderer(this,t,e)}},{key:"performance",value:function(){var t="loading",e=0;return this.state.loaded&&(t="loaded",e=(this.performanceData.loadEnd-this.performanceData.loadStart)/1e3),this.state.error&&(t="error"),{src:this.src,state:t,time:e}}},{key:"destroy",value:function(){this.el=null,this.src=null,this.error=null,this.loading=null,this.bindType=null,this.attempt=0}}]),c}(),S="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",j=["scroll","wheel","mousewheel","resize","animationend","transitionend","touchmove"],A={rootMargin:"0px",threshold:0},C=function(d){return function(){function g(t){var e=t.preLoad,n=t.error,r=t.throttleWait,i=t.preLoadTop,o=t.dispatchEvent,s=t.loading,a=t.attempt,u=t.silent,c=void 0===u||u,d=t.scale,l=t.listenEvents,h=(t.hasbind,t.filter),f=t.adapter,p=t.observer,v=t.observerOptions;m(this,g),this.version="1.2.6",this.mode=y.event,this.ListenerQueue=[],this.TargetIndex=0,this.TargetQueue=[],this.options={silent:c,dispatchEvent:!!o,throttleWait:r||200,preLoad:e||1.3,preLoadTop:i||0,error:n||S,loading:s||S,attempt:a||3,scale:d||function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return b?window.devicePixelRatio||t:t}(d),ListenEvents:l||j,hasbind:!1,supportWebp:function(){if(!b)return!1;var t=!0,e=document;try{var n=e.createElement("object");n.type="image/webp",n.style.visibility="hidden",n.innerHTML="!",e.body.appendChild(n),t=!n.offsetWidth,e.body.removeChild(n)}catch(e){t=!1}return t}(),filter:h||{},adapter:f||{},observer:!!p,observerOptions:v||A},this._initEvent(),this.lazyLoadHandler=function(i,o){var s=null,a=0;return function(){if(!s){var t=Date.now()-a,e=this,n=arguments,r=function(){a=Date.now(),s=!1,i.apply(e,n)};o<=t?r():s=setTimeout(r,o)}}}(this._lazyLoadHandler.bind(this),this.options.throttleWait),this.setMode(this.options.observer?y.observer:y.event)}return t(g,[{key:"config",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};v(this.options,t)}},{key:"performance",value:function(){var e=[];return this.ListenerQueue.map(function(t){e.push(t.performance())}),e}},{key:"addLazyBox",value:function(t){this.ListenerQueue.push(t),b&&(this._addListenerTarget(window),this._observer&&this._observer.observe(t.el),t.$el&&t.$el.parentNode&&this._addListenerTarget(t.$el.parentNode))}},{key:"add",value:function(r,i,o){var s=this;if(function(t,e){for(var n=!1,r=0,i=t.length;r<i;r++)if(e(t[r])){n=!0;break}return n}(this.ListenerQueue,function(t){return t.el===r}))return this.update(r,i),d.nextTick(this.lazyLoadHandler);var t=this._valueFormatter(i.value),a=t.src,u=t.loading,c=t.error;d.nextTick(function(){a=l(r,s.options.scale)||a,s._observer&&s._observer.observe(r);var t=Object.keys(i.modifiers)[0],e=void 0;t&&(e=(e=o.context.$refs[t])?e.$el||e:document.getElementById(t)),e||(e=function(t){if(b){if(!(t instanceof HTMLElement))return window;for(var e=t;e&&e!==document.body&&e!==document.documentElement&&e.parentNode;){if(/(scroll|auto)/.test(k(e)))return e;e=e.parentNode}return window}}(r));var n=new x({bindType:i.arg,$parent:e,el:r,loading:u,error:c,src:a,elRenderer:s._elRenderer.bind(s),options:s.options});s.ListenerQueue.push(n),b&&(s._addListenerTarget(window),s._addListenerTarget(e)),s.lazyLoadHandler(),d.nextTick(function(){return s.lazyLoadHandler()})})}},{key:"update",value:function(e,t){var n=this,r=this._valueFormatter(t.value),i=r.src,o=r.loading,s=r.error;i=l(e,this.options.scale)||i;var a=u(this.ListenerQueue,function(t){return t.el===e});a&&a.update({src:i,loading:o,error:s}),this._observer&&(this._observer.unobserve(e),this._observer.observe(e)),this.lazyLoadHandler(),d.nextTick(function(){return n.lazyLoadHandler()})}},{key:"remove",value:function(e){if(e){this._observer&&this._observer.unobserve(e);var t=u(this.ListenerQueue,function(t){return t.el===e});t&&(this._removeListenerTarget(t.$parent),this._removeListenerTarget(window),o(this.ListenerQueue,t)&&t.destroy())}}},{key:"removeComponent",value:function(t){t&&(o(this.ListenerQueue,t),this._observer&&this._observer.unobserve(t.el),t.$parent&&t.$el.parentNode&&this._removeListenerTarget(t.$el.parentNode),this._removeListenerTarget(window))}},{key:"setMode",value:function(t){var e=this;r||t!==y.observer||(t=y.event),(this.mode=t)===y.event?(this._observer&&(this.ListenerQueue.forEach(function(t){e._observer.unobserve(t.el)}),this._observer=null),this.TargetQueue.forEach(function(t){e._initListen(t.el,!0)})):(this.TargetQueue.forEach(function(t){e._initListen(t.el,!1)}),this._initIntersectionObserver())}},{key:"_addListenerTarget",value:function(e){if(e){var t=u(this.TargetQueue,function(t){return t.el===e});return t?t.childrenCount++:(t={el:e,id:++this.TargetIndex,childrenCount:1,listened:!0},this.mode===y.event&&this._initListen(t.el,!0),this.TargetQueue.push(t)),this.TargetIndex}}},{key:"_removeListenerTarget",value:function(n){var r=this;this.TargetQueue.forEach(function(t,e){t.el===n&&(--t.childrenCount||(r._initListen(t.el,!1),r.TargetQueue.splice(e,1),t=null))})}},{key:"_initListen",value:function(e,n){var r=this;this.options.ListenEvents.forEach(function(t){return w[n?"on":"off"](e,t,r.lazyLoadHandler)})}},{key:"_initEvent",value:function(){var i=this;this.Event={listeners:{loading:[],loaded:[],error:[]}},this.$on=function(t,e){i.Event.listeners[t]||(i.Event.listeners[t]=[]),i.Event.listeners[t].push(e)},this.$once=function(e,n){var r=i;i.$on(e,function t(){r.$off(e,t),n.apply(r,arguments)})},this.$off=function(t,e){if(e)o(i.Event.listeners[t],e);else{if(!i.Event.listeners[t])return;i.Event.listeners[t].length=0}},this.$emit=function(t,e,n){i.Event.listeners[t]&&i.Event.listeners[t].forEach(function(t){return t(e,n)})}}},{key:"_lazyLoadHandler",value:function(){var e=this,n=[];this.ListenerQueue.forEach(function(t,e){if(!t.state.error&&t.state.loaded)return n.push(t);t.checkInView()&&t.load()}),n.forEach(function(t){return o(e.ListenerQueue,t)})}},{key:"_initIntersectionObserver",value:function(){var e=this;r&&(this._observer=new IntersectionObserver(this._observerHandler.bind(this),this.options.observerOptions),this.ListenerQueue.length&&this.ListenerQueue.forEach(function(t){e._observer.observe(t.el)}))}},{key:"_observerHandler",value:function(t,e){var n=this;t.forEach(function(e){e.isIntersecting&&n.ListenerQueue.forEach(function(t){if(t.el===e.target){if(t.state.loaded)return n._observer.unobserve(t.el);t.load()}})})}},{key:"_elRenderer",value:function(t,e,n){if(t.el){var r=t.el,i=t.bindType,o=void 0;switch(e){case"loading":o=t.loading;break;case"error":o=t.error;break;default:o=t.src}if(i?r.style[i]='url("'+o+'")':r.getAttribute("src")!==o&&r.setAttribute("src",o),r.setAttribute("lazy",e),this.$emit(e,t,n),this.options.adapter[e]&&this.options.adapter[e](t,this.options),this.options.dispatchEvent){var s=new _(e,{detail:t});r.dispatchEvent(s)}}}},{key:"_valueFormatter",value:function(t){var e=t,n=this.options.loading,r=this.options.error;return function(t){return null!==t&&"object"===(void 0===t?"undefined":c(t))}(t)&&(t.src||this.options.silent,e=t.src,n=t.loading||this.options.loading,r=t.error||this.options.error),{src:e,loading:n,error:r}}}]),g}()},T=function(){function n(t){var e=t.lazy;m(this,n),((this.lazy=e).lazyContainerMananger=this)._queue=[]}return t(n,[{key:"bind",value:function(t,e,n){var r=new O({el:t,binding:e,vnode:n,lazy:this.lazy});this._queue.push(r)}},{key:"update",value:function(e,t,n){var r=u(this._queue,function(t){return t.el===e});r&&r.update({el:e,binding:t,vnode:n})}},{key:"unbind",value:function(e,t,n){var r=u(this._queue,function(t){return t.el===e});r&&(r.clear(),o(this._queue,r))}}]),n}(),z={selector:"img"},O=function(){function o(t){var e=t.el,n=t.binding,r=t.vnode,i=t.lazy;m(this,o),this.el=null,this.vnode=r,this.binding=n,this.options={},this.lazy=i,this._queue=[],this.update({el:e,binding:n})}return t(o,[{key:"update",value:function(t){var e=this,n=t.el,r=t.binding;this.el=n,this.options=v({},z,r.value),this.getImgs().forEach(function(t){e.lazy.add(t,v({},e.binding,{value:{src:"dataset"in t?t.dataset.src:t.getAttribute("data-src"),error:"dataset"in t?t.dataset.error:t.getAttribute("data-error"),loading:"dataset"in t?t.dataset.loading:t.getAttribute("data-loading")}}),e.vnode)})}},{key:"getImgs",value:function(){return function(t){for(var e=t.length,n=[],r=0;r<e;r++)n.push(t[r]);return n}(this.el.querySelectorAll(this.options.selector))}},{key:"clear",value:function(){var e=this;this.getImgs().forEach(function(t){return e.lazy.remove(t)}),this.vnode=null,this.binding=null,this.lazy=null}}]),o}();return{install:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=C(t),r=new n(e),i=new T({lazy:r}),o="2"===t.version.split(".")[0];t.prototype.$Lazyload=r,e.lazyComponent&&t.component("lazy-component",function(t){return{props:{tag:{type:String,default:"div"}},render:function(t){return!1===this.show?t(this.tag):t(this.tag,null,this.$slots.default)},data:function(){return{el:null,state:{loaded:!1},rect:{},show:!1}},mounted:function(){this.el=this.$el,t.addLazyBox(this),t.lazyLoadHandler()},beforeDestroy:function(){t.removeComponent(this)},methods:{getRect:function(){this.rect=this.$el.getBoundingClientRect()},checkInView:function(){return this.getRect(),b&&this.rect.top<window.innerHeight*t.options.preLoad&&this.rect.bottom>0&&this.rect.left<window.innerWidth*t.options.preLoad&&this.rect.right>0},load:function(){this.show=!0,this.state.loaded=!0,this.$emit("show",this)}}}}(r)),e.lazyImage&&t.component("lazy-image",function(i){return{props:{src:[String,Object],tag:{type:String,default:"img"}},render:function(t){return t(this.tag,{attrs:{src:this.renderSrc}},this.$slots.default)},data:function(){return{el:null,options:{src:"",error:"",loading:"",attempt:i.options.attempt},state:{loaded:!1,error:!1,attempt:0},rect:{},renderSrc:""}},watch:{src:function(){this.init(),i.addLazyBox(this),i.lazyLoadHandler()}},created:function(){this.init(),this.renderSrc=this.options.loading},mounted:function(){this.el=this.$el,i.addLazyBox(this),i.lazyLoadHandler()},beforeDestroy:function(){i.removeComponent(this)},methods:{init:function(){var t=i._valueFormatter(this.src),e=t.src,n=t.loading,r=t.error;this.state.loaded=!1,this.options.src=e,this.options.error=r,this.options.loading=n,this.renderSrc=this.options.loading},getRect:function(){this.rect=this.$el.getBoundingClientRect()},checkInView:function(){return this.getRect(),b&&this.rect.top<window.innerHeight*i.options.preLoad&&this.rect.bottom>0&&this.rect.left<window.innerWidth*i.options.preLoad&&this.rect.right>0},load:function(){var n=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d;if(this.state.attempt>this.options.attempt-1&&this.state.error)return i.options.silent||console.log("VueLazyload log: "+this.options.src+" tried too more than "+this.options.attempt+" times"),void t();var e=this.options.src;L({src:e},function(t){var e=t.src;n.renderSrc=e,n.state.loaded=!0},function(t){n.state.attempt++,n.renderSrc=n.options.error,n.state.error=!0})}}}}(r)),o?(t.directive("lazy",{bind:r.add.bind(r),update:r.update.bind(r),componentUpdated:r.lazyLoadHandler.bind(r),unbind:r.remove.bind(r)}),t.directive("lazy-container",{bind:i.bind.bind(i),update:i.update.bind(i),unbind:i.unbind.bind(i)})):(t.directive("lazy",{bind:r.lazyLoadHandler.bind(r),update:function(t,e){v(this.vm.$refs,this.vm.$els),r.add(this.el,{modifiers:this.modifiers||{},arg:this.arg,value:t,oldValue:e},{context:this.vm})},unbind:function(){r.remove(this.el)}}),t.directive("lazy-container",{update:function(t,e){i.update(this.el,{modifiers:this.modifiers||{},arg:this.arg,value:t,oldValue:e},{context:this.vm})},unbind:function(){i.unbind(this.el)}}))}}}()},7:function(t,e,n){},70:function(t,e,n){}});