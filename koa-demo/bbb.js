const path = require('path')
const os = require('os')
const fs = require('fs')
//文件上传操作原理模拟
var tmpath = path.join(os.tmpdir(), '1.txt'); //模拟上传到临时目录的文件
console.log(tmpath);
var ext = ".txt"; //上传后生成文件的后缀，一般和上传的文件后缀一致
var ph = path.join('/Users/gg_stupid/personProjects/node/node-koa-egg-vue/koa-demo', Date.parse(new Date()).toString() + ext); //生成新的上传文件路径全称
console.log(ph);
var stream = fs.createWriteStream(ph); //创建一个可写流
fs.createReadStream(tmpath).pipe(stream); //可读流通过管道写入可写流
