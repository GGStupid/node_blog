const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/koa-demo')
const db = mongoose.connection
db.on('error', (e) => {
  console.log('err', e)
})
db.on('open', (e) => {
  console.log('db connect success')
})


app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
})

const Router = require('koa-router')
const router = new Router()
const tokenMid = require('./middle/tokenMid.js')
router.prefix('/koa/api')

const userController = require('./controllers/user.js')
const postController = require('./controllers/post.js')

router.post('/user/login', userController.login)
router.post('/user/register', userController.register)
router.get('/post/all', postController.getAllPosts)
router.get('/post/query/opts', postController.queryPostsByOpts)
router.get('/post/id/:id', postController.queryPostById)

router.post('/post/add', tokenMid.checkToken, postController.addPost)
router.get('/post/author/all', tokenMid.checkToken, postController.queryPostsByAuthor)
router.post('/post/update', tokenMid.checkToken, postController.updatePost)
router.post('/post/del', tokenMid.checkToken, postController.delPost)

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('server is running')
})