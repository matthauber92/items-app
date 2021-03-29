/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
// const path = require('path');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: './.env-dev',
    }),
    // new BundleAnalyzerPlugin(),
    // new webpack.ContextReplacementPlugin(/moment[\\]locale$/, /^\.\/(en)$/),
  ],
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 44344,
    hot: true,
    publicPath: '/',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    historyApiFallback: true,
  },
  output: {
    // path: path.join(__dirname, 'dist'),
    publicPath: '/',
    // filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    },
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
    },
    ],
  },
});
