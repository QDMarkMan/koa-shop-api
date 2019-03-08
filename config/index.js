const confman = require('confman')

const mode = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
const configPath = `${__dirname}/config.${mode}`
const config = confman.load(configPath)
module.exports = config