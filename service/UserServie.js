/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 用户数据service层
 * @youWant: add you want info here
 * @Date: 2019-03-11 14:29:06
 * @LastEditTime: 2019-03-12 14:06:59
 */
const UserModel = require('../models/UserModel')
const CommonService = require('./CommonService')

module.exports = class UserService extends CommonService {
  /**
   * 创建用户
   * @param {*} user 
   */
  createUser (userEntity) {
    //获取请求参数
    const uuid = req.session.userinfo.openId;
    // logger.info(`handler getList, user openId is ${openId}`);
    try {
        let res = await ListService.getListFromDB(openId)
        // logger.info(`handler getList, ListService.getListFromDB cost time ${new Date().getTime() - startDate}`);
        // 对数据处理，返回给前端
        // ...
    } catch(error) {
        // logger.error(`handler getList is error, ${JSON.stringify(error)}`);
    }
  }
}