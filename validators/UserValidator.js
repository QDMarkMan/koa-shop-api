/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 数据验证方法
 * @youWant: add you want info here
 * @Date: 2019-03-12 15:42:06
 * @LastEditTime: 2019-03-12 16:20:19
 */
const Validator = require('validator')
const ReturnMessage = require('../utils/message')
/**
 * 验证注册数据
 */
module.exports.validatorRegisterData = (data) => {
  // 验证器集合
  let errors = []
  // 验证用户名
  if(Validator.isEmpty(data.username)){
		errors.push(
      {
        msg: "用户名不能为空",
        code: 101
      }
    )
	}
  // 验证密码
	if(Validator.isEmpty(data.password)){
    errors.push(
      {
        msg: "密码不能为空",
        code: 102
      }
    )
  }
  // 验证手机号
  if (!Validator.isMobilePhone(data.phone)) {
    errors.push(
      {
        msg: "请输入正确手机号",
        code: 103
      }
    )
  }
  // 返回错误对象
  return ReturnMessage.setValidatorResult(errors)
}