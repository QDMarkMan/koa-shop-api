/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 数据库链接/帮助 文件
 * @youWant: add you want info here
 * @Date: 2019-03-11 14:48:06
 * @LastEditTime: 2019-04-04 17:25:44
 */
const MySQL = require('mysql')
const chalk = require('chalk')
// 配置文件
const DB = require('../config').DB
// ========> 数据库链接：可以用于测试 <========
const connection = MySQL.createConnection({
  host     :  DB.host,
  port     :  DB.port,
  user     :  DB.user,
  password :  DB.password,
  database :  DB.database
})
// ========> 数据库连接池 <========
const pool = MySQL.createPool({
  connectionLimit :  10,
  host            :  DB.host,
  port            :  DB.port,
  user            :  DB.user,
  password        :  DB.password,
  database        :  DB.database
})

// ========> 数据路连接测试 <========
const connectTest = () => {
  connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack)
      console.log(chalk.red(`Connection DB ${DB.database} fail`))
      return 
    }
    console.log(chalk.green(`Connection DB ${DB.database} by mysql successfully`))
  })
  connection.end()
}
/**
 * 执行数据库命令
 * @param {*} sql sql 语句
 * @param {*} value sql 语句中对应的值
 */
const query = async (sql, value) => {
  return await new Promise((resolve, reject) => {
    try {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, value, (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            // 释放数据库连接
            connection.release()
          })
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}
/**
 * 新建表
 * @param {*} sql 
 */
const createTable = sql => query(sql, [])

/**
 * 查询表全部数据
 * @param {*} table 
 */
const findAll = table => {
  let sql = `SELECT * FROM ??`
  return query(sql, [table])
}
/**
 * 根据id查询某个表中的一条数据
 * @param {*} table 
 * @param {*} id 
 */
const findTableDataById = (table, id) => {
  let sql = `SELECT * FROM ?? WHERE id = ? limit 1`
  return query(sql, [table, id])
}
/**
 * 根据表中的name 属性值查询数据
 * @param {*} table 
 * @param {*} id 
 */
const findDatasByName = (table, name, value) => {
  let sql = `SELECT * FROM ?? WHERE ${name} = ?`
  return query(sql, [table, value])
}
/**
 * 根据表中的name 属性值查询数据
 * @param {*} table 
 * @param {*} id 
 */
const findDataByName = (table, name, value) => {
  let sql = `SELECT * FROM ?? WHERE ${name} = ? limit 1`
  return query(sql, [table, value])
}
/**
 * 插入数据
 * @param {*} table 
 * @param {*} values 
 */
const insertData = (table, values) =>{
  let sql = `INSERT INTO ?? SET ?`
  return query(sql, [table, values])
}
/**
 * 更新操作
 * @param {*} table 
 * @param {*} values 
 * @param {*} key 主键
 */
const updateData = (table, values, id) => {
  let sql = `UPDATE ?? SET ? WHERE id = ?`
  return query(sql, [table, values, id])
}
/**
 * 通过ID更新多个key
 * @param {*} table 
 * @param {*string} values 需要更改的值 
 * @param {*} id 
 */
const updateValuesById = (table, values, id) => {
  console.log(id);
  let sql = `UPDATE ?? SET ${values} WHERE id = ?`
  return query(sql, [table, id])
}
/**
 * 通过制定的Key进行更新
 * @param {*} table 
 * @param {*} values 
 * @param {*} optionName 
 * @param {*} optionValue 
 */
const updateValuesByOption = (table, values, optionName, optionValue) => {
  let sql = `UPDATE ?? SET ${values} WHERE ${optionName} = ?`
  return query(sql, [table, optionValue])
}
/**
 * 根据id删除指定表中某一个数据
 * @param {*} table 
 * @param {*} id 
 */
const deleteDataById = (table, id) => {
  let sql = `DELETE FROM ?? WHERE id = ?`
  return query(sql, [table, id])
}
/**
 * 删除指定表中某一个数据
 * @param {*} table 
 * @param {*} keyValue 
 * @param {*} keyName 
 */
const deleteDataByOption = (table, keyValue,  keyName = 'id') => {
  let sql = `DELETE FROM ?? WHERE ${keyName} = ?`
  return query(sql, [table, keyValue])
}
/**
 * 从表中查询keys的数据
 * @param {*} table 
 * @param {*} keys 
 */
const select = (table, keys) => {
  let sql = `SELECT ?? FORM ??`
  return query(sql, [keys, table])
}
/**
 * 简单分页条件查询
 * @param {*} table 表
 * @param {*} param 条件
 * @param {*} pageNo 页码 
 * @param {*} pageSize 页长
 */
const selectByPage = (table, param , pageNo, pageSize) => {
  let startIndex = (pageNo - 1) * pageSize;
  let sql = `SELECT * FROM ?? ${param == '' ? '' :'WHERE ' + param }  LIMIT ${startIndex}, ${pageSize};`
  console.log(sql);
  return query(sql, [table])
}
/**
 * 统计表数据
 * @param {*} table 
 */
const count = table => {
  let sql = `SELECT COUNT(*) AS total_count FROM ??`
  return query(sql, [table])
}
// module
module.exports = {
  connectTest, // 测试数据路连接
  query,
  findAll,
  createTable,
  findTableDataById,
  findDatasByName,
  findDataByName,
  insertData,
  updateData,
  updateValuesById,
  updateValuesByOption,
  deleteDataById,
  deleteDataByOption,
  select,
  selectByPage,
  count
}