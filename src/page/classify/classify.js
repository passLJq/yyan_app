import Vue from "vue";
import Tpl from "./classify.vue";
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  throttleWait:200,
  loading: '../../img/bkg_cover.jpg',
  error: '../../img/bkg_cover.jpg'
})
// import { Swipe, SwipeItem } from 'vant';
// Vue.use(Swipe).use(SwipeItem);

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
