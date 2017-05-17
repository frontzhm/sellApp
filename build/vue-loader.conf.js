var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
// add this line for loaderUtils.parseQuery() error
process.traceDeprecation = true
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  })
}
