<template>
  <div class="read-wrap">
    <h3>{{title}}</h3>
    <div class="post-tip">
      <span>阅读量:{{pv}}</span>
      <span>作者:{{author}}</span>
    </div>
    <mavon-editor class="post-content" :ishljs="true" :boxShadow='false' :subfield="false" defaultOpen="preview" :toolbarsFlag="false" v-model="content"></mavon-editor>
  </div>
</template>

<script>
export default {
  data () {
    return {
      postId: this.$route.params.id || '',
      title: '',
      pv: 0,
      author: '',
      content: ''
    }
  },
  methods: {
    getPostById () {
      let url = `/post/id/${this.postId}`
      this.$axios.get(url).then(res => {
        if (res.success) {
          this.title = res.data.title
          this.pv = res.data.pv
          this.author = res.data.author.name
          // this.content = marked(res.data.content)
          this.content = res.data.content
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  },
  mounted () {
    this.getPostById()
  }
}
</script>
<style lang="less" scoped>
.read-wrap {
  text-align: left;
  padding: 0 50px;
  h3 {
    font-size: 26px;
  }
  .post-tip {
    margin: 10px 0;
    span {
      margin-right: 40px;
    }
  }
}
</style>
