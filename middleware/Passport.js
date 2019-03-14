/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: Session 令牌拦截,主要是拦截请求是存在session
 * @youWant: add you want info here
 * @Date: 2019-03-14 14:57:19
 * @LastEditTime: 2019-03-14 16:08:43
 */
const config =  require('../config')
/**
 * sessionPassport
 * @param {*} ctx 
 * @param {*} next 
 */
const sessionPassport = (ctx, next) => {
  return async function (ctx, next) {
    await next()
    /* const session = ctx.session // 请求中的session
    const url = ctx.request.originalUrl // 请求url
    // const Method = ctx.request.method  // 请求方法
    try {
      // get 请求处理当前的请求页面问题
      // 有session就放行
      if (JSON.stringify(session) !== '{}') {
        // 存在session进行放行
        await next()
      } else {
        // 在放行白名单中 进行放行
        if (config.safe_filter_url.indexOf(url) === -1) {
          // 重定向
          return await ctx.redirect('/login')
        } else {
          console.log('page can not pass')
          // 存在白名单中进行正常跳转
          await next()
        } 
      }
    } catch (error) {
      console.log(error)
    } */
  }
}
module.exports = sessionPassport