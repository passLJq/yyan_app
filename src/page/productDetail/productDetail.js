import Vue from "vue";
import Tpl from "./productDetail.vue";
import { Swipe, SwipeItem } from 'vant';

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  throttleWait:200,
  error: './img/bkg_cover.jpg',
  loading: './img/bkg_cover.jpg',
})

if (openapp) {
  console.log('执行了apiready')
  window.apiready = function () {
    Vue.use(Swipe).use(SwipeItem)
    const app = new Vue({
      render:h => h(Tpl),
    }).$mount("#app")
  }
} else {
  console.log('没有执行apiready')
  Vue.use(Swipe).use(SwipeItem)
    const app = new Vue({
      render:h => h(Tpl),
    }).$mount("#app")
}