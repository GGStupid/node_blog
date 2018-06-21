const UserModel = require('../models/user')

module.exports = {
  /*
* 根据用户名查找用户
* @param {String} name 用户名
*/
  getUserByLoginName (name) {
    const query = { name };
    return UserModel.findOne(query).exec();
  },
  /*
  * 根据用户Id查找用户
  * @param {String} id id
  */
  getUserById (id) {
    if (!id) {
      return null;
    }
    return UserModel.findOne({ _id: id }).exec();
  },
  /*
  * 新建用户
  * @param {String} name 用户名
  * @param {String} password 密码
  */
  newAndSave (name, password) {
    const user = new UserModel({
      name,
      password,
    });
    return user.save();
  }
}