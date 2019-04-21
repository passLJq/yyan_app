import Vue from 'vue'
import Tpl from './my_center.vue'

if (openapp) {
  window.apiready = function () {
    console.log('in 111')
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