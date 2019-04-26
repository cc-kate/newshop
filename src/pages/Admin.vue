<template>
  <div class="page-container">
    <el-container>
      <el-aside width="">
        <!-- 侧边栏组件 -->
        <!-- collapse自定义属性 子父传值 -->
        <Aside :collapse="isCollapse"></Aside>
      </el-aside>
      <el-container>
        <!-- 头部组件 -->
        <el-header>
          <!-- 传递事件 -->
          <Header @updateCollapse="updateCollapse"></Header>
        </el-header>
        <el-main>
          <!-- 面包屑组件 -->
          <!-- <div>{{routerInfo.join(' > ')}}</div> -->
          <!-- separator-class 分隔符 字体图标 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in routerInfo" :key="index">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>

          <!-- 展示子页面 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 导入组件
import Aside from "../components/Aside.vue"
import Header from "../components/Header.vue"

export default {
  data() {
    return {
      isCollapse: false
    }
  },
  // 注册组件
  components: {
    Aside,
    Header
  },
  methods: {
    updateCollapse: function () {
      this.isCollapse = !this.isCollapse
    }
  },
  computed: {
    // 监听路由的变化，返回meta
    routerInfo() {
      // map 遍历 返回值取决于return  返回新数组
      const arr = this.$route.matched.map(v => {
        return v.meta
      })
      return arr
    }
  }
}
</script>

<style>
.el-header {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #001529;
  position: relative;
}

.el-main {
  background-color: #e9eef3;
}
.el-breadcrumb {
    border-bottom:1px solid #ccc;
    padding:10px 0 15px;
}

.page-container > .el-container {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}
</style>