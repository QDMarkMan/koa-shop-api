/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: user表模型
 * @youWant: add you want info here
 * @Date: 2019-03-08 17:46:29
 * @LastEditTime: 2019-03-20 15:35:24
 */
const dbUtils = require('../sql')
const Util = require('../utils/util')
const logger = require('../utils/logger')
// 用户表名称
const tables = require('./Tables')
// 4 大操作  add/delete/update/find
module.exports = class UserModel {
  /**
   * 根据条件查询数据库
   * @param {*} optionName 
   * @param {*} optionValue 
   */
  async findOneUserByOption (optionName, optionValue) {
    let result
    try {
      result = await dbUtils.findDataByName(tables.USERS_TABLE, optionName, optionValue)
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
      result = await dbUtils.insertData(tables.USERS_TABLE, user)
    } catch (error) {
      logger.error(error)
      result = null
    }
    return result
  }
  /**
   * 根据条件查询用户
   */
  async getAllUsers () {
    let result 
    try {
      result = await dbUtils.findAll(tables.USERS_TABLE)
    } catch (error) {
      logger.error(error)
      result = null
    }
    return result
  }
  /**
   * 修改用户
   * @param {*} id id
   * @param {*Object} info 需要修改的信息  
   */
  async updateUser (id, info) {
    let result
    try {
      const _values = Util.changeObjToSqlStr(info)
      result = await dbUtils.updateValuesById(tables.USERS_TABLE, _values, id)
    } catch (error) {
      logger.error(error)
      result = null
    }
    return result
  }
}