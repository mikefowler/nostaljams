/* eslint-disable no-var, import/no-extraneous-dependencies */

import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const ENV = process.env.NODE_ENV || 'development';

module.exports = {

  context: path.resolve(__dirname, 'src'),

  entry: ['./index.jsx', './auth.js'],

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets',
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'react': 'preact-compat/dist/preact-compat.js', // eslint-disable-line quote-props
      'react-dom': 'preact-compat/dist/preact-compat.js',
    },
  },

  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [{
          loader: 'babel-loader',
        }],
        exclude: [/node_modules/],
      },
      {
        test: '/.json$/',
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        loader: ENV === 'production' ? 'file-loader' : 'url-loader',
      },
    ],
  },

  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

  plugins: ([

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.EnvironmentPlugin(['NODE_ENV']),

    new webpack.NoEmitOnErrorsPlugin(),

  ]).concat(ENV === 'production' ? [

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    new CleanWebpackPlugin(['build']),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.EnvironmentPlugin(['NODE_ENV']),

    new webpack.NoEmitOnErrorsPlugin(),

    // new webpack.optimize.UglifyJsPlugin({
    //   output: {
    //     comments: false,
    //     compress: {
    //       warnings: false,
    //       conditionals: true,
    //       unused: true,
    //       comparisons: true,
    //       sequences: true,
    //       dead_code: true,
    //       evaluate: true,
    //       if_return: true,
    //       join_vars: true,
    //       negate_iife: false,
    //     },
    //   },
    // }),

    new ExtractTextPlugin('styles-[contenthash].css'),

    new HtmlWebpackPlugin({
      template: './templates/index.html',
      excludeChunks: ['auth'],
    }),

    new HtmlWebpackPlugin({
      chunks: ['auth'],
      template: './templates/auth.html',
      filename: 'oauth/spotify.html',
    }),

    new HtmlWebpackPlugin({
      chunks: ['auth'],
      template: './templates/auth.html',
      filename: 'oauth/lastfm.html',
    }),

  ] : []),
};
