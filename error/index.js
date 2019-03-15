/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: Error构造器
 * @youWant: add you want info here
 * @Date: 2019-03-15 15:28:29
 * @LastEditTime: 2019-03-15 16:23:17
 */
const {ERROR_MSG,  CONSTANTS} = require('./constants')
const HTTP_CODE = CONSTANTS.HTTP_CODE
/**
 * 通用类型的判断
 */
class CustomError extends Error {
  constructor (code, msg) {
    this.super()
    this.code = code
    this.msg =  msg || ERROR_MSG[code] || 'unknown error'
  }
  getCodeMsg () {
    return {
      code,
      msg
    }
  }
}
// http 请求错误
class HttpError extends CustomError {
  constructor (code, msg) {
    if (Object.values(HTTP_CODE).indexOf(code) < 0) {
      throw Error('not an invalid http code')
    }
    this.super(code, msg)
  }
}
module.exports = {CustomError, HttpError}