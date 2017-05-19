module.exports = function (app) {
  if (!require('../config/config').PASSPORT_MIDDLEWARE) return;
  /**
   * Load passport configuration
   */
  const passport = require('passport');
  require('../config/passport').configure();
  app.use(passport.initialize());
  app.use(passport.session());
}
