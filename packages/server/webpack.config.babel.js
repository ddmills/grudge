/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import nodeExternals from 'webpack-node-externals';
import path from 'path';

dotenv.config();

export default {
  entry: {
    main: './src/main.js',
  },
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
        '@grudge/data',
      ],
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'GrudgeServer',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
};
