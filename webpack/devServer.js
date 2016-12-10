const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.js')();
const createWebpackMiddleware = require('webpack-dev-middleware');
const createWebpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');

const compiler = webpack(config);
const app = express();
app.use('/', express.static(path.resolve(__dirname, '../public')));
const webpackDevMiddleware = createWebpackMiddleware(compiler, {
  quiet: true,
  noInfo: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  publicPath: config.output.publicPath,
});
app.use(webpackDevMiddleware);
app.use(createWebpackHotMiddleware(compiler));
app.listen(8080, () => console.log('App listening on http://localhost:8080'));
