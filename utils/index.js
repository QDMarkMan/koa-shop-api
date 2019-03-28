/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 辅助函数
 * @youWant: add you want info here
 * @Date: 2019-03-28 08:50:27
 * @LastEditTime: 2019-03-28 09:23:01
 */
const {camelToUndeline, undelineToCamel} = require('./toggle_writing')
module.exports = {
  logger: require('./logger'),
  ReturnMessage: require('./message'),
  Util:require('./util'),
  camelToUndeline,
  undelineToCamel
}