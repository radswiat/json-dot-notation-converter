const path = require('path');

module.exports = {
  target: 'node',
  entry: ['./src/main.js'],
  resolve: {
    extensions: ['.js']
  },
  output: {
    filename: 'JsonDotNotationConverter.js',
    path: path.resolve(process.cwd(), 'dist'),
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          // 'eslint-loader'
        ],
        include: [
          path.resolve('src')
        ]
      }
    ]
  }
};