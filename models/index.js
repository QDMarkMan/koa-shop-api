const fs = require('fs')
const {logger} = require('../utils')
const modelMaps = fs.readdirSync(__dirname)
let exportModels = {}
try {
  modelMaps.forEach(el => {
    const _model = require(`./${el}`)
    if (_model.name !== undefined) {
      exportModels[_model.name] ? logger.info(`存在重名Model: ${_model.name}, Model注入失败。请及时更改名称`) : exportModels[_model.name] = _model
    }
  })
} catch (error) {
  logger.error(error)
}
module.exports = exportModels