import Vue from 'vue'
import Router from 'vue-router'

import menu from './menu'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: '主页',
      path: '/',
      component: require('../views/dashboard')
    },
    ...generateRoutesFromMenu(menu),
    {
      path: '*',
      redirect: '/'
    }
  ],
  beforeEach: ((to, from, next) => {
    alert("gfdcxs");
    if(localStorage.user == undefined || localStorage.id == undefined){
      openNotification({
        title: '用户登录',
        message: "请先登录",
        type: 'warning'
      });
      this.replace()
    }else {
      next()
      }
  }),
})
// Menu should have 2 levels.
function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (!item.component) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}
