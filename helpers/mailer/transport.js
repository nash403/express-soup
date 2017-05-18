let config = require('../../config/config');
let nodemailer = require('nodemailer');
let nodemailerLogger = require('../logger').nodemailerLogger;

// create a defaultTransport using gmail and authentication that are
// stored in the `config.js` file.
let defaultTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.mailer.auth.user,
    pass: config.mailer.auth.pass
  },
  logger: nodemailerLogger,
  debug: true // include SMTP traffic in the logs
})

module.exports = defaultTransport;
