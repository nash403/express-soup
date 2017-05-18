module.exports = function (app) {
  const path = require('path');
  // const fs = require('fs');
  const morgan = require('morgan');
  const methodOverride = require('method-override');
  const cors = require('cors');
  const helmet = require('helmet');
  const compression = require('compression');
  const serveStatic = require('serve-static');
  // const directoryListing = require('serve-index');
  // const monitor = require('express-status-monitor');
  const form = require('express-busboy');
  const validator = require('express-validator');
  // const cookieParser = require('cookie-parser');
  // const session = require('express-session');
  // const passport = require('passport');
  // const flash = require('connect-flash');
  // const paginate = require('express-paginate');
  const favicon = require('serve-favicon');
  // const io = require('socket.io')(app);

  const db = require('./config/dbconnection'); // do something with it
  const config = require('./config/config');


  // Set some global properties
  app.set('http_port', process.env.SERVER_HTTP_PORT || 8000);
  app.set('https_port', process.env.SERVER_HTTPS_PORT || 8001);
  app.set('view engine', 'jade');
  app.set('views', path.join(__dirname, 'views'));

  if (process.env.NODE_ENV === 'development') {
    // only use in development. In production, please handle errors in a better way.
    app.use(morgan('dev'));
  } else {
    // Uncomment following lines (+the fs require) to set up log rotation
    // const rfs = require('rotating-file-stream');
    // let logDirectory = config.logDirectory;

    // ensure log directory exists
    // fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    // create a rotating write stream
    // let accessLogStream = rfs('access.log', {
    //   interval: '1d', // rotate daily
    //   size:     '10M', // rotate every 10 MegaBytes written
    //   compress: 'gzip', // compress rotated files
    //   path: logDirectory
    // })

    // setup the logger
    app.use(morgan('combined'/*, {stream: accessLogStream}*/))
  }

  // Allow overriding methods in query (?_method=put)
  app.use(methodOverride('_method'));

  // Secure your app
  app.use(cors());
  app.use(helmet());

  // Optimize your app by compressing all your responses
  app.use(compression());

  // Serve static files and directory listing. Edit paths at your convenience.
  app.use(serveStatic(path.join(__dirname, 'public'), {'index': ['index.html', 'index.htm']}));
  // app.use('/ftp', directoryListing(path.join(__dirname, 'ftp'), {icons: true}));

  // Monit the activity of your app. Visit /status (which is the default. you can edit it).
  // app.use(monitor());

  // Body parser and validator utilities.
  // 'express-busboy' is used here to populate req.body and req.files
  form.extend(app, { upload: true, path: config.uploadDir, allowedPath: /./ });
  app.use(validator());

  // Session & cookie
  // app.use(cookieParser());
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

  // Configure passport
  // require('./config/passport').configure();
  // app.use(passport.initialize());
  // app.use(passport.session());

  // Add support for flash messages
  // app.use(flash());

  // Supply some utilities to manage pagination
  // app.use(paginate.middleware(10,50));

  // Uncomment this line to serve a favicon.ico. The file must exist
  // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

  return app;
}
