/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 配置跨越中间件 (Cross-origin resource sharing)
 * @youWant: add you want info here
 * @Date: 2019-03-19 15:09:50
 * @LastEditTime: 2019-04-25 14:54:33
 */
const CORS = require('koa2-cors')
const CORSMiddleware = (ctx, next) => {
  return CORS({
    /* origin: function (ctx) {
        ctx.response.header['Access-Control-Allow-Credentials'] = true
        // 开启整体跨域
        if (ctx.url === '/api') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:8080'; // 只允许 http://localhost:8080 这个域名的请求
    }, */
    origin: 'http://localhost:8080',
    // exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    // maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })
}
module.exports = CORSMiddleware