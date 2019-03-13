const Util = require('./util')
/**
 * 切换数据类型  camelJson  <=>  underlineJson
 * @param {*object} json 
 * @param {*string} type camelToUnderline / undelineToCamel  
 */
const switchJsonType = (json, type= "camelToUnderline") => {
  let newJson = {}
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      // 符合其中一项标准进行转义
      if (Util.isCamel(key) || Util.isUnderline(key)) {
        const newKey = Util[type](key)
        newJson[newKey] = json[key]
      } else {
        newJson[key] = json[key]
      }
    }
  }
  return newJson 
}
// =======> 驼峰对象转为下划线对象  <========　
module.exports.camelToUndeline = (data) => switchJsonType(data)
//=======> 下划线对象转为驼峰对象  <========　
module.exports.undelineToCamel = (data) => switchJsonType(data, "undelineToCamel")