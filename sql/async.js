/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 项目建表以及初始化
 * +----------+  遍历sql  +---+ 解析所有sql +---+  执行sql  +------------>
          |   |  目录下的  |   |  文件脚本  |   |   脚本     |   |
   +----------+  sql文件   +---+   内容    +---+           +------------>
 * @youWant: add you want info here
 * @Date: 2019-03-11 14:49:08
 * @LastEditTime: 2019-03-11 17:07:04
 */
const chalk = require('chalk')
const { query } = require('./index')
// 数据库文件
const sqlContentMap = require('./get-sql-content')()

/**
 * 打印脚本执行日志
 * @param {*string} err 错误
 * @param {*string} sqlFile  sql文件
 * @param {*number} index 行数 
 */
const eventLog = function (err, sqlFile, index) {
  if (err) {
    console.log(chalk.blue(`[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败！`))
  } else {
    console.log(chalk.blue(`[SUCCESS] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行成功 `))
  }
}
// 执行sql语句进行数据库同步
const createAllTables = async () => {
  for (const key in sqlContentMap) {
    if (sqlContentMap.hasOwnProperty(key)) {
      // 
      console.log(chalk.yellow(`执行解析${key}文件`));
      let sqlShell = sqlContentMap[key]
      let sqlShellList = sqlShell.split(';')
      // 逐句展示
      for (const [i, shell] of sqlShellList.entries()) {
        if (shell.trim()) {
          let result = await query( shell )
          /**
           * result ==> 
           * OkPacket {
            fieldCount: 0,
            affectedRows: 0,
            insertId: 0,
            serverStatus: 2, 2代表执行成功
            warningCount: 0,
            message: '',
            protocol41: true,
            changedRows: 0 }
           */
          if ( parseInt(result.serverStatus) === 2 ) {
            eventLog( null,  key, i)
          } else {
            eventLog( true,  key, i) 
          }
        }
      }
    }
  }
  console.log(chalk.yellow('sql脚本执行结束！'))
  process.exit(0)
}

createAllTables()