/* eslint-disable no-var, vars-on-top, object-shorthand, quote-props */
require('react-hot-loader/patch');
var path = require('path');
var util = require('util');
var autoprefixer = require('autoprefixer');
var pkg = require('../package.json');

var loaders = require('./loaders');
var plugins = require('./plugins');

var entry;
var DEBUG = process.env.NODE_ENV === 'local';
var TEST = process.env.NODE_ENV === 'test';

var jsBundle = path.join('js', util.format('[name].%s.js', pkg.version));

if (DEBUG || TEST) {
  entry = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${pkg.config.devPort}`,
    'webpack/hot/only-dev-server',
    './entry.dev.jsx'
  ];
}
else {
  entry = {
    index: ['babel-polyfill', './entry.prod.jsx']
  };
}

var config = {
  context: path.join(__dirname, '../app'),
  cache: DEBUG,
  debug: DEBUG,
  watch: DEBUG,
  target: 'web',
  devtool: DEBUG || TEST ? 'inline-source-map' : false,
  entry: entry,
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/',
    filename: jsBundle,
  },
  module: {
    loaders: loaders
  },
  postcss: [
    autoprefixer
  ],
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  },
    externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};

module.exports = config;
