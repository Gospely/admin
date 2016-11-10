import Vue from 'vue'
import Resource from 'vue-resource'
import NProgress from 'vue-nprogress'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import services from './services/index.js'

Vue.use(Resource)
Vue.use(NProgress)

sync(store, router)

const nprogress = new NProgress({ parent: '.nprogress-container' })

const { state } = store
const { config } = state

/* 注册notification组件 */

import Notification from 'vue-bulma-notification'
const NotificationComponent = Vue.extend(Notification)
const openNotification = (propsData = {
	title: '',
	message: '',
	type: '',
	direction: '',
	duration: 4500,
	container: '.notifications'
}) => {
	return new NotificationComponent({
	  	el: document.createElement('div'),
	  	propsData
	})
}

window.openNotification = openNotification

/* 注册cardModal组件 */

import AlertModal from './views/components/modals/CardModal'
const CardModalComponent = Vue.extend(AlertModal)

const openCardModal = (propsData = {}) => {
  return new CardModalComponent({
    el: document.createElement('div'),
    propsData
  })
}

window.openAlertModal = openCardModal

router.beforeEach((route, redirect, next) => {
  if (config.mobile && config.sidebar) {
    config.sidebar = false
  }
  next()
})
router.afterEach(function () {
  var base = "http://"+ window.location.host
  var loginUrl =base + "#/setting/login";

  if(window.location.href === loginUrl){
		console.log(loginUrl);
  }else{
		console.log(loginUrl);
    if(localStorage.getItem('token') == '' || localStorage.token == undefined) {
				openNotification({
					title: '用户登录',
					message: "请先登录",
					type: 'warning'
				});
      	window.location = window.baseUrl + "#/setting/login";
				// window.location.assign(window.baseUrl + "#/setting/login");
				return false;
    }
  }
		return false;
});


Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
window.baseUrl ="http://"+ window.location.host

if(localStorage.getItem('token') != '' && localStorage.getItem('token') != undefined) {
		Vue.http.headers.common['Authorization'] = localStorage.getItem('token');
}
const app = new Vue({
  router,
  store,
  nprogress,
  ...App,
	created () {
			window.services = services.init(this);
	}
})

export { app, router, store }
