/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: Jsonweb token形式的用户权限检查
 * @youWant: add you want info here
 * @Date: 2019-04-02 15:35:27
 * @LastEditTime: 2019-04-02 17:18:58
 */
const config =  require('../config')
const ReturnMessage = require('../utils/message')
const returnMessage = new ReturnMessage()
const koajwt = require('koa-jwt')
/**
 * 从header中获取到
 * @param {*} ctx 
 * @param {*} next 
 */
const decodeJWT = () => {
  /**
   * 通过token获取到jwt中的token信息
   * @param {*} ctx 
   */
  const getPayloadByToken = ctx => {
    return (code, msg = '请求失败') => {
      ctx.set('Content-Type', 'application/json');
      ctx.body = returnMessage.setErrorResult(code, msg)
    }
  }
  /**
   * 挂载中间件
   */
  return async (ctx, next) => {
    ctx.returnError = renderError(ctx);
    await next();
  }
}
/**
 * JWTPassport
 * @param {*} ctx 
 * @param {*} next 
 */
const JWTPassport = async (app) => {
/*   const session = ctx.session // 请求中的session
  const url = ctx.request.originalUrl // 请求url
  const Method = ctx.request.method  // 请求方法
  // get 请求处理当前的请求页面问题
  // 有session就放行
  if (Object.keys(session).length != 0 || Method == 'GET') {
    // 存在session进行放行
    await next()
  } else {
    // 在放行白名单中 进行放行
    if (config.safe_filter_url.indexOf(url) === -1) {
      // 返回定制API
      return ctx.body = returnMessage.setResult(returnMessage.CONSTANTS.HTTP_CODE.UNAUTHORIZED, returnMessage.ERROR_MSG[401], null, false)
    } else {
      // 存在白名单中进行正常跳转
      await next()
    } 
  } */
  app.use(koajwt({
    secret: "U2FsdGVkX19TZDVND7l5klf3v2yeVG9e8XOAu2St9tI="
  }).unless({
    path:  [new RegExp('/api/user/login')]
  }))
}
module.exports = JWTPassport