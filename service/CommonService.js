/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 通用service
 * @youWant: add you want info here
 * @Date: 2019-03-12 13:46:43
 * @LastEditTime: 2019-03-29 17:07:47
 */
const SessionModel = require('../models/SessionModel')
const logger = require('../utils/logger')
require('../models')

const sessionModel = new SessionModel()
module.exports = class CommonService {
  constructor () {
    this.sessionId = ""
  }
  /**
   * 判断是否是有内容的返回
   * @param {*} result 
   */
  isEffectiveResult (result) {
    return result !== null && result.length > 0
  }
  /**
   * 通过session的内容获取session的值
   * @param {* {data：data}} } para 
   */
  async _getSessionIdBySession (para) {
    const data = JSON.stringify(para.data)
    let result
    try {
      result = await sessionModel.findSessionByData(data)
    } catch (error) {
      logger.error(`ServiceError: error in CommonService getSessionIdBySession, ${error}`)
      result = []
    }
    return result
  }
  /**
   * 通过sessionId 获取session
   * @param {*} sessionId 
   */
  async _getSessionBySessionId (sessionId) {
    let result
    try {
      result = await sessionModel.findSessionById(sessionId)
    } catch (error) {
      logger.error(`ServiceError: error in CommonService getSessionIdBySession, ${error}`)
      result = []
    }
    return result
  }
  /**
   * 根据用户id删除当前用户
   * @param {*} userId 
   */
  async _deleteSessionById (sessionId) {
    let result
    try {
      //  先拿到session
      result = await sessionModel.deleteSessionById(sessionId)
    } catch (error) {
      logger.error(`ServiceError: error in CommonService getSessionIdBySession, ${error}`)
      result = []
    }
    return result
  }
}