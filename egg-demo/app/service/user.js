'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /*
* 根据用户名查找用户
* @param {String} name 用户名
*/
  getUserByLoginName(name) {
    const query = { name };
    return this.ctx.model.User.findOne(query).exec();
  }
  /*
* 新建用户
* @param {String} name 用户名
* @param {String} password 密码
*/
  newAndSave(name, password) {
    const user = new this.ctx.model.User({
      name,
      password,
    });
    return user.save();
  }
}

module.exports = UserService;
