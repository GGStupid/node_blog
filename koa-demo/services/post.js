const PostModel = require('../models/post.js')
const userService = require('./user.js')

module.exports = {
  /*
  * 新建文章
  * @param {String} title 标题
  * @param {String} content 内容
  * @param {String} author 作者
  */
  newAndSave (title, content, author) {
    let post = new PostModel({
      title,
      content,
      author
    })
    return post.save()
  },
  /*
  * 获取所有文章
  */
  queryPostsAll () {
    return PostModel.find({}, { content: 0 }).populate('author', { name: 1, _id: 0 }, 'User').exec()
  },
  /*
  * 获取该用户发布的所有文章
  * @param {String} id 作者ID
  */
  queryPostsByAuthor (id) {
    return PostModel.find({ author: id }).populate('author', { name: 1, _id: 0 }, 'User').exec()
  },
  /*
  * 根据标题模糊搜索文章
  * @param {String} title 标题
  */
  queryPostsByOpts (title) {
    const titleReg = new RegExp(title, 'i')
    return PostModel.find({
      $or: [
        { title: { $regex: titleReg } },
      ]
    }).populate('author', { name: 1, _id: 0 }, 'User').exec()
  },
  /*
  * 根据文章ID更新pv值
  * @param {String} id 文章Id
  */
  queryPostPvAdd (id) {
    const query = { _id: id };
    const update = { $inc: { pv: 1 } };
    return this.ctx.model.Post.findByIdAndUpdate(query, update, { new: 1 }).populate('author', { name: 1, _id: 0 }, 'User').exec();
  },
  /*
  * 根据文章Id更新文章
  * @param {String} id 文章Id
  * @param {String} title 标题
  * @param {String} content 内容
  */
  updatePostById (id, title, content) {
    let update = {
      title: title,
      content: content,
      updateAt: Date.now()
    }
    return PostModel.findByIdAndUpdate(id, update, { new: 1 }).populate('author', { name: 1, _id: 0 }, 'User').exec()
  },
  /*
   * 根据文章Id删除文章
   * @param {String} id 文章Id
   */
  delPostById (id) {
    return PostModel.remove({ _id: id }).exec()
  }
}