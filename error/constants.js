/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: http code 常量
 * @youWant: add you want info here
 * @Date: 2019-03-14 17:39:42
 * @LastEditTime: 2019-03-14 17:59:55
 */
//错误message
const errMsg = Object.freeze({
  0: 'ok',
  400: 'invalid param',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'not found',
  500: 'internal server error',
  503: 'service busy',
  1001: 'some custom error msg'
})

module.exports = Object.freeze({
  // http级别的错误
  HTTP_CODE: {
    BAD_REQUEST: 400,               // BAD_REQUEST 参数错误
    UNAUTHORIZED: 401,              // 请求未授权： (Unauthorized)
    FORBIDDEN: 403,                 // 拒绝访问
    NOT_FOUND: 404,                 // 404
    INTERNAL_SERVER_ERROR: 500,     // 服务错误
    SERVICE_BUSY: 503               // 服务器繁忙
  },
  // 可以理解为service 错误
  CUSTOM_CODE: {
    SOME_CUSTOM_ERROR: 1001
  }
})