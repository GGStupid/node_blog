<template>
  <div class="header-wrap">
    <Menu ref="menu" mode="horizontal" :theme="theme" :active-name="activeName" @on-select="selectHandle">
      <MenuItem name="1">
      <Icon type="ios-paper"></Icon>
      首页
      </MenuItem>
      <MenuItem name="2" v-if="username">
      <Icon type="ios-people"></Icon>
      文章管理
      </MenuItem>
      <Input class="search-input" v-model="search" @on-enter='searchPosts' placeholder="Enter something..." clearable></Input>
      <div class="userInfo">
        <div v-if="username">
          <Button type="primary" @click="writeArticle">写文章</Button>
          <Avatar shape="square" icon="person" />
          <span class="name">{{username}}</span>
          <Button @click="logout">退出</Button>
        </div>
        <Button v-else type="primary" @click="goLogin">登录</Button>
      </div>
    </Menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: '',
      theme: 'light',
      search: ''
    }
  },
  computed: {
    username () {
      return this.$store.state.user.name
    }
  },
  mounted () {
    this.isHomeHandle()
    this.searchPosts()
  },
  methods: {
    isHomeHandle () {
      let route = this.$route
      switch (route.path) {
        case '/home/index':
          this.activeName = '1'
          break
        case '/home/PostsManage':
          this.activeName = '2'
          break
        default:
          break
      }
    },
    selectHandle (v) {
      if (v === '1') {
        this.$router.push('/home')
        this.search = ''
        this.searchPosts()
      } else {
        this.$router.push('/home/PostsManage')
      }
    },
    writeArticle () {
      this.$refs.menu.$data.currentActiveName = ''
      this.$router.push('/home/add/post')
    },
    goLogin () {
      this.$router.push('/login')
    },
    logout () {
      window.localStorage.clear()
      this.$store.dispatch('UserLogout')
      this.$router.push('/home/index')
    },
    searchPosts () {
      let sendData = {
        title: this.search
      }
      this.$axios.get('/post/query/opts', { params: sendData }).then(res => {
        if (res.success) {
          this.$store.dispatch('homePosts', res.data)
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header-wrap {
  width: 80%;
  margin: 0 auto;
  position: relative;
  .search-input {
    position: absolute;
    right: 257px;
    top: 16px;
    width: 200px;
  }
  .userInfo {
    position: absolute;
    right: 30px;
    .name {
      font-size: 20px;
    }
  }
}
</style>
