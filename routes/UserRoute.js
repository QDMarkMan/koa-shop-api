const router = require('koa-router')()
const userParamValidator = require('../validators/UserValidator')
const UserService = require('../service/UserServie')
const ReturnMessage = require('../utils/message')
// 返回数据拼接处理
const returnMessage = new ReturnMessage()
// 服务曾
const userService = new UserService()
router.prefix('/api/user')
// =======> 注册接口  <========
router.post('/register', async (ctx, next) => {
  let para = ctx.request.body
  let result = {}
  // 加如ip参数
  para.ip = ctx.ip
  // 验证器对象
  const _validatorObj = userParamValidator.validatorRegisterData(para)
  // =======> 数据验证  <========
  if (!_validatorObj.isValid) {
    result = returnMessage.setErrorResult(_validatorObj.errCode, _validatorObj.errMsg, null)
    // return ctx.throw(_validatorObj.errCode, _validatorObj.errMsg)
  } else {
    // 数据校验完成 交给service处理
    result = await userService.createUser(para)
  }
  // 返回结果
  ctx.body = result
  next()
})
// =======> 登陆接口  <========
router.post('/login', async (ctx, next) => {
  let para = ctx.request.body
  console.log(para)
  const _validatorObj = userParamValidator.validatorLoginData(para)
  if (!_validatorObj.isValid) {
    result = returnMessage.setErrorResult(_validatorObj.errCode, _validatorObj.errMsg, null)
  }
  // 返回结果
  ctx.body = result
})

// demo
router.post('/error', async (ctx, next) => {
  // console.log(aaa)
  ctx.throw(400,'bad request')
  await next()
})

module.exports = router