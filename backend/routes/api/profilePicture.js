const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new S3Client({
   region: process.env.S3_BUCKET_REGION,
   credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
   }
})

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'opus-seed-profile-pictures',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname})
        },
        key: function (req, file, cb) {
            cb (null, "image" + req.body.uploaderId);
        }
    })
})

const singleUpload = upload.single("image-upload");

//Old code to refer to
// router.post('/upload', upload.single("image-upload"), async (req, res) => {
//     console.log(req.file.location);
//     const user = await User.findById(req.body.uploaderId);
//     user.profilePictureUrl = req.file.location;
//     user.save();
// })

router.post("/upload", function (req, res) {
    singleUpload(req, res, function (err) {
          if (err) {
        return res.json({
          success: false,
          errors: {
            title: "Image Upload Error",
            detail: err.message,
            error: err,
          },
        });
      }
  
      let profilePictureUrl = { profilePictureUrl: req.file.location.replace('opus-seed-profile-pictures.opus-seed-profile-pictures.','opus-seed-profile-pictures.') };
      User.findByIdAndUpdate(req.body.uploaderId, profilePictureUrl)
        .then((user) => res.status(200).json({ success: true, user: user }))
        .catch((err) => res.status(400).json({ success: false, error: err }));
    });
  });

module.exports = router;