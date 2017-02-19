const express = require('express')
  , Resource = require('express-resource')
  , app = express()

exports.prefix = '/api/v1'

exports.engine = 'ejs' // your views would be in ./views

app.resource('dummys', require('./v1/resource'))

exports.controller = app

module.exports = exports
