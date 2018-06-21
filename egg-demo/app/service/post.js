'use strict';

const Service = require('egg').Service;

class PostService extends Service {
  /*
  * 新建文章
  * @param {String} title 标题
  * @param {String} content 内容
  * @param {String} author 作者
  */
  newAndSave(title, content, author) {
    const post = new this.ctx.model.Post({
      title,
      content,
      author,
    });
    return post.save();
  }
  /*
  * 获取所有文章
  */
  queryPostsAll() {
    return this.ctx.model.Post.find({}, { content: 0 }).populate('author', { name: 1, _id: 0 }, 'User').exec();
  }
  /*
  * 获取该用户发布的所有文章
  * @param {String} id 作者ID
  */
  queryPostsByAuthor(id) {
    return this.ctx.model.Post.find({ author: id }).populate('author', { name: 1, _id: 0 }, 'User').exec();
  }
  /*
  * 根据标题模糊搜索文章
  * @param {String} title 标题
  */
  queryPostsByOpts(title) {
    const titleReg = new RegExp(title, 'i');
    return this.ctx.model.Post.find({
      $or: [
        { title: { $regex: titleReg } },
      ],
    }).populate('author', { name: 1, _id: 0 }, 'User').exec();
  }
  /*
  * 根据文章ID更新pv值并返回文章信息
  * @param {String} id 文章Id
  */
  queryPostPvAdd(id) {
    const query = { _id: id };
    const update = { $inc: { pv: 1 } };
    return this.ctx.model.Post.findByIdAndUpdate(query, update, { new: 1 }).populate('author', { name: 1, _id: 0 }, 'User').exec();
  }
  /*
  * 根据文章Id更新文章
  * @param {String} id 文章Id
  * @param {String} title 标题
  * @param {String} content 内容
  */
  updatePostById(id, title, content) {
    const update = {
      title,
      content,
      updateAt: Date.now(),
    };
    return this.ctx.model.Post.findByIdAndUpdate(id, update, { new: 1 }).populate('author', { name: 1, _id: 0 }, 'User').exec();
  }
  /*
   * 根据文章Id删除文章
   * @param {String} id 文章Id
   */
  delPostById(id) {
    return this.ctx.model.Post.remove({ _id: id }).exec();
  }
}

module.exports = PostService;
