/**
 * Basic rate-limiting setup.
 * install express-rate-limit and `require` this file
 * wherever in your application to activate limitation.
 *
 * Note: (from https://www.npmjs.com/package/express-rate-limit)
 * The `express-rate-limit` module does not share state with other
 * processes/servers by default. If you need a more robust solution,
 * I recommend adding the Redis Store or checking out strict-rate-limiter,
 * express-brute, or rate-limiter.
 * All are excellent pieces of software.
 */
module.exports = function rateLimit(app) { // pass express application object
  let RateLimit = require('express-rate-limit');

  let apiLimiter = new RateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 100,
    delayMs: 0 // disabled
  });

  //  apply to all requests
  app.use(limiter);
  // OR only apply to requests that begin for ex with /api/
  // app.use('/api/', apiLimiter);
}
