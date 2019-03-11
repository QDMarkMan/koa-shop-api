/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 返回数据工构造器
 * @youWant: add you want info here
 * @Date: 2019-03-11 17:11:53
 * @LastEditTime: 2019-03-11 17:57:04
 */

module.exports = class ReturnMessage  {
  /**
   * 返回数据的构建
   * @param {*} code 状态码
   * @param {*} message 提示信息
   * @param {*} result  返回结果
   * @param {*} success 请求状态
   */
  setResult (code = 000, message = '', result = null, success = false) {
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
   * success 情况下的返回
   * @param {*} message 
   * @param {*} result 
   */
  setSuccessResult (message = "操作成功", result = null) {
    return this.setResult(code, message, result, true)
  }

}
