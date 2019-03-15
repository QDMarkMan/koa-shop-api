const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const ctxErrorHandle = require('./middleware/Error')
const initLoggerMiddleWare = require('./middleware/LoggerMiddle')
const initSessionStore = require('./middleware/SessionInit')
const sessionPassport = require('./middleware/Passport')
// 数据路连接测试
const {connectTest} =  require('./sql')
connectTest()
// 路由部分
const router = require('./routes/index')
// error handler
onerror(app)
// middlewares
// 由于独特的洋葱模型 我们首先要进行使用的就是错误处理中间件
// 监听app error并打印日志
app.use(ctxErrorHandle)
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
// =======> session中间件初始化  <========
initSessionStore(app)
// =======> 日志中间件  <========
initLoggerMiddleWare(app)
// =======> 路由注册中间件  <========
app.use(router.routes(), router.allowedMethods())
// =======> passport中间件拦截  <========
app.use(sessionPassport)

module.exports = app
