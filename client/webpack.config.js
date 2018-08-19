const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDebug = process.env.NODE_ENV === 'development';

module.exports = {
  output: {
    publicPath: '/client'
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
    }),
    new MiniCssExtractPlugin(),
  ],
};
