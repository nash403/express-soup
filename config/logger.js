const bunyan = require('bunyan');

// Main logger
exports.appLogger = bunyan.createLogger({
   name: "app"
});

// Nodemailer Logger
exports.nodemailerLogger = bunyan.createLogger({
   name: "nodemailer"
});

module.exports = exports;
