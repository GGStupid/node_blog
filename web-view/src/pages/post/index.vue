<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="标题" prop="title">
      <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
    </FormItem>
    <FormItem label="内容" prop="content">
      <mavon-editor class="con-height" :ishljs="true" v-model="formValidate.content"></mavon-editor>
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
  methods: {
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
  },
  mounted () {
    if (this.postId) {
      this.getPostById()
    }
  }
}
</script>

<style lang="less" scoped>
.con-height {
  height: 600px;
}
</style>
