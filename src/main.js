import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import VueRouter from 'vue-router'

// 1.引入element-ui
import ElementUI from 'element-ui'
// 2.引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css'

// 导入组件
import Login from './pages/Login.vue'
import Admin from './pages/Admin.vue'
import GoodsList from './pages/GoodsList.vue'
import GoodsAdd from './pages/GoodsAdd.vue'
import GoodsEdit from './pages/GoodsEdit.vue'

// 3.注册组件
Vue.use(ElementUI)
// 注册路由
Vue.use(VueRouter)

// 配置路由
const routes = [
  {path:'/',redirect:"/admin"},
  {path:'/login',component:Login,meta:"登录"}, //登录页
  //管理后台首页
  {path:'/admin',component:Admin,meta:"后台管理",children:[
    {path:'goods-list',component:GoodsList,meta:"商品管理"}, //子页面
    {path:'goods-add',component:GoodsAdd,meta:"添加商品"},
    {path:'goods-edit/:id',component:GoodsEdit,meta:"编辑商品"},
  ]}
]
// 创建路由对象
const router = new VueRouter({routes})

// 路由拦截器 判断用户是否登录
// beforeEach 是每个页面组件加载之前执行  next如果不执行页面就不会加载
router.beforeEach((to, from, next) => {
  // 判断如果要去登录页
  if(to.path =='/login'){
    // 如果访问的是登录页且已经是登录状态，就跳转到首页
    if(localStorage.getItem("username")){
    return next('/admin')
    }else{
    return next()
    }
  }

  // 如果没有登录
  if(!localStorage.getItem("username")){
    next('/login') //跳转到登录页
  }else{
    next()  //否则继续
  }

})

// 是否是生产环境
Vue.config.productionTip = false

// 把axios绑定到原型 vue实例 ，每个组件都可以通过this.$axios可以访问到
Vue.prototype.$axios = axios
// 每次发送axios请求的时候都会自动加上这段路径
axios.defaults.baseURL="http://localhost:8899"

new Vue({
  router,  //挂载到根实例上
  render: h => h(App),
}).$mount('#app')
