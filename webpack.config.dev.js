var path = require('path')

module.exports = {
  entry: ['./demo/index.js'],
  devServer: {
    contentBase: './demo'
  },
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: 'NetParticles.js',
    libraryTarget:'commonjs2'
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
};