/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 错误处理
 * @youWant: add you want info here
 * @Date: 2019-03-14 15:58:42
 * @LastEditTime: 2019-03-14 17:31:03
 */
const LoggerUtil = require ('../utils/logger')
/**
 * controller 错误 统一处理
 * @param {*} err 
 * @param {*} ctx 
 */
const ctxErrorHandle  = (err, ctx) => {
  return (err,ctx) => {
    // 首先进行日志输出
    LoggerUtil.logError(ctx, err)
  }
}

module.exports = ctxErrorHandle