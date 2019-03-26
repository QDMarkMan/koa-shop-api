const CommonService = require('./CommonService')
const logger = require('../utils/logger')
const RegionModel = require('../models/RegionModel')
const ReturnMessage = require('../utils/message')

const returnMessage = new ReturnMessage()
const regionModel = new RegionModel()
module.exports = class RegionService extends CommonService {

  constructor () {
    super()
  }
  /**
   * 根据code获取当前城区
   * @param {*} code 
   */
  async _getRegionInfoByCode (code) {
    let result
    try {
      result = await regionModel.findRegionByCode(code)
    } catch (error) {
      result =  returnMessage.set500Result()
    }
    return result
  }
  /**
   * 根据当前code查询下级列表
   * @param {*} code 默认0 查询省列表
   */
  async getRegionList (code = 0) {
    let result
    // let pcode
    try {
      logger.console(`开始查询${code}城区列表`)
     /*  const _region = await regionModel.findRegionByCode(code)
      console.log(_region[0].pcode)
      pcode = code === 0 ? 0 : _region[0].pcode */
      const _regions = await regionModel.findRegionByPcode(code)
      if(!this.isEffectiveResult(_regions)) {
        return returnMessage.setErrorResult(returnMessage.CONSTANTS.CUSTOM_CODE.EMPTY_RESULT, "查询无数据")
      }
      result = returnMessage.setSuccessResult("", _regions)
    } catch (error) {
      logger.error(`ServiceError: error in RegionService getRegionList, ${error}`)
      result =  returnMessage.set500Result()
    }
    return result
  }
}