var webpack = require('webpack');
var path = require('path');

var configFactory = () => ({
  devtool: 'source-map',
  entry: {
    main: [
      'webpack-hot-middleware/client',
      path.resolve(__dirname, '../src/index.jsx')
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
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
    },
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
    }],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
});

module.exports = configFactory;
