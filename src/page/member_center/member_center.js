import Vue from 'vue'
import Tpl from './member_center.vue'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
  throttleWait:200,
  loading: '../../img/man.jpg',
  error: '../../img/man.jpg'
})

if (openapp) {
  window.apiready = function () {
    console.log('in member_center.js')
    var app = new Vue({
      render:h => h(Tpl),
    }).$mount('#app')
  }
} else {
  var app = new Vue({
    render:h => h(Tpl),
    }).$mount('#app')
}

// if (openapp) {
//   window.apiready = function(){
//     var app = new Vue({
//       render:h => h(Tpl),
//       }).$mount('#app')
//   }
// } else {
//   var app = new Vue({
//     render:h => h(Tpl),
//     }).$mount('#app')
// }

// var app = new Vue({
//   render:h => h(Tpl),
//   }).$mount('#app')