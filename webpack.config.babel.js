/* eslint-disable no-var, import/no-extraneous-dependencies */

import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const ENV = process.env.NODE_ENV || 'development';

module.exports = {

  context: path.resolve(__dirname, 'src'),

  entry: {
    app: './index.jsx',
    auth: './auth.js',
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
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
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(xml|txt|md)$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        loader: ENV === 'production' ? 'file-loader' : 'url-loader',
      },
    ],
  },

  plugins: ([

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
    }),

    new ExtractTextPlugin({
      filename: 'styles-[contenthash].css',
      disable: ENV !== 'production',
    }),

    new HtmlWebpackPlugin({
      template: './templates/index.html',
      excludeChunks: ['auth'],
      minify: { collapseWhitespace: true },
    }),

    new HtmlWebpackPlugin({
      chunks: ['auth'],
      template: './templates/auth.html',
      filename: 'auth/spotify.html',
      minify: { collapseWhitespace: true },
    }),

    new HtmlWebpackPlugin({
      chunks: ['auth'],
      template: './templates/auth.html',
      filename: 'auth/lastfm.html',
      minify: { collapseWhitespace: true },
    }),

  ]).concat(ENV === 'production' ? [

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),

    new CleanWebpackPlugin(['build']),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false,
      },
      comments: false,
    }),

  ] : []),

  stats: { colors: true },

  devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

  devServer: {
    port: process.env.PORT || 8080,
    host: 'localhost',
    colors: true,
    publicPath: '/',
    contentBase: './src',
    historyApiFallback: true,
  },
};
