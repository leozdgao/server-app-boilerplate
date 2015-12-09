// 这里应该放一些环境的配置，比如端口号或者静态资源发布之类的
// 没有直接用json，因为考虑到一些配置可能需要一些逻辑计算才能得到
//
// 建议：在这里配置是环境变量中的某个值或者提供一个测试用的默认值，比如：
//
//   {
//     port: process.env['SITE_PORT'] || 3000
//   }

import path from 'path'

module.exports = {
  port: 3000,
  publicPath: path.join(__dirname, 'dist')
}
