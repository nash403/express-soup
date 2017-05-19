module.exports = function staticServing(app) {
  if (!require('../config/config').STATIC_MIDDLEWARE) return;
  /**
   * Serve static files and directory listing.
   */
  const config = require('../config/config');
  const serveStatic = require('serve-static');
  app.use(serveStatic(config.publicDirectory, {'index': ['index.html', 'index.htm']}));
  const directoryListing = require('serve-index');
  app.use('/ftp', directoryListing(config.indexingDirectory, {icons: true}));
}
