/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 初始化session模块， 使用 koa-mysql-session + koa-session-minimal
 * @youWant: add you want info here
 * @Date: 2019-03-14 14:42:49
 * @LastEditTime: 2019-03-14 14:50:50
 */
const config = require('../config')
const session = require('koa-session-minimal')   // 使用于提供存储介质的读写接口
const MysqlStore  =  require('koa-mysql-session')// 为koa-session-minimal中间件提供MySQL数据库的session数据读写操作
// =======> 由于项目较小 我们使用MySQL数据库存储session 大型的项目一般选取redis作为session的存储介质  <========
const SESSION_MYSQL_CONFIG = {
  user: config.DB.user,
  password: config.DB.password,
  database: config.DB.database,
  host: config.DB.host,
  port: config.DB.port
}
/**
 * session初始化
 * @param {*Koa Instance} app koa实例
 */
const initSessionStore = (app) => {
  app.use(session({
    key: config.session_key,
    maxAge: 60 * 60 * 24 * 1000,                  // cookie的过期时间 maxAge in ms (default is 1 days)
    store: new MysqlStore(SESSION_MYSQL_CONFIG),  //mysql存储session设置
    rolling: true,                                //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false） 设置fasle的时候无论多长时间操作那么就失效
    renew: false,                                 // 请求的时候如果session快过期了 那么就重新激活 效果和上面的差不多
    cookie: {
      signed: true,                               // 默认签名
      maxAge: config.sessionTimeout,              // cookie的过期时间 maxAge in ms (default is 1 days)
      httpOnly: true,                             // 是否只用于 http 请求中获取
      overwrite: false                            // 是否允许重写
    }
  }))
}

module.exports = initSessionStore