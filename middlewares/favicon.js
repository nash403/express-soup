module.exports = function (app) {
  /**
   * Middleware to serve a favicon.ico. The favicon file must exist
   */
  const path = require('path');
  const config = require('../config/config');
  const favicon = require('serve-favicon');
  app.use(favicon(path.join(config.publicDirectory, 'favicon.ico')))
}
