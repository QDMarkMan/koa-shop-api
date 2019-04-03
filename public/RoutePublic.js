/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: controller层通用方法
 * @youWant: add you want info here
 * @Date: 2019-03-19 14:03:11
 * @LastEditTime: 2019-04-03 15:29:29
 */
/**
 * 获取session中的用户信息 ==> 待定
 */
const JWT = require('jsonwebtoken')
const config =  require('../config')

module.exports.getPaloadFromJWT = (ctx) => {
  const token = ctx.header.authorization  // 获取jwt
  if (!token) {
    return null
  }
  let payload = JWT.decode(token.split(' ')[1], config.jwt_key)
  return payload
}