import Vue from "vue";
import Tpl from "./index.vue";
import { Swipe, SwipeItem } from 'vant';
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  throttleWait:200,
  loading: './img/bkg_cover.jpg',
  error: './img/bkg_cover.jpg'
})
Vue.use(Swipe).use(SwipeItem);
var app=''
if(openapp){
  window.apiready= function () {
    api.addEventListener({
      name:'offline'
  }, function(ret, err){
      promptMsg('断网了');
  });
      api.addEventListener({
      name:'online'
  }, function(ret, err){
      promptMsg('已连接到'+ret.connectionType);
  });
    app=new Vue({
      render:h => h(Tpl),
    }).$mount("#app");
  }
}else{
  app=new Vue({
    render:h => h(Tpl),
  }).$mount("#app");
}
