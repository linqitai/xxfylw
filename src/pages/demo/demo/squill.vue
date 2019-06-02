<style lang="scss" scoped>
.apply{
  .operateTableBox{

  }
}
</style>
<template>
  <div class="apply" ref="apply">
    <div class="breadcrumbWrapper">
      <div class="breadcrumb">
        <i class="iconfont icon-home iconhomestyle nocurrent"></i>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }"><span class="nocurrent">首页</span></el-breadcrumb-item>
          <el-breadcrumb-item><span class="nocurrent">表单管理</span></el-breadcrumb-item>
          <el-breadcrumb-item><span>富文本</span></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="operateTableBox">
     	  <!-- 图片上传组件辅助:headers="header"-->
        <el-upload
          class="avatar-uploader"
          :action="serverUrl"
          name="img"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :before-upload="beforeUpload">
        </el-upload>
        <el-row v-loading="quillUpdateImg">
	        <quill-editor
            v-model="detailContent"
            ref="myQuillEditor"
            :options="editorOption"
	        >
        </quill-editor>
       </el-row>
    </div>
  </div>
</template>
<script>
// import { ERR_OK } from '@/api/index'
// import { getFullDate } from '@/common/js/utils'
import {imgUploadUrl,ERR_OK} from "@/api/index"
// import searchCondition from '@/components/searchCondition.vue'
            // @change="onEditorChange($event)"
            // @ready="onEditorReady($event)"
import {quillEditor} from 'vue-quill-editor'
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
]
export default {
	components: {quillEditor},
  data() {
    return {
      serverUrl: imgUploadUrl,  // 这里写你要上传的图片服务器地址
      // header: {token: localStorage.getItem('token')},  // 有的图片服务器要求请求头需要有token  
			quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画
			detailContent: '', // 富文本内容
			// 工具栏配置
      editorOption: {
          placeholder: '',
          theme: 'snow',  // or 'bubble'
          modules: {
              toolbar: {
                  container: toolbarOptions,  // 工具栏
                  handlers: {
                      'image': function (value) {
                          if (value) {
                              // document.querySelector('#quill-upload input').click()
                              // 触发input框选择图片文件
                              document.querySelector('.avatar-uploader input').click()
                              // alert(1)
                          } else {
                              this.quill.format('image', false);
                          }
                      }
                  }
              }
          }
      }
    }
  },
  created() {
    // this.getList()
  },
  // components: {
  //   searchCondition
  // },
  methods: {
    // 上传图片前
    beforeUpload(res, file) {
    	// 显示loading动画
      this.quillUpdateImg = true
    },
    // 上传图片成功
    uploadSuccess(res, file) {
    	// res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      if (res.code == ERR_OK) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res.info为服务器返回的图片地址
          quill.insertEmbed(length, 'image', res.data[0].url)
          // 调整光标到最后
          quill.setSelection(length + 1)
      } else {
          this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.quillUpdateImg = false
    },
    // 上传图片失败
    uploadError(res, file) {
    	// loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
    }
  }
}
</script>