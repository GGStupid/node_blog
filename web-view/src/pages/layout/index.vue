<template>
  <div class="home-wrap">
    <Layout>
      <Header>
        <ComHeader></ComHeader>
      </Header>
      <Content>
        <div class="content-wrap">
          <router-view />
        </div>
        <div class="back-top" v-show="showBackTop" @click="goTop">
          <Icon type="chevron-up" color='#fff' :size='30'></Icon>
        </div>
      </Content>
    </Layout>
  </div>
</template>
<script>
import ComHeader from './ComHeader'
export default {
  data () {
    return {
      showBackTop: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    goTop () {
      document.querySelector('html').scrollTop = 0
    },
    handleScroll () {
      let that = this
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop <= 200) {
        that.showBackTop = false
      } else {
        that.showBackTop = true
      }
    }
  },
  components: {
    ComHeader
  }
}
</script>

<style lang="less" scoped>
.home-wrap {
  .ivu-layout {
    background-color: #fff;
  }
  .ivu-layout-header {
    background-color: #fff;
  }
  .ivu-layout-content {
    background-color: #fff;
  }
  .content-wrap {
    width: 70%;
    margin: 0 auto;
    padding-top: 30px;
  }
  .ivu-layout-footer {
    background-color: #fff;
  }
  .back-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 8px 12px;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
  }
}
</style>
