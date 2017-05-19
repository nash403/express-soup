module.exports = function logger(app) {
  /**
   *  Setup the logger
   */
  const morgan = require('morgan');
  let logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
  // Uncomment following lines to enable log rotation
  if (process.env.LOGROTATION_ACTIVATE === 'true') {

    const fs = require('fs');
    const rfs = require('rotating-file-stream');
    let logDirectory = config.logDirectory;

    // ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    let generator = function generator(time, index) {
      if(!time)
          return `${process.env.LOGROTATION_FILENAME || 'access'}.log`;

      function pad(num) {
        return (num > 9 ? "" : "0") + num;
      }

      let day    = pad(time.getDate());
      let date  = `${time.getFullYear()}-${pad(time.getMonth() + 1)}-${day}`;
      let hour   = pad(time.getHours());
      let minute = pad(time.getMinutes());

      return `${process.env.LOGROTATION_FILENAME || 'access'}-${date}-${hour}hh${minute}mm.${index > 1 ? index +'.' : ''}log.gz`;
    }

    // create a rotating write stream
    let accessLogStream = rfs(generator, {
      interval: process.env.LOGROTATION_INTERVAL,
      size: process.env.LOGROTATION_SIZE,
      compress: process.env.LOGROTATION_COMPRESSION,
      path: logDirectory
    })
    app.use(morgan(logFormat , {stream: accessLogStream}))

  } else {

    app.use(morgan(logFormat))

  }

}
