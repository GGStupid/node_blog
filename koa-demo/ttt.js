const validator = require('validator')
const bcrypt = require('bcrypt')

let a = ' ddd '
let b = validator.trim(a)
console.log(a)
console.log(b)

let c = bcrypt.hashSync(b, 10);
let d = bcrypt.compareSync('ddd', c);
console.log(c, d)

const Koa = require('koa');
const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log('X-Response-Time', `${ms}ms`)
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

app.use(async ctx => {
  console.log('Hello World')
  ctx.body = 'Hello World';
});

app.listen(4000);