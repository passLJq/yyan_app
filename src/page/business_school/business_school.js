import Vue from 'vue'
import Tpl from './business_school.vue'
import VueLazyLoad from 'vue-lazyload'
import { Swipe, SwipeItem } from 'vant';
Vue.use(VueLazyLoad,{
  throttleWait:200,
  loading: '../../img/bkg_cover.jpg',
  error: '../../img/bkg_cover.jpg'
})

if (openapp) {
  window.apiready = function () {
    var app = new Vue({
      render:h => h(Tpl),
    }).$mount('#app')
  }
} else {
  var app = new Vue({
    render:h => h(Tpl),
    }).$mount('#app')
}
