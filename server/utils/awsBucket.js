const AWS = require('aws-sdk')
const ErrorResponse = require('./ErrorResponse')
const User = require('../models/User')

const BUCKET_NAME = process.env.AWS_BUCKET_NAME
const IAM_USER_KEY = process.env.AWS_ACCESS_KEY_ID
const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY

const s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
  bucket: BUCKET_NAME,
  region: 'us-east-2'
})

function uploadToS3(req, res, next, file) {
  s3bucket.createBucket(function() {
    const params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data
    }
    s3bucket.upload(params, async function(err) {
      if (err) {
        console.error(err)
        return next(new ErrorResponse('Problem with file upload', 500))
      }

      await User.findByIdAndUpdate(req.params.id, { photo: file.name })

      res.status(200).json({
        success: true,
        data: file.name
      })
    })
  })
}

function getS3Photo(res, next, filename) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: filename
  }

  s3bucket.headObject(params, err => {
    if (err && err.code === 'NotFound') {
      return next(new ErrorResponse(`file ${filename} Not Found`, 404))
    }
    s3bucket.getSignedUrl('getObject', params, (error, url) => {
      if (error) {
        return next(new ErrorResponse(`Problem to get photo from AWS`, 500))
      }

      res.status(200).json({
        success: true,
        data: url
      })
    })
  })
}

module.exports = { uploadToS3, getS3Photo }
