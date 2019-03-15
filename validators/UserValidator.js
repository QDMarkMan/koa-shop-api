/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 数据验证方法
 * @youWant: add you want info here
 * @Date: 2019-03-12 15:42:06
 * @LastEditTime: 2019-03-15 17:14:42
 */
const Validator = require('validator')
const ReturnMessage = require('../utils/message')
/**
 * 验证注册数据
 * 以函数的形式抛出
 */
/* module.exports.validatorRegisterData = (data) => {
  // 验证器集合
  let errors = []
  // 验证用户名
  if(Validator.isEmpty(data.username)){
		errors.push("用户名不能为空")
	}
  // 验证密码
	if(Validator.isEmpty(data.password)){
    errors.push("密码不能为空")
  }
  // 验证手机号
  if (!Validator.isMobilePhone(data.phone)) {
    errors.push("请输入正确手机号")
  }
  // 返回错误对象
  return ReturnMessage.setValidatorResult(errors)
} */

class UserParamValidator {
  /**
   * 验证注册参数
   * @param {*} data 
   */
  validatorRegisterData (data) {
    // 验证器集合
    let errors = []
    // 验证用户名
    if(Validator.isEmpty(data.username)){
      errors.push("用户名不能为空")
    }
    // 验证密码
    if(Validator.isEmpty(data.password)){
      errors.push("密码不能为空")
    }
    // 验证手机号
    if (!Validator.isMobilePhone(data.phone)) {
      errors.push("请输入正确手机号")
    }
    // 返回错误对象
    return ReturnMessage.setValidatorResult(errors)
  }
  /**
   * 
   * 登陆参数验证
   * @param {*} data 
   */
  validatorLoginData (data) {
    let errors = []
    // 验证用户名
    if(Validator.isEmpty(data.username)){
      errors.push("登陆用户名不能为空")
    }
    // 验证密码
    if(Validator.isEmpty(data.password)){
      errors.push("登陆密码不能为空")
    }
    // 返回错误对象
    return ReturnMessage.setValidatorResult(errors)
  }
}

module.exports = new UserParamValidator()