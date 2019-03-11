/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: user表模型
 * @youWant: add you want info here
 * @Date: 2019-03-08 17:46:29
 * @LastEditTime: 2019-03-11 17:58:11
 */
const dbUtils = require('../sql')
const ReturnMessage = require('../utils/message')
let returnMessage = new ReturnMessage()
// 用户表名称
const TABLE_USER = 'team_users'

module.exports = class UserModel {

  /**
   * 创建用户
   * @param {*} user 
   */
  async createUser (user) {
    let result 
    // 查询用户是否已经存在
    try {
      result = await dbUtils.insertData(TABLE_USER, user)
    } catch (error) {
      result = returnMessage.setErrorResult(500,'插入用户失败',error)
    }
    return result
  }

  
  async getUserList () {
    let result 
  }
}