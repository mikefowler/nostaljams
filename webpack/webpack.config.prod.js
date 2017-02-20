/* eslint-disable no-var, import/no-extraneous-dependencies */

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    main: path.resolve(__dirname, '../src/index.jsx'),
    auth: path.resolve(__dirname, '../src/auth.js'),
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name]-[chunkhash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
        },
      }],
      exclude: [/node_modules/],
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      }),
    }],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new CleanWebpackPlugin(['build']),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.NoErrorsPlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('styles-[contenthash].css'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/templates/index.html'),
      excludeChunks: ['auth'],
    }),
    new HtmlWebpackPlugin({
      chunks: ['auth'],
      template: path.resolve(__dirname, '../src/templates/spotify.html'),
      filename: 'oauth/spotify.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['auth'],
      template: path.resolve(__dirname, '../src/templates/lastfm.html'),
      filename: 'oauth/lastfm.html',
    }),
  ],
};
