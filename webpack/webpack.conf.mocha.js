const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  resolve: {
    extensions: ['.js']
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
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV_MOCHA: true
    })
  ],
};