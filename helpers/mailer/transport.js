let config = require('../../config/config')
let nodemailer = require('nodemailer')
let bunyan = require('bunyan')

// create a defaultTransport using gmail and authentication that are
// stored in the `config.js` file.
let defaultTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.mailer.auth.user,
    pass: config.mailer.auth.pass
  },
  logger: bunyan.createLogger({
      name: 'nodemailer'
  }),
  debug: true // include SMTP traffic in the logs
})

module.exports = defaultTransport
