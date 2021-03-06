'use strict';
const Controller = require('egg').Controller;

class PostController extends Controller {
  /*
* 获取所有用户文章
* @return {array} posts 文章数组
*/
  async getAllPosts() {
    const { ctx, service } = this;
    const posts = await service.post.queryPostsAll();
    ctx.body = {
      code: 200,
      data: posts,
      msg: '成功',
      success: true,
    };
  }
  /*
* 根据文章ID获取文章信息并更新pv
* @param  {String} id id
* @return {object}  post 文章
*/
  async queryPostPvAdd() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const post = await service.post.queryPostPvAdd(id);
    ctx.body = {
      code: 200,
      data: post,
      msg: '成功',
      success: true,
    };
  }
  /*
* 根据文章ID获取文章信息
* @param  {String} id id
* @return {object}  post 文章
*/
  async queryPostById() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const post = await service.post.queryPostById(id);
    ctx.body = {
      code: 200,
      data: post,
      msg: '成功',
      success: true,
    };
  }
  /*
* 根据文章标题模糊搜索文章
* @param  {String} title 标题
* @return {array} posts 文章数组
*/
  async queryPostsByOpts() {
    const { ctx, service } = this;
    const { title } = ctx.query;
    let post;
    if (title) {
      post = await service.post.queryPostsByOpts(title);
    } else {
      post = await service.post.queryPostsAll();
    }
    ctx.body = {
      code: 200,
      data: post,
      msg: '成功',
      success: true,
    };
  }
  /*
* 新建文章
* @param  {String} title 标题
* @param  {String} content 内容
* @param  {String} id 作者id
* @return {object} post 文章
*/
  async addPost() {
    const { ctx, service } = this;
    const id = ctx.api_user.id;
    const { title, content } = ctx.request.body;
    const post = await service.post.newAndSave(title, content, id);
    ctx.body = {
      code: 200,
      data: post,
      msg: '成功',
      success: true,
    };
  }
  /*
* 查找登录用户的所有文章
* @param  {String} id 用户id
* @return {arrary} posts 文章数组
*/
  async queryPostsByAuthor() {
    const { ctx, service } = this;
    const id = ctx.api_user.id;
    const posts = await service.post.queryPostsByAuthor(id);
    ctx.body = {
      code: 200,
      data: posts,
      msg: '成功',
      success: true,
    };
  }
  /*
* 更新登录用户的文章
* @param  {String} id 用户id
* @param {String} title 文章标题
* @param {String} content 文章内容
* @return {object} post 文章
*/
  async updatePost() {
    const { ctx, service } = this;
    const { id, title, content } = ctx.request.body;
    const post = await service.post.updatePostById(id, title, content);
    ctx.body = {
      code: 200,
      data: post,
      msg: '成功',
      success: true,
    };
  }
  /*
* 删除登录用户的文章
* @param  {String} id 用户id
* @return {object} data 删除信息
*/
  async delPost() {
    const { ctx, service } = this;
    const { id } = ctx.request.body;
    const data = await service.post.delPostById(id);
    ctx.body = {
      code: 200,
      data,
      msg: '成功',
      success: true,
    };
  }
}

module.exports = PostController;
