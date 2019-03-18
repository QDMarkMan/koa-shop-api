/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 用户数据service层
 * @youWant: add you want info here
 * @Date: 2019-03-11 14:29:06
 * @LastEditTime: 2019-03-18 17:02:43
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
  async _getExistUserByOptions (optionName, optionValue) {
    let result = false
    try {
      result = await userModel.findOneUserByOption(optionName, optionValue)
    } catch (error) {
      logger.error(`ServiceError: error in UserService _isUserAlreadyExistByPhone, ${error}`)
      result = []
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
        const phoneExit = await this._getExistUserByOptions('phone', userEntity.phone)
        // 首先判断手机号是否已经占用
        if (phoneExit.length > 0) {
          return returnMessage.setResult(105, '当前手机号注册用户已存在', null)
        }
        // 判断用户名是否已经被使用了
        const usernameExit = await this._getExistUserByOptions('username', userEntity.username)
        if (usernameExit.length > 0) {
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
   * 登陆服务
   * @param {*} user 
   */
  async loginByUserName (user) {
    let result = {}
    try {
      const _user = await this._getExistUserByOptions('username', user.username)
      // 判断是否有用户
      if (_user.length === 0) {
        return returnMessage.setResult(101, '查询无当前用户', null)
      } 
      // 驼峰转化
      const _userEntity = undelineToCamel(_user[0])
      // 密码对比
      const _tempPassword = SecretService.generatePassportKey(user.password)
      if (_userEntity.password === _tempPassword) {
        // 登陆成功
        result = returnMessage.setSuccessResult("登陆成功", _userEntity)
      } else {
        result = returnMessage.setErrorResult(102, "用户名或密码错误", null)
      }
    } catch (error) {
      logger.error(`ServiceError: error in UserService createUser, ${error}`)
      result =  returnMessage.set500Result()
    }
    return result
  }
}