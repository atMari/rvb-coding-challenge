var path = require('path');
var pkg = require('../package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var DEBUG = process.env.NODE_ENV === 'local';
var TEST = process.env.NODE_ENV === 'test';

var sassLoader;
var fileLoader = 'file-loader?name=[path][name].[ext]';
var htmlLoader = [
  'file-loader?name=[path][name].[ext]',
  'template-html-loader?' + [
    'raw=true',
    'engine=lodash',
    'version=' + pkg.version,
    'title=' + pkg.name,
    'debug=' + DEBUG
  ].join('&')
].join('!');
var jsonLoader = ['json-loader'];
var fontUrlLoader = 'url-loader?limit=10000&minetype=application/font-woff';

var sassParams = [
  'outputStyle=expanded'
];

if (DEBUG || TEST) {
  sassParams.push('sourceMap', 'sourceMapContents=true');
  sassLoader = [
    'style-loader',
    'css-loader',
    'postcss-loader',
    'resolve-url-loader',
    'sass-loader?sourceMap' + sassParams.join('&')
  ].join('!');
} else {
  sassLoader = ExtractTextPlugin.extract('style-loader', [
    'css-loader',
    'postcss-loader',
    'resolve-url-loader',
    'sass-loader?' + sassParams.join('&')
  ].join('!'));
}

var loaders = [
  {
    test: /-test.js(x|)*/,
    exclude: /(node_modules)/,
    loader: 'babel-loader'
  },
  {
    test: /\.js(x|)?$/,
    exclude: /(-test*)/,
    loaders: TEST ? ['babel-loader', 'isparta'] : ['babel-loader'],
    include: [
      path.resolve(__dirname, '../app/'),
      path.resolve(__dirname, '../node_modules/react-native-storage/'),
    ],
  },
  {
    test: /\.css$/,
    loader: 'style!css!postcss'
  },
  { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: fontUrlLoader
  },
  {
    test: /\.(jpe?g|gif|png|ico|svg|eot|ttf)(\?.*$|$)/,
    loader: fileLoader
  },
  {
    test: /\.json$/,
    exclude: /node_modules/,
    loaders: jsonLoader
  },
  {
    test: /\.html$/,
    loader: htmlLoader
  },
  {
    test: /\.scss$/,
    loader: sassLoader
  }
];

module.exports = loaders;
