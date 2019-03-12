// 日志
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
    try {
      //开始进入到下一个中间件
      await next()
      ms = new Date() - start
      LoggerUtil.logger(`${ctx.method} ${ctx.url} - ${ms}ms`)
      LoggerUtil.logRes(ctx, ms);
    } catch (error) {
      ms = new Date() - start
      LoggerUtil.logError(ctx,error, ms)
    }
  })
}
module.exports = initLoggerMiddleWare