import express from 'express'

// constants
const node_env = process.env['NODE_ENV']
const __IS_PROD__ = node_env === 'production'
const __IS_DEV__ = !__IS_PROD__

const app = express()


export default app
