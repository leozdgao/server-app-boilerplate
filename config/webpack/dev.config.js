/* eslint-disable */
var path = require('path')
var webpack = require('webpack')
var config = require('../environment')

// #TODO:0 parse entry point +webpack
// var entry = parseEntry()

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: config.publicPath,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
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
      }
    ]
  }
}
