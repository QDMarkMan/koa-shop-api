const router = require('koa-router')()
const RegionService = require('../service/RegionService')
const { uploadFile } = require('../utils/upload_file')
const { ReturnMessage } = require('../utils')

const returnMessage = new ReturnMessage()
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

// =======> 上传文件暂存到服务器  <========
router.post('/uploadFile', async (ctx, next) => {
  let result = {}
  next()
  // 上传文件事件
  const filePath = await uploadFile( ctx, {
    fileType: 'album'
  })
  result = returnMessage.setSuccessResult("上传图片成功", {filePath})
  ctx.body = result
})


module.exports = router