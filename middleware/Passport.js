/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: Session 令牌拦截,主要是拦截请求是存在session
 * @youWant: add you want info here
 * @Date: 2019-03-14 14:57:19
 * @LastEditTime: 2019-03-28 16:31:52
 */
const config =  require('../config')
const ReturnMessage = require('../utils/message')
const returnMessage = new ReturnMessage()
/**
 * sessionPassport
 * @param {*} ctx 
 * @param {*} next 
 */
const sessionPassport = async (ctx, next) => {
  const session = ctx.session // 请求中的session
  const url = ctx.request.originalUrl // 请求url
  // const Method = ctx.request.method  // 请求方法
  console.log(session)
  // get 请求处理当前的请求页面问题
  // 有session就放行
  if (Object.keys(session).length != 0) {
    // 存在session进行放行
    await next()
  } else {
    // 在放行白名单中 进行放行
    if (config.safe_filter_url.indexOf(url) === -1) {
      /**
       * 返回定制API
       */
      return ctx.body = returnMessage.setResult(returnMessage.CONSTANTS.HTTP_CODE.UNAUTHORIZED, returnMessage.ERROR_MSG[401], null, false)
    } else {
      // 存在白名单中进行正常跳转
      await next()
    } 
  }
}
module.exports = sessionPassport