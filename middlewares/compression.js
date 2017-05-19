module.exports = function compression(app) {
  if (!require('../config/config').COMPRESSION_MIDDLEWARE) return;
  /**
   * Optimize your app by compressing all your responses
   */
  const compression = require('compression');
  app.use(compression());
}
