// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Qs from 'qs'
import App from './App'
import router from './router'
import axios from 'axios'
import Axios from 'vue-axios'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/commen/commen.css'
import BootstrapVue from 'bootstrap-vue'
import {BIcon,BootstrapVueIcons}  from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {store} from './vuex/store'

import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor)

import 'quill/dist/quill.core.css';

import 'quill/dist/quill.snow.css';

import 'quill/dist/quill.bubble.css';




// Vue.use(VueNativeSock,'ws://144.34.249.110:28005',{
//   // 启用Vuex集成,store的值为你的vuex
//   store: store,
//   // 数据发送/接收使用使用json格式
//   format: "json",
//   // 开启自动重连
//   reconnection: true,
//   // 尝试重连的次数
//   reconnectionAttempts: 5,
//   // 重连间隔时间
//   reconnectionDelay: 3000,
//   // 将数据进行序列化，由于启用了json格式的数据传输这里需要进行重写
//   passToStoreHandler: function (eventName, event) {
//     if (!eventName.startsWith('SOCKET_')) { return }
//     let method = 'commit';
//     let target = eventName.toUpperCase();
//     let msg = event;
//     if (this.format === 'json' && event.data) {
//       msg = JSON.parse(event.data);
//       if (msg.mutation) {
//         target = [msg.namespace || '', msg.mutation].filter((e) => !!e).join('/');
//       } else if (msg.action) {
//         method = 'dispatch';
//         target = [msg.namespace || '', msg.action].filter((e) => !!e).join('/');
//       }
//     }
//     this.store[method](target, msg);
//     this.store.state.socket.message = msg;
//   }
// });

















// import 'video.js/dist/video-js.css'



//Vue.use(hls)
axios.defaults.baseURL = 'http://144.34.249.110:28005/api'
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Qs)
Vue.use(Axios, axios)
// window.Hls = require('hls.js')
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
//   window.sessionStorage.setItem('token', res.data.access_token)
Vue.component('BIcon', BIcon)
axios.interceptors.request.use(
  config => {
    var t = window.localStorage.getItem('token')
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    if(config.data == undefined){
      config.data = [];
    }
    if (t !== "undefined" && t != undefined) {

      config.data.access_token = t
    }

    config.device = flag ? 'h5' : 'pc'
    if (config.data) {
      config.data = Qs.stringify(config.data)
      config.Headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }
    return config
  }
)

axios.interceptors.response.use(function (res) {

  //为什么多了个data

  //console.log(res)
  if(res.data.code == 401){
    //需要重新登录
    window.localStorage.setItem('userinfo', '')
    
  }

  if(res.data.access_token != undefined && res.data.access_token !== "undefined")
    window.localStorage.setItem('token', res.data.access_token)
  // 对响应数据做点什么
  // response 是请求回来的数据
  return res;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
}
)




/* eslint-disable no-new */
new Vue({
  el: '#app',

  router,
  components: { App },
  template: '<App/>'
})
