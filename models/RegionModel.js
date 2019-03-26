/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 区划模型
 * @youWant: add you want info here
 * @Date: 2019-03-26 16:08:45
 * @LastEditTime: 2019-03-26 16:59:20
 */
const tables = require('./Tables')
const dbUtils = require('../sql')
const logger = require('../utils/logger')

module.exports = class RegionModel {

  /**
   * 通过城区code查询城区
   * @param {*} code 
   */
  async findRegionByCode (code) {
    let result
      try {
        result = await dbUtils.findDataByName(tables.AREAS_TABLE, "`code`", code)
      } catch (error) {
        logger.error(error)
        result = null
      }
      return result
  }
  /**
   * 根据pcode查询地区列表
   * @param {*} pcode 
   */
  async findRegionByPcode (pcode) {
    let result
      try {
        result = await dbUtils.findDatasByName(tables.AREAS_TABLE, 'pcode', pcode)
      } catch (error) {
        logger.error(error)
        result = null
      }
      return result
    }
}