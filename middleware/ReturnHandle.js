/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 通过中间件来统一处理返回数据
 * @youWant: add you want info here
 * @Date: 2019-04-02 14:32:21
 * @LastEditTime: 2019-04-02 14:58:24
 */
const {ReturnMessage} = require('../utils')

const returnMessage = new ReturnMessage()
const ReturnHandle = () => {
  /**
   * 渲染加载成功情况下的数据
   * @param {*} ctx 
   */
  const render = ctx => {
    return (data, msg =　"请求成功") =>  {
      ctx.set('Content-Type', 'application/json')
      ctx.body = returnMessage.setSuccessResult(msg, data)
    }
  }
  /**
   * 错误返回的数据
   * @param {*} ctx 
   */
  const renderError = ctx => {
    return (code, msg = '请求失败') => {
      ctx.set('Content-Type', 'application/json');
      ctx.body = returnMessage.setErrorResult(code, msg)
    }
  }
  /**
   * 挂载中间件
   */
  return async (ctx, next) => {
    ctx.returnSuccess = render(ctx);
    ctx.returnError = renderError(ctx);
    await next();
  }
}

module.exports = ReturnHandle
