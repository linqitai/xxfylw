// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import $ from 'jquery'
import 'element-ui/lib/theme-chalk/index.css'
// import './common/font-awesome-4.7.0/css/font-awesome.css'
import 'babel-polyfill'
import './common/scss/reset.scss'
import './common/scss/icon.scss'
import './common/scss/common.scss'
// import ajax from '@/api/ajax';
// import api from '@/api/index';
// import utils from '@/common/js/utils2'
import axios from "axios"
axios.defaults.withCredentials = true
import Cookies from 'js-cookie'
//将axios挂载到原型上
Vue.prototype.$cookie = Cookies
Vue.prototype.$axios = axios
// Vue.prototype.$ajax = ajax.ajax;
// Vue.prototype.$api = api;
// Vue.prototype.$utils = utils
Vue.prototype.$pagesizes=[10,15,20,25,30];

//配置全局的axios默认值（可选）
// Axios.defaults.baseURL = 'https://wx.chinaxywl.com';
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Axios.defaults.headers.post['token'] = localStorage.getItem('token');

Vue.config.productionTip = false
Vue.use(ElementUI)
// 图片浏览
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
// 富文本编辑器
// import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//excel
// import Blob from '@/excel/Blob.js'
// import Export2Excel from '@/excel/Export2Excel.js'
// import '@/styles/index.scss' // global css
// Vue.use(VueQuillEditor)
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('_UserName');
  if (!role && to.path !== '/login') {
      next('/login');
  } else if (to.meta.permission) {
      // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
      role === 'admin' ? next() : next('/403');
  } else {
      // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
      if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
          Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
              confirmButtonText: '确定'
          });
      } else {
          next();
      }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
