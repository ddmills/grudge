/* eslint-disable import/no-extraneous-dependencies */
import nodeExternals from 'webpack-node-externals';
import NodemonPlugin from 'nodemon-webpack-plugin';
import path from 'path';

export default {
  entry: [
    './src/main.js',
  ],
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
  externals: [
    nodeExternals({
      whitelist: [
        '@grudge/domain',
        '@grudge/api-events',
      ],
    }),
  ],
  plugins: [
    new NodemonPlugin({
      args: ['--color'],
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },
};
