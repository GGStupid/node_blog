'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Controller = require('egg').Controller;

class UserController extends Controller {
  /*
   * 登录
   * @param  {String} name 登录名
   * @param  {String} password 登录密码
   * return  {Object} data 用户名和token
   */
  async login() {
    const { ctx, service, config } = this;
    const { name, password } = ctx.request.body;
    if (!name || !password) {
      ctx.body = {
        code: 401,
        data: '',
        msg: '请输入用户名和密码',
        success: false,
      };
      return;
    }
    const user = await service.user.getUserByLoginName(name);
    if (user) {
      const isEqual = bcrypt.compareSync(password, user.password);
      if (isEqual) {
        const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '30d' });
        ctx.body = {
          code: 200,
          data: {
            token,
            name: user.name,
          },
          msg: '成功',
          success: true,
        };
        return;
      }
      ctx.body = {
        code: 401,
        data: '',
        msg: '登录失败',
        success: false,
      };
      return;
    }
    ctx.body = {
      code: 401,
      data: '',
      msg: '账号或密码错误',
      success: false,
    };
  }
  /*
   * 注册
   * @param  {String} name 登录名
   * @param  {String} password 登录密码
   * return  {String} data 注册信息
   */
  async register() {
    const { ctx, service } = this;
    let { name, password, repassword } = ctx.request.body;
    if (password !== repassword) {
      ctx.body = {
        code: 400,
        data: '',
        msg: '密码不一致',
        success: false,
      };
    }
    const user = await service.user.getUserByLoginName(name);
    if (user && user.name === name) {
      ctx.body = {
        code: 401,
        data: '',
        msg: '用户名已存在',
        success: false,
      };
    }
    password = bcrypt.hashSync(password, 10);
    await service.user.newAndSave(name, password);
    ctx.body = {
      code: 200,
      data: '注册成功',
      msg: '成功',
      success: true,
    };
  }
}

module.exports = UserController;
