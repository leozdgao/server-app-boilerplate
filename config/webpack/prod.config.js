// #DONE:20 webpack生产模式配置 +webpack
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import AssetsPlugin from 'assets-webpack-plugin'
import env from '../environment'
import { parseEntry } from './helper'

module.exports = {
  devtool: 'source-map',
  entry: parseEntry(),
  output: {
    path: env.publicPath,
    filename: '[chunkhash].js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new ExtractTextPlugin('[chunkhash].css'),
    new AssetsPlugin({
      path: env.publicPath,
      filename: 'assets-client.json'
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
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2&sourceMap!autoprefixer?browsers=last 2 versions!less'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1&sourceMap!autoprefixer?browsers=last 2 versions'),
        exclude: /node_modules/
      },
      // #TODO:10 为其他类型文件添加loader，比如字体文件，或者图片等 +webpack @prod
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },
  externals: {
    // 一些vendors，建议将它们额外打包
  }
}
