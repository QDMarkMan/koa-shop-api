/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 返回数据工构造器
 * @youWant: add you want info here
 * @Date: 2019-03-11 17:11:53
 * @LastEditTime: 2019-03-15 16:46:31
 */
const {ERROR_MSG,  CONSTANTS} = require('../error/constants')
module.exports = class ReturnMessage  {
  constructor () {
    this.ERROR_MSG  = ERROR_MSG
    this.CONSTANTS = CONSTANTS
  }
  /**
   * 设置验证未通过的返回数据
   * @param {*Array} errorMaps 
   * @returns {*object} {errMsg: string, errCode: number, isValid}
   */
  static setValidatorResult (errors = []) {
    return {
      // 多重条件验证如果有多个没有通过的话选取第一个作为展示信息
      errMsg: errors.length > 0 ? errors[0] : '',
      //　状态吗: 锁定参数错误
      errCode: CONSTANTS.HTTP_CODE.BAD_REQUEST,
      // 是否验证通过
      isValid: errors.length > 0 ? false : true
    }
  }
  /**
   * 返回数据的构建
   * @param {*} code 状态码
   * @param {*} message 提示信息
   * @param {*} result  返回结果
   * @param {*} success 请求状态
   */
  setResult (code = 500, message = '', result = null, success = false) {
    return {
      code,
      message,
      result,success
    }
  }

  /**
   * 操作错误的返回信息
   * @param {*} code 
   * @param {*} message 
   * @param {*} result 
   */
  setErrorResult (code, message, result = null) {
    return this.setResult(code, message, result, false)
  }
  /**
   * 设置catch错误返回值
   */
  set500Result () {
    return this.setResult(500, "服务器繁忙", null, false)
  }
  /**
   * success 情况下的返回
   * @param {*} message 
   * @param {*} result 
   */
  setSuccessResult (message = "操作成功", result = null) {
    return this.setResult(200, message, result, true)
  }

}
