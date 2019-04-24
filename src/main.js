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

// 3.全局注册组件
Vue.use(ElementUI)
// 注册路由
Vue.use(VueRouter)

// 配置路由
const routes = [
  {path:'/login',component:Login}
]
// 创建路由对象
const router = new VueRouter({routes})

Vue.config.productionTip = false

// 把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios

new Vue({
  router,  //挂载到根实例上
  render: h => h(App),
}).$mount('#app')
