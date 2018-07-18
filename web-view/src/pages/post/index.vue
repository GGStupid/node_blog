<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="标题" prop="title">
      <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
    </FormItem>
    <FormItem label="内容" prop="content">
      <mavon-editor class="con-height" ref='md' :ishljs="true" v-model="formValidate.content" @imgAdd="$imgAdd"></mavon-editor>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>

<script>
export default {
  data () {
    return {
      postId: this.$route.params.id || '',
      formValidate: {
        title: '',
        content: ''
      },
      ruleValidate: {
        title: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    if (this.postId) {
      this.getPostById()
    }
  },
  watch: {
    $route () {
      this.postId = ''
      this.formValidate.title = ''
      this.formValidate.content = ''
    }
  },
  methods: {
    // 绑定@imgAdd event
    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      this.$axios({
        url: '/upload/file',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(res => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
        * $vm 指为mavonEditor实例，可以通过如下两种方式获取
        * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
        * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
        */
        if (res.success) {
          this.$refs.md.$img2Url(pos, res.data.imgUrl)
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let sendData = {
            id: this.postId,
            title: this.formValidate.title,
            content: this.formValidate.content
          }
          let url = this.postId ? '/post/update' : '/post/add'
          this.$axios.post(url, sendData).then(res => {
            if (res.success) {
              this.$Message.success('保存成功!')
              this.$router.push('/home/index')
            } else {
              this.$Message.error(res.msg)
            }
          })
        } else {
          this.$Message.error('请输入完整信息')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    getPostById () {
      let url = `/post/id/${this.postId}`
      this.$axios.get(url).then(res => {
        if (res.success) {
          this.formValidate.title = res.data.title
          this.formValidate.content = res.data.content
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.con-height {
  height: 600px;
}
</style>
