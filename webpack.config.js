var path = require('path')

module.exports = {
  entry: ['./src/index.js'],
  devServer: {
    contentBase: './src'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'net-particles.js'
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
  }
};