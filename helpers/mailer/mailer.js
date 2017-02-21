let nodemailer = require('nodemailer');
let emailTemplates = require('email-templates');
let path = require('path');
let config = require('../../config/config');
let defaultTransport = require('./transport');

const templatesDir = path.resolve(__dirname, '..', '..', 'views', 'mailer');
const EmailAddressRequiredError = new Error('email address required');
const EmailSubjectRequiredError = new Error('email subject required');

module.exports.sendOne = function (templateName, locals, cb) {
  // make sure that we have an user email
  if (!locals.email) {
    return cb(EmailAddressRequiredError);
  }
  // make sure that we have a subject
  if (!locals.subject) {
    return cb(EmailSubjectRequiredError);
  }
  emailTemplates(templatesDir, function (err, template) {
    if (err) {
      //console.log(err);
      return cb(err);
    }
    // Send a single email.
    // templateName can be 'password_reset' for example. See the ~/views/mailer/password_reset
    template(templateName, locals, function (err, html, text) {
      if (err) {
        //console.log(err);
        return cb(err);
      }
      // if we are testing don't send out an email instead return
      // success and the html and txt strings for inspection
      if (process.env.NODE_ENV === 'test') {
        return cb(null, '250 2.0.0 OK 1350452502 s5sm19782310obo.10', html, text);
      }
      let transport = defaultTransport
      transport.sendMail({
        from: config.mailer.defaultFromAddress,
        to: locals.email,
        subject: locals.subject,
        html: html,
        // generateTextFromHTML: true,
        text: text
      }, function (err, responseStatus) {
        if (err) {
          return cb(err);
        }
        return cb(null, responseStatus.message, html, text);
      })
    }) // template
  }) // emailTemplates
}
