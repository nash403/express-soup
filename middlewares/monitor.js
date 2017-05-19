module.exports = function monitor(app) {
  if (!require('../config/config').MONITOR_MIDDLEWARE) return;
  /**
   * Monit the activity of your app. Visit /status (this is editable).
   */
  const monitor = require('express-status-monitor');
  app.use(monitor());
}
