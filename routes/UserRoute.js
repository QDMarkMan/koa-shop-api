const router = require('koa-router')()
const { validatorRegisterData } = require('../validators/UserValidator')
const UserService = require('../service/UserServie')
const ReturnMessage = require('../utils/message')
// 返回数据拼接处理
const returnMessage = new ReturnMessage()
// 服务曾
const userService = new UserService()
router.prefix('/api/user')
// =======> 注册接口  <========
router.post('/register', async (ctx, next) => {
  const para = ctx.request.body
  let result = {}
  // 加如ip参数
  para.ip = ctx.ip
  // 验证器对象
  const _validatorObj = validatorRegisterData(para)
  try {
    // =======> 数据验证  <========
    if (!_validatorObj.isValid) {
      result = returnMessage.setErrorResult(_validatorObj.errCode, _validatorObj.errMsg, null)
    } else {
      // 数据校验完成 交给service处理
      result = await userService.createUser(para)
    }
  } catch (error) {
    result = returnMessage.set500Result()
  }
  // 返回结果
  ctx.body = result
})

module.exports = router