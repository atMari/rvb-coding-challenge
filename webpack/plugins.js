var path = require('path');
var util = require('util');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var webpack = require('webpack');
var pkg = require('../package.json');

var commonBundle = path.join('js', util.format('common.%s.js', pkg.version));
var cssBundle = path.join('css', util.format('app.%s.css', pkg.version));

var plugins = [];

if(!process.env.NODE_ENV) {
  throw new Error("NODE_ENV must be defined.");
}

plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }
  })
);

if (process.env.NODE_ENV === 'production') {
  console.log("PROD ENV DETECTED, ADDING PROD PLUGINS");
  plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin(cssBundle, {
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin(commonBundle),
    new webpack.NoErrorsPlugin()
  );
}

if (process.env.NODE_ENV === 'local') {
  console.log("LOCAL ENV DETECTED, ADDING LOCAL PLUGINS");
  plugins.push(
  new DashboardPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
  );
}

module.exports = plugins;
