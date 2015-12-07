var AWS = require('aws-sdk')

AWS.config.update({ accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY })

var store = function (attributes, cb) {
  var s3 = new AWS.S3()
  var remotePath = attributes.Key || 'tmp'

  s3.putObject({
    Bucket: process.env.S3_BUCKET,
    ACL: attributes.ACL || 'public-read',
    Body: attributes.Body || '',
    Key: remotePath,
    ContentEncoding: attributes.ContentEncoding
  }, function (err, _) {
    if (err) {
      cb(err, null)
    } else {
      var url = 'https://' + process.env.S3_BUCKET + '.s3.amazonaws.com/' + remotePath

      cb(null, url)
    }
  })
}

module.exports = {
  store: store
}
