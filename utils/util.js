/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 工具类
 * @youWant: add you want info here
 * @Date: 2019-03-13 14:14:47
 * @LastEditTime: 2019-03-20 15:44:09
 */
class Util {
  /**
   * 检查对象的类型
   * @param {*目标} 
   */
  static judgeObjType(o){
    return Object.prototype.toString.call(o).slice(8, -1)
  }
  /**
   * @param {*字符串} str 
   * @param {*要替换的字符串} targetStr
   * @param {*目标字符串}  sourceStr
   */
  static replaceStr(str = "", targetStr, sourceStr){
    if(this.judgeObjType(str) !== 'String'){
      throw new error('参数必须是字符串格式')
    }
    const reRegExp = new RegExp(sourceStr,'g')
    return str.replace(reRegExp, targetStr)
  }
  /**
   * 是否是下划线写法
   * @param {*} str 
   */
  static isUnderline(str) {
    return !(str.indexOf('_') === -1)
  }
  /**
   * 是否是驼峰写法
   * @param {*} str 
   */
  static isCamel(str) {
    return (/([A-Z])/g).test(str)
  }
  /**
   * 驼峰字符串转下划线
   * @param {*} str 
   */
  static camelToUnderline(str) {
    if (this.judgeObjType(str) !== 'String') {
      return str = ''
    }
    str = str.replace(/([A-Z])/g, `_$1`).toLowerCase()
    return str
  }
  /**
   * 下划线转驼峰
   * @param {*} str 
   */
  static undelineToCamel(str) {
    if (this.judgeObjType(str) !== 'String') {
      return str = ''
    }
    const list = str.split('_')
    let newStr = list[0]
    for (let i = 1; i < list.length; i++) {
      // console.log(list[i].slice(0,1).toUpperCase())
      newStr += list[i].slice(0,1).toUpperCase() + list[i].slice(1)
    }
    return newStr
  }
  /**
   * 把对象转化为sql语句字符串
   * @param {*JSON Object} obj 
   * @returns {*String} ==> username="xxx",password="123456"
   */
  static changeObjToSqlStr (obj) {
    let _values = ''
    if (!obj || this.judgeObjType(obj) !== 'Object') return ''
    // 序列表对象
    _values = Object.keys(obj).reduce((pre, cur, index) => {
      let divider = index === 0 ? '' : ','
      return pre + `${divider}${cur}="${obj[cur]}"`
    }, _values)
    console.log(_values)
    return _values
  }
}
module.exports = Util
