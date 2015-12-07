var express = require('express')
var router = express.Router()
var multer = require('multer')
var upload = multer({ dest: 'tmp/uploads' })
var fs = require('fs')
var s3 = require('../../services/s3')
var path = require('path')

router.post('/', upload.single('file'), function (req, res) {
  console.log('hello cigon')
  var remotePath = 'images/' + req.file.filename + path.extname(req.file.originalname)

  s3.store({
    Key: remotePath,
    Body: fs.createReadStream(req.file.path),
    ContentEncoding: req.file.mimetype
  }, function (err, url) {
    if (err) {
      console.log(err)
      res.status(500).json(err)
    } else {
      res.status(201).json({ url: url })
    }
  })
})

module.exports = router
