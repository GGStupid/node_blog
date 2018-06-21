<template>
  <div class="home-wrap">
    <Layout>
      <Header>
        <ComHeader></ComHeader>
      </Header>
      <Content>
        <div class="content-wrap">
          <router-view/>
        </div>
      </Content>
    </Layout>
  </div>
</template>
<script>
import ComHeader from './ComHeader'
export default {
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
}
</style>
