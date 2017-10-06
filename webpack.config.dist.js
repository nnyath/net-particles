var path = require('path')
var UglifyPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: ['./src/NetParticles.js'],
  devServer: {
    contentBase: './src'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'NetParticles.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins:[
    new UglifyPlugin
  ]
};