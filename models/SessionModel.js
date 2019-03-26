/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: user表模型
 * @youWant: add you want info here
 * @Date: 2019-03-08 17:46:29
 * @LastEditTime: 2019-03-26 14:42:43
 */
const tables = require('./Tables')
const dbUtils = require('../sql')
const logger = require('../utils/logger')

module.exports = class UserModel {
  /**
   * 根据条件查询数据库
   * @param {*} optionName 
   * @param {*} optionValue 
   */
  async findSessionByData (sessionData) {
    let result
    try {
      result = await dbUtils.findDataByName(tables.SESSION_TABLE, 'data', sessionData)
    } catch (error) {
      logger.error(error)
      result = null
    }
    return result
  }
  /**
   * 通过用户ID查询session
   * @param {*} userId 
   */
  async findSessionById (sessionId) {
    let result
    try {
      result = await dbUtils.findTableDataById(tables.SESSION_TABLE, `session_id:${sessionId}`)
    } catch (error) {
      logger.error(error)
      result = null
    }
    return result
  }
  /**
   * 根据userId删除用户session
   * @param {*string} userId 
   */
  async deleteSessionById (id) {
    let result
    try {
      result = await dbUtils.deleteDataById(tables.SESSION_TABLE, id)
    } catch (error) {
      logger.error(error)
      result = null
    }
    return result
  }
}