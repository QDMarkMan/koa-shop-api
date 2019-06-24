const router = require('koa-router')()
const userParamValidator = require('../validators/UserValidator')
const UserService = require('../service/UserServie')
const ReturnMessage = require('../utils/message')
const config = require('../config')
const JWT = require('jsonwebtoken')
const { getPaloadFromJWT } = require('../public/RoutePublic')
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
  console.log(ctx.request);
  console.log(para)
  // ctx.set('Access-Control-Allow-Credentials', "true") 
  const _validatorObj = userParamValidator.validatorLoginData(para)
  if (!_validatorObj.isValid) {
    result = returnMessage.setErrorResult(_validatorObj.errCode, _validatorObj.errMsg, null)
  } else {
    // 向服务端发起登陆请求
    result = await userService.loginByUserName(para)
    // 进行session处理
    if (result.success) {
      const _session = result.result
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

router.post('/loginByJWT', async (ctx, next) => {
  let result
  let para = ctx.request.body
  const _validatorObj = userParamValidator.validatorLoginData(para)
  if (!_validatorObj.isValid) {
    result = returnMessage.setErrorResult(_validatorObj.errCode, _validatorObj.errMsg, null)
  } else {
    // 向服务端发起登陆请求
    result = await userService.loginByUserName(para)
    // 进行session处理
    if (result.success) {
      // console.log(result);
      const token = JWT.sign({
        userId: result.result.id,
      }, config.jwt_key,  { expiresIn: '12h' }
      )
      // 生成返回token
      result.result = {
        token,// token
      }
    }
  }
  // 返回结果
  ctx.body = result
  next()
})
// =======> 退出登陆接口  <========
router.post('/logout', async(ctx, next) => {
  next()
  let result = {}
  // 拿到用户id
  const _sessionId = ctx.header.key
  result = await userService.logoutByUserId(_sessionId)
  // 清楚上下文中的session
  if (result.success) {
    ctx.session = null
  }
  ctx.body = result
})
// 获取用户信息
router.post('/getUserInfo', async (ctx, next) => {
  next()
  // 获取到当前token中的payload
  const payload = getPaloadFromJWT(ctx)
  let result = {}
  const {userId} = payload
  result = await userService.getUserInfoByUserId(userId)
  ctx.body = result
})


// 获取用户信息
router.post('/getUsers', async (ctx, next) => {
  next()
  let result = {}
  result = await userService.getUserList()
  ctx.body = result
})

// 分页查询用户
router.post('/getUsersByPage', async (ctx, next) => {
  next()
  let result = {}
  const {pageNo, pageSize} = ctx.request.body
  const para = ctx.request.body
  delete para.pageNo
  delete para.pageSize
  result = await userService.getUserListBypage(para, pageNo, pageSize)
  ctx.body = result
})

// 更新用户
router.post('/editUser', async (ctx, next) => {
  next()
  let para = ctx.request.body
  let result = {}
  if (!para.id) {
    // 通过ctx抛出简单的参数错误
     return ctx.throw(400,'请输入用户id')
  }
  result = await userService.updateUserInfo(para)
  ctx.body = result
})

// demo
router.post('/error', async (ctx, next) => {
  // console.log(aaa)
  ctx.throw(400,'bad request')
  await next()
})

module.exports = router