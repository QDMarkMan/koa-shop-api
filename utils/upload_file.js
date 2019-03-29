/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 上传文件模块
 * @youWant: add you want info here
 * @Date: 2019-03-27 16:14:08
 * @LastEditTime: 2019-03-29 15:36:47
 */

const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')
const logger = require('./logger')

/**
 * 同步创建文件目录
 * @param {*} dirname 
 */
function mkdirsSync (dirname) {
  if (fs.existsSync(dirname )) {
    return true
  } else {
    if(mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync( dirname )
      return true
    }
  }
}
/**
 * 获取上传文件的后缀名
 * @param {*} fileName 
 */
function getFileSuffixName (fileName) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}
/**
 * 获取上传文件的真实名称
 * @param {*} fileName 
 */
function getFileName (fileName) {
  let nameList = fileName.split('.')
  return nameList.slice(0, nameList.length -1).join('')
}

function uploadFile (ctx, options) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({headers: req.headers})

  let fileType = options.fileType || 'common'

  let filePath = path.join( __dirname, '../assets/images')
  let mkdirResult = mkdirsSync( filePath )

  return new Promise((resolve , reject) => {
    let result
    logger.console("开始执行文件上传")
    /**
     * 监听上传事件
     */
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      logger.console("上传文件名：" +getFileName(filename))
      // 生成临时文件名称
      let fileName  = getFileName(filename) + Math.random().toString(16).substr(2) + '.' + getFileSuffixName(filename)
      let _uploadFilePath  = path.join( filePath, fileName )
      // console.log(_uploadFilePath)
      let _saveTo = path.join(_uploadFilePath)
      // 保存文件
      file.pipe(fs.createWriteStream(_saveTo))
      // 文件写入事件完成
      file.on('end', () => {
        logger.console("文件上传成功")
        result = `http:${ctx.host}/images/${fileName}`
        logger.console("文件存储地址" + result)
      })
    })
    // 解析结束事件
    busboy.on('finish', function( ) {
      logger.console("文件上结束")
      resolve(result)
    })
    // 解析错误事件
    busboy.on('error', function(err) {
      logger.error(err)
      reject('')
    })
    req.pipe(busboy)
  })
}
module.exports =  {
  uploadFile
}