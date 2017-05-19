module.exports = function methodOverride(app) {
  /**
   * Allow overriding methods in query (?_method=put)
   */
  const methodOverride = require('method-override');
  app.use(methodOverride('_method'));
}
