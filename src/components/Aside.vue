<template>
  <el-row class="tac">
    <el-col>
      <!-- default-active 当前激活的菜单 -->
      <el-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
        background-color="#001529"
        text-color="#999"
        active-text-color="#fff"
        :collapse="collapse"
      >
        <el-submenu v-for="(item,index) in menus" :key="index"  :index="`${index}+1`">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <!-- 渲染菜单的子选项 -->
          <el-menu-item v-for="(subItem,subIndex) in item.children" :key="subIndex" :index="`${index+1}-${subIndex+1}`">
            <router-link :to="subItem.src">{{subItem.name}}</router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      menus: [
        {
          icon: 'el-icon-goods',
          name: '购物商城',
          children:[
              {name:"商品管理",src:'/admin/goods-list'},
              {name:"栏目管理",src:'/admin/category-list'}
          ]
        },
        {
          icon: 'el-icon-service',
          name: '会员管理',
          children:[
              {name:"会员列表",src:'/admin/account-list'}
          ]
        },
        {
          icon: 'el-icon-tickets',
          name: '商城订单',
          children:[
              {name:"订单管理",src:'/admin/order-list'}
          ]
        }
      ]
    }
  },
  // 在单文件组件中可以用对象来声明
  props:{
      collapse:{
          type:Boolean,
          value:false  //设置默认值
      }
  }
}
</script>
<style>
.el-menu {
  border-right: none;
}
.el-menu a{
        color: inherit;
        text-decoration: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
   width: 200px;
   min-height: 400px;
}

</style>
