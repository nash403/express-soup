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

  require('./middlewares/logger')(app)
  require('./middlewares/method-override')(app)
  require('./middlewares/security')(app)
  require('./middlewares/compression')(app)
  require('./middlewares/static-serving')(app)
  require('./middlewares/rate-limit')(app)
  require('./middlewares/monitor')(app)
  require('./middlewares/body-parser')(app)
  require('./middlewares/validators')(app)
  require('./middlewares/cookies')(app)
  require('./middlewares/sessions')(app)
  require('./middlewares/passport')(app)
  require('./middlewares/flash-messages')(app)
  require('./middlewares/pagination')(app)
  // require('./middlewares/favicon')(app)

  // const io = require('socket.io')(app);

  return app;
}
