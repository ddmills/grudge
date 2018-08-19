const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackPwaManifestPlugin = require('webpack-pwa-manifest');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path');

const isDebug = process.env.NODE_ENV === 'development';

module.exports = {
  output: {
    publicPath: '/client'
  },
  devtool: 'eval-source-map',
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
        }
      ],
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
      name: 'Otter',
      short_name: 'Otter',
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
