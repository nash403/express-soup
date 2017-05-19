module.exports = function body(app) {
  /**
   * Body parser with 'express-busboy' to populate req.body and req.files
   */
  const config = require('../config/config');
  const form = require('express-busboy');
  form.extend(app, { upload: true, path: config.uploadDirectory, allowedPath: /./ });
}
