<template>
  <div>
    <!-- 列表顶部 -->
    <el-row
      type="flex"
      justify="space-between"
      align="middle"
      class="toolTip">
      <el-col>
        <el-button @click="$router.push('/admin/goods-add')">新增</el-button>
        <el-button @click="handleMoreDel">删除</el-button>
      </el-col>
      <div>
        <el-input
          placeholder="请输入内容"
          class="input-with-select" 
          v-model="searchvalue">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch"></el-button>
        </el-input>
      </div>
    </el-row>
    <!-- 商品列表 -->
    <!-- data 是一个数组，表格中的数据   @selection-change 当复选框发生变化时触发-->
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <!-- 允许多选 也可单选 -->
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        label="标题"
        width="240">
        <template slot-scope="scope">
          <el-row
            type="flex"
            align="middle"
          >
            <img
              :src="scope.row.imgurl"
              class="goods-img"
            >
            <p class="goods-title">{{scope.row.title}}</p>
          </el-row>
        </template>
      </el-table-column>
      <!-- prop展示数据 -->
      <el-table-column
        prop="categoryname"
        label="类型"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="market_price"
        label="价格"
        width="180"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalcount">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      ids:[],
      totalcount:0,
      pageIndex:1,
      pageSize:5,
      searchvalue:''
    }
  },
  methods: {
    // 封装获取列表的数据
    getList(){
        this.$axios({
            url: `/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${this.searchvalue}`
        }).then(res => {
            const { message,totalcount } = res.data
            this.tableData = message
            this.totalcount = totalcount
        })
      },
    // 编辑数据
    handleEdit(row) {
      console.log(row);
      this.$router.push(`/admin/goods-edit/${row.id}`)
    },
    // 删除单行数据
    handleDelete(row) {
      // 获取商品对象 id
      const id = row.id
      // 询问是否删除
      this.$confirm('确认删除？').then(()=> {
        // 点击确认 按钮 触发
        // 调用删除数据的借口
        this.$axios({
          url: `/admin/goods/del/${id}`,
          withCredentials: true //每次发请求都要配置的参数 跨域
        }).then(res => {
            const {status,message} = res.data
            // 如果删除成功
          if (status == 0) {
            // 给出提示
              this.$message({
                  type:"success",
                  message
              })
              // 删除完立即刷新数据列表 重新渲染
              this.getList()
          }
        })
      })
    },
    // 批量删除
    handleMoreDel(){
      // 参数要求用,隔开
        const id = this.ids.join(',')
        this.$confirm('确认删除？').then(()=> {
        this.$axios({
          url: `/admin/goods/del/${id}`,
          withCredentials: true
        }).then(res => {
            const {status,message} = res.data
          if (status == 0) {
              this.$message({
                  type:"success",
                  message
              })
              this.getList()
          }
        })
      })
    },
    // 复选框发生变化时触发
    handleSelectionChange(val) {
        const ids =val.map(v=>{
            return v.id
        })
        this.ids = ids
    },

    // 分页功能
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageIndex=val
      this.getList()
    },
    // 搜索功能
    handleSearch(){
      this.getList()
    }
  },
  mounted() {
    // 组件加载后 获取数据渲染
    this.getList()
  }
}
</script>

<style>
.toolTip {
  margin-bottom: 20px;
}
.input-with-select {
  width: 300px;
}
.goods-img {
  width: 60px;
  margin-right: 10px;
}
.goods-title {
  font-size: 12px;
}
.el-pagination{
  margin-top:20px;
}
</style>
