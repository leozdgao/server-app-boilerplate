import { HotModuleReplacementPlugin, DefinePlugin } from 'webpack'
import _ from 'lodash'
import env from '../environment'
import { parseEntry } from './helper'

// #DONE:40 解析enties对象 +webpack
const hmrClient = 'webpack-hot-middleware/client'
const composeHmr = entry => [ hmrClient, entry ]
let entries = parseEntry() // 返回一个字符串或者是对象
if (_.isString(entries)) {
  entries = composeHmr(entries)
}
else {
  entries = _.reduce(entries, (acc, val, key) => {
    acc[key] = composeHmr(val)
    return acc
  }, {})
}

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: entries,
  output: {
    path: env.publicPath,
    filename: '[name].js',
    publicPath: '/static/'
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env': JSON.stringify('development')
    })
  ],
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: 'style!css?importLoaders=2&sourceMap!autoprefixer?browsers=last 2 versions!less',
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        loader: 'style!css?importLoaders=1&sourceMap!autoprefixer?browsers=last 2 versions',
        exclude: /node_modules/
      },
      // #TODO:0 为其他类型文件添加loader，比如字体文件，或者图片等 +webpack @dev
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  }
}
