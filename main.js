/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: Serve entry file
 * @youWant: add you want info here
 * @Date: 2019-03-08 16:30:47
 * @LastEditTime: 2019-03-13 14:04:59
 */
const app = require('./app')
const http = require('http')
const chalk = require('chalk')
const config = require('./config')
const LoggerUtil = require ('./utils/logger')
// 服务端口号
const serverPort =  config.nodeport || 3000
// http 服务器
const server = http.createServer(app.callback())
server.listen(serverPort)
server.on('error', (error)=> {
  if (error.syscall) {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${serverPort} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${serverPort} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
})

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  // console.log(`Listening on ${bind}`);
  console.log(chalk.blue.bold(`${config.projectName} ${process.env.NODE_ENV} server is listening on ${bind}`))
})
