/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: log4js utils
 * @youWant: add you want info here
 * @Date: 2019-03-12 17:04:11
 * @LastEditTime: 2019-03-26 14:49:51
 */
// 在应用程序中首次 require('log4js') 之后，应该立即进行配置。如果不调用 configure，log4js 将使用 LOG4JS_CONFIG （如果已定义）或默认配置。默认的配置定义了一个 appender，使用带颜色的布局将日志记录到 stdout，但也定义了默认日志级别是关闭的（即不会输出日志）。
const Log4js = require('log4js')
const logConfig = require('../config/logger')
// 加载配置项
Log4js.configure(logConfig)
// 定义不同等级的日志
const logger = Log4js.getLogger()  // defalut
const errLog = Log4js.getLogger('error')
const resLog = Log4js.getLogger('response')
// 格式化日志信息
class LoggerFormat {
  /**
   * 请求error
   * @param {*} ctx 
   * @param {*} error 
   * @param {*} time 
   */
  static error (ctx, error, time) {
    const commonText = this.common(ctx.request, time)
    let logText = `
    *************** error log start ***************
    ${commonText}
    error name:  ${error.name};
    error message: ${error.message};
    error stack: ${error.stack};
    *************** error log end   ***************
    `
    return logText
  }
  /**
   * response
   * @param {*请求信息} req 
   * @param {*日志时间} time 
   */
  static response (req, time) {
    const commonText = this.common(req, time)
    let logText = `
    *************** response log start ***************
    ${commonText}
    *************** response log end   ***************
    `
    return logText
  }
  /**
   * 公共部分的处理
   * @param {*} req 
   * @param {*} time 
   */
  static common (req, time) {
    const method =  req.method
    let paramText = ''
    if (method === 'GET') {
      paramText = `request query: ${JSON.stringify(req.query)}`
    } else {
      paramText = `request body: ${JSON.stringify(req.body)}`
    }
    let commonText = `
    request method: ${method};
    request originalUrl: ${req.originalUrl};
    request client ip: ${req.ip};
    ${paramText};
    response time: ${time}ms
    `
    return commonText
  }
}

/**
 * 日志工具集
 */
class LoggerUtil {
  static console (content = '') {
    console.log(`=============${content}============`)
  }
  /**
   * 普通日志==> 仅仅输出简单文字日志
   * @param {*} logText 
   */
  static logger (logText = '') {
    if (logText !== '' ) {
      logger.info(logText)
    }
  }
  /**
   * 请求错误log
   * @param {*} ctx 
   * @param {*} error 
   * @param {*} resTime 
   */
  static logError (ctx, error, resTime) {
    if (ctx && error) {
      errLog.error(LoggerFormat.error(ctx, error, resTime));
    }
  }
  /**
   * 输出简单错误
   * @param {*} error 
   */
  static error (error) {
    if (error) {
      errLog.error(error)
    }
  }
  /**
   * response日志
   * @param {*} ctx 
   * @param {*} resTime 
   */
  static logRes (ctx, resTime) {
    if (ctx) {
      resLog.info(LoggerFormat.response(ctx, resTime))
    }
  }
}

module.exports = LoggerUtil