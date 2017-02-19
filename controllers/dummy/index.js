const express = require('express')
  , router = express.Router()

exports.prefix = '/dummy'

exports.before = function beforeMiddleware(req, res, next) {
  // do some stuff and call next()
  console.log('before middleware')
  next()
}

router.get('/add',function (req, res, next) {
  res.status(200).send('<p>add dummy</p>')
})

router.get('/delete',function (req, res, next) {
  res.status(200).send('<p>delete dummy</p>')
})

exports.controller = router

module.exports = exports
