/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: user表模型
 * @youWant: add you want info here
 * @Date: 2019-03-08 17:46:29
 * @LastEditTime: 2019-03-18 16:32:31
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
}