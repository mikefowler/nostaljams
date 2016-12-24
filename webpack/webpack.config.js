var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      path.resolve(__dirname, '../src/index.jsx'),
    ],
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/assets',
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
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
      use: ['style-loader', 'css-loader'],
      include: [
        path.resolve(__dirname, '../node_modules/react-dates/lib/css/_datepicker.css'),
      ],
    }],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
};
