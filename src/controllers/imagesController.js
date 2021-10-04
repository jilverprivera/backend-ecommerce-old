const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const imagesController = {
  // Upload a image on cloudinary
  uploadImage: (req, res) => {
    try {
      // if there are no files or the object key of the files is 0

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No images selected.");
      }
      const file = req.files.file;
      if (file.size > 1024 * 1024) {
        removeTmpFiles(file.tempFilePath);
        return res
          .status(400)
          .json({  msg: "Image size is too large." });
      }

      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/webp" &&
        file.mimetype !== "image/png"
      ) {
        removeTmpFiles(file.tempFilePath);
        return res
          .status(400)
          .json({  msg: "Incorrect image format" });
      }

      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        { folder: "react-ecommerce" },
        async (err, result) => {
          if (err) throw err;
          removeTmpFiles(file.tempFilePath);
          res.json({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Delete a image on cloudinary
  deleteImage: (req, res) => {
    try {
      const { public_id } = req.body;
      if (!public_id)
        return res.status(400).json({ msg: "No image public Id selected." });

      cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        if (err) throw err;

        res.json({  msg: "Image deleted succcesfully" });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const removeTmpFiles = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = imagesController;
