/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 扫描抛出model
 * @youWant: add you want info here
 * @Date: 2019-03-08 17:41:11
 * @LastEditTime: 2019-03-08 17:50:05
 */
const fs = require('fs')
const path = require('path')

const files = fs.readFileSync(path.resolve(__dirname +'/models'))
// 查询出全部的
let models = files.filter(el => el.endsWith('.js'))
// 抛出模块
for (const key of models) {
  let moduleName = key.substring(0, key.length-3)
  module.exports[moduleName] = require(path.resolve(__dirname+'/models' + key))
}