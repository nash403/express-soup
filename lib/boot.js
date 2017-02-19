/**
 * Loader for your controllers.
 */

const fs = require('fs')
const path = require('path')

module.exports = function(parent) {
  fs.readdirSync(path.join(__dirname, '..', 'controllers')).forEach(function(name){
    if (!fs.statSync(path.join(__dirname, '..', 'controllers', name)).isDirectory()) return
    let ctrl = require('./../controllers/' + name)
    let autoload = ctrl.autoload
    let prefix = ctrl.prefix || null
    let app = ctrl.controller

    if ('undefined' !== typeof autoload && !autoload) return

    // allow specifying the view engine.
    // NOTE: The controller has to be an express application and not an express router
    if (ctrl.engine) {
      app.set('view engine', ctrl.engine)
      app.set('views', path.join(__dirname, '..', 'controllers', name, 'views'))
    }

    // mount the app with before middleware support
    if (prefix) {
      if (ctrl.before) {
        parent.use(prefix, ctrl.before, app)
      } else {
        parent.use(prefix, app)
      }
    } else {
      if (ctrl.before) {
        parent.use(ctrl.before, app)
      } else {
        parent.use(app)
      }
    }
  }) // forEach
}
