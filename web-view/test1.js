const fs = require('fs')

let readable = fs.createReadStream('test1.js', {
  flags: 'r',
  encoding: 'utf8',
  autoClose: true,
  mode: 0666
})

readable.on('open', function (fd) {
  console.log('file was opened, fd - ', fd)
})

readable.on('readable', function () {
  console.log('received readable')
})

readable.on('data', function (chunk) {
  console.log('read %d bytes:%s', chunk.length, chunk)
})

readable.on('end', function () {
  console.log('read end')
})

readable.on('close', function () {
  console.log('file was closed')
})

readable.on('error', function (err) {
  console.log('error occured:%s', err.message)
})