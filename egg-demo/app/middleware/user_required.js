'use strict';

const jwt = require('jsonwebtoken');

module.exports = () => {
  return async function(ctx, next) {
    const token = ctx.get('Authorization');
    if (!token) {
      ctx.throw(ctx.throw(401, 'no Authorization in http header'));
    }
    try {
      const tokenContent = await jwt.verify(token, 'app');
      ctx.api_user = tokenContent;
    } catch (err) {
      ctx.throw(402, 'invalid token');
    }
    await next();
  };
};
