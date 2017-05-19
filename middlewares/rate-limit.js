module.exports = function (app) {
  if (!require('../config/config').RATE_LIMIT_MIDDLEWARE) return;
  /**
   * Rate limit your API calls.
   */
  let limiter = require('../config/rate-limit');
  //  apply to all requests
  app.use(limiter);
  // OR only apply to requests that begin for ex with /api/
  // app.use('/api/', limiter);
}
