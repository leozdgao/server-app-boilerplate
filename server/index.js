// 初始化应用的地方，这里应该是一些web server的监听或者数据库的连接之类的逻辑

import chalk from 'chalk'
import env from '../config/environment'
import app from './server'

const port = env.port

app.listen(port, _ => {
  console.log(chalk.blue(`Server is listening port ${port}`))
})

// 这里除了让app开始监听外，如果需要数据库之类的模块，也应该在这里统一初始化
//

// 防止进程因为异常而退出
process.on('uncaughtException', err => {
  console.error(chalk.red('Caught a fatal exception: ' + err.message))
})
