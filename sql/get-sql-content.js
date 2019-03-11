/*
 * @Author: etf 
 * @Date: 2018-09-04 21:35:13 
 * @Last Modified by: etf
 * @Last Modified time: 2018-09-10 17:28:11
 * 获取.sql文件中的内容
 */
const fs = require('fs')
/**
 * 遍历目录下的文件目录
 * @param {*string} path 需要遍历的目录文件夹 
 * @param {*string} mime 遍历文件的后缀名
 * @returns {object} 
 */
const walkFile = function (path, mime){
  const files = fs.readdirSync(path)
  let fileList = {}
  for (const [i, item] of files.entries()) {
    let itemArr = item.split('\.')
    let itemMime = ( itemArr.length > 1 ) ? itemArr[ itemArr.length - 1 ] : 'undefined'
    if (mime === itemMime) {
      fileList[item] = path + item
    }
  }
  return fileList
}
/**
 * 获取sql目录下的文件目录数据
 */
const getSqlMap = function() {
  let basePath = __dirname
  basePath = basePath.replace(/\\/g, '\/')
  let pathArr = basePath.split('\/')
  pathArr = pathArr.splice(0, pathArr.length -1)
  basePath = `${pathArr.join('/')}/sql/sql_file/`
  let fileList = walkFile( basePath, 'sql' )
  return fileList
}

//  sql 内容对象
let sqlContentMap  = {}

/**
 * 读取sql文件内容
 * @param {*string} filename  文件名
 * @param {*string} path      文件路径
 * @returns {string}
 */
function getSqlContent(filename, path) {
  let content = fs.readFileSync(path, 'binary')
  sqlContentMap[filename] = content
}

/**
 * 封装sql文件脚本内容
 * @returns {object}
 */
function getSqlContentMap () {
  let sqlMap = getSqlMap()

  for(let item in sqlMap) {
    getSqlContent(item, sqlMap[item])
  }  
  return sqlContentMap
}

module.exports = getSqlContentMap