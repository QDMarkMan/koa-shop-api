/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: UUID 构造服务
 * @youWant: add you want info here
 * @Date: 2019-03-13 14:00:17
 * @LastEditTime: 2019-03-13 14:45:25
 */
const UUIDV1 = require('uuid/v1')
const UUIDV3 = require('uuid/v3')
const Util = require('../utils/util')
/**
 * 自定义配置
 */
const v1options = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab], // 自定义节点
  clockseq: 0x1234,// (Number between 0 - 0x3fff) RFC clock sequence. Default: An internally maintained clockseq is used.
}
class UuidService {
  constructor () {
    this.MY_NAMESPACE = 'MY_KEY'
  }
  /**
   * 生成主键id
   */
  async generateUuId () {
    return await Util.replaceStr(UUIDV1(v1options),'', '-')
  }
  /**
   * 根据名称生成Key
   * @param {*} name 
   */
  generateKeyByName (name) {
    uuidv3(name, MY_NAMESPACE)
  }
  
}
module.exports = UuidService