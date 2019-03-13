const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const initLoggerMiddleWare = require('./middleware/LoggerMiddle')
// 数据路连接测试
const {connectTest} =  require('./sql')
connectTest()
// 路由部分
const router = require('./routes/index')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
// =======> 日志中间件  <========
initLoggerMiddleWare(app)
// =======> 路由注册中间件  <========
app.use(router.routes(), router.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
