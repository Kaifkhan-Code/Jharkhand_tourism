const multer = require("multer");
const { configureCloudinary } = require("./cloudinary");

const storage = multer.memoryStorage();

const uploadReviewPhoto = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (/^image\/(jpeg|png|webp)$/.test(file.mimetype)) return callback(null, true);
    callback(new Error("Review photos must be JPG, PNG, or WebP images."));
  },
});

function uploadReviewPhotoToCloudinary(file) {
  const cloudinary = configureCloudinary();
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { folder: "reviews/pending", resource_type: "image" },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    upload.end(file.buffer);
  });
}

module.exports = { uploadReviewPhoto, uploadReviewPhotoToCloudinary };
