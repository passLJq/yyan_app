import Vue from 'vue';
import Tpl from './index.vue';
import { Swipe, SwipeItem } from 'vant';
import VueLazyLoad from 'vue-lazyload'
Vue.use(Swipe).use(SwipeItem);
Vue.use(VueLazyLoad)

var app=''
if(openapp){
  window.apiready= function () {
app=new Vue({
render:h => h(Tpl),
}).$mount('#app');
 }
}else{
 app=new Vue({
render:h => h(Tpl),
 }).$mount('#app')
}