<template>
  <div class="login-wrap">
    <img src="../../assets/logo.png">
    <h1>登录</h1>
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <FormItem prop="name">
        <Input type="text" v-model="formInline.name" placeholder="用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="密码">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" long @click="handleSubmit('formInline')">登录</Button>
        <Button type="text" @click="goRegister">去注册</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      formInline: {
        name: '',
        password: ''
      },
      ruleInline: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '请输入至少6位密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      let sendData = {
        name: this.formInline.name,
        password: this.formInline.password
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios.post('/user/login', sendData).then(res => {
            if (res.success) {
              this.$store.dispatch('UserInfo', res.data)
              this.$Message.success('登录成功!')
              this.$router.push('/home')
            } else {
              this.$Message.error(res.msg)
            }
          })
        } else {
          this.$Message.error('信息输入不正确')
        }
      })
    },
    goRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  width: 50%;
  margin: 100px auto;
  img {
    width: 50px;
    height: 50px;
  }
  h1 {
    margin: 10px auto;
  }
}
</style>
