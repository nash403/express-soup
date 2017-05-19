module.exports = function (app) {
  if (!require('../config/config').COOKIES_MIDDLEWARE) return;
  /**
   * Cookies middleware
   */
  const cookieParser = require('cookie-parser');
  app.use(cookieParser());
}
