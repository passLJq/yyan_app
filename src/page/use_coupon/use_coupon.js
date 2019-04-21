import Vue from "vue";
import Tpl from "./use_coupon.vue";
// import VueLazyLoad from 'vue-lazyload'
// Vue.use(VueLazyLoad,{
//   throttleWait:200
// })
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);

if (openapp) {
  window.apiready = function () {
    var statustop = $api.getStorage('statustop')
    document.getElementById('head').style.paddingTop = statustop + 'px'
  }
}

var app=''
if(openapp){
  window.apiready= function () {
    app=new Vue({
      render:h => h(Tpl),
    }).$mount("#app");
  }
}else{
  app=new Vue({
    render:h => h(Tpl),
  }).$mount("#app");
}
