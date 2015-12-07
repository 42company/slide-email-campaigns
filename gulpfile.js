var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var browserify = require('gulp-browserify')
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport')
var fs = require('fs')
var parse = require('csv-parse')
var csv = require('fast-csv')

var BROWSER_SYNC_RELOAD_DELAY = 500

gulp.task('nodemon', ['scripts'], function (cb) {
  var called = false
  var nodemon = require('gulp-nodemon')
  var recursiveReaddir = require('recursive-readdir')

  recursiveReaddir('server', function (err, serverFiles) {
    if (err) { throw new Error('failed to read server directory') }

    recursiveReaddir('app', function (err, appFiles) {
      if (err) { throw new Error('failed to read app directory') }

      nodemon({
        script: 'index.js',
        watch: ['index.js'].concat(serverFiles).concat(appFiles)
      }).on('start', function onStart () {
        if (!called) { cb() }
        called = true
      }).on('restart', function onRestart () {
        // reload connected browsers after a slight delay
        setTimeout(function reload () {
          browserSync.reload({
            stream: false
          })
        }, BROWSER_SYNC_RELOAD_DELAY)
      })
    })
  })
})

gulp.task('scripts', function() {
  gulp.src('./app/index.js')
    .pipe(browserify({
      insertGlobals : true
    }))
    .on('prebundle', function(bundle) {
      bundle.external('domready')
      bundle.external('react')
    })
    .pipe(gulp.dest('./build/javascripts'))
})

gulp.task('send', function() {
  var transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp-pulse.com',
    port: '2525',
    auth: {
      user: process.env.SENDPULSE_USERNAME,
      pass: process.env.SENDPULSE_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  }))

  var stream = fs.createReadStream('./server/mail_db/*.csv')
  var html = fs.readFileSync('./server/views/mail_templates/india_invite.html', 'utf-8')

  csv
    .fromStream(stream, {headers : true})
    .on("data", function(data){
      transport.sendMail({
        from: process.env.SENDPULSE_USERNAME,
        to: data.email,
        subject: 'Hello',
        html: html
      }, function(err, info) {
        if (err) {
          console.error(err)
        } else {
        console.log(info)
        }
      })
   })
   .on("end", function(){
     console.log('done')
   })
})
