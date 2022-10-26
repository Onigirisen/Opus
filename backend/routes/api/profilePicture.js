const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const User = require("../../models/User")

const s3 = new aws.S3({
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
