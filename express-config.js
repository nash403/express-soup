module.exports = function (app) {
  let path = require('path')
  let logger = require('morgan')
  let cors = require('cors')
  let helmet = require('helmet')
  let monitor = require('express-status-monitor')
  let compression = require('compression')
  let cookieParser = require('cookie-parser')
  let session = require('express-session')
  let flash = require('connect-flash')
  let formidable = require('express-formidable')
  let validator = require('express-validator')
  let paginate = require('express-paginate')
  let methodOverride = require('method-override')
  let static = require('serve-static')
  let directoryListing = require('serve-index')
  let favicon = require('serve-favicon')

  let db = require('./dbconnection') // do something with it


  // Set some global properties
  app.set('http_port', process.env.SERVER_HTTP_PORT || 8000)
  app.set('https_port', process.env.SERVER_HTTPS_PORT || 8001)
  app.set('view engine', 'jade')
  app.set('views', path.join(__dirname, 'views'))

  if (!module.parent) app.use(logger('dev'))
  // Secure your app
  app.use(cors())
  app.use(helmet())

  // Monit the activity of your app. Visit /status (which is the default. you can edit it).
  app.use(monitor());

  // Optimize your app by compressing all your responses
  app.use(compression())

  // Supply form utilities
  app.use(formidable({ uploadDir: path.join(__dirname,'uploads_tmp'), multiples: true }))
  app.use(validator())

  // Session & cookie
  app.use(cookieParser())
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
  }))

  // If you use passport, here should be a good place to call passport.initialize() and passport.session().

  // Add support for flash messages
  app.use(flash())

  // Supply some utilities to manage pagination
  app.use(paginate.middleware(10,50))

  // Allow overriding methods in query (?_method=put)
  app.use(methodOverride('_method'))

  // Serve static files and directory listing. Edit paths at your convenience.
  app.use(static(path.join(__dirname, 'public')))
  app.use('/ftp', directoryListing(path.join(__dirname, 'ftp'), {icons: true}))

  // Change the dummy favicon.ico in the public folder
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

  return app
}
