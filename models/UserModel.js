/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: user表模型
 * @youWant: add you want info here
 * @Date: 2019-03-08 17:46:29
 * @LastEditTime: 2019-03-19 14:51:14
 */
const dbUtils = require('../sql')
const logger = require('../utils/logger')
// 用户表名称
const TABLE_USER = 'team_users'

module.exports = class UserModel {
  /**
   * 根据条件查询数据库
   * @param {*} optionName 
   * @param {*} optionValue 
   */
  async findOneUserByOption (optionName, optionValue) {
    let result
    try {
      result = await dbUtils.findDataByName(TABLE_USER, optionName, optionValue)
    } catch (error) {
      logger.error(error)
      result = null
    }
    return result
  }
  /**
   * 创建用户
   * @param {*} user 
   */
  async createUser (user) {
    let result 
    try {
      result = await dbUtils.insertData(TABLE_USER, user)
    } catch (error) {
      logger.error(error)
      result = null
    }
    return result
  }
  /**
   * 根据条件查询用户
   */
  async getUserList (param) {
    let result 
  }
}