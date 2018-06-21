const validator = require('validator')
const bcrypt = require('bcrypt')
const userService = require('../services/user.js')
const tokenMid = require('../middle/tokenMid.js')

module.exports = {
  /*
   * 登录
   * @param  {String} name 登录名
   * @param  {String} password 登录密码
   * return  {Object} data 用户名和token
   */
  async login (ctx) {
    const { name, password } = ctx.request.body
    if (!name || !password) {
      return ctx.body = {
        code: 401,
        data: "",
        msg: '请输入用户名和密码',
        success: false
      }
    }
    const user = await userService.getUserByLoginName(name)
    if (user) {
      const isEqual = bcrypt.compareSync(password, user.password)
      if (isEqual) {
        let token = tokenMid.createToekn(user._id)
        return ctx.body = {
          code: 200,
          data: {
            token,
            name: user.name
          },
          msg: '成功',
          success: true
        }
      } else {
        return ctx.body = {
          code: 401,
          data: '',
          msg: '登录失败',
          success: false
        }
      }
    } else {
      ctx.body = {
        code: 401,
        data: '',
        msg: '账号或密码错误',
        success: false
      }
    }
  },
  /*
   * 注册
   * @param  {String} name 登录名
   * @param  {String} password 登录密码
   * @param  {String} repassword 二次密码
   * return  {String} data 注册信息
   */
  async register (ctx) {
    let name = ctx.request.body.name
    let password = ctx.request.body.password
    let repassword = ctx.request.body.repassword
    if (password !== repassword) {
      return ctx.body = {
        code: 400,
        data: '',
        msg: '密码不一致',
        success: false
      }
    }

    let user = await userService.getUserByLoginName(name)
    if (user && user.name === name) {
      return ctx.body = {
        code: 401,
        data: '',
        msg: '用户名已存在',
        success: false
      }
    }
    password = bcrypt.hashSync(password, 10)
    await userService.newAndSave(name, password)
    return ctx.body = {
      code: 200,
      data: '注册成功',
      msg: '成功',
      success: true
    }
  }
}
