/**
 * Basic rate-limiting setup with express-rate-limit.
 *
 * Note: (from https://www.npmjs.com/package/express-rate-limit)
 * The `express-rate-limit` module does not share state with other
 * processes/servers by default. If you need a more robust solution,
 * I recommend adding the Redis Store or checking out strict-rate-limiter,
 * express-brute, or rate-limiter.
 * All are excellent pieces of software.
 */
let RateLimit = require('express-rate-limit');

let apiLimiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes
  max: 100, // limit to 100 request per window
  delayMs: 0 // disabled
});

module.exports = apiLimiter;
