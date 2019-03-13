/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: 第一层的自动引入router  这里我们并没有进行单独的路由分离，你也可以把路由分为controller层和routers层次
 * @youWant: add you want info here
 * @Date: 2019-03-08 16:24:26
 * @LastEditTime: 2019-03-13 14:05:09
 */
const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
let routeMaps = fs.readdirSync(__dirname)
// ========> 判断是否合法路由 <=========
/**
 * @author etongfu
 * @param {*object} router 路由对象 
 * @returns {*boolean}
 */
const isLegalRouter = (router = {}) => {
  if (JSON.stringify(router) === '{}') {
    return false
  } else {
    return router['opts'] !== undefined && router['opts'] !== undefined &&  router['methods'] !== undefined && router['params'] !== undefined && router['stack'] !== undefined
  }
}
// ========> 过滤文件夹 <=========
routeMaps.forEach(el => {
  let _status = fs.statSync(path.join(__dirname, `/${el}`))
  if (_status.isFile() && el !== 'index.js') {
    const currentRouter = require(`./${el}`)
    // 正常抛出数据的情况下进行抛出
    if (isLegalRouter(currentRouter)) {
      router.use(currentRouter.routes(), currentRouter.allowedMethods())
    }
  } 
})
// ========> 抛出路由对象 <=========
module.exports = router

