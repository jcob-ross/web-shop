const path = require('path');

const webpack = require('webpack');
const helpers = require('./helpers');

const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const GlobalStyles = new ExtractTextPlugin('css/global.css')

module.exports = {
  entry: {
    'app_polyfills':    './Client/app_polyfills.ts',
    'app_vendor':       './Client/app_vendor.ts',
    'app':              './Client/app_entry.ts',

    'admin_polyfills':  './Client/admin_polyfills.ts',
    'admin_vendor':     './Client/admin_vendor.ts',
    'admin':            './Client/admin_entry.ts'
  },

  resolve: {
    extensions: ['', '.ts', '.js', '.json', 'css', '.scss', 'html'],
    root: helpers.root('Client'),
    modulesDirectories: ['node_modules'],
  },

  module: {

    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular'),
          helpers.root('node_modules/@ngrx'),
          helpers.root('node_modules/@angular2-material'),
        ]
      }
    ],

    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript', 'angular2-template'],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      { test: /global.scss$/, loader: GlobalStyles.extract(['css?sourceMap', 'postcss', 'sass?sourceMap']), include: path.resolve('Client/styles') },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'to-string!css' },
      { test: /\.scss$/, loader: 'to-string!css?sourceMap!postcss!sass?sourceMap', exclude: path.resolve('Client/styles') },
      { test: /\.html$/, loader: 'raw' }
    ],
    noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/, /angular2-polyfills\.js/]
  },

  plugins: [    
    new ForkCheckerPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'admin_commons',
      minChunks: 2,
      chunks: ['admin', 'admin_vendor', 'admin_polyfills']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app_commons',
      minChunks: 2,
      chunks: ['app', 'app_vendor', 'app_polyfills']
    }),
    new webpack.ProvidePlugin({
      $: 'jQuery',
      jQuery: 'jQuery'
    }),
    GlobalStyles,
    new ExtractTextPlugin('css/[name].css'),
    new CopyWebpackPlugin([{
      from: 'Client/public',
      to: '.'
    }]),
  ],
  
  postcss: [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ],

  sassLoader: {
    outputStyle: 'compressed',
    precision: 10,
    sourceComments: false
  },

  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};