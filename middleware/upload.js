const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Temporary storage for multer before uploading to Cloudinary
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'temp-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: fileFilter
});

// Middleware to handle the Cloudinary upload after multer saves the file
const cloudinaryUpload = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    try {
        const preset = process.env.CLOUDINARY_UPLOAD_PRESET || 'portfolio';
        
        // Check if we have API key/secret for a signed upload, 
        // otherwise try unsigned upload with the preset
        let result;
        if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
            result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'portfolio',
                use_filename: true,
                unique_filename: true
            });
        } else {
            // Unsigned upload using the preset
            result = await cloudinary.uploader.unsigned_upload(req.file.path, preset, {
                folder: 'portfolio'
            });
        }

        // Delete the local file after uploading to Cloudinary
        fs.unlinkSync(req.file.path);

        // Replace the file object or just add the cloudinary URL
        req.file.cloudinaryUrl = result.secure_url;
        req.file.public_id = result.public_id;
        
        next();
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        // If it fails, we still have the local file path in req.file.path
        // but we should probably inform the user or fall back
        next(error);
    }
};

module.exports = {
    upload,
    cloudinaryUpload
};
