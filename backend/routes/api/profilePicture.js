const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { S3Client } = require('@aws-sdk/client-s3');
const multer = require("multer");
const multerS3 = require("multer-s3");
const User = mongoose.model('User');

const s3 = new S3Client({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccess: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION
});

const upload = (bucketName) =>  
    multer({
    storage: multerS3({
        s3,
        bucket:bucketName,
        metadata: (req, file, callback) => {
            callback(null, { fieldName: file.fieldname });
        },
        key: (req, file, callback) => {
            callback(null, `image-${Date.now()}.jpeg`);
        }, 
    }),
});

exports.setProfilePic =  (req, res, next) => {
    const uploadSingle = upload("opus-seed-profile-pictures").single(
        "image-upload"
    );

    uploadSingle(req, res, async (err) => {
        if (err)
            return res.status(400).json({success: false, message: err.message});
        
        await User.create({profilePictureUrl: req.file.location });

        res.status(200).json({ data: req.files.location });
    });
};


// router.post('/upload', upload.single('image-upload'), async (req, res) => {
 
//     const user = await User.findById(req.body.uploaderId);

//     user.save();
 
//  });

 module.exports = router;


