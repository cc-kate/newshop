<template>
  <el-form
    ref="form"
    :model="form"
    label-width="80px"
  >

    <el-form-item label="所属类别">
      <el-select
        v-model="form.category_id"
        placeholder="请选择所属类别"
      >
        <el-option
          v-for="(item,index) in categories"
          :key="index"
          :label="item.title"
          :value="item.category_id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="是否发布">
      <el-switch v-model="form.status"></el-switch>
    </el-form-item>

    <el-form-item label="推荐类型">
      <el-checkbox
        label="置顶"
        v-model="form.is_top"
      ></el-checkbox>
      <el-checkbox
        label="热门"
        v-model="form.is_hot"
      ></el-checkbox>
    </el-form-item>

    <el-form-item label="内容标题">
      <el-input
        v-model="form.title"
        style="width:70%"
      ></el-input>
    </el-form-item>
    <el-form-item label="副标题">
      <el-input
        v-model="form.sub_title"
        style="width:70%"
      ></el-input>
    </el-form-item>

    <el-form-item label="封面图片">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="imageUrl"
          :src="imageUrl"
          class="avatar"
        >
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        ></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
      <el-input
        v-model="form.goods_no"
        style="width:40%"
      ></el-input>
    </el-form-item>

    <el-form-item label="库存数量">
      <el-input
        v-model="form.stock_quantity"
        style="width:40%"
      ></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
      <el-input
        v-model="form.market_price"
        style="width:40%"
      ></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
      <el-input
        v-model="form.sell_price"
        style="width:40%"
      ></el-input>
    </el-form-item>

    <el-form-item label="图片相册">
      <div>
        <el-upload
          action="http://localhost:8899/admin/article/uploadimg"
          list-type="picture-card"
          :file-list="form.fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlePictureCardSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img
            width="100%"
            :src="dialogImageUrl"
            alt=""
          >
        </el-dialog>
      </div>
    </el-form-item>

    <el-form-item label="内容摘要">
      <el-input
        type="textarea"
        v-model="form.zhaiyao"
        style="width:70%"
      >
      </el-input>
    </el-form-item>

    <el-form-item label="内容描述">
      <quillEditor v-model="form.content"></quillEditor>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        @click="onSubmit"
      >保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// 引入富文本框样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  data() {
    return {
      form: {
        category_id: '',
        status: false,
        is_top: false,
        is_hot: false,
        title: '',
        sub_title: '',
        imgList: [],
        goods_no: '',
        stock_quantity: '',
        market_price: '',
        sell_price: '',
        fileList: [],
        zhaiyao: '',
        content: '',
        is_slide: false
      },
      // 封面图片
      imageUrl: '',
      // 图片相册
      dialogImageUrl: '',
      dialogVisible: false,
      categories: []
    }
  },
  components: {
    quillEditor
  },
  methods: {
    onSubmit() {
      this.$axios({
        url: `/admin/goods/edit/${this.$route.params.id}`,
        method: 'POST',
        data: this.form,
        withCredentials: true
      }).then(res => {
        const { status, message } = res.data
        if (status == 0) {
          this.$message({
            message,
            type: 'success'
          })
          this.$router.back()
        }
      })
    },
    // 上传封面图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.imgList = [res]
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    // 上传图片相册
    handleRemove(file, fileList) {
      this.form.fileList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePictureCardSuccess(res) {
      this.form.fileList.push(res)
      //   console.log(this.form.fileList)
    },
  },
  mounted() {
    // 获取 “购物商城” 频道中的分类数据
    this.$axios({
      url: '/admin/category/getlist/goods',
      withCredentials: true
    }).then(res => {
      if (res.data.status == 0) {
        const { message } = res.data
        this.categories = message
      }
    })

    // 根据id获取商品数据
    const { id } = this.$route.params
    this.$axios({
      url: `/admin/goods/getgoodsmodel/${id}`,
      withCredentials: true
    }).then(res => {
      console.log(res);
      const { message } = res.data;
      this.form = {
        ...message,
        fileList: message.fileList.map(v => {
          return {
            ...v,
            url: "http://127.0.0.1:8899" + v.shorturl
          }
        })
      };


      this.imageUrl = message.imgList[0].url
      console.log(this.form);

    })
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
