// 初始化应用的地方，这里应该是一些web server的监听或者数据库的连接之类的逻辑

import env from '../config/environment'
import app from './server'

const port = env.port

app.listen(port, _ => {
  console.log(`Server is listening port ${port}`)
})

// 这里除了让app开始监听外，如果需要数据库之类的模块，也应该在这里统一初始化
