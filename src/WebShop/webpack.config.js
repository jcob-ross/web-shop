// Look in ./Client/config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./Client/config/webpack.prod');
    break;
  case 'test':
  case 'testing':
    module.exports = require('./Client/config/webpack.test');
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./Client/config/webpack.dev');
}