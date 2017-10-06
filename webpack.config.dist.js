var path = require('path')

module.exports = {
  entry: ['./src/NetParticles.js'],
  devServer: {
    contentBase: './src'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
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
  }
};