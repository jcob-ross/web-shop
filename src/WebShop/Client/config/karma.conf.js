
module.exports = function(config) {
  var testWebpackConfig = require('./webpack.test.js');

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [ ],
    files: [ { pattern: './Client/config/spec.bundle.js', watched: false } ],
    preprocessors: { './Client/config/spec.bundle.js': ['coverage', 'webpack', 'sourcemap'] },
    webpack: testWebpackConfig,
     
    coverageReporter: {
      dir : 'coverage/client',
      reporters: [
        { type: 'text-summary' },
        { type: 'json' },
        { type: 'html' }
      ]
    },

    webpackServer: { noInfo: true },
    webpackMiddleware: {
      stats: 'errors-only' // disables console spam by webpack
    },

    reporters: [ 'mocha', 'coverage' ],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    browsers: [
      // 'Chrome'
      'PhantomJS'
    ]
  });
};