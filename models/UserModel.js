/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: user表模型
 * @youWant: add you want info here
 * @Date: 2019-03-08 17:46:29
 * @LastEditTime: 2019-04-04 17:24:00
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
      result = await dbUtils.updateValuesByOption(tables.USERS_TABLE, _values, 'user_id',id)
    } catch (error) {
      logger.error(error)
      result = null
    }
    return result
  }
  /**
   * 根据条件分页查询用户
   * @param {*Object} options 查询条件{}
   * @param {*String/Number} pageNo 
   * @param {*String/Number} pageSize 
   */
  async getUsersByPageAndOptions (options,pageNo = 1, pageSize = 5) {
    let result
    try {
      const _options = Util.changeObjToSqlStr(options)
      result = await dbUtils.selectByPage(tables.USERS_TABLE, _options, Number(pageNo), Number(pageSize))
    } catch (error) {
      logger.error(error)
      result = null
    }
    return result
  }
  /**
   * 获取总共用户数量
   */
  async getUserCount () {
    let result
    try {
      result = await dbUtils.count(tables.USERS_TABLE)
    } catch (error) {
      logger.error(error)
      result = 0
    }
    return result
  }
}