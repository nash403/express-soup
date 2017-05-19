module.exports = function security(app) {
  /**
   * Secure your app
   */
  const cors = require('cors');
  app.use(cors());
  const helmet = require('helmet');
  app.use(helmet());
}
