const router = require('koa-router')()
const userParamValidator = require('../validators/UserValidator')
const config = require('../config')
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
  let result
  let para = ctx.request.body
  console.log(para)
  const _validatorObj = userParamValidator.validatorLoginData(para)
  if (!_validatorObj.isValid) {
    result = returnMessage.setErrorResult(_validatorObj.errCode, _validatorObj.errMsg, null)
  } else {
    // 向服务端发起登陆请求
    result = await userService.loginByUserName(para)
    // 进行session处理
    if (result.success) {
      const _session = result.result
      _session.isLogin = true
      // 设置存储
      ctx.session = _session
      // 根据session内容查询sessionId
      const _returnSession = await userService.getLoginedSessionId({data: _session})
      // 获取sessionId之后返回给http请求
      result.result = {
        sessionId: _returnSession.success ? _returnSession.result.sessionId : ""// sessionId
      }
    }
  }
  // 返回结果
  ctx.body = result
  next()
})

// 获取用户信息
router.post('/getUserInfo', async (ctx, next) => {
  next()
  let result = {}
  const id = ctx.session.id
  result = await userService.getUserInfoByUserId(id)
  ctx.body = result
})

// demo
router.post('/error', async (ctx, next) => {
  // console.log(aaa)
  ctx.throw(400,'bad request')
  await next()
})

module.exports = router