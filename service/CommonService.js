/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 通用service
 * @youWant: add you want info here
 * @Date: 2019-03-12 13:46:43
 * @LastEditTime: 2019-03-19 13:50:35
 */
const SessionModel = require('../models/SessionModel')
const logger = require('../utils/logger')

const sessionModel = new SessionModel()
module.exports = class CommonService {
  constructor () {
    this.sessionId = ""
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
}