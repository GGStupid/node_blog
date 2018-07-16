'use strict';

const Service = require('egg').Service;
const qiniu = require('qiniu');

class UpLoadService extends Service {
  /*
  *七牛上传
  *@param {Stream} readableStream 流
  *@param {String} key 文件名
   */
  qnUpload(readableStream, key) {
    const { accessKey, secretKey, bucket } = this.config.qn_config;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const putPolicy = new qiniu.rs.PutPolicy({ scope: bucket });
    const uploadToken = putPolicy.uploadToken(mac);

    const config = new qiniu.conf.Config();
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putEatra = new qiniu.form_up.PutExtra();

    return new Promise(function(resolve, reject) {
      formUploader.putStream(uploadToken, key, readableStream, putEatra, function(respErr,
        respBody, respInfo) {
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode === 200) {
          resolve(respBody);
        } else {
          reject(respInfo.statusCode, respBody);
        }
      });
    });
  }
}

module.exports = UpLoadService;
