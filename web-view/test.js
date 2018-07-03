'use strict';
// const cp = require('child_process');
// cp.exec('npm run build:egg', function (e, stdout, stderr) {
//   if (!e) {
//     console.log('stdout:', stdout);
//     console.log('stderr:', stderr);
//   }
// });
// cp.exec('ls -l', function (e, stdout, stderr) {
//   if (!e) {
//     console.log('stdout:', stdout);
//     console.log('stderr:', stderr);
//   }
// });

// var options = {
//   encoding: 'utf8',
//   timeout: 0,
//   maxBuffer: 200 * 1024,
//   killSignal: 'SIGTERM',
//   setsid: false,
//   cwd: null,
//   env: null
// };

// var cp = require('child_process');
// cp.exec('ls -l', options, function (e, stdout, stderr) {
//   if (!e) {
//     console.log('stdout:', stdout);
//     console.log('stderr:', stderr);
//   }
// })

var cp = require('child_process');
var cat = cp.spawn('cat');
cat.stdout.on('data', function (d) {
  console.log(d.toString());
});
cat.on('exit', function () {
  console.log('kthxbai');
});
cat.stdin.write('meow');
cat.stdin.end();

