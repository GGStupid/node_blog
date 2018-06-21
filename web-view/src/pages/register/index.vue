<template>
  <div class="register-wrap">
    <img src="../../assets/logo.png">
    <h1>注册</h1>
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
      <FormItem prop="repassword">
        <Input type="password" v-model="formInline.repassword" placeholder="再次输入密码">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" long @click="handleSubmit('formInline')">注册</Button>
        <Button type="text" @click="goLogin">去登录</Button>
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
        password: '',
        repassword: ''
      },
      ruleInline: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '请输入至少6位密码', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '请再次输入至少6位密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      if (this.formInline.password !== this.formInline.repassword) {
        return this.$Message.error('密码输入不一致')
      }
      let sendData = {
        name: this.formInline.name,
        password: this.formInline.password,
        repassword: this.formInline.repassword
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios.post('/user/register', sendData).then(res => {
            if (res.success) {
              this.$Message.success('登录成功!')
              this.$router.push('/login')
            } else {
              this.$Message.error(res.msg)
            }
          })
        } else {
          this.$Message.error('信息输入不正确')
        }
      })
    },
    goLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.register-wrap {
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
