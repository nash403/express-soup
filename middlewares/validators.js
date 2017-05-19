module.exports = function body(app) {
  if (!require('../config/config').VALIDATORS_MIDDLEWARE) return;
  /**
   * Form validator utilities.
   */
  const validator = require('express-validator');
  app.use(validator());
}
