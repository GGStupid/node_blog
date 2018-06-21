const jwt = require('jsonwebtoken')

module.exports = {
  createToekn (id) {
    const token = jwt.sign({ id }, 'app', { expiresIn: '30d' })
    return token
  },
  async  checkToken (ctx, next) {
    const token = ctx.get('Authorization')
    if (!token) {
      ctx.throw(ctx.throw(401, 'no Authorization in http header'))
    }
    try {
      let tokenContent = await jwt.verify(token, 'app')
      ctx.api_user = tokenContent;
    } catch (err) {
      ctx.throw(402, 'invalid token')
    }
    await next()
  }
} 