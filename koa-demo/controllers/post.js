const postService = require('../services/post.js')

module.exports = {
  /*
  * 新建文章
  * @param  {String} title 标题
  * @param  {String} content 内容
  * @param  {String} id 作者id
  * @return {object} post 文章
  */
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
  /*
  * 获取所有用户文章
  * @return {array} posts 文章数组
  */
  async getAllPosts (ctx) {
    const posts = await postService.queryPostsAll()
    ctx.body = {
      code: 200,
      data: posts,
      msg: '成功',
      success: true
    }
  },
  /*
  * 根据文章ID获取文章信息并更新pv
  * @param  {String} id id
  * @return {object}  post 文章
  */
  async queryPostPvAdd (ctx) {
    const id = ctx.params.id
    const post = await postService.queryPostPvAdd(id)
    ctx.body = {
      code: 200,
      data: post,
      msg: '成功',
      success: true
    }
  },
  /*
  * 根据文章ID获取文章信息并更新pv
  * @param  {String} id id
  * @return {object}  post 文章
  */
  async queryPostById (ctx) {
    const id = ctx.params.id
    const post = await postService.queryPostById(id)
    ctx.body = {
      code: 200,
      data: post,
      msg: '成功',
      success: true
    }
  },
  /*
  * 查找登录用户的所有文章
  * @param  {String} id 用户id
  * @return {arrary} posts 文章数组
  */
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
  /*
  * 根据文章标题模糊搜索文章
  * @param  {String} title 标题
  * @return {array} posts 文章数组
  */
  async queryPostsByOpts (ctx) {
    const { title } = ctx.query
    const posts = await postService.queryPostsByOpts(title)
    ctx.body = {
      code: 200,
      data: posts,
      msg: '成功',
      success: true
    }
  },
  /*
  * 更新登录用户的文章
  * @param  {String} id 用户id
  * @param {String} title 文章标题
  * @param {String} content 文章内容
  * @return {object} post 文章
  */
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
  /*
  * 删除登录用户的文章
  * @param  {String} id 用户id
  * @return {object} data 删除信息
  */
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