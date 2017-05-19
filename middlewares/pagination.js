module.exports = function (app) {
  if (!require('../config/config').PAGINATION_MIDDLEWARE) return;
  /**
   * Utilities to manage pagination
   */
  const paginate = require('express-paginate');
  app.use(paginate.middleware(10,50));
}
