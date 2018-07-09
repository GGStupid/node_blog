
var mount_uploadify = require('uploadify')

mount_uploadify(app, {
  path: '/fileupload',
  fileKey: 'myfile',
  multer: { dest: 'uploads/' },
  callback: function (req) {
    console.log(111);
    return req.files
  }
});

module.exports = {
  async upload () {
    console.log(req)
    console.log(res)
    console.log(next)
    ctx.body = {
      code: 200,
      data: '',
      msg: '成功',
      success: true
    }
  }
}