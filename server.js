let chalk = require('chalk')
let app = require('express')()

/**
 * App configuration
 */
// Populate environment variables
require('dotenv').config()
// Configure our server app
app = require('./express-config')(app)

/**
 * I can start putting my middlewares here
 */
app.get('/',(req, res, next)=>{
  res.status(200)
    .format({
      html: _ => res.send('<p>It works!</p>'),
      text: _ => res.send('It works!'),
      json: _ => res.json({message: 'It works!'})
    })
})

/**
 * Setup final error handlers & start serving the app.
 */
// Error handler
if (process.env.NODE_ENV === 'development') {
  // only use in development. In production, please handle errors in a better way.
  app.use(require('errorhandler')())
}

// Last middleware.
// Assume 404 since no middleware responded
app.use(function(req, res, next){
  res.sendStatus(404)
})

// Start listening
if (!module.parent) {
  let port = app.get('port')
  app.listen(port, function() {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), port, app.get('env'))
  })
}
