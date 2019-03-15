/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 用户数据service层
 * @youWant: add you want info here
 * @Date: 2019-03-11 14:29:06
 * @LastEditTime: 2019-03-15 16:45:28
 */
const UserModel = require('../models/UserModel')
const UuidService = require('./UuidService')
const CommonService = require('./CommonService')
const logger = require('../utils/logger')
const ReturnMessage = require('../utils/message')
const SecretService = require('./SecretService')
const { camelToUndeline, undelineToCamel } = require('../utils/toggle_writing')
// 需要使用服务
const userModel = new UserModel()
const uuidService = new UuidService()
const returnMessage = new ReturnMessage()

module.exports = class UserService extends CommonService {
  constructor () {
    super()
  }
  /**
   * 根据条件检测用户是否已经存在
   * @param {*} optionName 选项名称
   * @param {*} optionValue  选项值
   */
  async _isUserAlreadyExistByOptions (optionName, optionValue) {
    let result = false
    try {
      let res = await userModel.findOneUserByOption(optionName, optionValue)
      result = res.length > 0 ? true : false
    } catch (error) {
      logger.error(`ServiceError: error in UserService _isUserAlreadyExistByPhone, ${error}`)
      result = false
    }
    return result
  }
  /**
   * 创建用户
   * @param {*} user 
   */
  async createUser (userEntity) {
    let result = {}
    try {
        // =======> 用户添加前的查询  <========
        const phoneExit = await this._isUserAlreadyExistByOptions('phone', userEntity.phone)
        // 首先判断手机号是否已经占用
        if (phoneExit) {
          return returnMessage.setResult(105, '当前手机号注册用户已存在', null)
        }
        // 判断用户名是否已经被使用了
        const usernameExit = await this._isUserAlreadyExistByOptions('username', userEntity.username)
        if (usernameExit) {
          return returnMessage.setResult(106, '当前用户名注册用户已存在', null)
        }
        // =======> 新增用户  <========
        const id = await uuidService.generateUuId()
        //参数处理
        userEntity.id = id // 加上id
        userEntity.gender = userEntity.gender === '' ? '0' : '1' // 默认为男性
        userEntity.regDate = new Date().getTime() // 加上创建时间
        userEntity.password = SecretService.generatePassportKey(userEntity.password)
        let res = await userModel.createUser(camelToUndeline(userEntity))
        // res为null的时候表示添加用户失败， 即数据库操作出现问题
        if (!res) {
          result = returnMessage.set500Result() 
        } else {
          result = returnMessage.setSuccessResult('添加用户成功', null)
        }
    } catch(error) {
      logger.error(`ServiceError: error in UserService createUser, ${error}`)
      result =  returnMessage.set500Result()
    }
    return result
  }
  /**
   * 登陆
   * @param {*} user 
   */
  async loginByUserName (user) {
    let result = {}
    try {
      const phoneExit = await this._isUserAlreadyExistByOptions('phone', userEntity.phone)
      // 判断是否有用户
      if (phoneExit) {
        return returnMessage.setResult(101, '当前手机号注册用户已存在', null)
      }
    } catch (error) {
      logger.error(`ServiceError: error in UserService createUser, ${error}`)
      result =  returnMessage.set500Result()
    }
  }
}