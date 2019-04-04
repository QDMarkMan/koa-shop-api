/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 用户数据service层
 * @youWant: add you want info here
 * @Date: 2019-03-11 14:29:06
 * @LastEditTime: 2019-04-04 17:28:02
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
        // 创建id
        const userId = await uuidService.generateUuId()
        // 参数处理
        userEntity.userId = userId // 加上id
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
  /**
   * 获取用户登陆之后的sessionId
   * @param {*} param 
   */
  async getLoginedSessionId (param) {
    let result = {}
    try {
      const _session =await this._getSessionIdBySession(param)
      // issue: 2019年3月25日 未判断session是否超时
      if (_session.length > 0) {
        result = returnMessage.setSuccessResult("获取sessionId成功", {sessionId: _session[0].id})
      } else {
        result = returnMessage.setErrorResult(401, "未查询到session", null)
      }
    } catch (error) {
      logger.error(`ServiceError: error in UserService createUser, ${error}`)
      result =  returnMessage.set500Result()
    }
    return result
  }
  /**
   * 根据用户id获取用户信息
   * @param {*} userId 
   * @returns {*returnMessage}
   */
  async getUserInfoByUserId (userId) {
    let result = {}
    try {
      logger.console(`获取${userId}用户数据`)
      let _user = await userModel.findOneUserByOption('id', userId)
      if (_user == null || _user.length == 0) {
        return result = returnMessage.setErrorResult(101, "查询失败")
      } 
      result = returnMessage.setSuccessResult("获取用户成功", undelineToCamel(_user[0]))
    } catch (error) {
      logger.error(`ServiceError: error in UserService getUserInfoByUserId, ${error}`)
      result =  returnMessage.set500Result()
    }
    return result
  }
  /**
   * @requires all users
   */
  async getUserList () {
    let result
    try {
      logger.console("获取全部用户数据")
      // issue: 进行逻辑删除的判断
      let _res = await userModel.getAllUsers()
      if(_res == null || _res.length === 0) {
        return result = returnMessage.setErrorResult(returnMessage.CONSTANTS.CUSTOM_CODE.EMPTY_RESULT, "查询无数据", null)
      }
      //拾取数组
      const _temp = _res.map(el => {
        let {id, username, nickName, email, phone, ip, address, gender} = undelineToCamel(el)
        return {id, username, nickName, email, phone, ip, address, gender}
      })
      result = returnMessage.setSuccessResult("获取用户列表成功", _temp)
    } catch (error) {
      logger.error(`ServiceError: error in UserService getUserList, ${error}`)
      result =  returnMessage.set500Result()
    }
    return result
  }
  /**
   * 分页获取用户
   * @requires all users
   */
  async getUserListBypage (param, pageNo, pageSize) {
    let result
    try {
      logger.console("分页获取获取用户数据")
      // issue: 进行逻辑删除的判断
      let _res = await userModel.getUsersByPageAndOptions(param, pageNo, pageSize)
      let _count = await userModel.getUserCount()
      if(_res == null || _res.length === 0) {
        return result = returnMessage.setErrorResult(returnMessage.CONSTANTS.CUSTOM_CODE.EMPTY_RESULT, "查询无数据", null)
      }
      //拾取数组
      const _temp = _res.map(el => {
        let {id, username, nickName, email, phone, ip, address, gender} = undelineToCamel(el)
        return {id, username, nickName, email, phone, ip, address, gender}
      })
      const _totalCount = _count === null ? 0 : undelineToCamel(_count[0]).totalCount
      const _result = returnMessage.setPageData(_totalCount, pageNo, pageSize, _temp)
      result = returnMessage.setSuccessResult("获取用户列表成功", _result)
    } catch (error) {
      logger.error(`ServiceError: error in UserService getUserList, ${error}`)
      result =  returnMessage.set500Result()
    }
    return result
  }
  /**
   * 更新用户信息
   * @param {*} id 
   * @param {*} info 
   */
  async updateUserInfo (info) {
    let result 
    try {
      const id = info.id
      delete info.id
      let res = await userModel.updateUser(id, camelToUndeline(info))
      if (!res) {
        return returnMessage.setErrorResult(returnMessage.CONSTANTS.CUSTOM_CODE.OPERATE_ERROR, "编辑用户失败", null)
      }
      result = returnMessage.setSuccessResult("编辑成功", null)
    } catch (error) {
      logger.error(`ServiceError: error in UserService updateUserInfo, ${error}`)
      result =  returnMessage.set500Result()
    }
    return result
  }
  /**
   * 用户退出登录
   * @param {*} userId 
   */
  async logoutByUserId (_sessionId) {
    let result 
    try {
      let res = await this._deleteSessionById(_sessionId)
      logger.console("用户退出登录返回数据")
      if (!res) {
        return returnMessage.setErrorResult(returnMessage.CONSTANTS.CUSTOM_CODE.OPERATE_ERROR, "退出登录失败", null)
      }
      result = returnMessage.setSuccessResult("退出登陆成功", null)
    } catch (error) {
      logger.error(`ServiceError: error in UserService logoutByUserId, ${error}`)
      result =  returnMessage.set500Result()
    }
    return result
  }
}