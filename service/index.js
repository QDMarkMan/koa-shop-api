const fs = require('fs')
const {logger} = require('../utils')
const modelMaps = fs.readdirSync(__dirname)
let exportServices = {}
try {
  modelMaps.forEach(el => {
    const _service = require(`./${el}`)
    if (_service.name !== undefined) {
      exportServices[_service.name] ? console.log(`存在重名Model: ${_service.name}, Model注入失败。请及时更改名称`) : exportServices[_service.name] = _service
    }
  })
} catch (error) {
  logger.error(error)
}
module.exports = exportServices