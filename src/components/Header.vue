<template>
  <el-row type="flex" justify="space-between" align="middle">
      <i class="el-icon-back" @click="handleClick"></i>
      <div class="user-info">{{username}} {{realname}} <span @click="handleLogout">退出</span></div>
  </el-row>
</template>

<script>
export default {
    data(){
        return{
            username:'',
            realname:''
        }
    },
    methods:{
        handleClick:function(){
        // 主动触发传递过来的左侧栏收缩展开事件
            this.$emit('updateCollapse')
        },
        // 用户退出登录
        handleLogout:function(){
            this.$axios({
                url:'/admin/account/logout',
                withCredentials: true
            }).then(res=>{
                // 退出成功
                if(res.data.status === 0){
                    // 先清除本地存储的数据
                    localStorage.removeItem('username')
                    localStorage.removeItem('realname')
                    // 再跳转到登录页  push不是最优的方案，点击浏览器返回按钮时，即使没有登录也会回到后台首页
                    // replace 则是直接替换掉当前的页面
                     this.$router.replace('/login')
                }
            })
        }
    },
    // 组件加载完成后触发
    mounted(){
        // 从本地存储获取到用户信息 并赋值给data数据
        this.username = localStorage.getItem('username')
        this.realname = localStorage.getItem('realname')
    }
}
</script>

<style>
.el-icon-back{
    cursor: pointer;
}
.user-info span{
    cursor: pointer;
}
</style>
