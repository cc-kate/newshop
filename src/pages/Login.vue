<template>
<!-- el-row 可以实现flex效果 -->
  <el-row
    type="flex"
    justify="center">
    <!-- model表示整个表单的数据绑定到data的哪个数据上 -->
    <!-- rules 表单认证规则 -->
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="form">
      <div class="title">登录</div>
      <!-- prop 指定认证规则 -->
      <el-form-item label="账号" prop="uname">
        <el-input v-model="form.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="upwd">
        <el-input
          v-model="form.upwd"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>


<script>
export default {
  data() {
    return {
      form: {
        uname: "",
        upwd: ""
      },
      // 表单的验证规则
      rules:{
        // 多条规则，不同状态下触发 required是否必填 trigger触发条件
        uname:[
          {required: true, message: '请输入账号', trigger: 'blur' }
        ],
        upwd:[
          {required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录提交
    onSubmit() {
      // 找到表单元素 调用表单的验证方法
      this.$refs.form.validate(valid=>{
        // 验证不通过时直接返回
        if(!valid) return
      })

      // 验证成功后 发送请求
       this.$axios({
        url:'/admin/account/login',
        method:'POST',
        data:this.form,
        // 处理跨域请求的参数
        withCredentials: true
      }).then(res=>{
        // 对象解构
        const {status,message} = res.data
        // 判断是否登录成功
        if(status==0){
          // 把用户信息 保存到本地
          localStorage.setItem('username',message.uname)
          localStorage.setItem('realname',message.realname)
          // 登录成功后跳转到首页
          this.$router.push('/admin')
        }else{
          this.$message.error(message);
        }
      })
    }
  }
};
</script>

<style scoped>
.form {
  width: 350px;
  margin-top: 10%;
}
.title {
  text-align: center;
  margin-bottom: 30px;
}
</style>
