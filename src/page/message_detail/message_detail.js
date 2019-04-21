import Vue from 'vue'
import Tpl from './message_detail.vue'

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
