const path = require('path');

/*
 * Here, put the global config for your app.
 * Unlike the .env file that depends on your environment, in this file you should
 * put configs that is common wherever the app is installed.
 *
 * NOTE: Try to limit dependencies to other modules in this file as it may be
 * required anywhere in the app.
 */
module.exports = {
  mailer: {
    auth: {
      user: 'test@example.com',
      pass: 'secret',
    },
    defaultFromAddress: 'First Last <test@examle.com>'
  },
  logDirectory: path.join(__dirname,'..', 'logs'),
  uploadDirectory: path.join(__dirname,'..', 'uploads_tmp'),
  publicDirectory: path.join(__dirname,'..', 'public'),
  indexingDirectory: path.join(__dirname,'..', 'ftp'),

  COMPRESSION_MIDDLEWARE: true,
  STATIC_MIDDLEWARE: true,
  RATE_LIMIT_MIDDLEWARE: false,
  MONITOR_MIDDLEWARE: false,
  VALIDATORS_MIDDLEWARE: false,
  COOKIES_MIDDLEWARE: false,
  SESSIONS_MIDDLEWARE: false,
  PASSPORT_MIDDLEWARE: false,
  FLASH_MIDDLEWARE: false,
  PAGINATION_MIDDLEWARE :false
}
