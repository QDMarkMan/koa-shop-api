/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 错误处理
 * @youWant: add you want info here
 * @Date: 2019-03-14 15:58:42
 * @LastEditTime: 2019-04-02 18:04:19
 */
const {CustomError, HttpError} = require('../error')
const LoggerUtil = require ('../utils/logger')
const ReturnMessage = require('../utils/message')
const returnMessage = new ReturnMessage()
/**
 * controller 错误统一处理
 * @param {*} err 
 * @param {*} ctx 
 */
const ctxErrorHandle  = (ctx, next) => {
    return next().catch((error) => {
        // 默认错误
        let code = 500
        let msg = 'unknown error'
        // 使用 throw new CustomError() 或者 throw new HttpError() 抛出的异常
        if (error instanceof CustomError || error instanceof HttpError) {
          const res = error.getCodeMsg()
          ctx.status = error instanceof HttpError ? res.code : 200
          code = res.code
          msg = res.msg
        } else {
          //通过ctx.throw() 抛出的错误 此时 (error instanceof Error) = true  
          /**
           * ctx.throw(400, 'name required') 等效于:
           * const err = new Error('name required');
           * err.status = 400;
           * err.expose = true;
           * throw err;
           */
          code = error.status
          // 未登录的情况使用使用unauthorized
          msg = error.status == 401 ? "unauthorized": error.message
        }
        LoggerUtil.logError(ctx,error, 0)
        // 发送错误信息给前端
        ctx.body = returnMessage.setErrorResult(code, msg)
    })
}

module.exports = ctxErrorHandle