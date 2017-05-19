module.exports = function (app) {
  if (!require('../config/config').SESSIONS_MIDDLEWARE) return;
  /**
   * Session middleware
   */
  const session = require('express-session');
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || 'The secret should be in your .env file!',
    cookie: {maxAge: 15 * 24 * 3600 * 1000},
    unset: 'destroy'
    // Setup your session store
    /*store: new MongoStore({
      url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
      autoReconnect: true
    })*/
  }));
}
