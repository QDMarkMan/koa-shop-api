/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 加密服务
 * @youWant: add you want info here
 * @Date: 2019-03-13 16:15:21
 * @LastEditTime: 2019-03-18 16:51:14
 */
const crypto = require('crypto');
const Util = require('../utils/util')
/**
 * 加密服务
 */
class SecretService {
  
  constructor () {
    this.SECRET_KEY = 'KOA_PEOJECT' // 加密解密key
  }
  /**
   * 生成密码 ==> 不可逆操作
   * @author etf
   * @param {*} value 
   */
  static generatePassportKey(password) {
    let encoded
    if (Util.judgeObjType(password) !== 'String' || password === '') {
      encoded = ''
    } else {
      encoded = crypto.createHash('sha1').update(password).digest('hex')
    }
    return encoded
  }
  /**
   *  aes192加密模块
   *  可逆加密方式
   * @param {*明文} value 
   */
  static encodeKey(value){
    let cipher = crypto.createCiper("aes192", this.SECRET_KEY)
    let enc = cipher.update(value, "utf-8", "hex")
    enc += cipher.final('hex')
    return enc
  }
  /**
   * aes192解密模块
   * @param {*密文} key 
   */
  static decodeKey(key){
    let deCipher = crypto.createDecipher("aes192", this.SECRET_KEY)
    let dec = deCipher.update(content,"hex","utf8")
    dec += cipher.final("utf8")
    return dec
  }
}
module.exports = SecretService
