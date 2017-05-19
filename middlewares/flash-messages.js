module.exports = function (app) {
  if (!require('../config/config').FLASH_MIDDLEWARE) return;
  /**
   * Add support for flash messages
   */
  const flash = require('connect-flash');
  app.use(flash());
}
