<template>
  <Table :columns="columns1" :data="data1"></Table>
</template>
<script>
export default {
  data () {
    return {
      columns1: [
        {
          title: '用户名',
          key: 'title'
        },
        {
          title: '作者',
          key: 'author'
        },
        {
          title: '创建时间',
          key: 'createAt'
        },
        {
          title: '最后更新',
          key: 'updateAt'
        },
        {
          title: 'pv',
          key: 'pv'
        },
        {
          title: '操作',
          key: 'edit',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    // this.delPost(params.row._id)
                    this.async(params.row._id)
                  }
                }
              }, '删除'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.editPost(params.row._id)
                  }
                }
              }, '编辑')
            ]
            )
          }
        }
      ],
      data1: [

      ]
    }
  },
  methods: {
    getPosts () {
      this.$axios.get('/post/author/all').then(res => {
        if (res.success) {
          let arr = []
          if (!res.data) return
          res.data.forEach(item => {
            item.createAt = new Date(item.createAt).toLocaleString()
            item.updateAt = new Date(item.updateAt).toLocaleString()
            item.author = item.author.name
            arr.push(item)
          })
          this.data1 = arr
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    async (id) {
      this.$Modal.confirm({
        title: '删除文章',
        content: '<p>你确定要删除该文章吗？</p>',
        loading: true,
        onOk: () => {
          this.delPost(id)
          this.$Modal.remove()
        }
      })
    },
    delPost (id) {
      let sendData = {
        id: id
      }
      this.$axios.post('/post/del', sendData).then(res => {
        if (res.success) {
          this.$Message.success(res.msg)
          this.getPosts()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    editPost (id) {
      this.$router.push(`/home/update/post/${id}`)
    }
  },
  mounted () {
    this.getPosts()
  }
}
</script>
