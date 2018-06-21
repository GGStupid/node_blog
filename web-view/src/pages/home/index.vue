<template>
  <div class="home">
    <Card v-for="(item,index) in posts" :padding='0' :key="index" class="Card-wrap">
      <div class="card-item" @click.prevent="readPost(item._id) ">
        <h3>{{item.title}}</h3>
        <div>
          <span style="margin-right:40px">访问量:{{item.pv}}</span>
          <span>作者:{{item.author.name}}</span>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
export default {
  computed: {
    posts () {
      return this.$store.state.homePosts
    }
  },
  methods: {
    readPost (id) {
      this.$router.push(`/home/read/post/${id}`)
    },
    getPosts () {
      this.$axios.get('/post/query/opts').then(res => {
        if (res.success) {
          this.$store.dispatch('homePosts', res.data)
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  },
  mounted () {
    this.getPosts()
  }
}
</script>

<style lang="less" scoped>
.home {
  .Card-wrap {
    margin-bottom: 10px;
    height: 56px;
    cursor: pointer;
    .card-item {
      display: flex;
      justify-content: space-between;
      padding: 0 100px;
      text-align: left;
      padding-top: 16px;
      span {
        display: inline-block;
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
