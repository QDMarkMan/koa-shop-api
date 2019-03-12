/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: log4js 配置文件
 * @youWant: add you want info here
 * @Date: 2019-03-12 17:04:50
 * @LastEditTime: 2019-03-12 17:17:43
 */
const path = require('path')
// 首先配置输出地址
const errorLogLocalPath = path.resolve(__dirname, "../logs/error/error")
//响应日志输出完整路径
const responseLogLocalPath = path.resolve(__dirname, "../logs/response/response");
// 其他日志
const otherLogLocalPath = path.resolve(__dirname, '../logs/other/other')
// 日志设置
module.exports = {
  replaceConsole:true,                                                // 替换console
  pm2: process.env.NODE_ENV === 'development' ? false : true,         // 如果使用了pm2，必须要开启pm选项，不然不会起作用
  appenders: {
    stdout: {                                                         // 控制台输出
      type: 'stdout' ,
    },
    error: {                                                          // 错误日志
      type: 'dateFile',                                               // 日志类型
      filename: errorLogLocalPath,                                    // 日志输出位置
      pattern: '-yyyy-MM-dd.log',                                     // 后缀，每小时创建一个新的日志文件
      alwaysIncludePattern: true                                      // 是否总是有后缀名
    },
    response:{                                                        // response 日志
      type: 'dateFile',
      filename: responseLogLocalPath,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    other:{                                                           // 其他日志
      type: 'dateFile',
      filename: otherLogLocalPath,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {                                                       // 定义默认类别 category 用于所有与特定类别不匹配的日志事件。 
    default: { appenders: ['stdout', 'other'], level: 'debug' },      //appenders:采用的appender,取appenders项,level:设置级别
    error: { appenders: ['stdout', 'error'], level: 'error' },
    response: { appenders: ['stdout', 'response'], level: 'info' }
  }
}