// 日志 在这里我们仅仅进行
const LoggerUtil = require ('../utils/logger')
/**
 * 激活日志中间件
 * @param {*String} app koa实例
 */
const initLoggerMiddleWare = (app) => {
  app.use(async (ctx, next) => {
    const start = new Date()
    //响应间隔时间
    let ms
    await next()
    ms = new Date() - start
    LoggerUtil.logger(`${ctx.method} ${ctx.url} - ${ms}ms`)
    LoggerUtil.logRes(ctx, ms);
  })
}
module.exports = initLoggerMiddleWare