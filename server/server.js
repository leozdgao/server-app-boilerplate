import express from 'express'
import fp from 'path'
import env, { __IS_PROD__ } from '../config/environment'
import cgiHandler from './helper/cgiHandler'

const app = express()

// #TODO:4 配置模板引擎 +server
app.set('view engine', 'hbs')
app.set('views', env.entriesDirectory)

// 建议将静态文件发布到CDN，或通过nginx来host
// 如果不需要node来host静态文件，直接删除这个部分
// app.use('/assets', express.static(path_of_assets)

// #DONE:0 为server端代码添加webpack dev的中间件 +server
// 开发模式下，添加webpack的hmr中间件
if (!__IS_PROD__) {
  const webpack = require('webpack')
  const config = require('../config/webpack/dev.config.js')
  const compiler = webpack(config)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }))

  app.use(require('webpack-hot-middleware')(compiler))
}

app.use(cgiHandler({
  index: 'home',
  routerPath: fp.join(__dirname, './router')
}))

app.use((req, res, next) => {
  // 404 handler
  res.status(404).json({ msg: 404 })
})

// 处理web server运行中的异常
app.use((err, req, res, next) => {
  res.status(500).json({ msg: err.message })
})

export default app
