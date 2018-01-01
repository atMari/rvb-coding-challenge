require('./devApi/devApi');

var util = require('util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var pkg = require('../../package.json');

var port = pkg.config.devPort;
var apiPort = pkg.config.apiPort;
var host = pkg.config.devHost;

var configPath = process.argv[2] || '../config';
var config = require(configPath);

new WebpackDevServer(webpack(config), {
    proxy: {
      "/config.json" : `http://localhost:${apiPort}`
    },
    publicPath: config.output.publicPath,
    inline: true,
    historyApiFallback: true,
    quiet: true,
    hot: true,
  }).listen(port, host, function (err) {
  if (err) { console.log(err); }
  var url = util.format('http://%s:%d', host, port);
  console.log('Listening for assets at %s', url);
});
