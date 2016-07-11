const helpers = require('./helpers');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html'],
    root: helpers.root('Client'),
  },

  module: {
    preLoaders: [
      { test: /\.ts$/, loader: 'tslint-loader', exclude: [helpers.root('node_modules')] },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
        // these packages have problems with their sourcemaps
        helpers.root('node_modules/rxjs'),
        helpers.root('node_modules/@angular')
      ]}
    ],

    loaders: [
      {
        test: /\.ts$/, loader: 'awesome-typescript', exclude: [/\.e2e\.ts$/],
        query: {
          compilerOptions: {
            // Remove TypeScript helpers to be injected
            // below by DefinePlugin
            removeComments: true
          }
        }
      },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loaders: 'null' },
      { test: /\.scss$/, loaders: 'null' },
      { test: /\.html$/, loader: 'null' }
    ],

    postLoaders: [
      {
        test: /\.(js|ts)$/, loader: 'istanbul-instrumenter',
        include: helpers.root('Client'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  },

  plugins: [
    new DefinePlugin({
    'ENV': JSON.stringify(ENV),      
    'process.env': {
      'ENV': JSON.stringify(ENV),
      'NODE_ENV': JSON.stringify(ENV)       
    }})
  ],

  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'Client'
  },

  node: {
    global: 'window',
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};