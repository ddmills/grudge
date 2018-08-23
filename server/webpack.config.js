/* eslint-disable import/no-extraneous-dependencies */
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  node: {
    __dirname: false,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  externals: [nodeExternals()],
};
