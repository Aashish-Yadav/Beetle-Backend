const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const UploadOnCloudinary = async (localFilePath, folder = "uploads") => {
  try {
    if (!localFilePath) return null;

    // upload to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto', // auto-detect image/audio/video
      folder
    });

    // remove temp file after successful upload
    fs.unlinkSync(localFilePath);

    console.log("✅ File uploaded on Cloudinary:", result.secure_url);
    return result.secure_url; // return just the URL (most useful)
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error.message);

    // clean up local file if exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

module.exports = { UploadOnCloudinary };
