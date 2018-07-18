'use strict';

module.exports = appInfo => {
  const config = exports = {};
  // debug 为 true 时，用于本地调试
  config.debug = true;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1529495815420_8226';

  // add your config here
  config.middleware = [ 'errorHandler', 'gzip' ];

  // 配置 gzip 中间件的配置
  config.gzip = {
    threshold: 1024, // 小于 1k 的响应体不压缩
  };

  // mongoose
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/koa-demo',
    server: { poolSize: 20 },
  };

  // jwt key
  config.jwtSecret = 'app';

  // post 403
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // qiniu
  config.qn_config = {
    accessKey: 'h09WPdx_Ps3l-WnlxeFOvyZAdTuvxoJB1iQkB7xj',
    secretKey: 'CERT3UrVvuaKLOc0K0ZiSkw_K0LWH909xX3UsmjE',
    bucket: 'test-galaxy',
    origin: 'http://owmftov3y.bkt.clouddn.com/',
  };

  config.alinode = {
    enable: true,
    appid: 'my app id',
    secret: 'my app secret',
    error_log: '',
    packages: '',
  };

  return config;
};
