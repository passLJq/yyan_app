import Vue from "vue";
import Tpl from "./new_my_lndiana.vue";
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  throttleWait:200
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
