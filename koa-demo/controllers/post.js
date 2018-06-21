const postService = require('../services/post.js')

module.exports = {
  async addPost (ctx) {
    const token = ctx.get('Authorization')
    let id = ctx.api_user.id
    const { title, content } = ctx.request.body
    const post = await postService.newAndSave(title, content, id)
    ctx.body = {
      code: 200,
      data: post,
      msg: '成功',
      success: true
    }
  },
  async getAllPosts (ctx) {
    const posts = await postService.queryPostsAll()
    ctx.body = {
      code: 200,
      data: posts,
      msg: '成功',
      success: true
    }
  },
  async queryPostById (ctx) {
    const id = ctx.params.id
    await postService.postPvAdd(id)
    const post = await postService.queryPostById(id)
    ctx.body = {
      code: 200,
      data: post,
      msg: '成功',
      success: true
    }
  },
  async queryPostsByAuthor (ctx) {
    const token = ctx.get('Authorization')
    let id = ctx.api_user.id
    const posts = await postService.queryPostsByAuthor(id)
    ctx.body = {
      code: 200,
      data: posts,
      msg: '成功',
      success: true
    }
  },
  async queryPostsByOpts (ctx) {
    const { title, startTime, endTime } = ctx.query
    let post
    if (title) {
      post = await postService.queryPostsByOpts(title)
    } else {
      post = await postService.queryPostsAll()
    }
    ctx.body = {
      code: 200,
      data: post,
      msg: '成功',
      success: true
    }
  },
  async updatePost (ctx) {
    const { id, title, content } = ctx.request.body
    const post = await postService.updatePostById(id, title, content)
    ctx.body = {
      code: 200,
      data: post,
      msg: '成功',
      success: true
    }
  },
  async delPost (ctx) {
    const { id } = ctx.request.body
    const data = await postService.delPostById(id)
    ctx.body = {
      code: 200,
      data: data,
      msg: '成功',
      success: true
    }
  }
}