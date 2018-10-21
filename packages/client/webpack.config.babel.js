/* eslint-disable import/no-extraneous-dependencies */
import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import WebpackPwaManifestPlugin from 'webpack-pwa-manifest';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import path from 'path';

const isDebug = process.env.NODE_ENV === 'development';

export default {
  output: {
    publicPath: '/client/',
  },
  devtool: isDebug ? 'eval-source-map' : 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  stats: {
    children: false,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
          loader: isDebug ? 'style-loader' : MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: isDebug,
            localIdentName: '[name]-[local]-[hash:base64:6]',
          },
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [
              './src/styles',
            ],
          },
        }, {
          loader: 'postcss-loader',
        }],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: !isDebug,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: path.resolve('src/meta/favicon.ico'),
    }),
    new MiniCssExtractPlugin(),
    new WebpackPwaManifestPlugin({
      name: 'Grudge',
      short_name: 'Grudge',
      start_url: '.',
      background_color: '#bee9ff',
      lang: 'en-US',
      scope: '/',
      theme_color: '#ff6347',
      icons: [
        {
          src: path.resolve('src/meta/icons/icon-128x128.png'),
          sizes: '128x128',
          type: 'image/png',
        },
        {
          src: path.resolve('src/meta/icons/icon-512x512.png'),
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    }),
  ],
};
