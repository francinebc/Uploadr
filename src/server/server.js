const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const uploadRouter = require('./routes/upload');

const server = express();

server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

const compiler = webpack(webpackConfig);
server.use(devMiddleware(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath, stats: { colors: true },
}));
server.use(hotMiddleware(compiler));

server.use(express.static(path.resolve(__dirname, '../../dist')));
server.disable('x-powered-by');

server.use('/api/v1/', uploadRouter);

server.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

module.exports = server;