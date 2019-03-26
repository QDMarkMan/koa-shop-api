const router = require('koa-router')()
const RegionService = require('../service/RegionService')
// 返回数据拼接处理
// 服务层
const regionService = new RegionService()
router.prefix('/api/common')
// =======> 获取城区列表接口  <========
router.post('/getRegionList', async (ctx, next) => {
  next()
  let { regionId } = ctx.request.body
  if (regionId === undefined) regionId = 0
  let result = {}
  result = await regionService.getRegionList(regionId)
  ctx.body = result
})

module.exports = router