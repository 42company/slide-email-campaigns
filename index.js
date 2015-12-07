'use strict'

var path = require('path')
var express = require('express')
var sassMiddleware = require('node-sass-middleware')

var app = express()
var route = express.Router()

app.set('views', path.resolve(__dirname, 'server/views'))
app.set('view engine', 'jade')

app.use(sassMiddleware({
    src: __dirname + '/app/stylesheets',
    dest: __dirname + '/public/stylesheets',
    debug: true,
    includePaths: __dirname + '/node_modules/foundation-sites/scss/'
  })
)

app.use('/api/images', require('./server/routes/api/images'))

app.get('/', function (req, res) {
  res.render('layout')
})

app.get('/upload', function (req, res) {
  res.render('upload')
})

app.use(express.static(__dirname + '/build'))

var server = app.listen(3000, function () {
  var port = server.address().port

  console.log('Server listening on port' + port)
})
