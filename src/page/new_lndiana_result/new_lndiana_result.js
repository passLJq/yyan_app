import Vue from "vue";
import Tpl from "./new_lndiana_result.vue";
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  // throttleWait:200,
  loading: '../../img/bkg_cover.jpg',
  error: '../../img/bkg_cover.jpg'
})
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
