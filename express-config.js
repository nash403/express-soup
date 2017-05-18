module.exports = function (app) {
  const path = require('path');
  const db = require('./config/dbconnection'); // do something with it
  const config = require('./config/config');

  /**
   * Set some global properties
   */
  // app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
  app.set('http_port', process.env.SERVER_HTTP_PORT || 8000);
  app.set('https_port', process.env.SERVER_HTTPS_PORT || 8001);
  app.set('view engine', 'jade');
  app.set('views', path.join(__dirname, 'views'));

  /**
   *  Setup the logger
   */
  const morgan = require('morgan');
  let logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
  // Uncomment following lines to enable log rotation
  /*const fs = require('fs');
  const rfs = require('rotating-file-stream');
  let logDirectory = config.logDirectory;

  // ensure log directory exists
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

  let generator = function generator(time, index) {
    if(!time)
        return 'access.log';

    function pad(num) {
      return (num > 9 ? "" : "0") + num;
    }

    let day    = pad(time.getDate());
    let date  = `${time.getFullYear()}-${pad(time.getMonth() + 1)}-${day}`;
    let hour   = pad(time.getHours());
    let minute = pad(time.getMinutes());

    return `access-${date}-${hour}hh${minute}mm.${index > 1 ? index +'.' : ''}log.gz`;
  }

  // create a rotating write stream
  let accessLogStream = rfs(generator, {
    interval: '1d', // rotate daily
    size:     '10M', // rotate every 10 MegaBytes written
    compress: 'gzip', // compress rotated files
    path: logDirectory
  })*/

  app.use(morgan(logFormat /*, {stream: accessLogStream}*/))

  /**
   * Allow overriding methods in query (?_method=put)
   */
  const methodOverride = require('method-override');
  app.use(methodOverride('_method'));

  /**
   * Secure your app
   */
  const cors = require('cors');
  app.use(cors());
  const helmet = require('helmet');
  app.use(helmet());

  /**
   * Optimize your app by compressing all your responses
   */
  const compression = require('compression');
  app.use(compression());

  /**
   * Serve static files and directory listing. Edit paths at your convenience.
   */
  const serveStatic = require('serve-static');
  app.use(serveStatic(path.join(__dirname, 'public'), {'index': ['index.html', 'index.htm']}));
  // const directoryListing = require('serve-index');
  // app.use('/ftp', directoryListing(path.join(__dirname, 'ftp'), {icons: true}));

  /**
   * Monit the activity of your app. Visit /status (which is the default. you can edit it).
   */
  // const monitor = require('express-status-monitor');
  // app.use(monitor());

  /**
   * Body parser and validator utilities.
   * 'express-busboy' is used here to populate req.body and req.files
   */
  const form = require('express-busboy');
  form.extend(app, { upload: true, path: config.uploadDir, allowedPath: /./ });
  const validator = require('express-validator');
  app.use(validator());

  /**
   * Session & cookie
   */
  // const cookieParser = require('cookie-parser');
  // app.use(cookieParser());
  // const session = require('express-session');
  // app.use(session({
  //   resave: true,
  //   saveUninitialized: true,
  //   secret: process.env.SESSION_SECRET || 'The secret should be in your .env file!',
  //   cookie: {maxAge: 15 * 24 * 3600 * 1000},
  //   unset: 'destroy'
  //   // Setup your session store
  //   /*store: new MongoStore({
  //     url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
  //     autoReconnect: true
  //   })*/
  // }));

  /**
   * Configure passport
   */
  // const passport = require('passport');
  // require('./config/passport').configure();
  // app.use(passport.initialize());
  // app.use(passport.session());

  /**
   * Add support for flash message
   */
  // const flash = require('connect-flash');
  // app.use(flash());

  /**
   * Supply some utilities to manage pagination
   */
  // const paginate = require('express-paginate');
  // app.use(paginate.middleware(10,50));

  /**
   * Uncomment this line to serve a favicon.ico. The file must exist
   */
  // const favicon = require('serve-favicon');
  // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

  // const io = require('socket.io')(app);

  return app;
}
