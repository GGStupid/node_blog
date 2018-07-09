'use strict';
const Controller = require('egg').Controller;
const path = require('path');

class UpLoadController extends Controller {
  async upLoadImg() {
    const { ctx, service, config } = this;
    const stream = await ctx.getFileStream();
    const filename = Date.now() + path.extname(stream.filename).toLocaleLowerCase();
    const resulet = await service.upload.qnUpload(stream, filename);
    const imgUrl = config.qn_config.origin + resulet.key;
    ctx.body = {
      code: 200,
      data: { imgUrl },
      msg: '成功',
      success: true,
    };
  }
}

module.exports = UpLoadController;
